---
name: draw-cross
description: Draw and render a visual cross or plus diagram — clean ASCII/Unicode art, geometric diagrams, or visual cards on screen.
say: draw a cross · draw a plus · sketch a cross · visual cross diagram
---

Render a clean, perfectly proportioned cross or plus symbol for the user — on screen via `show_visual` (for the HUD card) and in text for the reel.

## Procedure

1. **Determine the Cross Style** — inspect the request for specific style cues:
   - *Standard Latin / Christian Cross*: taller vertical stem with horizontal crossbeam in upper third.
   - *Greek / Plus Cross (+)*: equal arm lengths horizontally and vertically.
   - *Box-drawn / Outline Cross*: framed using Unicode box-drawing characters (`┌─┐`, `│ │`, `└─┘`).
   - *Bold / Block Cross*: rendered with filled block characters (`█`, `▓`, `░`).
   - *Minimal / Clean*: rendered with standard characters (`+`, `|`, `-`).

2. **Construct the Visual Diagram**:
   - For a Standard Latin Cross:
     ```
            ████
            ████
        ████████████
        ████████████
            ████
            ████
            ████
            ████
            ████
     ```
   - For an Outline Box Cross:
     ```
            ┌────┐
            │    │
       ┌────┘    └────┐
       │              │
       └────┐    ┌────┘
            │    │
            │    │
            │    │
            └────┘
     ```
   - For an Equal Plus Cross (+):
     ```
            ┌──┐
            │  │
         ┌──┘  └──┐
         │        │
         └──┐  ┌──┘
            │  │
            └──┘
     ```

3. **Display on HUD**:
   - Call `show_visual` with kind `"text"`, title `"CROSS DIAGRAM"`, and `body` containing the rendered cross diagram formatted cleanly in a monospace block.

4. **Spoken Response**:
   - Speak a concise, butler-toned confirmation in the same turn (e.g., *"Here is the cross diagram, sir."* or *"Drawn and presented on your screen, sir."*).

## Quality Bar

- Symmetrical, aligned, and proportioned.
- Never leave the user with an empty screen — always pair `show_visual` with a short spoken line in the same turn.
