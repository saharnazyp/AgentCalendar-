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
CHAT_ID              = @yourChanell
BOSS_CALENDAR_ID     = name@co-mail.com
RECIPIENT_EMAIL      = a@example.com, b@example.com
BOSS_EMAIL           = boss@example.com
```

4. Enable the **Google Calendar API** advanced service (Services → ＋ → Calendar).
5. Run `createDailyTrigger` once to schedule the 7 AM daily briefing.
6. For the monitor: **Deploy → New deployment → Web app**.

Full step-by-step guide in [`docs/setup.md`](docs/setup.md).

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
