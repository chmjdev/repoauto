---
name: x-video
description: Get and play the video in an X (Twitter) post from its link, on any face — and keep it in the library when asked. X is a video source by link and by the posts an article embeds; it cannot be searched.
say: play this X video · get the video from this x.com link · watch this post · keep this X video
---

Source a video from X (Twitter).

## Procedure

1. The user hands over an X post link — x.com/<user>/status/<id> or twitter.com/… — and asks to play, watch, show or get it. Call play_video with the link as the query (where "screen", or "full" for full screen). The server reads the post's own mp4 (its author, text and duration come back with it) and it plays on the glass: the viewing bay on the web, a textured plane in the immersive HUD, the native player on the phone. Say one short line — who posted it and what it shows in a phrase — and let the video carry the rest.
2. "Keep it", "save that", "download this one": call save_youtube with the same link (kind "video"). It downloads in the background into the library repo; say it has started, and the result is announced when it lands.
3. A post with no video is answered by the tool as "no video in that post" — say so plainly and offer to open the post instead (open_url). A private or deleted post says "no such post".
4. X cannot be searched without a login. If the user names a story and wants its X video without a link — "the six Nigerians video on X" — say that X needs the link, and offer the nearest thing: the story's clip on the news globe (get_news with the region, tap the story), which comes from an X post the article itself embeds when there is one, or from YouTube otherwise.

## Never

- Never claim a video cannot be played from X: it can, from the link.
- Never describe the video instead of playing it — the user is about to watch it.
