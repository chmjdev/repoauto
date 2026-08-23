---
name: task-progress-graffiti
description: Generates a small, compact visual showing progress bars and status for running/recent background tasks, and posts it to the HUD.
say: show task progress · graffiti my tasks · what's running · task status graffiti · draw task progress
---

1. Call check_tasks to pull live state of all running and recently finished background tasks.
2. For each task returned, extract: title (truncate to ~20 chars if longer), percent complete (or status word like "done", "queued", "failed" if no percent applies), and a short id/tag if useful.
3. Build a minimal text-block visual — NOT a dashboard. Format each task as a single compact line:
   [title] [progress-bar] [percent%/status]
   Use a simple ASCII/unicode bar of fixed small width (e.g. 10 characters), like:
   ██████░░░░ 60%
   Example line: "Backup     ██████░░░░ 60%"
   Example line: "Email sync ██████████ done"
4. Stack the lines vertically, one per task, with no extra padding, borders, titles, or decoration beyond the lines themselves. Cap the block at a handful of lines (e.g. max 6 tasks shown — if more, show the most recent/active ones and note "+N more" as a final short line).
5. If no tasks are running or recently finished, produce a single short line such as "No active tasks" instead of an empty or elaborate visual.
6. Call show_visual with this compact text block as a simple text/visual element — keep it small, minimal, no large graphics, no charts, no colours beyond basic bar fill characters.
7. Trigger conditions: run this whenever the user asks for task status/progress ("say" triggers), AND automatically whenever a background task transitions to finished/failed state (if such an event hook is available) so the HUD stays current without being asked.
8. Never write, delete, or modify task state itself — this skill only reads via check_tasks and writes only the visual via show_visual. All other actions remain read-only per the standing rules.
