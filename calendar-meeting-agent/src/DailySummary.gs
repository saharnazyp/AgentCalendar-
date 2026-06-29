/**
 * DailySummary.gs
 * -------------------------------------------------------------
 * خواندن رویدادهای امروز تقویم رییس، خلاصه‌سازی با هوش مصنوعی،
 * و ارسال گزارش به تلگرام و ایمیل.
 *
 * این تابع را به‌صورت تریگر روزانه تنظیم کن (createDailyTrigger).
 * -------------------------------------------------------------
 */

function sendDailyCalendarSummary_Automated() {
  const cfg = getConfig_();
  const today = new Date();

  // ۱) خواندن رویدادهای تقویم
  const calendar = CalendarApp.getCalendarById(cfg.BOSS_CALENDAR_ID);
  if (!calendar) {
    Logger.log('خطا: تقویم با شناسه ' + cfg.BOSS_CALENDAR_ID + ' پیدا نشد.');
    MailApp.sendEmail(cfg.RECIPIENT_EMAIL, 'خطای اتوماسیون تقویم',
      'تقویم ' + cfg.BOSS_CALENDAR_ID + ' پیدا نشد.');
    return;
  }

  const rawEvents = getCalendarEvents(calendar, today);

  // ۲) ساخت متن خام برای خلاصه‌سازی
  let rawSummary = 'برنامه جلسات امروز (' + formatDateReadable(today) + '):\n\n';
  if (rawEvents.length === 0) {
    sendToTelegram('⚪ جلسه‌ای امروز (' + formatDateReadable(today) + ') ثبت نشده است.');
    return;
  }

  rawEvents.forEach(event => {
    rawSummary +=
      'موضوع: ' + event.getTitle() + '\n' +
      'زمان: ' + formatTime(event.getStartTime()) + ' تا ' + formatTime(event.getEndTime()) + '\n' +
      'مکان: ' + (event.getLocation() || '—') + '\n' +
      'توضیحات: ' + (event.getDescription() || '—') + '\n\n';
  });

  // ۳) خلاصه‌سازی توسط هوش مصنوعی
  const systemInstruction =
    'شما یک دستیار اجرایی هوشمند هستید. جلسات امروز را به زبان فارسی، به صورت رسمی، ' +
    'خلاصه، مرتب و مدیریتی برای مدیرعامل گزارش کنید. نکات مهم جلسات، زمان و مکان را ' +
    'به وضوح ذکر کنید.';

  let aiSummary = '';
  try {
    const result = AIFunctions.generateContent(rawSummary, {
      model: 'gemini-2.5-flash',
      systemInstruction: systemInstruction
    });
    aiSummary = result.text.trim();
  } catch (e) {
    Logger.log('خطا در خلاصه‌سازی AI: ' + e.toString());
    aiSummary = '⚠️ (خطا در خلاصه‌سازی AI)\n\n' + rawSummary;
  }

  // ۴) ارسال به تلگرام
  const finalSummary = aiSummary || ('⚠️ خطا در خلاصه‌سازی. گزارش خام جلسات:\n\n' + rawSummary);

  if (finalSummary.trim().length === 0) {
    Logger.log('هشدار: متن پیام نهایی تلگرام خالی است. ارسال لغو شد.');
    sendToTelegram('❌ خطای سیستمی: گزارش جلسات روزانه خالی است. لطفاً لاگ‌ها را بررسی کنید.');
    return;
  }

  sendToTelegram('📅 **خلاصهٔ جلسات امروز**\n\n' + finalSummary);

  // ۵) ارسال ایمیل
  MailApp.sendEmail({
    to: cfg.RECIPIENT_EMAIL,
    subject: '📅 خلاصهٔ جلسات امروز (' + formatDateReadable(today) + ')',
    body: finalSummary
  });
}

// ساخت تریگر روزانه ساعت ۷ صبح (نام تابع اصلاح شد)
function createDailyTrigger() {
  // جلوگیری از ساخت تریگر تکراری
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'sendDailyCalendarSummary_Automated') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('sendDailyCalendarSummary_Automated')
    .timeBased()
    .everyDays(1)
    .atHour(7)
    .create();

  Logger.log('✓ تریگر روزانه ساعت ۷ صبح ساخته شد.');
}
