import { spawn } from "node:child_process";
import { productAssetDirectory, products } from "../src/data.js";
import { adminRoutePaths, localizedPublicRoutes } from "./site-routes.mjs";

const port = Number(process.env.VERIFY_PORT || 4174);
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["server.mjs", "dist", String(port)], { stdio: "ignore" });
const failures = [];
const productAssets = products
  .flatMap((product) => ["icon.svg", "logo.svg"].map((filename) => `/src/assets/products/${productAssetDirectory(product)}/${filename}`));

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${origin}/en`);
      if (response.status === 200) return;
    } catch {
      // The preview server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Preview server did not start at ${origin}`);
}

async function expectStatus(path, expected) {
  const response = await fetch(`${origin}${path}`);
  if (response.status !== expected) failures.push(`${path}: expected ${expected}, received ${response.status}`);
  return response;
}

// Admin routes must return 404 from the preview server. The 404 body is the
// generic client shell (which by construction never contains admin content), so
// stripping of admin content is asserted by verify-dist.mjs against dist/, not here.
async function expectBlockedAdmin(path) {
  await expectStatus(path, 404);
}

try {
  await waitForServer();
  for (const path of ["/", ...localizedPublicRoutes, "/robots.txt", "/sitemap.xml", "/src/app.js", "/src/styles.css", "/src/assets/brand/pymeriq-logo.svg", "/src/assets/brand/pymeriq-mark.svg", "/src/assets/brand/pymeriq-og.jpg", "/src/assets/brand/favicon.ico", "/src/assets/brand/apple-touch-icon.png", ...productAssets]) {
    await expectStatus(path, 200);
  }
  for (const path of adminRoutePaths) {
    await expectBlockedAdmin(path);
  }
  for (const path of ["/unknown", "/en/unknown", "/es/products/storefront/extra", "/admin/unknown", "/admin/products/extra", "/missing.js", "/src/missing.js", "/src/assets/pymeriq-logo.png", "/src/assets/pymeriq-mark.png"]) {
    await expectStatus(path, 404);
  }
} finally {
  server.kill("SIGTERM");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified preview server: ${localizedPublicRoutes.length} public routes, blocked admin routes, and strict 404 behavior.`);
}
