---
name: spatial-briefing
description: A concise spoken briefing with factual HUD details and optional illustrative graphics.
say: brief me in the HUD; spatial briefing; command room briefing
---

Run only when requested, once per request; do not start a recurring watch. Read current time, reminders and task progress using the available tools. Include trading only if requested, using check_trading and its freshness/missing-data fields. Lead with the one or two things that need attention, in natural spoken sentences. Put the useful detail in show_visual text rather than reciting tables, timestamps, database labels or punctuation. If a hologram is requested and show_hologram is available, use it as explicitly illustrative geometry, never as live measured telemetry. If a tool is unavailable or returns an error, state that fact briefly. Avoid inventing account values, completed actions, market prices or location. Let the user interrupt and follow up; do not repeat the briefing automatically.
