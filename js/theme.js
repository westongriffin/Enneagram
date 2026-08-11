/* Theme toggle: light is the default everywhere; dark is opt-in and remembered.
 * The pre-paint snippet in each page's <head> sets data-theme before first
 * render; this file just wires the button.
 */
(function () {
  "use strict";
  function current() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  }
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode */ }
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.title = btn.getAttribute("aria-label");
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    apply(current());
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark");
    });
  });
})();
