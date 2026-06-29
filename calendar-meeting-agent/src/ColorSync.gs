/**
 * ColorSync.gs
 * -------------------------------------------------------------
 * همگام‌سازی رنگ رویدادهای تقویم دستیار با تقویم رییس.
 * رویدادهایی که رییس در آن‌ها دعوت شده، رنگ و وضعیت busy آن‌ها
 * روی تقویم رییس کپی می‌شود.
 *
 * نیاز: سرویس پیشرفته‌ی Calendar باید فعال باشد.
 *   ویرایشگر Apps Script → Services (＋) → Google Calendar API
 * -------------------------------------------------------------
 */

function syncAssistantEventColorToBoss() {
  const cfg = getConfig_();
  const ASSISTANT_CALENDAR = cfg.BOSS_CALENDAR_ID; // تقویم دفتر/دستیار
  const BOSS_EMAIL = cfg.BOSS_EMAIL;

  const timeMin = new Date().toISOString();
  const timeMax = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const events = Calendar.Events.list(ASSISTANT_CALENDAR, {
    timeMin: timeMin,
    timeMax: timeMax,
    singleEvents: true,
    orderBy: 'startTime'
  }).items || [];

  events.forEach(event => {
    if (!event.attendees || !event.colorId) return;

    const bossInvited = event.attendees.some(a => a.email === BOSS_EMAIL);
    if (!bossInvited) return;

    const bossEvents = Calendar.Events.list(BOSS_EMAIL, {
      iCalUID: event.iCalUID
    }).items || [];

    if (bossEvents.length === 0) return;

    const bossEvent = bossEvents[0];

    Calendar.Events.patch(
      {
        colorId: event.colorId,
        transparency: 'opaque' // توپر = Busy
      },
      BOSS_EMAIL,
      bossEvent.id
    );
  });
}
