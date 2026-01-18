import { _ as attr_class, $ as attr, a0 as stringify, a1 as store_get, a2 as unsubscribe_stores, a3 as ensure_array_like, a4 as head } from "../../chunks/index.js";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { theme = "light" } = $$props;
    let isMenuOpen = false;
    let currentTheme = theme;
    $$renderer2.push(`<nav${attr_class(
      `fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${stringify("bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700")}`,
      "svelte-rfuq4y"
    )} role="navigation" aria-label="Main navigation"><div class="max-w-7xl mx-auto flex justify-between items-center svelte-rfuq4y"><a href="/" class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded-lg p-1 transition-transform hover:scale-105 svelte-rfuq4y" aria-label="Callaback Home"><img src="/Logo.png" alt="Callaback Logo" class="w-10 h-10 rounded-lg svelte-rfuq4y" width="40" height="40" loading="eager"/> <span class="text-2xl font-bold text-white dark:text-white tracking-tight svelte-rfuq4y">callaback<span class="text-orange-200 dark:text-orange-300 svelte-rfuq4y">.com</span></span></a> <div class="hidden md:flex items-center space-x-6 svelte-rfuq4y"><ul class="flex items-center space-x-6 svelte-rfuq4y"><li class="svelte-rfuq4y"><a href="/about"${attr_class(`text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 ${stringify(store_get($$store_subs ??= {}, "$page", page).url?.pathname === "/about" ? "bg-white/20 text-white" : "")}`, "svelte-rfuq4y")}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url?.pathname === "/about" ? "page" : void 0)}>About</a></li> <li class="svelte-rfuq4y"><a href="/todo"${attr_class(`text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 ${stringify(store_get($$store_subs ??= {}, "$page", page).url?.pathname === "/todo" ? "bg-white/20 text-white" : "")}`, "svelte-rfuq4y")}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url?.pathname === "/todo" ? "page" : void 0)}>Todo</a></li></ul> <div class="h-6 w-px bg-white/30 svelte-rfuq4y"></div> <div class="flex items-center space-x-4 svelte-rfuq4y"><a href="mailto:support@callaback.com" class="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2.5 rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap svelte-rfuq4y">Contact Us</a> <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white svelte-rfuq4y"${attr("aria-label", currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode")} type="button">`);
    if (currentTheme === "dark") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="w-5 h-5 text-white svelte-rfuq4y" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" class="svelte-rfuq4y"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-5 h-5 text-white svelte-rfuq4y" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" class="svelte-rfuq4y"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button></div></div> <div class="md:hidden flex items-center space-x-4 svelte-rfuq4y"><button class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white svelte-rfuq4y"${attr("aria-label", currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode")} type="button">`);
    if (currentTheme === "dark") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="w-5 h-5 text-white svelte-rfuq4y" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" class="svelte-rfuq4y"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-5 h-5 text-white svelte-rfuq4y" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" class="svelte-rfuq4y"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <button class="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded-lg svelte-rfuq4y"${attr("aria-label", "Open menu")}${attr("aria-expanded", isMenuOpen)} type="button"><span class="sr-only svelte-rfuq4y">${escape_html("Open menu")}</span> <div class="space-y-1.5 svelte-rfuq4y"><div${attr_class(`w-6 h-0.5 bg-white transition-all duration-300 ${stringify("")}`, "svelte-rfuq4y")}></div> <div${attr_class(`w-6 h-0.5 bg-white transition-all duration-300 ${stringify("")}`, "svelte-rfuq4y")}></div> <div${attr_class(`w-6 h-0.5 bg-white transition-all duration-300 ${stringify("")}`, "svelte-rfuq4y")}></div></div></button></div></div></nav> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="h-16 md:h-20 svelte-rfuq4y"></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentYear = 2024;
    const socialLinks = [
      {
        icon: "twitter",
        url: "https://twitter.com/callaback",
        label: "Twitter"
      },
      {
        icon: "github",
        url: "https://github.com/1900geek",
        label: "GitHub"
      },
      {
        icon: "linkedin",
        url: "https://www.linkedin.com/in/dweipert",
        label: "LinkedIn"
      }
    ];
    const footerLinks = {
      company: [
        { name: "About", url: "/about" },
        { name: "Todo", url: "/todo" },
        { name: "Home", url: "/" }
      ],
      support: [
        { name: "Help Center", url: "/help" },
        { name: "Contact Us", url: "mailto:support@callaback.com" },
        { name: "Status", url: "/status" },
        { name: "Community", url: "/community" }
      ],
      legal: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
        { name: "Cookie Policy", url: "/cookies" },
        { name: "Security", url: "/security" }
      ]
    };
    function getSocialIcon(icon) {
      switch (icon) {
        case "twitter":
          return {
            path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
            viewBox: "0 0 24 24"
          };
        case "github":
          return {
            path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
            viewBox: "0 0 24 24"
          };
        case "linkedin":
          return {
            path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
            viewBox: "0 0 24 24"
          };
        default:
          return {
            path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
            viewBox: "0 0 24 24"
          };
      }
    }
    $$renderer2.push(`<footer class="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 svelte-jz8lnl" role="contentinfo" aria-label="Site footer"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 svelte-jz8lnl"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 svelte-jz8lnl"><div class="lg:col-span-2 svelte-jz8lnl"><div class="flex flex-col space-y-4 svelte-jz8lnl"><div class="flex items-center gap-3 svelte-jz8lnl"><img src="/Logo.png" alt="Callaback Logo" class="w-12 h-12 svelte-jz8lnl" width="48" height="48" loading="lazy"/> <div class="svelte-jz8lnl"><span class="text-2xl font-bold text-gray-900 tracking-tight svelte-jz8lnl">callaback<span class="text-orange-500 svelte-jz8lnl">.com</span></span> <p class="text-sm text-gray-600 mt-1 svelte-jz8lnl">The modern callback solution</p></div></div> <p class="text-gray-600 text-lg leading-relaxed max-w-md svelte-jz8lnl">Transform your customer communication with seamless callback technology.
            Faster response times, higher satisfaction.</p> <div class="flex items-center space-x-4 pt-2 svelte-jz8lnl"><span class="text-sm font-medium text-gray-700 svelte-jz8lnl">Follow us:</span> <div class="flex items-center space-x-3 svelte-jz8lnl"><!--[-->`);
    const each_array = ensure_array_like(socialLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.url)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 svelte-jz8lnl"${attr("aria-label", `Follow us on ${link.label}`)}${attr("title", link.label)}><svg class="w-5 h-5 svelte-jz8lnl" fill="currentColor"${attr("viewBox", getSocialIcon(link.icon).viewBox)} aria-hidden="true"><path${attr("d", getSocialIcon(link.icon).path)} class="svelte-jz8lnl"></path></svg></a>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="svelte-jz8lnl"><h3 class="text-lg font-semibold text-gray-900 mb-4 svelte-jz8lnl">Company</h3> <ul class="space-y-3 svelte-jz8lnl"><!--[-->`);
    const each_array_1 = ensure_array_like(footerLinks.company);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let link = each_array_1[$$index_1];
      $$renderer2.push(`<li class="svelte-jz8lnl"><a${attr("href", link.url)} class="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1 svelte-jz8lnl">${escape_html(link.name)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="svelte-jz8lnl"><h3 class="text-lg font-semibold text-gray-900 mb-4 svelte-jz8lnl">Support</h3> <ul class="space-y-3 svelte-jz8lnl"><!--[-->`);
    const each_array_2 = ensure_array_like(footerLinks.support);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let link = each_array_2[$$index_2];
      $$renderer2.push(`<li class="svelte-jz8lnl"><a${attr("href", link.url)} class="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1 svelte-jz8lnl">${escape_html(link.name)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="mt-12 pt-8 border-t border-gray-300 svelte-jz8lnl"><div class="flex flex-col items-center space-y-6 svelte-jz8lnl"><div class="text-center svelte-jz8lnl"><p class="text-gray-600 text-sm svelte-jz8lnl">© ${escape_html(currentYear)} Invariant Ego, LLC. All rights reserved.</p></div> <div class="flex flex-wrap justify-center gap-6 svelte-jz8lnl"><!--[-->`);
    const each_array_3 = ensure_array_like(footerLinks.legal);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let link = each_array_3[$$index_3];
      $$renderer2.push(`<a${attr("href", link.url)} class="text-sm text-gray-500 hover:text-orange-600 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1 svelte-jz8lnl">${escape_html(link.name)}</a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-3xl svelte-jz8lnl"><div class="flex items-center justify-center space-x-4 svelte-jz8lnl"><div class="flex items-center space-x-2 text-sm text-gray-500 svelte-jz8lnl"><svg class="w-5 h-5 text-green-500 svelte-jz8lnl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" class="svelte-jz8lnl"></path></svg> <span class="svelte-jz8lnl">Certificate of Fact of Good Standing</span></div></div> <div class="flex items-center justify-center space-x-2 svelte-jz8lnl"><svg class="w-5 h-5 text-gray-400 svelte-jz8lnl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class="svelte-jz8lnl"></path></svg> <select class="bg-transparent text-sm text-gray-600 border-none focus:outline-none focus:ring-0 cursor-pointer svelte-jz8lnl" aria-label="Select language">`);
    $$renderer2.option(
      { value: "en", class: "" },
      ($$renderer3) => {
        $$renderer3.push(`English`);
      },
      "svelte-jz8lnl"
    );
    $$renderer2.option(
      { value: "es", class: "" },
      ($$renderer3) => {
        $$renderer3.push(`Español`);
      },
      "svelte-jz8lnl"
    );
    $$renderer2.option(
      { value: "fr", class: "" },
      ($$renderer3) => {
        $$renderer3.push(`Français`);
      },
      "svelte-jz8lnl"
    );
    $$renderer2.option(
      { value: "de", class: "" },
      ($$renderer3) => {
        $$renderer3.push(`Deutsch`);
      },
      "svelte-jz8lnl"
    );
    $$renderer2.push(`</select></div></div></div></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { children } = $$props;
    let theme = "light";
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Callaback.com – Modern Callback Solution</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Callaback is a modern callback solution that transforms customer communication and support."/> <meta name="keywords" content="callback, customer service, communication, support"/> <meta name="author" content="Callaback"/> <link rel="canonical" href="https://callaback.com/"/> <link rel="icon" href="/favicon.ico" sizes="any"/> <link rel="icon" href="/favicon.svg" type="image/svg+xml"/> <link rel="apple-touch-icon" href="/apple-touch-icon.png"/> <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png"/> <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png"/> <meta property="og:type" content="website"/> <meta property="og:title" content="Callaback – Modern Callback Solution"/> <meta property="og:description" content="Transform your customer communication with seamless callback technology."/> <meta property="og:url" content="https://callaback.com/"/> <meta property="og:image" content="https://callaback.com/og-preview.png"/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title" content="Callaback – Modern Callback Solution"/> <meta name="twitter:description" content="Transform your customer communication with seamless callback technology."/> <meta name="twitter:image" content="https://callaback.com/og-preview.png"/> <meta name="apple-mobile-web-app-capable" content="yes"/> <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/> <meta name="apple-mobile-web-app-title" content="Callaback"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">`);
    Navbar($$renderer2, { theme });
    $$renderer2.push(`<!----> <main class="flex-1">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
