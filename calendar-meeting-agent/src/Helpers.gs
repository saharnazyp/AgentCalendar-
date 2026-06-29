/**
 * Helpers.gs
 * -------------------------------------------------------------
 * توابع مشترک مورد استفاده در ماژول‌های مختلف.
 * (تعریف‌های تکراری formatTime/formatDateReadable حذف و یکی شد.)
 * -------------------------------------------------------------
 */

// فرمت‌دهی زمان، مثلاً 09:00
function formatTime(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'HH:mm');
}

// فرمت‌دهی تاریخ قابل خواندن، مثلاً 2026/06/29
function formatDateReadable(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd');
}

// خواندن رویدادهای یک روز از تقویم، با فیلترهای ایمن
function getCalendarEvents(calendar, date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const end   = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  const events = calendar.getEvents(start, end);

  return events.filter(ev => {
    // ۱. حذف رویدادهای تمام‌روز
    if (ev.isAllDayEvent()) return false;

    // ۲. حذف رویدادهای لغوشده (در صورت پشتیبانی متد)
    try {
      if (ev.getStatus() === CalendarApp.EventStatus.CANCELLED) return false;
    } catch (e) {
      Logger.log('⚠️ رویداد ' + ev.getTitle() + ' متد getStatus را ندارد: ' + e.message);
      // اگر متد نبود، رویداد را نگه می‌داریم.
    }

    return true;
  });
}

// ارسال پیام به تلگرام
function sendToTelegram(text) {
  const cfg = getConfig_();
  const url = 'https://api.telegram.org/bot' + cfg.TELEGRAM_BOT_TOKEN + '/sendMessage';
  const payload = {
    chat_id: cfg.CHAT_ID,
    text: text,
    parse_mode: 'Markdown'
  };

  try {
    UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  } catch (e) {
    Logger.log('خطا در ارسال به تلگرام: ' + e.toString());
  }
}
