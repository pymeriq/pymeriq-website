import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { localizedPublicRoutes } from "./scripts/site-routes.mjs";

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

// The single source of truth for public routes lives in site-routes.mjs; reuse it
// here instead of re-deriving the route shape so the two can never drift apart.
const knownRoutes = new Set(["/", ...localizedPublicRoutes]);

function isKnownRoute(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return true;
  return knownRoutes.has(`/${parts.join("/")}`);
}

createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  } catch {
    // Malformed percent-encoding (e.g. `/%`) makes decodeURIComponent throw; a
    // synchronous throw here would crash the whole server, so answer 400 instead.
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" });
    response.end("Bad request");
    return;
  }
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
    "X-Content-Type-Options": "nosniff",
  });
  if (file) createReadStream(file).pipe(response);
  else response.end("Not found");
}).listen(port, "127.0.0.1", () => {
  console.log(`Pymeriq website available at http://localhost:${port}`);
});
