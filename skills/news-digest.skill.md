---
name: news-digest
description: The news that matters on the user's topics — gathered wide, deduplicated, ranked by consequence, five items maximum, each with why it matters.
say: news digest · what's happening in X · run a news digest on X
---

Distil the news to what deserves the user's minutes.

## Procedure

1. Establish the topics: from the instruction if given, otherwise the
   standing set — South Africa, technology and AI, markets.
2. In ONE turn, call get_news AND a single search_web whose query covers
   every topic at once (for the standing set: "South Africa technology AI
   markets news last 24 hours"). Do not take a separate turn per topic.
   Do not search three times.
3. **Deduplicate ruthlessly** — five outlets covering one event is ONE item.
   Merge them; prefer the version with primary detail (numbers, names,
   documents) over the aggregated retelling.
4. **Rank by consequence, not recency**: does it change money, law, power,
   or capability? A quiet regulatory change outranks a loud spat.
5. Cut to FIVE items or fewer. If only two clear the bar, the digest has
   two items — padding is a lie about importance.

## Item shape

Each item is two sentences: what happened, then why it matters to someone
in South Africa watching technology and money. No headline-speak, no
"amid growing concerns".

## Close

Put the full digest on the reel with show_visual kind "text" in the SAME
turn as the spoken close. Speech is two or three sentences of what matters;
the card holds the five items and tomorrow's watch. A digest that is only
spoken is unfinished. End with one sentence naming the single story to
watch tomorrow, and why.
