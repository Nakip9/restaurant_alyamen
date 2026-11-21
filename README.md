# Al Yemen Al Saeed — deployment-ready website

Arabic RTL restaurant website for **مطعم اليمن السعيد**, Ramadi, Iraq. Built with Next.js App Router, React, TypeScript, Tailwind CSS, and Motion. Exports to static HTML, CSS, JavaScript, images, and locally bundled Arabic fonts.

## Start here

**Vercel:** upload this source ZIP at [Vercel Drop](https://vercel.com/drop), or extract it and import a Git repository. Vercel builds the project using the included `vercel.json`. See [DEPLOYMENT.md](DEPLOYMENT.md) for full instructions.

**Free hosting for the restaurant:** the separate `alyemen-alsaeed-static-upload.zip` is prebuilt for Cloudflare Pages Direct Upload. No Node.js installation or build step is required for that ZIP.

**Hosting plan note:** Vercel Hobby is for personal, non-commercial projects. A live restaurant business website requires a commercial Vercel plan; this package does not bypass that restriction. Cloudflare Pages is an alternative with a free static hosting plan, subject to its terms and limits. See [Vercel Hobby](https://vercel.com/docs/plans/hobby) and [Cloudflare Pages](https://www.cloudflare.com/products/pages/).

Arabic project notes: [README.ar.md](README.ar.md).

## Included

- Full editable source, exact dependency versions, and npm lockfile.
- Vercel configuration, Node.js 24 version pin, and example environment settings.
- Arabic RTL layouts, mobile navigation, reduced-motion support, and accessible native dialogs.
- Searchable menu, empty results state, photo lightbox, and order preparation with clipboard copy and telephone confirmation.
- Optimized WebP images, self-hosted Tajawal fonts, Arabic 404 page, and restaurant structured data.
- Automatic production-domain detection for canonical URLs, social sharing images, sitemap, and robots.
- No database, paid API keys, payment gateway, or serverless functions needed.

## Local setup

Install Node.js **24.x**, extract the ZIP, and open a terminal in the folder containing `package.json`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

To build and preview production files:

```sh
npm test
npm run build
npm run preview
```

Open http://localhost:3001. `npm start` also starts this static preview. `next start` is not used because the site is exported to `out/`.

## Deployment settings

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Node.js | 24.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `out` |
| Root directory | Folder containing `package.json` |
| Required secrets | None |
| Optional environment variable | `SITE_URL=https://your-real-domain.com` |

Vercel's production hostname is detected automatically at build time. If you connect a custom domain, set `SITE_URL` to that domain and redeploy. Do not enter the example domain literally. System environment variables must be exposed to the build, as they are by default on Vercel.

When building outside Vercel with no public URL configured, the site intentionally omits absolute canonical/social-image URLs and sitemap entries instead of pointing visitors or search engines at an old host. The page itself still works. Set `SITE_URL` and rebuild after your domain is known for complete SEO metadata.

## Edit the restaurant

| File | Purpose |
| --- | --- |
| `src/data/restaurant.ts` | Business details, navigation, menu, gallery, and headline copy |
| `src/app/page.tsx` | Main page and interactive components |
| `src/app/globals.css` | Colors, typography, spacing, layouts, and animations |
| `src/app/layout.tsx` | Page metadata and restaurant structured data |
| `src/lib/site-url.ts` | Build-time domain detection |
| `public/images/` | Optimized website images |
| `assets/` | Original generated image and generation prompt |

The original restaurant data is preserved. The only confirmed dish is mandi; prices, opening hours, WhatsApp ordering, and an official logo have not been verified. The imagery is AI-generated and explicitly marked illustrative. Replace it with approved restaurant photographs when available. The map searches the supplied address rather than claiming a verified map pin. Orders are completed by telephone, not automatically sent from the site.

## Verification

`npm test` checks custom-domain precedence, deployment URL fallbacks, missing-domain behavior, and invalid configuration. `npm run build` performs TypeScript checking and generates the production export.

The visual design and interactive flows were previously checked at widths 360, 390, 768, 1024, and 1440 pixels. This deployment package retains that design. A local build verifies the files; your account's Vercel deployment will still need to finish successfully after upload.

## Package hygiene

The source ZIP excludes `node_modules`, `.next`, build output, Git metadata, credentials, and the previous hosting provider's project binding. Install dependencies with `npm ci`. Keep `package-lock.json`; do not upload only `src/` or `public/` to Vercel.
