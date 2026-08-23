# AUTO Skill Spec — v1

A **skill** is a procedure AUTO knows how to perform: a written playbook it
follows step by step, using its own tools, to produce a finished piece of
work. Instruments show; skills *do*.

> "Auto, what are your skills?" · "Run the morning briefing." ·
> "Use the research skill on the Rand." · "Do an inbox check in the background."

Skills live in this folder, one file each, and load straight from the repo —
edit, push, and the new procedure is live on the next pull. The default set
below ships with AUTO; change them freely, they are yours.

---

## The contract

One skill = one markdown file in this folder, named:

```
<name>.skill.md           e.g.  morning-briefing.skill.md
```

- lower-case letters, digits, dashes only in the name
- 64 KB maximum — a skill is instructions, not a database
- the file starts with a frontmatter block, then the procedure:

```markdown
---
name: morning-briefing
description: One composed brief — weather, overnight mail, reminders, money, headlines.
say: brief me · morning briefing
---

The procedure, written to AUTO. Steps, quality bar, output shape.
```

- `name` — how the skill is addressed. Must match the filename.
- `description` — one line; this is what AUTO reads when listing skills and
  deciding which one fits a request.
- `say` — example phrases, dot-separated, shown in listings.

## How skills run and are built

- **In conversation** — AUTO reads the skill and follows it live, narrating
  as it goes.
- **In the background** — the task engine loads the skill into the job's
  instructions and works it server-side; AUTO reports when it is done.
- **Building skills with AUTO** — ask AUTO to research and author a new skill
  live or in the background ("Auto, research and build a skill to draw a cross",
  "build a skill for mortgage calculation"). AUTO designs the playbook, writes the
  `<name>.skill.md` file, and commits & pushes it directly into this repository.

Skills command only the tools AUTO already has, and they inherit the HARD
RULE: background work is read-only (save_media and build_skill into this repo are the
permitted writes). A skill cannot grant new powers — it is choreography,
not capability.

---

## Default Skills

- `morning-briefing.skill.md` — Weather, mail, reminders, money, headlines.
- `inbox-check.skill.md` — Mail check and prioritization.
- `market-pulse.skill.md` — Financial and market indicators.
- `research-dossier.skill.md` — Deep dive research on any subject.
- `draw-cross.skill.md` — Geometric visual cross rendering and diagrams.
- `news-digest.skill.md` — Synthesized global and local news.
- `week-ahead.skill.md` — 7-day outlook and obligations.
- `evening-review.skill.md` — End-of-day summary.
- `standing-watch.skill.md` — Server-side condition monitoring.
