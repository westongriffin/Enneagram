/* Site-wide personalization from the latest saved test result (localStorage
 * only — nothing leaves the browser). Adds the "You: 7w8" header chip, deep
 * prefills, and the back-to-top button. Load last on every page.
 */
(function () {
  "use strict";

  function getProfile() {
    try {
      const h = JSON.parse(localStorage.getItem("enneaguide_history") || "[]");
      if (!h.length || !h[0].types) return null;
      const types = h[0].types;
      const top = types[0].type;
      // wing: higher-scoring neighbor
      const NB = { 1: [9, 2], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 6], 6: [5, 7], 7: [6, 8], 8: [7, 9], 9: [8, 1] };
      const by = {}; types.forEach(function (r) { by[r.type] = r.pct; });
      const n = NB[top];
      const wing = Math.abs(by[n[0]] - by[n[1]]) < 4 ? null : (by[n[0]] > by[n[1]] ? n[0] : n[1]);
      let inst = null;
      if (h[0].instincts) {
        inst = Object.keys(h[0].instincts).sort(function (a, b) { return h[0].instincts[b] - h[0].instincts[a]; })[0];
      }
      return { type: top, wing: wing, inst: inst };
    } catch (e) { return null; }
  }
  window.OEProfile = getProfile;

  document.addEventListener("DOMContentLoaded", function () {
    const p = getProfile();

    /* Header chip */
    if (p) {
      const bar = document.querySelector("header.site .bar");
      const navToggle = document.getElementById("nav-toggle");
      if (bar && !document.getElementById("you-chip")) {
        const a = document.createElement("a");
        a.id = "you-chip";
        a.className = "you-chip";
        a.href = "type-" + p.type + ".html";
        a.textContent = "You: " + p.type + (p.wing ? "w" + p.wing : "");
        a.title = "Your latest test result — open your type";
        bar.insertBefore(a, navToggle || bar.lastElementChild);
      }
    }

    /* Growth page: jump to and mark your type when no explicit anchor */
    if (p && /growth\.html$/.test(location.pathname) && !location.hash) {
      const sec = document.getElementById("type-" + p.type);
      if (sec) {
        sec.classList.add("is-you");
        sec.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }

    /* Pairings page: prefill "You" side when the URL didn't specify */
    if (p && /relationships\.html$/.test(location.pathname) && !new URLSearchParams(location.search).get("a")) {
      const set = function (id, val) {
        const el = document.getElementById(id);
        if (el != null && val != null) {
          el.value = String(val);
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }
      };
      set("a-type", p.type);
      if (p.wing) set("a-wing", p.wing);
      if (p.inst) set("a-inst", p.inst);
    }

    /* Back-to-top on every page */
    const btn = document.createElement("button");
    btn.className = "to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.textContent = "↑";
    document.body.appendChild(btn);
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    let shown = false;
    window.addEventListener("scroll", function () {
      const want = window.scrollY > 700;
      if (want !== shown) { shown = want; btn.classList.toggle("show", want); }
    }, { passive: true });
  });
})();
