/* ================== THEME.JS ================== */

const THEMES = {
  light: { primary: "#226D68", bg: "#ECF8F6", text: "#18534F" },
  dark: { primary: "#FE277E", bg: "#0B162C", text: "#ffffff" },
  blue: { primary: "#0b5cff", bg: "#e0f0ff", text: "#111111" },
  emerald: { primary: "#226D68", bg: "#ECF8F6", text: "#18534F" },
  pink: { primary: "#FF679D", bg: "#FFF0F6", text: "#1C2942" },
  ocean: { primary: "#137C8B", bg: "#EAF8FF", text: "#0B162C" },
  sunset: { primary: "#F5DF4D", bg: "#FFF6E9", text: "#1C2942" },
};

/* ================== Générer palette ================== */
function generatePalette(primary, bg, text) {
  return {
    bg,
    cardBg: "#ffffff",
    text,
    primary,
    headerBg: primary,
    headerText: "#ffffff",
    titleColor: text,
    descColor: "#666",
    price: primary,
    priceOld: "#999",
    promoBg: primary,
    promoText: "#fff",
    buttonBg: primary,
    buttonText: "#fff",
    whatsappColor: "#25d366",
    callColor: primary,
    categoryActiveBg: primary,
    categoryActiveText: "#fff",
    categoryInactiveBg: "#ffffff",
    categoryInactiveText: text,
    searchBg: "#ffffff",
    searchText: text,
    arrowBg: primary,
    arrowText: "#fff",
    backBtnBg: primary,
    backBtnText: "#fff",
  };
}

/* ================== Appliquer le thème ================== */
function applyTheme(customTheme = null) {
  const settings = JSON.parse(localStorage.getItem("siteSettings") || "{}");

  // Si une carte flottante est utilisée, priorité aux couleurs custom
  let primary, bg, text;
  if (customTheme) {
    primary = customTheme.primary;
    bg = customTheme.bg;
    text = customTheme.text;
  } else if (settings.customTheme) {
    primary = settings.customTheme.primary;
    bg = settings.customTheme.bg;
    text = settings.customTheme.text;
  } else {
    // fallback vers light
    const base = THEMES[settings.activeTheme || "light"];
    primary = base.primary;
    bg = base.bg;
    text = base.text;
  }

  const theme = generatePalette(primary, bg, text);
  const root = document.documentElement;

  // Appliquer toutes les variables CSS
  Object.entries(theme).forEach(([k, v]) => {
    root.style.setProperty(`--${k}`, v);
  });

  // ===== index.html / site global =====
  document.body.style.background = theme.bg;
  document.body.style.color = theme.text;

  document.querySelectorAll("button").forEach((btn) => {
    btn.style.background = theme.buttonBg;
    btn.style.color = theme.buttonText;
  });

  document.querySelectorAll(".theme-card").forEach((card) => {
    card.style.borderColor = theme.primary;
  });

  document.querySelectorAll("h1, h2, h3").forEach((title) => {
    title.style.color = theme.text;
  });

  document.querySelectorAll(".cat-btn.active").forEach((c) => {
    c.style.background = theme.categoryActiveBg;
    c.style.color = theme.categoryActiveText;
  });
  document.querySelectorAll(".cat-btn:not(.active)").forEach((c) => {
    c.style.background = theme.categoryInactiveBg;
    c.style.color = theme.categoryInactiveText;
  });

  document
    .querySelectorAll(".price b")
    .forEach((p) => (p.style.color = theme.price));
  document
    .querySelectorAll(".price s")
    .forEach((p) => (p.style.color = theme.priceOld));

  document.querySelectorAll(".meta button").forEach((btn) => {
    btn.style.background = theme.primary;
    btn.style.color = theme.buttonText;
  });

  const promoSlider = document.getElementById("promoSlider");
  if (promoSlider) {
    promoSlider.style.background = theme.primary;
    promoSlider.style.color = theme.headerText;
  }

  const header = document.querySelector("header, #mainHeader");
  if (header) {
    if (
      !header.style.backgroundImage ||
      header.style.backgroundImage === "none"
    ) {
      header.style.background = theme.headerBg;
    }
    const h1 = header.querySelector("h1, .header-text");
    if (h1 && h1.style.display !== "none")
      h1.style.color = settings.headerTextColor || theme.headerText;
  }

  document
    .querySelectorAll(".card")
    .forEach((c) => (c.style.background = theme.cardBg));
  const titleEl = document.getElementById("name");
  if (titleEl) titleEl.style.color = theme.titleColor;
  const descEl = document.getElementById("desc");
  if (descEl) descEl.style.color = theme.descColor;

  document.querySelectorAll(".promo-tag").forEach((p) => {
    p.style.background = theme.promoBg;
    p.style.color = theme.promoText;
  });

  const whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) whatsappBtn.style.background = theme.whatsappColor;

  const callBtn = document.getElementById("callBtn");
  if (callBtn) callBtn.style.background = theme.callColor;

  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.style.background = theme.backBtnBg;
    backBtn.style.color = theme.backBtnText;
  }

  document.querySelectorAll(".arrow").forEach((a) => {
    a.style.background = theme.arrowBg;
    a.style.color = theme.arrowText;
  });
}

/* ================== Changer le thème dynamiquement ================== */
function setTheme(themeKey) {
  localStorage.setItem(
    "siteSettings",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("siteSettings") || "{}"),
      activeTheme: themeKey,
    }),
  );
  applyTheme(THEMES[themeKey]);
}

/* ================== Appliquer automatiquement au chargement ================== */
document.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("siteSettings") || "{}");
  if (settings.customTheme) {
    applyTheme(settings.customTheme);
  } else if (settings.activeTheme) {
    applyTheme(THEMES[settings.activeTheme]);
  } else {
    applyTheme(THEMES.light);
  }
});
