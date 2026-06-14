# lambertapps.com

The Lambert Apps marketing + legal website. Static HTML/CSS, no build step.

It is the umbrella site for all Lambert Apps products. Each app lives under its
own path so more can be added later without restructuring:

```
/                 -> redirects to /trot/ (the only app for now)
/trot/            -> Trot landing page
/trot/privacy.html
/trot/terms.html
/trot/support.html
/trot/sitemap.xml
/robots.txt
```

When a second app ships, give it its own `/<app>/` folder and turn the apex
`index.html` into a real Lambert Apps landing page instead of a redirect.

## Deploy

Static, so any static host works. The repo root is the publish root.

- **Netlify** (current setup): connect this repo; `netlify.toml` sets
  `publish = "."`. Custom domain `lambertapps.com` via DNS at the registrar
  (Squarespace).
- **GitHub Pages**: enable Pages on the default branch (root). For the custom
  domain add a `CNAME` file containing `lambertapps.com` and the apex DNS
  records GitHub provides.
- **Cloudflare Pages**: connect the repo, build command empty, output dir `/`.

## Notes

- App Store Connect uses `https://lambertapps.com/trot/privacy.html` (Privacy
  Policy URL) and `https://lambertapps.com/trot/support.html` (Support URL).
- The Trot iOS app links to these exact URLs from its paywall and Settings, so
  keep the `/trot/*.html` paths stable.
- `trot/support.html` is mirrored by the in-app FAQ (`FAQScreen.swift` in the
  Trot app repo); keep the two in sync when either changes.
