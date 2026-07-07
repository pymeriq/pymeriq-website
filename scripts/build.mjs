import { execFile } from "node:child_process";
import { access, chmod, cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { promisify } from "node:util";
import { renderStaticPublicRoute } from "../src/app.js";
import {
  categories,
  companyContent,
  content,
  products,
  publicContent,
  routeMetadata,
  siteSettings,
  tutorials,
} from "../src/data.js";
import { publicRoutePaths } from "./site-routes.mjs";
import { escapeAttribute } from "./shared.mjs";

const execFileAsync = promisify(execFile);

async function removeDirtyFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.name === ".DS_Store" || entry.name === "__MACOSX" || entry.name.endsWith(".icloud") || entry.name.includes(" 2.")) {
      await rm(path, { recursive: entry.isDirectory(), force: true });
    } else if (entry.isDirectory()) {
      await removeDirtyFiles(path);
    }
  }
}

async function setDirectoryMode(directory, mode) {
  try {
    await chmod(directory, mode);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) await setDirectoryMode(`${directory}/${entry.name}`, mode);
  }
}

async function setMacDistFlag(flag) {
  if (process.platform !== "darwin") return;
  try {
    await access("dist");
  } catch {
    return;
  }
  await execFileAsync("chflags", ["-R", flag, "dist"]);
}

await setMacDistFlag("nouchg");
await setDirectoryMode("dist", 0o755);
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("src", "dist/src", {
  recursive: true,
  filter: (source) => ![".DS_Store", "__MACOSX"].includes(basename(source)) && !basename(source).endsWith(".icloud") && !basename(source).includes(" 2."),
});
const publicData = {
  categories,
  products,
  tutorials,
  content: Object.fromEntries(Object.entries(content).map(([locale, localeContent]) => [
    locale,
    { ...localeContent, nav: Object.fromEntries(Object.entries(localeContent.nav).filter(([key]) => key !== "admin")) },
  ])),
  publicContent,
  companyContent: {
    brandName: companyContent.brandName,
    defaultLocale: companyContent.defaultLocale,
    supportedLocales: companyContent.supportedLocales,
  },
  siteSettings: {
    contactEmail: siteSettings.contactEmail,
    canonicalOrigin: siteSettings.canonicalOrigin,
  },
  routeMetadata,
};
await writeFile("dist/src/data.js", Object.entries(publicData).map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`).join("\n\n"));
const template = await readFile("index.html", "utf8");

const urls = ["en", "es"].flatMap((locale) => publicRoutePaths.map((path) => `${siteSettings.canonicalOrigin}/${locale}${path}`));

for (const locale of ["en", "es"]) {
  for (const path of publicRoutePaths) {
    const rendered = renderStaticPublicRoute(`/${locale}${path}`);
    const canonical = `${siteSettings.canonicalOrigin}/${locale}${path}`;
    const socialImage = `${siteSettings.canonicalOrigin}/src/assets/brand/pymeriq-og.jpg`;
    const metadata = `<meta property="og:title" content="${escapeAttribute(rendered.metadata.title)}" />
    <meta property="og:description" content="${escapeAttribute(rendered.metadata.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="${rendered.type}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Pymeriq" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${socialImage}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${siteSettings.canonicalOrigin}/en${path}" />
    <link rel="alternate" hreflang="es" href="${siteSettings.canonicalOrigin}/es${path}" />`;
    // Replacement values come from content data, so pass them through function
    // replacers: a string replacement would interpret `$$`, `$&`, `` $` ``, `$'`
    // as special patterns and silently corrupt any content containing `$`.
    const html = template
      .replace('<html lang="en">', `<html lang="${locale}">`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, () => `<meta name="description" content="${escapeAttribute(rendered.metadata.description)}" />`)
      .replace('<meta name="robots" content="noindex, nofollow" />', '<meta name="robots" content="index, follow" />')
      .replace("<!-- route-metadata -->", () => metadata)
      .replace(/<title>[^<]*<\/title>/, () => `<title>${rendered.metadata.title}</title>`)
      .replace('<div id="app"></div>', () => `<div id="app">${rendered.body}</div>`);
    const directory = `dist/${locale}${path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  }
}

await writeFile("dist/404.html", template);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;

await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteSettings.canonicalOrigin}/sitemap.xml\n`);
await writeFile("dist/sitemap.xml", sitemap);
await removeDirtyFiles("dist");
await setDirectoryMode("dist", 0o555);
await setMacDistFlag("uchg");

console.log("Built static website in dist/");
