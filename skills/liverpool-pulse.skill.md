---
name: liverpool-pulse
description: Fetches Liverpool FC upcoming fixtures, latest match results, and news bites, displaying a structured card on the reel and speaking a concise summary.
say: how's Liverpool doing · Liverpool fixtures · Liverpool FC · Liverpool news
---

1. Call search_web with query "Liverpool FC upcoming fixtures next match recent results latest news".
2. Parse the upcoming fixture (opponent, date, competition, venue), recent match scores, and top 2-3 news headlines.
3. Put the fixtures and news card on the reel using show_visual with kind "text", title "Liverpool FC — Fixtures & News".
4. Speak a two-sentence summary highlighting the next match and the key headline.
