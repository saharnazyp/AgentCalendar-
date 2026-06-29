/**
 * Config.gs
 * -------------------------------------------------------------
 * خواندن تنظیمات حساس از Script Properties به جای هاردکد در کد.
 *
 * قبل از استفاده، در ویرایشگر Apps Script به این مسیر برو:
 *   Project Settings (⚙️) → Script Properties → Add script property
 * و این کلیدها را وارد کن:
 *   TELEGRAM_BOT_TOKEN   → توکن بات تلگرام
 *   CHAT_ID              → @SPO_Assistant یا chat id عددی
 *   BOSS_CALENDAR_ID     → spogroup.office@gmail.com
 *   RECIPIENT_EMAIL      → ایمیل گیرنده‌ها با کاما جدا شده
 *   BOSS_EMAIL           → ایمیل رییس (برای همگام‌سازی رنگ)
 *
 * یا یک بار تابع setupProperties_() پایین را با مقادیر خودت اجرا کن.
 * -------------------------------------------------------------
 */

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  const cfg = {
    TELEGRAM_BOT_TOKEN: props.getProperty('TELEGRAM_BOT_TOKEN'),
    CHAT_ID:            props.getProperty('CHAT_ID'),
    BOSS_CALENDAR_ID:   props.getProperty('BOSS_CALENDAR_ID'),
    RECIPIENT_EMAIL:    props.getProperty('RECIPIENT_EMAIL'),
    BOSS_EMAIL:         props.getProperty('BOSS_EMAIL')
  };

  // اعتبارسنجی سریع تا اگر کلیدی فراموش شده، خطای واضح بدهد.
  const missing = Object.keys(cfg).filter(k => !cfg[k]);
  if (missing.length) {
    throw new Error('تنظیمات ناقص در Script Properties: ' + missing.join(', '));
  }
  return cfg;
}

/**
 * کمک‌کننده‌ی یک‌بارمصرف برای ست‌کردن Script Properties.
 * مقادیر را اینجا بگذار، یک‌بار اجرا کن، سپس مقادیر را پاک کن
 * تا توکن در سورس باقی نماند.
 */
function setupProperties_() {
  PropertiesService.getScriptProperties().setProperties({
    TELEGRAM_BOT_TOKEN: 'PUT_YOUR_TOKEN_HERE',
    CHAT_ID:            '@SPO_Assistant',
    BOSS_CALENDAR_ID:   'spogroup.office@gmail.com',
    RECIPIENT_EMAIL:    'recipient1@example.com, recipient2@example.com',
    BOSS_EMAIL:         'boss@example.com'
  });
  Logger.log('✓ Script Properties ذخیره شد. حالا مقادیر را از این تابع پاک کن.');
}
