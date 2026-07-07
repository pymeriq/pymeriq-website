# Pymeriq corporate website

Dependency-free bilingual public website and client-rendered CMS foundation for the Pymeriq brand.

## Requirements

- Node.js 18 or newer
- No package dependencies

## Run locally

Start the source-site development server:

```bash
npm run dev
```

The website runs at `http://localhost:4173`.

## Production build and preview

Create the deployable static output:

```bash
npm run build
```

Preview the generated production files:

```bash
npm run preview
```

Deploy the contents of `dist/` as the static-host publish directory.

## Deployment configuration

Public deployment settings are centralized in `siteSettings` inside `src/data.js`:

```js
export const siteSettings = {
  contactEmail: "hello@pymeriq.com",
  canonicalOrigin: "https://pymeriq.com",
  websiteStatus: "Foundation / prototype",
};
```

Update `canonicalOrigin` before building when the production domain changes. It controls canonical URLs, Open Graph URLs, `hreflang` alternates, `robots.txt`, and `sitemap.xml`.

`contactEmail` controls the public fallback contact address. These values are public configuration, not secrets. No deployment-provider-specific configuration or secret values are required.

## Founder-review preview on Cloudflare Pages

The generated `dist/` folder is ready for a temporary Cloudflare Pages preview:

- Cloudflare Pages accepts a prebuilt folder through Direct Upload.
- The generated directory `index.html` files support the site's clean public and admin URLs.
- The top-level `404.html` preserves the intended missing-route behavior instead of enabling Cloudflare Pages' default SPA fallback.
- Cloudflare Pages preview deployments receive an `X-Robots-Tag: noindex` response header by default.

This deployment is for founder review only. **Do not attach `pymeriq.com`, change its DNS records, or point the production domain to Cloudflare Pages until the founder records an explicit launch approval in `FOUNDER_REVIEW.md`.**

### Recommended preview-only workflow

Use a separate Direct Upload project, such as `pymeriq-founder-review`, and do not attach a custom domain. A Direct Upload project cannot later be converted to Git integration, which makes a separate disposable review project the safer choice.

1. Run the full local checks and create a fresh build:

   ```bash
   npm run check
   ```

2. In Cloudflare, open **Workers & Pages**.
3. Select **Create application > Get started > Drag and drop your files**.
4. Create a separate preview-only project such as `pymeriq-founder-review`.
5. Upload the generated `dist/` folder.
6. After the project exists, create a new deployment and choose the **Preview** environment with a branch name such as `founder-review`.
7. Share only the resulting `founder-review.<project>.pages.dev` or unique hash-based preview URL.
8. Confirm the preview response blocks indexing:

   ```bash
   curl -I https://founder-review.<project>.pages.dev
   ```

   Confirm the response contains `x-robots-tag: noindex`.

Preview deployment URLs are public by default. For a private founder review, enable a Cloudflare Access policy from the Pages project's **Settings > General** before sharing the link.

Wrangler can also create an explicit preview deployment without adding it as a project dependency:

```bash
npx wrangler pages deploy dist --project-name pymeriq-founder-review --branch=founder-review
```

Cloudflare Pages references:

- [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Serving Pages and 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)

## Generated `dist/` structure

The production build emits:

```text
dist/
├── en/.../index.html       # Prerendered English public routes
├── es/.../index.html       # Prerendered Spanish public routes
├── src/                    # Browser JavaScript, sanitized public data, and CSS
├── index.html              # Generic client-rendered noindex shell
├── 404.html                # Client-rendered noindex 404 shell
├── robots.txt
└── sitemap.xml
```

All public `/en` and `/es` routes are prerendered with localized page content and route-specific metadata. This includes product and tutorial detail routes.

Admin prototype routes are excluded from the production build and must return HTTP 404. The generic root and `404.html` are client-rendered noindex shells. The root redirects client-side to the saved supported locale; unknown routes resolve to the public-safe noindex 404 state.

On macOS, the build protects the generated `dist/` folder from Finder and sync-process metadata after cleanup. The next build removes that protection automatically before regenerating the folder.

## Static hosting requirements

The generated output is provider-neutral and uses directory-index clean URLs such as:

```text
/en/products/storefront -> dist/en/products/storefront/index.html
```

Configure the static host to:

- Publish `dist/`.
- Serve each directory's `index.html` for clean URLs.
- Serve `dist/404.html` for missing paths while preserving the HTTP 404 status.
- Avoid a blanket rewrite of every unknown URL to `index.html` with HTTP 200.

Do not add rewrites for `/admin` routes. If a host does not support directory indexes, configure exact rewrites for localized public paths only.

The included local production server follows the same important behavior: known routes return 200, while unknown routes, extra path segments, and missing assets return 404.

## Routes

Public routes support both `/en/...` and `/es/...` locale prefixes:

- `/en` and `/es`
- `/en/products` and `/es/products`
- `/en/products/:slug` and `/es/products/:slug`
- `/en/tutorials` and `/es/tutorials`
- `/en/tutorials/:slug` and `/es/tutorials/:slug`
- `/en/about` and `/es/about`
- `/en/contact` and `/es/contact`

CMS prototype routes are retained only as internal source references and are excluded from production `dist/`:

- `/admin`
- `/admin/products`
- `/admin/tutorials`
- `/admin/contacts`
- `/admin/company`

## Quality checks

Run the full dependency-free production verification:

```bash
npm run check
```

Individual checks are also available:

```bash
npm run check:syntax
npm run build
npm run verify:dist
npm run verify:server
```

- `verify:dist` checks route files, localized static metadata, noindex shells, assets, `robots.txt`, and `sitemap.xml`.
- `verify:server` checks known-route 200 responses and strict 404 responses for unknown routes, extra segments, and missing assets.

## Current limitations

- No backend or database persistence.
- The public contact form does not send or store messages; visitors must use the fallback email address.
- CMS editing controls are disabled and admin content is seeded locally.
- Authentication is not connected.
- Analytics is not connected.
- Payments are not connected.

## Founder review checklist

Complete this checklist against the temporary Cloudflare Pages preview URL. Record detailed notes and the final decision in `FOUNDER_REVIEW.md`.

- [ ] **Home page message:** clearly presents Pymeriq as the practical parent ecosystem brand.
- [ ] **Product descriptions:** every description is accurate and appropriately concise.
- [ ] **Product statuses:** every status accurately reflects its current state.
- [ ] **Tutorials:** feel practical, useful, and aligned with the ecosystem.
- [ ] **About page:** accurately explains Pymeriq, its meaning, and the Solveniq transition.
- [ ] **Contact page:** copy, fallback email, and non-functional form disclosure are clear.
- [ ] **English version:** pages read naturally and consistently.
- [ ] **Spanish version:** pages read naturally and consistently.
- [ ] **Mobile iPhone view:** layouts, readability, and interactions are reviewed.
- [ ] **Desktop view:** layouts, readability, and visual balance are reviewed.
- [ ] **Navigation:** header, footer, language switching, and internal links work correctly.
- [ ] **CTA buttons:** use the right wording and lead to the intended routes.
- [ ] **404 page:** unknown routes display the intended page and return HTTP 404.
- [ ] **SEO preview/social metadata basics:** page titles, descriptions, canonical URLs, language alternates, and Open Graph metadata are reviewed.
- [ ] Preview response includes `x-robots-tag: noindex`.
- [ ] No custom domain or production DNS record is attached to the preview project.

## Final production checklist

- [ ] Founder review is complete and `FOUNDER_REVIEW.md` contains an explicit approval to launch.
- [ ] Confirm the production domain and update `siteSettings.canonicalOrigin`.
- [ ] Confirm the public fallback email in `siteSettings.contactEmail`.
- [ ] Run `npm run check` against the final production configuration.
- [ ] Review localized titles, descriptions, canonical URLs, `hreflang`, and Open Graph metadata.
- [ ] Confirm `dist/sitemap.xml` contains every public EN/ES route.
- [ ] Confirm `dist/robots.txt` points to the production sitemap.
- [ ] Confirm the contact page clearly shows the working fallback email.
- [ ] Review public pages at 320px, 390px, 768px, and desktop widths.
- [ ] Complete an accessibility review for headings, labels, keyboard focus, states, and contrast.
- [ ] Confirm the deploy target publishes `dist/`, supports directory indexes, and preserves 404 status.
- [ ] Run a post-deploy smoke test for public routes, admin routes, metadata, language switching, missing assets, and unknown-route 404 behavior.
