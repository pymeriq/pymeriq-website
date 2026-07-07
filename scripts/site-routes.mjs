import { products, tutorials } from "../src/data.js";

export const publicRoutePaths = [
  "",
  "/products",
  ...products.map((product) => `/products/${product.slug}`),
  "/tutorials",
  ...tutorials.map((tutorial) => `/tutorials/${tutorial.slug}`),
  "/about",
  "/contact",
];

export const adminRoutePaths = [
  "/admin",
  "/admin/products",
  "/admin/tutorials",
  "/admin/contacts",
  "/admin/company",
];

export const localizedPublicRoutes = ["en", "es"].flatMap((locale) =>
  publicRoutePaths.map((path) => `/${locale}${path}`),
);
