# Hero background video

Put your hero background video in this folder named exactly:

    hero.mp4

The homepage hero (`src/app/App.tsx`) loads it from `/hero.mp4`.

## Requirements
- Format: **MP4 (H.264 + AAC)**. If your file is a `.mov`, convert it to `.mp4` first — most browsers (Chrome, Firefox) will not autoplay `.mov`.
- The video is muted, autoplaying, and looping (browser autoplay requires muted).
- Keep it short and seamless (a 6–12s loop is ideal) and compressed (aim for < ~8 MB) so the page stays fast.
- Recommended: 1920×1080 or wider, dark/moody footage so the white headline stays readable. A dark overlay is already applied on top.

Until `hero.mp4` is present, the hero shows a dark cinematic fallback (no broken state).
