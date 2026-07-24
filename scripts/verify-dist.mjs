import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { productAssetDirectory, products, routeMetadata, siteSettings, tutorials } from "../src/data.js";
import { adminRoutePaths, publicRoutePaths } from "./site-routes.mjs";
import { escapeAttribute } from "./shared.mjs";

const failures = [];

async function readRequired(path) {
  try {
    const file = await stat(path);
    if (!file.isFile()) throw new Error("not a file");
    return await readFile(path, "utf8");
  } catch {
    failures.push(`Missing required file: ${path}`);
    return "";
  }
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findDirtyFiles(directory) {
  const dirty = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.name === ".DS_Store" || entry.name === "__MACOSX" || entry.name.endsWith(".icloud") || entry.name.includes(" 2.")) dirty.push(path);
    if (entry.isDirectory()) dirty.push(...await findDirtyFiles(path));
  }
  return dirty;
}

function metadataFor(locale, path) {
  const product = path.startsWith("/products/") ? products.find((item) => path.endsWith(`/${item.slug}`)) : null;
  const tutorial = path.startsWith("/tutorials/") ? tutorials.find((item) => path.endsWith(`/${item.slug}`)) : null;
  if (product) return { title: `${product.name} | Pymeriq`, description: product[locale].summary, type: "website" };
  if (tutorial) return { title: `${tutorial[locale].title} | Pymeriq`, description: tutorial[locale].excerpt, type: "article" };
  return { ...routeMetadata[locale][path === "" ? "home" : path.slice(1)], type: "website" };
}

for (const locale of ["en", "es"]) {
  for (const path of publicRoutePaths) {
    const route = `/${locale}${path}`;
    const html = await readRequired(join("dist", locale, path, "index.html"));
    const metadata = metadataFor(locale, path);
    const canonical = `${siteSettings.canonicalOrigin}${route}`;
    const socialImage = `${siteSettings.canonicalOrigin}/src/assets/brand/pymeriq-og.jpg`;

    expect(html.includes(`<html lang="${locale}">`), `${route}: incorrect html lang`);
    expect(html.includes(`<title>${metadata.title}</title>`), `${route}: incorrect title`);
    expect(html.includes(`name="description" content="${escapeAttribute(metadata.description)}"`), `${route}: incorrect description`);
    expect(html.includes(`rel="canonical" href="${canonical}"`), `${route}: incorrect canonical`);
    expect(html.includes(`hreflang="en" href="${siteSettings.canonicalOrigin}/en${path}"`), `${route}: missing English alternate`);
    expect(html.includes(`hreflang="es" href="${siteSettings.canonicalOrigin}/es${path}"`), `${route}: missing Spanish alternate`);
    expect(html.includes(`property="og:title" content="${escapeAttribute(metadata.title)}"`), `${route}: incorrect Open Graph title`);
    expect(html.includes(`property="og:description" content="${escapeAttribute(metadata.description)}"`), `${route}: incorrect Open Graph description`);
    expect(html.includes(`property="og:url" content="${canonical}"`), `${route}: incorrect Open Graph URL`);
    expect(html.includes(`property="og:type" content="${metadata.type}"`), `${route}: incorrect Open Graph type`);
    expect(html.includes(`property="og:image" content="${socialImage}"`), `${route}: incorrect Open Graph image`);
    expect(html.includes('property="og:image:width" content="1200"'), `${route}: incorrect Open Graph image width`);
    expect(html.includes('property="og:image:height" content="630"'), `${route}: incorrect Open Graph image height`);
    expect(html.includes('name="twitter:card" content="summary_large_image"'), `${route}: incorrect Twitter card type`);
    expect(html.includes(`name="twitter:image" content="${socialImage}"`), `${route}: incorrect Twitter image`);
    expect(html.includes('<meta name="robots" content="index, follow" />'), `${route}: public route must be indexable`);
    expect(html.includes("<main>"), `${route}: missing prerendered public content`);
    expect(!html.includes("Pymeriq public website shell."), `${route}: contains generic shell metadata`);
    expect(!html.includes('href="/admin'), `${route}: exposes an admin link`);
    expect(!html.includes("Foundation mode") && !html.includes("Local prototype"), `${route}: exposes prototype admin content`);
    expect(!html.includes("/src/assets/pymeriq-logo.png") && !html.includes("/src/assets/pymeriq-mark.png"), `${route}: contains a retired corporate asset path`);
    if (path === "") {
      for (const product of products.slice(0, 3)) expect(html.includes(`/src/assets/products/${productAssetDirectory(product)}/icon.svg`), `${route}: missing featured product icon for ${product.name}`);
    }
    if (path === "/products") {
      for (const product of products) expect(html.includes(`/src/assets/products/${productAssetDirectory(product)}/icon.svg`), `${route}: missing product icon for ${product.name}`);
    }
    const product = path.startsWith("/products/") ? products.find((item) => path.endsWith(`/${item.slug}`)) : null;
    if (product) expect(html.includes(`/src/assets/products/${productAssetDirectory(product)}/logo.svg`), `${route}: missing product logo for ${product.name}`);
  }
}

for (const path of adminRoutePaths) {
  try {
    await stat(join("dist", path, "index.html"));
    failures.push(`${path}: admin shell must not exist in production dist`);
  } catch {
    // Admin routes are intentionally excluded from the production build.
  }
}

const shell = await readRequired("dist/index.html");
const notFound = await readRequired("dist/404.html");
for (const [name, html] of [["root shell", shell], ["404 shell", notFound]]) {
  expect(html.includes('<meta name="robots" content="noindex, nofollow" />'), `${name}: must be noindex`);
  expect(html.includes('<div id="app"></div>'), `${name}: should remain client-rendered`);
  expect(!html.includes('<meta name="robots" content="index, follow" />'), `${name}: must not become indexable statically`);
  expect(!html.includes('rel="canonical"'), `${name}: must not declare a conflicting canonical`);
}

const dirtyFiles = await findDirtyFiles("dist");
expect(dirtyFiles.length === 0, `dist/: dirty files found: ${dirtyFiles.join(", ")}`);

const publicApp = await readRequired("dist/src/app.js");
const publicData = await readRequired("dist/src/data.js");
expect(!publicApp.includes("/src/assets/pymeriq-logo.png") && !publicApp.includes("/src/assets/pymeriq-mark.png"), "public app: contains a retired corporate asset path");
for (const [name, file] of [["public app", publicApp], ["public data", publicData]]) {
  for (const privateText of ["Foundation mode", "Local prototype", "Solveniq", "Foundation / prototype", "previousBrandName", "brandTransition"]) {
    expect(!file.includes(privateText), `${name}: exposes internal text "${privateText}"`);
  }
}
await readRequired("dist/src/styles.css");
for (const asset of ["pymeriq-logo.svg", "pymeriq-mark.svg", "pymeriq-og.jpg", "favicon.ico", "favicon-32.png", "favicon-48.png", "apple-touch-icon.png"]) {
  await readRequired(`dist/src/assets/brand/${asset}`);
}
for (const directory of ["storefront", "warehouse", "ap", "pf", "codes", "expiry-alerts", "learn-it"]) {
  await readRequired(`dist/src/assets/products/${directory}/icon.svg`);
  await readRequired(`dist/src/assets/products/${directory}/logo.svg`);
}

const robots = await readRequired("dist/robots.txt");
expect(robots.includes("User-agent: *"), "robots.txt: missing user-agent");
expect(robots.includes("Allow: /"), "robots.txt: missing allow rule");
expect(robots.includes(`Sitemap: ${siteSettings.canonicalOrigin}/sitemap.xml`), "robots.txt: incorrect sitemap URL");

const sitemap = await readRequired("dist/sitemap.xml");
const expectedUrls = ["en", "es"].flatMap((locale) => publicRoutePaths.map((path) => `${siteSettings.canonicalOrigin}/${locale}${path}`));
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
expect(sitemapUrls.length === expectedUrls.length, `sitemap.xml: expected ${expectedUrls.length} URLs, found ${sitemapUrls.length}`);
expect(new Set(sitemapUrls).size === sitemapUrls.length, "sitemap.xml: contains duplicate URLs");
for (const url of expectedUrls) expect(sitemapUrls.includes(url), `sitemap.xml: missing ${url}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified clean dist/: ${expectedUrls.length} public routes, no admin shells, metadata, robots.txt, and sitemap.xml.`);
}
