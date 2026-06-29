<div dir="rtl">

# 📅 Calendar & Meeting Agent — دستیار تقویم و جلسات

ایجنت مدیریت تقویم و جلسات دفتر مدیرعامل، ساخته‌شده روی **Google Apps Script**.
شامل سه ماژول مستقل:

| ماژول | فایل | کار |
|------|------|-----|
| گزارش روزانه | `src/DailySummary.gs` | خواندن جلسات امروز، خلاصه‌سازی با هوش مصنوعی و ارسال به تلگرام + ایمیل |
| همگام‌سازی رنگ | `src/ColorSync.gs` | کپی رنگ و وضعیت busy رویدادها روی تقویم رییس |
| مانیتور جلسات | `src/MeetingMonitor.gs` + `src/Index.html` | داشبورد زنده با شمارش معکوس، مهمان‌ها، لینک و فایل‌های پیوست |

---

## ⚠️ امنیت — مهم

این مخزن **عمومی (public)** است. هیچ توکن یا ایمیلی نباید داخل کد قرار بگیرد.
تمام مقادیر حساس از **Script Properties** خوانده می‌شوند (نگاه کنید به `src/Config.gs`).

اگر قبلاً توکن باتتان جایی لو رفته، همین حالا در [@BotFather](https://t.me/BotFather)
با دستور `/revoke` آن را باطل و توکن جدید بسازید.

---

## 🚀 راه‌اندازی سریع

۱. یک پروژه‌ی Apps Script بسازید (script.google.com).
۲. فایل‌های پوشه‌ی `src/` را در پروژه قرار دهید.
۳. در **Project Settings → Script Properties** این کلیدها را وارد کنید:

</div>

```
TELEGRAM_BOT_TOKEN   = توکن جدید بات
CHAT_ID              = @SPO_Assistant
BOSS_CALENDAR_ID     = spogroup.office@gmail.com
RECIPIENT_EMAIL      = a@example.com, b@example.com
BOSS_EMAIL           = boss@example.com
```

<div dir="rtl">

۴. سرویس پیشرفته‌ی **Google Calendar API** را فعال کنید (Services → ＋ → Calendar).
۵. تابع `createDailyTrigger` را یک‌بار اجرا کنید تا تریگر روزانه‌ی ساعت ۷ صبح ساخته شود.
۶. برای مانیتور: **Deploy → New deployment → Web app**.

راهنمای کامل گام‌به‌گام در [`docs/setup.md`](docs/setup.md).

---

## 🔧 آپلود به گیت‌هاب با clasp (پیشنهادی)

از آنجا که این یک پروژه‌ی Apps Script است، بهترین راه همگام‌نگه‌داشتن کد
با گیت، ابزار رسمی `clasp` است:

</div>

```bash
# نصب
npm install -g @google/clasp
clasp login

# اتصال به پروژه‌ی موجود (Script ID را از Project Settings بردارید)
cp .clasp.json.example .clasp.json
#  scriptId را داخل .clasp.json بگذارید

# کشیدن کد فعلی از Apps Script
clasp pull

# یا فرستادن کد محلی به Apps Script
clasp push
```

<div dir="rtl">

### آپلود اولیه به گیت‌هاب

</div>

```bash
git init
git add .
git commit -m "Initial commit: calendar & meeting agent"
git branch -M main
git remote add origin https://github.com/USERNAME/calendar-meeting-agent.git
git push -u origin main
```

<div dir="rtl">

> ⚠️ فایل `.clasp.json` در `.gitignore` قرار دارد و آپلود نمی‌شود (حاوی Script ID خصوصی است).

---

## 📂 ساختار

</div>

```
calendar-meeting-agent/
├── README.md
├── LICENSE
├── .gitignore
├── .clasp.json.example
├── src/
│   ├── appsscript.json      ← manifest (timezone, advanced services, scopes)
│   ├── Config.gs            ← خواندن تنظیمات از Script Properties
│   ├── Helpers.gs           ← توابع مشترک
│   ├── DailySummary.gs      ← گزارش روزانه تلگرام/ایمیل
│   ├── ColorSync.gs         ← همگام‌سازی رنگ تقویم
│   ├── MeetingMonitor.gs    ← بک‌اند مانیتور جلسات
│   └── Index.html           ← داشبورد مانیتور
└── docs/
    └── setup.md
```

<div dir="rtl">

## 📝 مجوز

[MIT](LICENSE)

</div>
