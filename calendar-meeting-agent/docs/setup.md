<div dir="rtl">

# راهنمای راه‌اندازی کامل

## ۱. ساخت پروژه‌ی Apps Script

به [script.google.com](https://script.google.com) بروید و **New project** بزنید.
محتوای فایل‌های پوشه‌ی `src/` را به پروژه اضافه کنید. توجه: فایل `appsscript.json`
را فقط وقتی می‌بینید که در Project Settings گزینه‌ی
«Show "appsscript.json" manifest file in editor» را فعال کرده باشید.

## ۲. تنظیم Script Properties

از ویرایشگر:
**⚙️ Project Settings → Script Properties → Add script property**

این کلیدها را وارد کنید:

| کلید | نمونه مقدار |
|------|-------------|
| `TELEGRAM_BOT_TOKEN` | `1234567890:AA...` (توکن جدید) |
| `CHAT_ID` | `@SPO_Assistant` |
| `BOSS_CALENDAR_ID` | `spogroup.office@gmail.com` |
| `RECIPIENT_EMAIL` | `a@example.com, b@example.com` |
| `BOSS_EMAIL` | `boss@example.com` |

> جایگزین: تابع `setupProperties_()` در `Config.gs` را با مقادیر خودتان پر کنید،
> یک‌بار اجرا کنید، سپس مقادیر را از تابع پاک کنید.

## ۳. فعال‌سازی سرویس پیشرفته‌ی Calendar

برای خواندن فایل‌های پیوست رویدادها و همگام‌سازی رنگ، لازم است:
**Services (＋ کنار Services) → Google Calendar API → Add**

## ۴. مجوزها (Scopes)

اولین اجرای هر تابع، پنجره‌ی authorization باز می‌شود. مجوزها را تأیید کنید.
اسکوپ‌های لازم در `appsscript.json` تعریف شده‌اند.

## ۵. تریگر گزارش روزانه

تابع `createDailyTrigger` را یک‌بار از منوی Run اجرا کنید.
این کار تریگر زمان‌بندی‌شده‌ی روزانه‌ی ساعت ۷ صبح می‌سازد و تریگرهای تکراری قبلی را پاک می‌کند.

برای تست فوری، تابع `sendDailyCalendarSummary_Automated` را دستی اجرا کنید.

## ۶. استقرار مانیتور جلسات (وب‌اپ)

**Deploy → New deployment → Web app**
- Execute as: *Me* (یا کاربر مستقر کننده)
- Who has access: بسته به نیاز (Domain یا Anyone)

URL تولیدشده را در یک مرورگر/نمایشگر باز کنید تا داشبورد زنده نمایش داده شود.

## نکات

- منطقه‌ی زمانی پروژه روی `Asia/Tehran` تنظیم شده (`appsscript.json`).
- ماژول خلاصه‌سازی به `AIFunctions.generateContent` متکی است؛ اگر این کتابخانه
  در محیط شما در دسترس نباشد، کد به‌صورت خودکار گزارش خام را ارسال می‌کند.
- لوگوی مانیتور در `Index.html` به‌صورت متن «SPO Group» قرار داده شده تا حجم مخزن
  کم بماند. برای استفاده از لوگوی تصویری، عنصر `.hdr-logo` را با تگ `<img>` و
  data-URL یا لینک تصویر جایگزین کنید.

</div>
