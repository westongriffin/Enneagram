/* Theme toggle: cycles light → dark → auto (follows the device).
 * The pre-paint snippet in each page's <head> resolves the stored mode before
 * first render; this file wires the button and keeps auto mode live.
 */
(function () {
  "use strict";
  const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function mode() {
    try { return localStorage.getItem("theme") || "light"; } catch (e) { return "light"; }
  }
  function resolve(m) {
    if (m === "dark") return "dark";
    if (m === "auto") return mq && mq.matches ? "dark" : "light";
    return "light";
  }
  function apply(m) {
    document.documentElement.dataset.theme = resolve(m);
    try { localStorage.setItem("theme", m); } catch (e) { /* private mode */ }
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = m === "light" ? "🌙" : m === "dark" ? "◐" : "☀️";
      const next = m === "light" ? "dark" : m === "dark" ? "auto (follow device)" : "light";
      btn.setAttribute("aria-label", "Theme: " + m + " — switch to " + next);
      btn.title = btn.getAttribute("aria-label");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(mode());
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      const m = mode();
      apply(m === "light" ? "dark" : m === "dark" ? "auto" : "light");
    });
    if (mq && mq.addEventListener) mq.addEventListener("change", function () {
      if (mode() === "auto") apply("auto");
    });

    // Mobile menu
    var navBtn = document.getElementById("nav-toggle");
    var header = document.querySelector("header.site");
    if (navBtn && header) {
      navBtn.addEventListener("click", function () {
        var open = header.classList.toggle("nav-open");
        navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (header.classList.contains("nav-open") && !header.contains(e.target)) {
          header.classList.remove("nav-open");
          navBtn.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
})();
