/* Renders a single-type page (type-N.html) with tabbed sections so the
 * content stays light: Overview · Growth · Love & Work · Look-alikes · Subtypes.
 */
(function () {
  "use strict";
  const N = Number(document.body.dataset.type);
  const t = ENNEAGRAM_TYPES[N];
  const g = GROWTH[N];
  const pr = PRACTICAL[N];
  const $ = (s) => document.querySelector(s);

  function centerClass(n) {
    const c = ENNEAGRAM_TYPES[n].center;
    return c.indexOf("Body") === 0 ? "center-body" : c.indexOf("Heart") === 0 ? "center-heart" : "center-head";
  }

  /* ---- Header ---- */
  let head = '<div class="type-hero ' + centerClass(N) + '">' +
    '<span class="type-num big">' + N + "</span>" +
    "<div><h1>" + t.name + "</h1>" +
    '<p class="quiz-meta">' + pr.essence + " · also called: " + t.aka + " · " + t.center + " center</p>" +
    "</div></div>";
  $("#type-head").innerHTML = head;

  /* ---- Tabs ---- */
  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "growth", label: "Growth" },
    { id: "lovework", label: "Love & Work" },
    { id: "similar", label: "Look-alikes" },
    { id: "subtypes", label: "Subtypes" }
  ];
  $("#tabs").innerHTML = TABS.map(function (tab, i) {
    return '<button type="button" data-tab="' + tab.id + '"' + (i === 0 ? ' class="on"' : "") + ">" + tab.label + "</button>";
  }).join("");

  const panels = {};

  /* Overview */
  panels.overview =
    "<p>" + t.summary + "</p>" +
    '<div class="fact-grid">' +
      "<div><b>Core fear</b>" + t.coreFear + "</div>" +
      "<div><b>Core desire</b>" + t.coreDesire + "</div>" +
      "<div><b>Vice → Virtue</b>" + t.vice + " → " + t.virtue + "</div>" +
      "<div><b>Center</b>" + t.center + "</div>" +
    "</div>" +
    "<p><strong>At their best:</strong> " + t.atBest + "</p>" +
    "<p><strong>Under strain:</strong> " + t.atStress + "</p>" +
    "<h3>Wings</h3>" +
    Object.keys(t.wings).map(function (k) {
      return "<p><span class='pill'>" + k + "</span>" + t.wings[k] + "</p>";
    }).join("") +
    "<h3>Arrows</h3>" +
    '<p><span class="pill">Growth → ' + t.growthArrow.to + "</span>" + t.growthArrow.text + "</p>" +
    '<p><span class="pill">Stress → ' + t.stressArrow.to + "</span>" + t.stressArrow.text + "</p>" +
    "<h3>Commonly typed as " + N + "</h3>" +
    "<p>" + pr.famous.map(function (f) { return '<span class="pill">' + f + "</span>"; }).join(" ") +
    '</p><p class="quiz-meta">Community typings of public and fictional figures — speculative, for flavor only.</p>';

  /* Growth */
  panels.growth =
    '<div class="grid cols-3">' +
      '<div class="level level-healthy"><p class="kicker">Healthy</p><p>' + g.healthy + "</p></div>" +
      '<div class="level level-average"><p class="kicker">Average</p><p>' + g.average + "</p></div>" +
      '<div class="level level-unhealthy"><p class="kicker">Unhealthy</p><p>' + g.unhealthy + "</p></div>" +
    "</div>" +
    '<div class="callout flag"><p><strong>Early-warning sign:</strong> ' + g.watchFor + "</p></div>" +
    "<h3>Practices</h3><ul>" + g.practices.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" +
    '<p><a class="btn ghost" href="growth.html#type-' + N + '">Track these practices →</a></p>';

  /* Love & Work */
  const best = [];
  for (let o = 1; o <= 9; o++) best.push({ o: o, s: PAIRS[pairKey(N, o)].s, t: PAIRS[pairKey(N, o)].t });
  best.sort(function (a, b) { return b.s - a.s; });
  panels.lovework =
    "<h3>♥ Strongest natural pairings</h3>" +
    best.slice(0, 3).map(function (p) {
      return '<p><a href="relationships.html?a=' + N + "&b=" + p.o + '"><strong>With Type ' + p.o + "</strong> — " +
        p.t + " (" + p.s + ")</a></p>";
    }).join("") +
    '<p class="quiz-meta">Every pairing can work — <a href="relationships.html?a=' + N + '&b=' + best[8].o +
    '">even the hardest one</a>. <a href="relationships.html">Score any pairing →</a></p>' +
    "<h3>How to communicate with a " + N + "</h3><ul>" +
    pr.communicate.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" +
    "<h3>Working with them</h3><ul>" +
    pr.work.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" +
    "<h3>Managing them</h3><ul>" +
    pr.manage.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";

  /* Look-alikes */
  let sim = "<h3>Types that resemble " + N + "</h3><table><tbody>";
  for (let o = 1; o <= 9; o++) {
    if (o === N) continue;
    const s = SIMILAR[pairKey(N, o)];
    sim += "<tr><th scope='row'><a href='type-" + o + ".html'>Type " + o + "</a></th><td>" + s.shared +
      " <em>" + s.tell + "</em></td></tr>";
  }
  sim += "</tbody></table><h3>⚑ Clinical look-alikes</h3>" +
    t.mislabels.map(function (m) { return "<p>" + m + "</p>"; }).join("") +
    '<p><a href="mislabelings.html">Full mislabelings guide →</a> · <a href="similarities.html?a=' + N + '&b=' +
    (N === 9 ? 1 : N + 1) + '">Compare side by side →</a></p>';
  panels.similar = sim;

  /* Subtypes */
  panels.subtypes = ["sp", "so", "sx"].map(function (k) {
    const s = SUBTYPES[N][k];
    return '<div class="card"><p class="kicker">' + k + N + ' · "' + s.name + '"' +
      (s.counter ? ' — countertype' : "") + "</p><p>" + s.blurb +
      (s.counter ? " <strong>As the countertype, this is the most-mistyped version of Type " + N + ".</strong>" : "") +
      "</p></div>";
  }).join("") +
  '<p class="quiz-meta"><a href="instincts.html">Find your instinct stacking →</a></p>';

  const wrap = $("#tab-panels");
  wrap.innerHTML = TABS.map(function (tab, i) {
    return '<div class="tab-panel' + (i === 0 ? " on" : "") + '" id="panel-' + tab.id + '">' + panels[tab.id] + "</div>";
  }).join("");

  $("#tabs").addEventListener("click", function (e) {
    const b = e.target.closest("button[data-tab]");
    if (!b) return;
    document.querySelectorAll("#tabs button").forEach(function (x) { x.classList.toggle("on", x === b); });
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.toggle("on", p.id === "panel-" + b.dataset.tab);
    });
  });

  /* Prev / next */
  const prev = N === 1 ? 9 : N - 1, next = N === 9 ? 1 : N + 1;
  $("#type-pager").innerHTML =
    '<a class="btn ghost" href="type-' + prev + '.html">← Type ' + prev + "</a>" +
    '<a class="btn ghost" href="types.html">All types</a>' +
    '<a class="btn ghost" href="type-' + next + '.html">Type ' + next + " →</a>";

  /* "This is you" badge */
  try {
    const h = JSON.parse(localStorage.getItem("enneaguide_history") || "[]");
    if (h.length && h[0].types && h[0].types[0].type === N) {
      $("#type-head").insertAdjacentHTML("beforeend",
        '<p style="margin:0.25rem 0 0"><span class="pill">★ Your type, from your latest test</span></p>');
    }
  } catch (e) { /* no storage */ }
})();
