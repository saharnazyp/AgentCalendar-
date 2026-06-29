/**
 * MeetingMonitor.gs
 * -------------------------------------------------------------
 * بک‌اند وب‌اپ مانیتور جلسات (Index.html).
 * شمارش معکوس زنده، نمایش مهمان‌ها، لینک جلسه و فایل‌های پیوست.
 *
 * نیاز: سرویس پیشرفته‌ی Calendar برای خواندن پیوست‌ها فعال باشد.
 * استقرار: Deploy → New deployment → Web app
 * -------------------------------------------------------------
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('مانیتور جلسات دفتر مدیرعامل')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getCalendar_() {
  const cfg = getConfig_();
  const name = cfg.BOSS_CALENDAR_ID;
  if (name && name.trim() !== '') {
    // تلاش برای یافتن با شناسه، سپس با نام
    const byId = CalendarApp.getCalendarById(name);
    if (byId) return byId;
    const cals = CalendarApp.getCalendarsByName(name);
    if (cals && cals.length > 0) return cals[0];
    return null;
  }
  return CalendarApp.getDefaultCalendar();
}

function getTodayMeetings() {
  const cal = getCalendar_();
  if (!cal) {
    return { error: 'تقویم پیدا نشد. مقدار BOSS_CALENDAR_ID را در Script Properties بررسی کن.' };
  }

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  const events = cal.getEvents(startOfDay, endOfDay);
  const result = [];

  events.forEach(function (ev) {
    if (ev.isAllDayEvent()) return;
    const s = ev.getStartTime();
    const e = ev.getEndTime();

    const guests = [];
    try {
      ev.getGuestList().forEach(function (g) {
        const name = g.getName();
        const email = g.getEmail();
        const status = g.getGuestStatus();
        const statusFa = (status === CalendarApp.GuestStatus.YES) ? 'حاضر' :
                         (status === CalendarApp.GuestStatus.NO) ? 'غایب' :
                         (status === CalendarApp.GuestStatus.MAYBE) ? 'شاید' : 'دعوت‌شده';
        guests.push({ name: name || email, status: statusFa });
      });
    } catch (err) {}

    const desc = ev.getDescription() || '';
    const loc  = ev.getLocation() || '';
    const meetLink = extractLink_(desc) || extractLink_(loc) || '';
    const attachments = getAttachments_(cal.getId(), ev.getId());

    result.push({
      id: ev.getId(),
      title: ev.getTitle() || 'بدون عنوان',
      start: pad2_(s.getHours()) + ':' + pad2_(s.getMinutes()),
      end:   pad2_(e.getHours()) + ':' + pad2_(e.getMinutes()),
      description: stripHtml_(desc),
      location: loc,
      guests: guests,
      meetLink: meetLink,
      attachments: attachments
    });
  });

  result.sort(function (a, b) { return toMin_(a.start) - toMin_(b.start); });
  return { meetings: result };
}

// خواندن فایل‌های پیوست رویداد با سرویس پیشرفته‌ی Calendar
function getAttachments_(calId, eventId) {
  const out = [];
  try {
    const cleanId = eventId.split('@')[0];
    const ev = Calendar.Events.get(calId, cleanId);
    if (ev && ev.attachments) {
      ev.attachments.forEach(function (att) {
        const fileId = att.fileId || extractDriveId_(att.fileUrl || '');
        out.push({
          title: att.title || 'فایل',
          mimeType: att.mimeType || '',
          fileUrl: att.fileUrl || '',
          fileId: fileId || ''
        });
      });
    }
  } catch (err) {
    // اگر سرویس پیشرفته فعال نباشد، آرایه‌ی خالی برمی‌گردد.
  }
  return out;
}

// محتوای فایل Drive به‌صورت Base64 (برای نمایش داخل صفحه)
function getFileData(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    return {
      name: file.getName(),
      mimeType: blob.getContentType(),
      data: Utilities.base64Encode(blob.getBytes())
    };
  } catch (err) {
    return { error: 'فایل قابل دریافت نیست: ' + err.message };
  }
}

function extractLink_(text) {
  if (!text) return '';
  const m = text.match(/(https?:\/\/[^\s"'<>]+)/i);
  return m ? m[1] : '';
}
function extractDriveId_(url) {
  const m = url.match(/[-\w]{25,}/);
  return m ? m[0] : '';
}
function stripHtml_(s) {
  if (!s) return '';
  return s.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
}
function pad2_(n) { return ('0' + n).slice(-2); }
function toMin_(t) { const p = t.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
