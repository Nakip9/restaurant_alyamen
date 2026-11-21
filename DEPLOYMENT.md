# Deploy the restaurant website

## Choose the right hosting plan

Vercel Hobby is free for personal, non-commercial projects. A restaurant's live marketing and ordering website is commercial, so plan for Vercel Pro or use a suitable alternative. Do not choose Hobby on the assumption that a low-traffic business site qualifies.

- Vercel's rules: https://vercel.com/docs/plans/hobby
- Cloudflare Pages free static hosting: https://www.cloudflare.com/products/pages/

## Vercel: upload the source ZIP

1. Open https://vercel.com/drop and sign in to your Vercel account.
2. Drag in **alyemen-alsaeed-vercel-ready.zip** (the source package).
3. Choose your team and a project name, such as `alyemen-alsaeed` if available.
4. Vercel should detect **Next.js**. The included `vercel.json` configures installation (`npm ci`), build (`npm run build`), and output (`out`). Node.js is pinned to `24.x` in `package.json`.
5. No API keys or database configuration are required. Keep system environment variables exposed so the production hostname can be detected automatically.
6. Select **Deploy**. When the deployment succeeds, open the exact URL Vercel provides.
7. For automatic future deployments, connect a Git repository to the Vercel project. Otherwise, upload a new version when you change the site.

Official upload guide: https://vercel.com/changelog/vercel-drop

## Vercel: use a Git repository instead

1. Extract the source ZIP.
2. Create a repository in your Git provider and upload the extracted files. `package.json`, `package-lock.json`, `next.config.ts`, and `vercel.json` should be at the repository root.
3. In Vercel, choose **Add New → Project**, then import that repository.
4. Select the directory containing `package.json` as the root. Use the settings in the README.
5. Deploy. Later pushes to the connected production branch will trigger deployment.

Official Git guide: https://vercel.com/docs/git

## Add a custom domain and finish SEO setup

1. Add the domain in the project's **Settings → Domains** and follow Vercel's displayed DNS instructions.
2. Set `SITE_URL` to the exact production origin, e.g. `https://your-real-domain.com`. Include `https://`; do not add a page path, query, or fragment.
3. Redeploy after adding or changing the variable. The pages are static, so metadata updates require a new build.
4. Confirm `/sitemap.xml`, `/robots.txt`, the canonical tag, and social image URLs reference your real public domain.

Without `SITE_URL`, Vercel builds use `VERCEL_PROJECT_PRODUCTION_URL` first and `VERCEL_URL` second. Preview deployments include a noindex directive and disallow crawling in robots. This is an indexing preference, not access control.

## Cloudflare Pages: upload the prebuilt ZIP

This is the no-build alternative for the included static website.

1. Sign in at https://dash.cloudflare.com/.
2. Go to **Workers & Pages**, create a **Pages** project, and choose **Direct Upload / Upload assets**.
3. Upload **alyemen-alsaeed-static-upload.zip**. Its root contains `index.html`, `_next`, and `images`; do not upload the source-code ZIP here.
4. Choose a project name and deploy. Open the `pages.dev` URL Cloudflare gives you.
5. This portable ZIP has no invented domain in canonical tags or sitemap. For complete domain-specific SEO, set `SITE_URL` to your new public URL, rebuild the source, and upload the contents of `out/` as a new deployment.

PowerShell rebuild example (replace the domain):

```powershell
$env:SITE_URL = 'https://your-real-project.pages.dev'
npm ci
npm run build
```

macOS/Linux rebuild example:

```sh
npm ci
SITE_URL=https://your-real-project.pages.dev npm run build
```

Upload `out/`, or ZIP its contents so `index.html` is at the ZIP root. Cloudflare Direct Upload accepts a ZIP or a folder. A Direct Upload project cannot later be switched to Git integration; create a new project if you want Git builds instead.

Official instructions: https://developers.cloudflare.com/pages/get-started/direct-upload/

## Before sharing the restaurant URL

- Confirm the displayed telephone, address, Facebook page, and email.
- Replace illustrative images with actual approved restaurant photos when available.
- Add only confirmed menu choices, prices, and opening hours.
- Try menu search, the photo viewer, copying an order, and the telephone link on your phone.
- Check that the public deployment is accessible to customers. The package does not include a ChatGPT login gate.

## Troubleshooting

- **Missing `package.json`:** choose the extracted project's root, not `src/` or `public/`.
- **Dependency mismatch:** upload the included lockfile and use `npm ci`; do not mix npm, Yarn, and pnpm lockfiles.
- **Node version error:** select Node.js 24.x.
- **Missing assets after upload:** upload all files, including `_next/`; do not open `index.html` directly using `file://`.
- **Wrong canonical domain:** set `SITE_URL` and redeploy. Do not use the previous ChatGPT Site URL.
- **Changes do not appear:** rebuild and upload the new output, or push to your connected Git branch.
- **Orders are not sent automatically:** this is intentional. The site prepares the details; customers call the restaurant to confirm the order.
