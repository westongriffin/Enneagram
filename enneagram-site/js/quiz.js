/* Quiz engine: rendering, scoring, wings, and mislabeling flags.
 * Requires data.js and questions.js to be loaded first.
 */
(function () {
  "use strict";

  const LIKERT = [
    "Strongly disagree",
    "Disagree",
    "Neutral / it depends",
    "Agree",
    "Strongly agree"
  ];

  // A confound scale at or above this (0–100) is considered elevated.
  const CONFOUND_THRESHOLD = 60;
  // A mimicked type within this many points of the top score keeps a flag relevant.
  const NEAR_TOP_MARGIN = 12;
  // Wing margin: closer than this → "balanced wings".
  const WING_MARGIN = 4;

  let bank = [];
  let bankName = "";
  let answers = [];
  let idx = 0;
  let advancing = false;

  const $ = (sel) => document.querySelector(sel);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startQuiz(which) {
    bankName = which;
    bank = shuffle(which === "short" ? SHORT_TEST : FULL_TEST);
    answers = new Array(bank.length).fill(null);
    idx = 0;
    $("#chooser").hidden = true;
    $("#results").hidden = true;
    $("#quiz").hidden = false;
    renderQuestion();
    $("#quiz").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderQuestion() {
    const q = bank[idx];
    $("#q-count").textContent = "Question " + (idx + 1) + " of " + bank.length;
    $("#q-text").textContent = q.text;
    $("#progress-fill").style.width = (100 * idx / bank.length) + "%";

    const wrap = $("#likert");
    wrap.innerHTML = "";
    LIKERT.forEach(function (label, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      if (answers[idx] === i + 1) b.classList.add("sel");
      b.addEventListener("click", function () {
        if (advancing) return;
        advancing = true;
        answers[idx] = i + 1;
        // Show the selection briefly so the tap feels registered before advancing.
        wrap.querySelectorAll("button").forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
        setTimeout(function () {
          advancing = false;
          if (idx < bank.length - 1) {
            idx += 1;
            renderQuestion();
          } else {
            showResults();
          }
        }, 160);
      });
      wrap.appendChild(b);
    });

    $("#btn-back").disabled = idx === 0;
  }

  function computeScores() {
    const typeScore = {}, typeMax = {};
    const confScore = {}, confMax = {};
    for (let t = 1; t <= 9; t++) { typeScore[t] = 0; typeMax[t] = 0; }
    Object.keys(CONFOUNDS).forEach(function (k) { confScore[k] = 0; confMax[k] = 0; });

    bank.forEach(function (q, i) {
      const a = answers[i];
      if (a == null) return;
      const s = (a - 1) / 4; // 0..1
      if (q.w) Object.keys(q.w).forEach(function (t) {
        typeScore[t] += s * q.w[t];
        typeMax[t] += q.w[t];
      });
      if (q.c) Object.keys(q.c).forEach(function (k) {
        confScore[k] += s * q.c[k];
        confMax[k] += q.c[k];
      });
    });

    const types = [];
    for (let t = 1; t <= 9; t++) {
      types.push({ type: t, pct: typeMax[t] ? Math.round(100 * typeScore[t] / typeMax[t]) : 0 });
    }
    types.sort(function (a, b) { return b.pct - a.pct || a.type - b.type; });

    const confounds = {};
    Object.keys(CONFOUNDS).forEach(function (k) {
      confounds[k] = confMax[k] ? Math.round(100 * confScore[k] / confMax[k]) : 0;
    });

    return { types: types, confounds: confounds };
  }

  function wingFor(topType, types) {
    const byType = {};
    types.forEach(function (r) { byType[r.type] = r.pct; });
    const nb = WING_NEIGHBORS[topType];
    const a = { t: nb[0], pct: byType[nb[0]] }, b = { t: nb[1], pct: byType[nb[1]] };
    if (Math.abs(a.pct - b.pct) < WING_MARGIN) {
      return { label: topType + " with balanced wings", text: "Your two wings (" + nb[0] + " and " + nb[1] + ") scored within a few points of each other — you may draw on both, or your wing may become clearer with time." };
    }
    const w = a.pct > b.pct ? a : b;
    const key = topType + "w" + w.t;
    return { label: key, text: ENNEAGRAM_TYPES[topType].wings[key] || "" };
  }

  function buildFlags(result) {
    const topThree = result.types.slice(0, 3).map(function (r) { return r.type; });
    const topPct = result.types[0].pct;
    const byType = {};
    result.types.forEach(function (r) { byType[r.type] = r.pct; });

    const flags = [];
    Object.keys(CONFOUNDS).forEach(function (k) {
      const scale = CONFOUNDS[k];
      const pct = result.confounds[k];
      if (pct < CONFOUND_THRESHOLD) return;
      const hit = scale.mimics.filter(function (t) {
        return topThree.indexOf(t) !== -1 || (topPct - byType[t]) <= NEAR_TOP_MARGIN;
      });
      if (hit.length === 0) return;
      flags.push({ key: k, pct: pct, hitTypes: hit, scale: scale });
    });
    flags.sort(function (a, b) { return b.pct - a.pct; });
    return flags;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
    });
  }

  function showResults() {
    $("#progress-fill").style.width = "100%";
    const result = computeScores();
    const top = result.types[0];
    const second = result.types[1];
    const t = ENNEAGRAM_TYPES[top.type];
    const wing = wingFor(top.type, result.types);
    const flags = buildFlags(result);

    let html = "";
    html += '<p class="kicker">' + (bankName === "short" ? "Quick test" : "Exhaustive test") + " result</p>";
    html += "<h2 style='margin-top:0'>Type " + top.type + " — " + esc(t.name) + "</h2>";
    html += '<p><span class="pill">Likely wing: ' + esc(wing.label) + '</span>' +
            '<span class="pill">Runner-up: Type ' + second.type + " — " + esc(ENNEAGRAM_TYPES[second.type].name) + "</span></p>";
    html += "<p>" + esc(t.summary) + "</p>";
    if (wing.text) html += "<p><strong>Wing:</strong> " + esc(wing.text) + "</p>";
    html += '<p><a href="types.html#type-' + top.type + '">Read the full Type ' + top.type + " profile →</a></p>";

    // Score chart: single measure (fit %), one hue, top emphasized, values direct-labeled.
    html += "<h3>Your fit with all nine types</h3>";
    html += '<div class="score-chart" role="img" aria-label="Bar chart of fit scores for all nine types">';
    result.types.forEach(function (r, i) {
      const name = "Type " + r.type + " · " + ENNEAGRAM_TYPES[r.type].name.replace("The ", "");
      html += '<div class="score-row' + (i === 0 ? " top" : "") + '">' +
        '<span class="name">' + esc(name) + "</span>" +
        '<span class="track"><span class="bar" style="width:' + r.pct + '%"></span></span>' +
        '<span class="val">' + r.pct + "</span></div>";
    });
    html += "</div>";
    html += '<details><summary>View as table</summary><table><caption>Fit score by type (0–100)</caption>' +
      "<thead><tr><th scope='col'>Type</th><th scope='col'>Score</th></tr></thead><tbody>" +
      result.types.map(function (r) {
        return "<tr><td>Type " + r.type + " — " + esc(ENNEAGRAM_TYPES[r.type].name) + "</td><td>" + r.pct + "</td></tr>";
      }).join("") + "</tbody></table></details>";

    // Mislabeling flags
    if (flags.length) {
      html += "<h3>⚑ Possible mislabeling flags</h3>";
      html += "<p>You scored high on screening items that describe patterns known to <em>mimic</em> enneagram types. These are hypotheses to consider, <strong>not</strong> diagnoses.</p>";
      flags.forEach(function (f) {
        html += '<div class="callout flag result-flag">' +
          "<h4>" + esc(f.scale.label) + " (screen score " + f.pct + "/100) — overlaps your Type " +
          f.hitTypes.join(" and Type ") + " result</h4>" +
          "<p>" + esc(f.scale.explain) + "</p></div>";
      });
      html += '<div class="callout caution"><p><strong>Important:</strong> this test cannot diagnose ADHD, anxiety, depression, autism, PTSD, or any other condition. If a flag above resonates, the useful next step is a conversation with a qualified clinician — and holding your enneagram typing loosely until the picture is clearer.</p></div>';
    } else {
      html += '<div class="callout"><p><strong>No mislabeling flags raised.</strong> Your answers to the screening items didn\'t show the patterns that most commonly masquerade as enneagram types. As always, treat your result as a hypothesis to test against self-observation.</p></div>';
    }

    if (bankName === "short") {
      html += '<p>Want more confidence — including per-type discriminator items and a fuller mislabeling screen? <a href="#" id="go-full">Take the exhaustive test →</a></p>';
    }
    html += '<p><button class="btn ghost" id="btn-retake" type="button">Retake</button></p>';

    $("#quiz").hidden = true;
    $("#results").hidden = false;
    $("#results-body").innerHTML = html;
    $("#results").scrollIntoView({ behavior: "smooth", block: "start" });

    const goFull = $("#go-full");
    if (goFull) goFull.addEventListener("click", function (e) { e.preventDefault(); startQuiz("full"); });
    $("#btn-retake").addEventListener("click", function () {
      $("#results").hidden = true;
      $("#chooser").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("#start-short").addEventListener("click", function () { startQuiz("short"); });
    $("#start-full").addEventListener("click", function () { startQuiz("full"); });
    $("#btn-back").addEventListener("click", function () {
      if (idx > 0) { idx -= 1; renderQuestion(); }
    });
  });
})();
