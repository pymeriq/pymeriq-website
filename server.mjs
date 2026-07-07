import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { products, tutorials } from "./src/data.js";

const root = resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const productSlugs = new Set(products.map((product) => product.slug));
const tutorialSlugs = new Set(tutorials.map((tutorial) => tutorial.slug));
const publicSections = new Set(["products", "tutorials", "about", "contact"]);

function isKnownRoute(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return true;
  if (parts[0] === "admin") return false;
  if (!["en", "es"].includes(parts[0])) return false;
  if (parts.length === 1) return true;
  if (parts.length === 2) return publicSections.has(parts[1]);
  if (parts.length !== 3) return false;
  if (parts[1] === "products") return productSlugs.has(parts[2]);
  if (parts[1] === "tutorials") return tutorialSlugs.has(parts[2]);
  return false;
}

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const candidate = resolve(root, `.${pathname}`);
  const withinRoot = candidate === root || candidate.startsWith(`${root}${sep}`);
  const routeIndex = join(candidate, "index.html");
  const requested = withinRoot && existsSync(candidate) && statSync(candidate).isFile()
    ? candidate
    : withinRoot && existsSync(routeIndex) && statSync(routeIndex).isFile()
      ? routeIndex
      : null;
  const hasFile = Boolean(requested);
  const isAssetRequest = Boolean(extname(pathname)) || pathname.startsWith("/src/");
  const knownRoute = isKnownRoute(pathname);
  const status = hasFile || knownRoute ? 200 : 404;
  const file = hasFile ? requested : isAssetRequest ? null : join(root, "index.html");

  response.writeHead(status, {
    "Content-Type": file ? types[extname(file)] || "application/octet-stream" : "text/plain; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  if (file) createReadStream(file).pipe(response);
  else response.end("Not found");
}).listen(port, "127.0.0.1", () => {
  console.log(`Pymeriq website available at http://localhost:${port}`);
});
