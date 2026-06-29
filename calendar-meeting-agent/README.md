# ⏱️ ChronoDesk

> An executive calendar & meeting agent for the CEO's office — built on Google Apps Script.

**🌐 Language / زبان:** **English** · [فارسی ↓](#-فارسی)

---

ChronoDesk reads the executive calendar, summarizes the day's meetings with AI, pushes them to Telegram and email, keeps event colors in sync, and powers a live in-room meeting monitor with a countdown, guest list, attachments, and an overrun alarm.

## ✨ Features

| Module | File | What it does |
|--------|------|--------------|
| **Daily Briefing** | `src/DailySummary.gs` | Reads today's meetings, summarizes them with AI, and sends the report to Telegram + email every morning |
| **Color Sync** | `src/ColorSync.gs` | Copies event colors and busy status onto the boss's calendar |
| **Meeting Monitor** | `src/MeetingMonitor.gs` + `src/Index.html` | A live war-room dashboard: countdown, progress bar, guest status, online-meeting link, attachment viewer, and an end-of-meeting alarm |

## ⚠️ Security First

This is a **public** repository. **No tokens or emails live in the code.** Every secret is read from **Script Properties** (see `src/Config.gs`).

If your Telegram bot token has ever been exposed, revoke it **right now** in [@BotFather](https://t.me/BotFather) with `/revoke` and generate a fresh one.

## 🚀 Quick Start

1. Create an Apps Script project at [script.google.com](https://script.google.com).
2. Drop in the files from `src/`.
3. Go to **Project Settings → Script Properties** and add:

```
TELEGRAM_BOT_TOKEN   = your fresh bot token
CHAT_ID              = @SPO_Assistant
BOSS_CALENDAR_ID     = spogroup.office@gmail.com
RECIPIENT_EMAIL      = a@example.com, b@example.com
BOSS_EMAIL           = boss@example.com
```

4. Enable the **Google Calendar API** advanced service (Services → ＋ → Calendar).
5. Run `createDailyTrigger` once to schedule the 7 AM daily briefing.
6. For the monitor: **Deploy → New deployment → Web app**.

Full step-by-step guide in [`docs/setup.md`](docs/setup.md).

## 🔧 Sync with `clasp` (recommended)

Since this is an Apps Script project, the official `clasp` CLI keeps your local Git repo and the live project in sync:

```bash
npm install -g @google/clasp
clasp login

cp .clasp.json.example .clasp.json   # then add your Script ID
clasp pull                            # fetch from Apps Script
clasp push                            # send local code up
```

### First push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: ChronoDesk"
git branch -M main
git remote add origin https://github.com/USERNAME/chronodesk.git
git push -u origin main
```

> `.clasp.json` is git-ignored (it holds your private Script ID), so it never gets committed.

## 📂 Structure

```
chronodesk/
├── README.md
├── LICENSE
├── .gitignore
├── .clasp.json.example
├── src/
│   ├── appsscript.json      # manifest: timezone, advanced services, OAuth scopes
│   ├── Config.gs            # reads secrets from Script Properties
│   ├── Helpers.gs           # shared utilities
│   ├── DailySummary.gs      # daily Telegram/email briefing
│   ├── ColorSync.gs         # calendar color sync
│   ├── MeetingMonitor.gs    # meeting-monitor backend
│   └── Index.html           # live monitor dashboard
└── docs/
    └── setup.md
```

## 📝 License

[MIT](LICENSE)

<br>

---

<div dir="rtl">

<a name="-فارسی"></a>

# ⏱️ ChronoDesk — دستیار تقویم و جلسات

> ایجنت مدیریت تقویم و جلسات دفتر مدیرعامل، ساخته‌شده روی **Google Apps Script**.

**🌐 زبان / Language:** **فارسی** · [English ↑](#️-chronodesk)

ChronoDesk تقویم مدیرعامل را می‌خواند، جلسات امروز را با هوش مصنوعی خلاصه می‌کند، آن را به تلگرام و ایمیل می‌فرستد، رنگ رویدادها را همگام نگه می‌دارد، و یک مانیتور زنده‌ی جلسات با شمارش معکوس، لیست مهمان‌ها، فایل‌های پیوست و هشدار پایان جلسه فراهم می‌کند.

## ✨ امکانات

| ماژول | فایل | کار |
|------|------|-----|
| **گزارش روزانه** | `src/DailySummary.gs` | خواندن جلسات امروز، خلاصه‌سازی با هوش مصنوعی و ارسال به تلگرام + ایمیل |
| **همگام‌سازی رنگ** | `src/ColorSync.gs` | کپی رنگ و وضعیت busy رویدادها روی تقویم رییس |
| **مانیتور جلسات** | `src/MeetingMonitor.gs` + `src/Index.html` | داشبورد زنده با شمارش معکوس، مهمان‌ها، لینک و فایل‌های پیوست |

## ⚠️ امنیت — مهم

این مخزن **عمومی (public)** است. هیچ توکن یا ایمیلی نباید داخل کد قرار بگیرد. تمام مقادیر حساس از **Script Properties** خوانده می‌شوند (نگاه کنید به `src/Config.gs`).

اگر قبلاً توکن باتتان جایی لو رفته، همین حالا در [@BotFather](https://t.me/BotFather) با دستور `/revoke` آن را باطل و توکن جدید بسازید.

## 🚀 راه‌اندازی سریع

۱. یک پروژه‌ی Apps Script بسازید ([script.google.com](https://script.google.com)).

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

## 🔧 همگام‌سازی با `clasp` (پیشنهادی)

از آنجا که این یک پروژه‌ی Apps Script است، بهترین راه همگام‌نگه‌داشتن کد محلی و پروژه‌ی زنده، ابزار رسمی `clasp` است:

</div>

```bash
npm install -g @google/clasp
clasp login

cp .clasp.json.example .clasp.json   # سپس Script ID را وارد کنید
clasp pull                            # کشیدن کد از Apps Script
clasp push                            # فرستادن کد محلی به بالا
```

<div dir="rtl">

### آپلود اولیه به گیت‌هاب

</div>

```bash
git init
git add .
git commit -m "Initial commit: ChronoDesk"
git branch -M main
git remote add origin https://github.com/USERNAME/chronodesk.git
git push -u origin main
```

<div dir="rtl">

> ⚠️ فایل `.clasp.json` در `.gitignore` قرار دارد و آپلود نمی‌شود (حاوی Script ID خصوصی است).

## 📂 ساختار

</div>

```
chronodesk/
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
