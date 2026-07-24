import {
  categories,
  companyContent,
  content,
  productAssetDirectory,
  products,
  publicContent,
  routeMetadata,
  siteSettings,
  tutorials,
} from "./data.js";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const app = isBrowser ? document.querySelector("#app") : null;
const supportedLocales = companyContent.supportedLocales;

function normalizeLocale(value) {
  return supportedLocales.includes(value) ? value : companyContent.defaultLocale;
}

let locale = normalizeLocale(isBrowser ? localStorage.getItem("pymeriq-locale") : companyContent.defaultLocale);

const iconPaths = {
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5H6.5A2.5 2.5 0 0 0 4 7.5z"/><path d="M4 7.5v12M8 9h8"/>',
  boxes: '<path d="m21 8-9 5-9-5 9-5 9 5Z"/><path d="m3 8 9 5v9l-9-5V8Zm18 0-9 5v9l9-5V8Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  qr: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 14h3v3h-3zM19 14h2v2M14 19h2v2M19 19h2v2"/>',
  receipt: '<path d="M6 2v20l3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2Z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  store: '<path d="M3 9 5 3h14l2 6"/><path d="M5 13v8h14v-8M9 21v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',
};

function icon(name, size = 20) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.arrow}</svg>`;
}

function localizedPath(path = "/") {
  return `/${locale}${path === "/" ? "" : path}`;
}

function pathParts() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (supportedLocales.includes(parts[0])) {
    locale = parts.shift();
    localStorage.setItem("pymeriq-locale", locale);
    return { hasLocale: true, parts };
  }
  return { hasLocale: false, parts };
}

function logo(light = false) {
  return `<a class="logo ${light ? "logo-light" : ""}" href="${localizedPath("/")}">
    <img src="/src/assets/brand/pymeriq-logo.svg" alt="Pymeriq" width="310" height="100">
  </a>`;
}

function localizedVisualText(value) {
  if (typeof value === "string") return value;
  return value?.[locale] || "";
}

function productVisualImage(visual, loading = "lazy") {
  if (!visual?.src) return "";
  return `<img src="${visual.src}" alt="${localizedVisualText(visual.alt)}" loading="${loading}">`;
}

function productAssetPath(product, filename) {
  return `/src/assets/products/${productAssetDirectory(product)}/${filename}.svg`;
}

function productIconAsset(product, featured) {
  const size = featured ? 30 : 24;
  return `<img class="product-icon-image product-icon-${productAssetDirectory(product)}" src="${productAssetPath(product, "icon")}" alt="" width="${size}" height="${size}" loading="lazy" decoding="async" data-product-asset>
    <span class="product-asset-fallback" hidden>${icon(product.icon, featured ? 28 : 22)}</span>`;
}

function productLogoAsset(product) {
  return `<div class="product-logo-panel" aria-hidden="true">
    <img class="product-logo-image" src="${productAssetPath(product, "logo")}" alt="" width="420" height="88" decoding="async" data-product-asset>
    <span class="product-logo-fallback" hidden>${icon(product.icon, 64)}</span>
  </div>`;
}

function publicHeader(active) {
  const t = content[locale];
  return `<header class="site-header">
    <div class="shell header-inner">
      ${logo()}
      <button class="mobile-menu" aria-label="${t.accessibility.menuOpen}" aria-expanded="false" aria-controls="public-navigation">${icon("menu", 22)}</button>
      <nav class="public-nav" id="public-navigation" aria-label="${t.accessibility.navigation}">
        ${["products", "tutorials", "about", "contact"].map((item) => `<a class="${active === item ? "active" : ""}" ${active === item ? 'aria-current="page"' : ""} href="${localizedPath(`/${item}`)}">${t.nav[item]}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <button class="locale-toggle" aria-label="${t.accessibility.switchLanguage}" data-locale="${locale === "en" ? "es" : "en"}">${locale === "en" ? "ES" : "EN"}</button>
        <a class="button button-small button-dark" href="${localizedPath("/contact")}">${t.actions.contact} ${icon("arrow", 16)}</a>
      </div>
    </div>
  </header>`;
}

function footer() {
  const t = content[locale];
  const copy = publicContent[locale].footer;
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        ${logo(true)}
        <p>${copy.description}</p>
      </div>
      <div class="footer-links">
        <strong>${copy.explore}</strong>
        <a href="${localizedPath("/products")}">${t.nav.products}</a>
        <a href="${localizedPath("/tutorials")}">${t.nav.tutorials}</a>
        <a href="${localizedPath("/about")}">${t.nav.about}</a>
      </div>
      <div class="footer-links">
        <strong>${copy.connect}</strong>
        <a href="${localizedPath("/contact")}">${t.nav.contact}</a>
      </div>
      <div class="footer-note">
        <span>PYME</span><span>Research</span><span>IQ</span>
      </div>
    </div>
    <div class="shell footer-bottom"><span>© ${companyContent.brandName}</span></div>
  </footer>`;
}

function productCard(product, featured = false) {
  const t = content[locale];
  const copy = product[locale];
  const category = categories[product.category];
  const cardVisual = productVisualImage(product.visuals?.card);
  return `<article class="product-card ${featured ? "featured" : ""} ${cardVisual ? "has-visual" : ""}" data-category="${product.category}">
    ${cardVisual ? `<div class="product-card-visual">${cardVisual}</div>` : ""}
    <div class="card-top">
      <span class="icon-tile ${category.color}" aria-hidden="true">${productIconAsset(product, featured)}</span>
      <span class="status">${t.status[product.status]}</span>
    </div>
    <div>
      <p class="eyebrow ${category.color}-text">${category[locale]}</p>
      <h3>${product.name}</h3>
      <p>${copy.summary}</p>
      <p class="card-value"><strong>${publicContent[locale].productDetail.valueLabel}</strong>${copy.outcomes[0]}</p>
    </div>
    <a class="text-link" href="${localizedPath(`/products/${product.slug}`)}">${t.actions.learn} ${icon("arrow", 16)}</a>
  </article>`;
}

function tutorialCard(tutorial) {
  const copy = tutorial[locale];
  const pageCopy = publicContent[locale].tutorials;
  return `<article class="tutorial-card">
    <div class="tutorial-meta"><span>${pageCopy.categoryLabels[tutorial.category]}</span><span>${tutorial.minutes} ${pageCopy.minutesLabel}</span></div>
    <h3>${copy.title}</h3>
    <p>${copy.excerpt}</p>
    <a class="text-link" href="${localizedPath(`/tutorials/${tutorial.slug}`)}">${content[locale].actions.read} ${icon("arrow", 16)}</a>
  </article>`;
}

function pageFrame(active, body) {
  return `${publicHeader(active)}<main>${body}</main>${footer()}`;
}

function homePage() {
  const t = content[locale];
  const copy = publicContent[locale].home;
  return pageFrame("", `
    <section class="hero">
      <div class="hero-orb orb-one"></div><div class="hero-orb orb-two"></div>
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow cyan-text">${copy.kicker}</p>
          <h1>${copy.title}</h1>
          <p class="hero-lede">${copy.lede}</p>
          <div class="button-row">
            <a class="button button-primary" href="${localizedPath("/contact")}">${copy.ctas.contact} ${icon("arrow", 18)}</a>
            <a class="button button-ghost" href="${localizedPath("/products")}">${copy.ctas.products}</a>
            <a class="hero-contact-link" href="${localizedPath("/tutorials")}">${copy.ctas.tutorials} ${icon("arrow", 16)}</a>
          </div>
        </div>
        <div class="ecosystem-visual" aria-label="${t.accessibility.ecosystem}">
          <svg class="orb-svg" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="sphereFill" cx="42%" cy="38%" r="70%">
                <stop offset="0%" stop-color="#2b6fd6" stop-opacity="0.55"/>
                <stop offset="55%" stop-color="#0d357f" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#04195C" stop-opacity="0.15"/>
              </radialGradient>
              <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#1a6ee8" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#1a6ee8" stop-opacity="0"/>
              </radialGradient>
              <linearGradient id="ringB" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4f8ef0"/><stop offset="100%" stop-color="#1a6ee8"/></linearGradient>
              <linearGradient id="ringF" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00b4d8"/><stop offset="100%" stop-color="#1a6ee8"/></linearGradient>
              <linearGradient id="ringL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#63c95f"/><stop offset="100%" stop-color="#3fa93b"/></linearGradient>
            </defs>
            <circle class="sphere-glow" cx="200" cy="200" r="120" fill="url(#sphereGlow)"/>
            <g class="ring ring-l" color="#3fa93b">
              <ellipse cx="200" cy="200" rx="168" ry="150" fill="none" stroke="url(#ringL)" stroke-width="1.4" stroke-opacity="0.55"/>
              <g class="node-orbit node-l"><circle class="dot" cx="200" cy="50" r="7" fill="#3fa93b"/></g>
            </g>
            <g class="ring ring-f" color="#00b4d8">
              <ellipse cx="200" cy="200" rx="132" ry="152" fill="none" stroke="url(#ringF)" stroke-width="1.4" stroke-opacity="0.55"/>
              <g class="node-orbit node-f"><circle class="dot" cx="200" cy="48" r="7" fill="#00b4d8"/></g>
            </g>
            <g class="ring ring-b" color="#1a6ee8">
              <ellipse cx="200" cy="200" rx="150" ry="128" fill="none" stroke="url(#ringB)" stroke-width="1.4" stroke-opacity="0.6"/>
              <g class="node-orbit node-b"><circle class="dot" cx="200" cy="72" r="8" fill="#1a6ee8"/></g>
            </g>
            <circle class="sphere" cx="200" cy="200" r="86" fill="url(#sphereFill)" stroke="rgba(120,170,255,0.35)" stroke-width="1"/>
            <circle class="sphere" cx="200" cy="200" r="86" fill="none" stroke="rgba(0,180,216,0.25)" stroke-width="1"/>
            <g class="sphere">
              <image href="/src/assets/brand/pymeriq-mark.svg" x="150" y="158" width="100" height="84" preserveAspectRatio="xMidYMid meet"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="shell">
        <div class="section-heading"><div><p class="eyebrow blue-text">${copy.categoriesKicker}</p><h2>${copy.categoriesTitle}</h2></div><p>${copy.categoriesText}</p></div>
        <div class="category-grid">
          ${Object.entries(categories).map(([key, category]) => {
            const categoryIcon = { business: "store", financial: "chart", learning: "book" }[key];
            const categoryPath = key === "learning" ? "/tutorials" : "/products";
            return `<a class="category-card" href="${localizedPath(categoryPath)}"><span class="icon-tile ${category.color}">${icon(categoryIcon, 24)}</span><h3>${category[locale]}</h3><p>${category.description[locale]}</p><span class="text-link">${key === "learning" ? t.actions.allTutorials : t.actions.allProducts} ${icon("arrow", 16)}</span></a>`;
          }).join("")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="shell">
        <div class="section-heading"><div><p class="eyebrow blue-text">${copy.featuredKicker}</p><h2>${copy.featuredTitle}</h2></div><p>${copy.featuredText}</p></div>
        <div class="featured-grid">${products.slice(0, 3).map((product) => productCard(product, true)).join("")}</div>
        <div class="center-action"><a class="button button-outline" href="${localizedPath("/products")}">${t.actions.allProducts} ${icon("arrow", 17)}</a></div>
      </div>
    </section>
    <section class="section section-navy">
      <div class="shell principle-grid">
        <div><p class="eyebrow cyan-text">${copy.whyKicker}</p><h2>${copy.whyTitle}</h2><p>${copy.whyText}</p></div>
        <div class="principles">
          ${copy.whyPoints.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="shell">
        <div class="section-heading compact"><div><p class="eyebrow green-text">${copy.learningKicker}</p><h2>${copy.learningTitle}</h2><p class="section-intro">${copy.learningText}</p></div><div class="learning-links"><a class="button button-primary" href="https://learn.pymeriq.com" target="_blank" rel="noopener">${t.actions.visit} ${icon("arrow", 17)}</a><a class="text-link" href="${localizedPath("/tutorials")}">${t.actions.allTutorials} ${icon("arrow", 16)}</a></div></div>
        <div class="tutorial-grid">${tutorials.map(tutorialCard).join("")}</div>
      </div>
    </section>
    ${ctaBlock()}
  `);
}

function pageHero(kicker, title, text) {
  return `<section class="page-hero"><div class="shell narrow"><p class="eyebrow cyan-text">${kicker}</p><h1>${title}</h1><p>${text}</p></div></section>`;
}

function productsPage() {
  const copy = publicContent[locale].products;
  return pageFrame("products", `
    ${pageHero(copy.kicker, copy.title, copy.text)}
    <section class="section"><div class="shell">
      <h2 class="sr-only">${copy.gridTitle}</h2>
      <div class="filter-row">${Object.entries(categories).map(([key, item]) => `<button class="filter-chip" data-filter="${key}" aria-pressed="false"><i class="${item.color}"></i>${item[locale]}</button>`).join("")}<button class="filter-chip active" data-filter="all" aria-pressed="true">${copy.all}</button></div>
      <div class="product-grid">${products.map((product) => productCard(product)).join("")}</div>
    </div></section>
    ${ctaBlock()}
  `);
}

function productDetailPage(slug) {
  const product = products.find((item) => item.slug === slug);
  if (!product) return notFoundPage();
  const copy = product[locale];
  const pageCopy = publicContent[locale].productDetail;
  const category = categories[product.category];
  const relatedProducts = product.related.map((relatedSlug) => products.find((item) => item.slug === relatedSlug)).filter(Boolean);
  const detailVisual = productVisualImage(product.visuals?.detail, "eager");
  const featureVisuals = product.visuals?.features?.filter((visual) => visual?.src) || [];
  return pageFrame("products", `
    <section class="detail-hero">
      <div class="shell detail-hero-grid">
        <div><a class="back-link" href="${localizedPath("/products")}">← ${content[locale].actions.back} ${content[locale].nav.products}</a><p class="eyebrow ${category.color}-text">${category[locale]}</p><h1>${product.name}</h1><p class="hero-lede">${copy.summary}</p><span class="status status-large">${content[locale].status[product.status]}</span>${product.website ? `<div class="detail-cta"><a class="button button-primary" href="${product.website}" target="_blank" rel="noopener">${content[locale].actions.visit} ${icon("arrow", 17)}</a></div>` : ""}</div>
        <div class="product-detail-visual ${category.color} ${detailVisual ? "has-image" : ""}">${detailVisual || `${productLogoAsset(product)}<div class="detail-lines"><i></i><i></i><i></i></div>`}</div>
      </div>
    </section>
    <section class="section"><div class="shell detail-content">
      <div><p class="eyebrow blue-text">${pageCopy.purpose}</p><h2>${pageCopy.purposeTitle}</h2></div>
      <div><p class="large-copy">${copy.description}</p><div class="audience-block"><span>${pageCopy.audience}</span><p>${copy.audience}</p></div><h3>${pageCopy.capabilities}</h3><ul class="outcome-list">${copy.outcomes.map((item) => `<li>${icon("check", 18)}${item}</li>`).join("")}</ul><div class="availability-note"><strong>${pageCopy.expectationTitle}: ${content[locale].status[product.status]}</strong><p>${pageCopy.expectations[product.status]}</p></div></div>
    </div></section>
    ${featureVisuals.length ? `<section class="section product-visuals-section"><div class="shell"><div class="section-heading"><div><p class="eyebrow blue-text">${pageCopy.visuals}</p><h2>${pageCopy.visualsTitle}</h2></div></div><div class="product-visual-grid">${featureVisuals.map((visual) => `<figure>${productVisualImage(visual)}${localizedVisualText(visual.title) || localizedVisualText(visual.caption) ? `<figcaption>${localizedVisualText(visual.title) ? `<strong>${localizedVisualText(visual.title)}</strong>` : ""}${localizedVisualText(visual.caption) ? `<span>${localizedVisualText(visual.caption)}</span>` : ""}</figcaption>` : ""}</figure>`).join("")}</div></div></section>` : ""}
    <section class="section section-soft"><div class="shell"><div class="section-heading compact"><div><p class="eyebrow blue-text">${pageCopy.related}</p><h2>${pageCopy.relatedTitle}</h2></div><a class="text-link" href="${localizedPath("/products")}">${content[locale].actions.allProducts} ${icon("arrow", 16)}</a></div><div class="product-grid related-grid">${relatedProducts.map((item) => productCard(item)).join("")}</div></div></section>
    ${ctaBlock()}
  `);
}

function tutorialsPage() {
  const copy = publicContent[locale].tutorials;
  return pageFrame("tutorials", `
    ${pageHero(copy.kicker, copy.title, copy.text)}
    <section class="learning-principle"><div class="shell"><span>${icon("book", 22)}</span><p>${copy.principle}</p></div></section>
    <section class="section"><div class="shell"><h2 class="sr-only">${copy.gridTitle}</h2><div class="tutorial-grid tutorial-grid-large">${tutorials.map(tutorialCard).join("")}</div></div></section>
    ${ctaBlock()}
  `);
}

function tutorialDetailPage(slug) {
  const tutorial = tutorials.find((item) => item.slug === slug);
  if (!tutorial) return notFoundPage();
  const copy = tutorial[locale];
  const pageCopy = publicContent[locale].tutorials;
  return pageFrame("tutorials", `
    <article>
      <header class="article-hero"><div class="shell article-narrow"><a class="back-link" href="${localizedPath("/tutorials")}">← ${content[locale].actions.back} ${content[locale].nav.tutorials}</a><p class="eyebrow green-text">${categories[tutorial.category][locale]} · ${tutorial.minutes} ${pageCopy.minutesLabel}</p><h1>${copy.title}</h1><p>${copy.intro}</p></div></header>
      <div class="shell article-layout"><aside><span>${pageCopy.inThisGuide}</span>${copy.sections.map(([title], index) => `<a href="#section-${index}">${String(index + 1).padStart(2, "0")} ${title}</a>`).join("")}</aside><div class="article-body"><div class="guide-outcome"><span>${pageCopy.outcome}</span><p>${copy.outcome}</p></div>${copy.sections.map(([title, body], index) => `<section id="section-${index}"><span>0${index + 1}</span><h2>${title}</h2><p>${body}</p></section>`).join("")}<div class="article-callout"><strong>${pageCopy.calloutTitle}</strong><p>${pageCopy.calloutText}</p></div></div></div>
    </article>
    ${ctaBlock()}
  `);
}

function aboutPage() {
  const copy = publicContent[locale].about;
  return pageFrame("about", `
    ${pageHero(copy.kicker, copy.title, copy.text)}
    <section class="section"><div class="shell name-grid"><div><p class="eyebrow blue-text">${copy.nameKicker}</p><h2>${copy.nameTitle}</h2></div><div class="name-parts"><article><strong>PYME</strong><p>${copy.nameParts.pyme}</p></article><article><strong>R</strong><p>${copy.nameParts.research}</p></article><article><strong>IQ</strong><p>${copy.nameParts.iq}</p></article></div></div></section>
    <section class="section section-navy"><div class="shell operator-grid"><div><p class="eyebrow cyan-text">${copy.operatorKicker}</p><h2>${copy.operatorTitle}</h2></div><div><p class="operator-copy">${copy.operatorText}</p><div class="operator-flow">${copy.operatorFlow.map((item, index) => `${index ? "<i>→</i>" : ""}<span>${item}</span>`).join("")}</div></div></div></section>
    <section class="section section-soft"><div class="shell story-grid"><div class="story-mark" aria-hidden="true"><img src="/src/assets/brand/pymeriq-mark.svg" alt="" width="120" height="100"></div><div><p class="eyebrow green-text">${copy.evolutionKicker}</p><h2>${copy.evolutionTitle}</h2><p class="large-copy">${copy.evolutionText}</p></div></div></section>
    ${ctaBlock()}
  `);
}

function contactPage() {
  const copy = publicContent[locale].contact;
  return pageFrame("contact", `
    <section class="contact-section"><div class="shell narrow">
      <p class="eyebrow cyan-text">${copy.kicker}</p><h1>${copy.title}</h1><p class="hero-lede">${copy.text}</p>
      <div class="contact-card">
        <strong>${copy.emailTitle}</strong>
        <p>${copy.emailText}</p>
        <a class="button button-primary" href="mailto:${siteSettings.contactEmail}">${siteSettings.contactEmail} ${icon("arrow", 18)}</a>
        <p class="contact-note">${copy.emailNote}</p>
      </div>
    </div></section>
  `);
}

function ctaBlock() {
  const copy = publicContent[locale].cta;
  return `<section class="cta-section"><div class="shell cta-inner"><div><p class="eyebrow cyan-text">${copy.kicker}</p><h2>${copy.title}</h2></div><a class="button button-light" href="${localizedPath("/contact")}">${content[locale].actions.contact} ${icon("arrow", 18)}</a></div></section>`;
}

function notFoundPage() {
  const copy = publicContent[locale].notFound;
  return pageFrame("", `<section class="not-found"><div><span>404</span><h1>${copy.title}</h1><a class="button button-primary" href="${localizedPath("/")}">${copy.action}</a></div></section>`);
}

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [, key, selectorValue] = selector.match(/\[(name|property)="([^"]+)"\]/);
    element.setAttribute(key, selectorValue);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function updateMetadata(metadata, routePath = "", type = "website", isAdmin = false) {
  document.title = metadata.title;
  setMeta('meta[name="description"]', "content", metadata.description);
  setMeta('meta[name="robots"]', "content", isAdmin || metadata === routeMetadata[locale].notFound ? "noindex, nofollow" : "index, follow");
  setMeta('meta[property="og:title"]', "content", metadata.title);
  setMeta('meta[property="og:description"]', "content", metadata.description);
  setMeta('meta[property="og:type"]', "content", type);

  document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"]').forEach((element) => element.remove());
  if (!isAdmin && metadata !== routeMetadata[locale].notFound) {
    const canonicalPath = `/${locale}${routePath}`;
    const socialImage = `${siteSettings.canonicalOrigin}/src/assets/brand/pymeriq-og.jpg`;
    setMeta('meta[property="og:url"]', "content", `${siteSettings.canonicalOrigin}${canonicalPath}`);
    setMeta('meta[property="og:image"]', "content", socialImage);
    setMeta('meta[property="og:image:width"]', "content", "1200");
    setMeta('meta[property="og:image:height"]', "content", "630");
    setMeta('meta[property="og:image:alt"]', "content", "Pymeriq");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:image"]', "content", socialImage);
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${siteSettings.canonicalOrigin}${canonicalPath}`;
    document.head.appendChild(canonical);
    ["en", "es"].forEach((language) => {
      const alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = language;
      alternate.href = `${siteSettings.canonicalOrigin}/${language}${routePath}`;
      document.head.appendChild(alternate);
    });
  } else {
    document.head.querySelector('meta[property="og:url"]')?.remove();
    document.head.querySelectorAll('meta[property^="og:image"], meta[name="twitter:card"], meta[name="twitter:image"]').forEach((element) => element.remove());
  }
}

// Single source of truth for resolving a locale-scoped public path to a rendered
// view. `locale` must already be set before calling. Returns null for any path
// that is not a known public route (unknown section, missing slug, admin, etc.).
function resolvePublicView(parts) {
  const [first, second] = parts;

  if (parts.length === 0) {
    return { view: homePage(), metadata: routeMetadata[locale].home, routePath: "", type: "website" };
  }
  if (parts.length === 1 && first === "products") {
    return { view: productsPage(), metadata: routeMetadata[locale].products, routePath: "/products", type: "website" };
  }
  if (parts.length === 2 && first === "products") {
    const product = products.find((item) => item.slug === second);
    if (!product) return null;
    return { view: productDetailPage(second), metadata: { title: `${product.name} | Pymeriq`, description: product[locale].summary }, routePath: `/products/${second}`, type: "website" };
  }
  if (parts.length === 1 && first === "tutorials") {
    return { view: tutorialsPage(), metadata: routeMetadata[locale].tutorials, routePath: "/tutorials", type: "website" };
  }
  if (parts.length === 2 && first === "tutorials") {
    const tutorial = tutorials.find((item) => item.slug === second);
    if (!tutorial) return null;
    return { view: tutorialDetailPage(second), metadata: { title: `${tutorial[locale].title} | Pymeriq`, description: tutorial[locale].excerpt }, routePath: `/tutorials/${second}`, type: "article" };
  }
  if (parts.length === 1 && first === "about") {
    return { view: aboutPage(), metadata: routeMetadata[locale].about, routePath: "/about", type: "website" };
  }
  if (parts.length === 1 && first === "contact") {
    return { view: contactPage(), metadata: routeMetadata[locale].contact, routePath: "/contact", type: "website" };
  }
  return null;
}

export function renderStaticPublicRoute(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const routeLocale = parts.shift();
  if (!supportedLocales.includes(routeLocale)) return null;

  locale = routeLocale;
  const resolved = resolvePublicView(parts);
  if (!resolved) return null;
  return { body: resolved.view, locale, metadata: resolved.metadata, routePath: resolved.routePath, type: resolved.type };
}

function render(view, metadata, routePath, type) {
  app.innerHTML = view;
  updateMetadata(metadata, routePath, type);
  bindEvents();
  window.scrollTo(0, 0);
}

function route() {
  const { hasLocale, parts } = pathParts();

  if (!hasLocale && parts.length === 0) {
    window.location.replace(`/${normalizeLocale(locale)}`);
    return;
  }

  if (!hasLocale && parts[0] === "admin") {
    locale = "en";
    document.documentElement.lang = "en";
    render(notFoundPage(), routeMetadata.en.notFound, window.location.pathname, "website");
    return;
  }

  document.documentElement.lang = locale;
  const resolved = hasLocale ? resolvePublicView(parts) : null;
  if (resolved) {
    render(resolved.view, resolved.metadata, resolved.routePath, resolved.type);
  } else {
    render(notFoundPage(), routeMetadata[locale].notFound, window.location.pathname, "website");
  }
}

function bindEvents() {
  document.querySelectorAll("[data-product-asset]").forEach((image) => {
    const showFallback = () => {
      image.hidden = true;
      if (image.nextElementSibling) image.nextElementSibling.hidden = false;
    };
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) showFallback();
  });

  document.querySelectorAll("a[href^='/']").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      history.pushState({}, "", link.getAttribute("href"));
      route();
    });
  });

  document.querySelector(".locale-toggle")?.addEventListener("click", (event) => {
    const next = event.currentTarget.dataset.locale;
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (supportedLocales.includes(parts[0])) parts.shift();
    locale = next;
    localStorage.setItem("pymeriq-locale", locale);
    history.pushState({}, "", `/${locale}${parts.length ? `/${parts.join("/")}` : ""}`);
    route();
  });

  document.querySelector(".mobile-menu")?.addEventListener("click", () => {
    const nav = document.querySelector(".public-nav");
    const isOpen = nav?.classList.toggle("open");
    const menu = document.querySelector(".mobile-menu");
    menu?.setAttribute("aria-expanded", String(Boolean(isOpen)));
    menu?.setAttribute("aria-label", isOpen ? content[locale].accessibility.menuClose : content[locale].accessibility.menuOpen);
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      document.querySelectorAll(".product-card").forEach((card) => {
        card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      });
    });
  });

  const orb = document.querySelector(".ecosystem-visual");
  if (orb) {
    const rings = orb.querySelectorAll(".ring");
    rings.forEach((ring) => {
      ring.addEventListener("mouseenter", () => {
        rings.forEach((item) => item.classList.remove("is-hot"));
        ring.classList.add("is-hot");
      });
    });
    orb.addEventListener("mouseleave", () => {
      rings.forEach((item) => item.classList.remove("is-hot"));
    });
  }

}

if (isBrowser) {
  window.addEventListener("popstate", route);
  route();
}
