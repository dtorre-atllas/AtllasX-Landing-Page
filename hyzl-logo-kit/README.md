# hyzl logo kit

Colors: ink `#16181D` · green `#2FAB5D`

## Files
- `hyzl-logo.svg` — primary horizontal logo (light backgrounds)
- `hyzl-logo-white.svg` — for dark backgrounds
- `hyzl-logo-mono-black.svg` / `hyzl-logo-mono-white.svg` — one-color versions
- `hyzl-logo-stacked.svg` / `hyzl-logo-stacked-white.svg` — vertical lockup
- `hyzl-icon.svg` / `hyzl-icon-white.svg` — icon mark only
- `favicon.svg`, `favicon.ico`, `favicon-16/32/48.png` — browser tab icons
- `apple-touch-icon.png` — iOS home screen (180×180)
- `android-chrome-192/512.png`, `maskable-icon-512x512.png` — PWA icons
- `site.webmanifest` — web app manifest
- PNG exports of the logo at 1200w / 2400w for email, social, docs

## Add to your site's <head>
```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#16181D">
```

## Logo on the site
```html
<img src="/hyzl-logo.svg" alt="hyzl" height="36">
```
SVGs scale to any size. Use `hyzl-logo-white.svg` on dark sections/footers.
