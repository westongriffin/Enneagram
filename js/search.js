/* Client-side site search over the data files — no server, no index build step. */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const entries = [];

  for (let n = 1; n <= 9; n++) {
    const t = ENNEAGRAM_TYPES[n], g = GROWTH[n], pr = PRACTICAL[n];
    entries.push({
      title: "Type " + n + " — " + t.name,
      url: "type-" + n + ".html",
      text: [t.aka, t.center, t.coreFear, t.coreDesire, t.vice, t.virtue, t.summary, t.atBest, t.atStress,
        Object.values(t.wings).join(" "), t.mislabels.join(" "), pr.essence, pr.famous.join(" "),
        pr.communicate.join(" "), pr.work.join(" "), pr.manage.join(" ")].join(" ")
    });
    entries.push({
      title: "Growing as a Type " + n,
      url: "growth.html#type-" + n,
      text: [g.healthy, g.average, g.unhealthy, g.watchFor, g.practices.join(" ")].join(" ")
    });
    ["sp", "so", "sx"].forEach(function (k) {
      const s = SUBTYPES[n][k];
      entries.push({
        title: k + n + ' — "' + s.name + '"' + (s.counter ? " (countertype)" : ""),
        url: "type-" + n + ".html",
        text: s.blurb + " subtype instinct " + INSTINCTS[k].name
      });
    });
  }
  for (let a = 1; a <= 9; a++) for (let b = a; b <= 9; b++) {
    const p = PAIRS[pairKey(a, b)];
    entries.push({
      title: "Type " + a + " + Type " + b + " in love — " + p.t,
      url: "relationships.html?a=" + a + "&b=" + b,
      text: [p.blurb, p.spark, p.friction, p.growth].join(" ")
    });
    if (a !== b) {
      const s = SIMILAR[pairKey(a, b)];
      entries.push({
        title: "Type " + a + " vs Type " + b + " — telling them apart",
        url: "similarities.html?a=" + a + "&b=" + b,
        text: s.shared + " " + s.tell
      });
    }
  }
  Object.keys(CONFOUNDS).forEach(function (k) {
    const c = CONFOUNDS[k];
    entries.push({
      title: c.label + " — mislabeling guide",
      url: "mislabelings.html",
      text: c.explain + " mimics type " + c.mimics.join(" ")
    });
  });
  entries.push({ title: "Take a test", url: "tests.html", text: "quiz test quick exhaustive multiple choice likert instinct subtype validity screening flags results history pdf share" });
  entries.push({ title: "Instincts & stackings", url: "instincts.html", text: "self-preservation social sexual one-to-one sp so sx stacking blind spot mini test" });
  entries.push({ title: "About & FAQ", url: "about.html", text: "faq questions can my type change scientific wing subtype data privacy sources riso hudson palmer chestnut" });

  function run(q) {
    const out = $("#search-results");
    q = q.trim().toLowerCase();
    if (q.length < 2) { out.innerHTML = ""; return; }
    const terms = q.split(/\s+/);
    const scored = entries.map(function (e) {
      const hayT = e.title.toLowerCase(), hayX = e.text.toLowerCase();
      let score = 0;
      terms.forEach(function (w) {
        if (hayT.indexOf(w) !== -1) score += 5;
        if (hayX.indexOf(w) !== -1) score += 1;
      });
      return { e: e, score: score };
    }).filter(function (r) { return r.score >= terms.length; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 15);
    out.innerHTML = scored.length
      ? scored.map(function (r) {
          const snip = r.e.text.slice(0, 140);
          return '<a class="card hoverable search-hit" href="' + r.e.url + '"><strong>' + r.e.title +
            "</strong><br><span class='quiz-meta'>" + snip + "…</span></a>";
        }).join("")
      : '<p class="quiz-meta">Nothing found for “' + q.replace(/</g, "&lt;") + "” — try a type number, a pairing (\"4 and 8\"), or a condition (\"ADHD\").</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const input = $("#q");
    input.addEventListener("input", function () { run(input.value); });
  });
})();
