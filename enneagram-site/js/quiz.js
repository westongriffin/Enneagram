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

  const BANKS = {
    short: { items: function () { return SHORT_TEST; }, label: "Quick test" },
    full: { items: function () { return FULL_TEST; }, label: "Exhaustive test" },
    shortmc: { items: function () { return SHORT_MC; }, label: "Quick multiple-choice test" },
    fullmc: { items: function () { return FULL_MC; }, label: "Exhaustive multiple-choice test" }
  };

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
  let lastResult = null;

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
    // Shuffle question order; for multiple-choice items also shuffle the
    // options (on a copy) so option position carries no signal.
    bank = shuffle(BANKS[which].items()).map(function (q) {
      return q.options ? Object.assign({}, q, { options: shuffle(q.options) }) : q;
    });
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
    $("#q-hint").textContent = q.options
      ? "Pick the one answer that fits you best:"
      : "How much do you agree with this statement?";
    $("#q-text").textContent = q.text;
    $("#progress-fill").style.width = (100 * idx / bank.length) + "%";

    const wrap = $("#likert");
    wrap.innerHTML = "";
    const labels = q.options ? q.options.map(function (o) { return o.label; }) : LIKERT;
    wrap.classList.toggle("mc", !!q.options);
    labels.forEach(function (label, i) {
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
    const instScore = { sp: 0, so: 0, sx: 0 }, instMax = { sp: 0, so: 0, sx: 0 };
    let sdSum = 0, sdCount = 0;
    const cidAnswers = {};
    for (let t = 1; t <= 9; t++) { typeScore[t] = 0; typeMax[t] = 0; }
    Object.keys(CONFOUNDS).forEach(function (k) { confScore[k] = 0; confMax[k] = 0; });

    bank.forEach(function (q, i) {
      const a = answers[i];
      if (a == null) return;
      if (q.options) {
        // Forced choice: the chosen option contributes its full weights; the
        // ceiling for each scale is the best any option could have given it.
        const picked = q.options[a - 1];
        if (picked.w) Object.keys(picked.w).forEach(function (t) { typeScore[t] += picked.w[t]; });
        if (picked.c) Object.keys(picked.c).forEach(function (k) { confScore[k] += picked.c[k]; });
        if (picked.i) Object.keys(picked.i).forEach(function (k) { instScore[k] += picked.i[k]; });
        const bestW = {}, bestC = {}, bestI = {};
        q.options.forEach(function (o) {
          if (o.w) Object.keys(o.w).forEach(function (t) { bestW[t] = Math.max(bestW[t] || 0, o.w[t]); });
          if (o.c) Object.keys(o.c).forEach(function (k) { bestC[k] = Math.max(bestC[k] || 0, o.c[k]); });
          if (o.i) Object.keys(o.i).forEach(function (k) { bestI[k] = Math.max(bestI[k] || 0, o.i[k]); });
        });
        Object.keys(bestW).forEach(function (t) { typeMax[t] += bestW[t]; });
        Object.keys(bestC).forEach(function (k) { confMax[k] += bestC[k]; });
        Object.keys(bestI).forEach(function (k) { instMax[k] += bestI[k]; });
        return;
      }
      let s = (a - 1) / 4; // 0..1
      if (q.rev) s = 1 - s; // reverse-keyed: disagreement is the signal
      if (q.w) Object.keys(q.w).forEach(function (t) {
        typeScore[t] += s * q.w[t];
        typeMax[t] += q.w[t];
      });
      if (q.c) Object.keys(q.c).forEach(function (k) {
        confScore[k] += s * q.c[k];
        confMax[k] += q.c[k];
      });
      if (q.i) Object.keys(q.i).forEach(function (k) {
        instScore[k] += s * q.i[k];
        instMax[k] += q.i[k];
      });
      if (q.v === "sd") { sdSum += a; sdCount++; }
      if (q.cid) (cidAnswers[q.cid] = cidAnswers[q.cid] || []).push(a);
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

    // Instinct stacking (only when the bank measured it)
    let instincts = null;
    if (instMax.sp + instMax.so + instMax.sx > 0) {
      instincts = {};
      ["sp", "so", "sx"].forEach(function (k) {
        instincts[k] = instMax[k] ? Math.round(100 * instScore[k] / instMax[k]) : 0;
      });
    }

    // Validity: social desirability + consistency twins
    let validity = null;
    let inconsistent = 0, checked = 0;
    Object.keys(cidAnswers).forEach(function (k) {
      if (cidAnswers[k].length === 2) {
        checked++;
        if (Math.abs(cidAnswers[k][0] - cidAnswers[k][1]) >= 3) inconsistent++;
      }
    });
    if (sdCount > 0 || checked > 0) {
      validity = {
        sdPct: sdCount ? Math.round(100 * (sdSum - sdCount) / (sdCount * 4)) : null,
        inconsistent: inconsistent,
        checked: checked
      };
    }

    return { types: types, confounds: confounds, instincts: instincts, validity: validity };
  }

  /* Sensitivity analysis: recompute type scores excluding every item whose
   * content overlaps a flagged screening scale (dual-loaded Likert items and
   * MC questions with a flagged-confound option). Pure screeners never touch
   * type scores, so this isolates exactly the contested contribution.
   */
  function computeAdjustedTypes(flaggedKeys) {
    const hasFlagged = function (c) {
      return c && flaggedKeys.some(function (k) { return c[k]; });
    };
    const typeScore = {}, typeMax = {};
    for (let t = 1; t <= 9; t++) { typeScore[t] = 0; typeMax[t] = 0; }
    let excluded = 0;

    bank.forEach(function (q, i) {
      const a = answers[i];
      if (a == null) return;
      if (q.options) {
        const contested = q.options.some(function (o) { return hasFlagged(o.c); });
        if (contested) {
          if (q.options.some(function (o) { return o.w && Object.keys(o.w).length; })) excluded++;
          return;
        }
        const picked = q.options[a - 1];
        if (picked.w) Object.keys(picked.w).forEach(function (t) { typeScore[t] += picked.w[t]; });
        const bestW = {};
        q.options.forEach(function (o) {
          if (o.w) Object.keys(o.w).forEach(function (t) { bestW[t] = Math.max(bestW[t] || 0, o.w[t]); });
        });
        Object.keys(bestW).forEach(function (t) { typeMax[t] += bestW[t]; });
        return;
      }
      if (hasFlagged(q.c)) {
        if (q.w) excluded++;
        return;
      }
      let s = (a - 1) / 4;
      if (q.rev) s = 1 - s;
      if (q.w) Object.keys(q.w).forEach(function (t) {
        typeScore[t] += s * q.w[t];
        typeMax[t] += q.w[t];
      });
    });

    const types = [];
    for (let t = 1; t <= 9; t++) {
      types.push({ type: t, pct: typeMax[t] ? Math.round(100 * typeScore[t] / typeMax[t]) : 0 });
    }
    types.sort(function (a, b) { return b.pct - a.pct || a.type - b.type; });
    return { types: types, excluded: excluded };
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

  /* ---- Result sharing: encode scores into a URL-safe token ---- */

  function encodeResult(result) {
    const byType = {};
    result.types.forEach(function (r) { byType[r.type] = r.pct; });
    const tp = [];
    for (let t = 1; t <= 9; t++) tp.push(byType[t] || 0);
    const cp = Object.keys(CONFOUNDS).map(function (k) { return result.confounds[k] || 0; });
    if (result.instincts) {
      const ip = ["sp", "so", "sx"].map(function (k) { return result.instincts[k] || 0; });
      return ["v2", bankName, tp.join("-"), cp.join("-"), ip.join("-")].join(".");
    }
    return ["v1", bankName, tp.join("-"), cp.join("-")].join(".");
  }

  function decodeResult(s) {
    const parts = String(s).split(".");
    const isV1 = parts.length === 4 && parts[0] === "v1";
    const isV2 = parts.length === 5 && parts[0] === "v2";
    if ((!isV1 && !isV2) || !BANKS[parts[1]]) return null;
    const tp = parts[2].split("-").map(Number);
    if (tp.length !== 9 || tp.some(function (v) { return !isFinite(v) || v < 0 || v > 100; })) return null;
    const cp = parts[3].split("-").map(Number);
    const confounds = {};
    Object.keys(CONFOUNDS).forEach(function (k, i) {
      confounds[k] = (isFinite(cp[i]) && cp[i] >= 0 && cp[i] <= 100) ? Math.round(cp[i]) : 0;
    });
    const types = tp.map(function (pct, i) { return { type: i + 1, pct: Math.round(pct) }; })
      .sort(function (a, b) { return b.pct - a.pct || a.type - b.type; });
    let instincts = null;
    if (isV2) {
      const ip = parts[4].split("-").map(Number);
      if (ip.length === 3 && ip.every(function (v) { return isFinite(v) && v >= 0 && v <= 100; })) {
        instincts = { sp: Math.round(ip[0]), so: Math.round(ip[1]), sx: Math.round(ip[2]) };
      }
    }
    return { bank: parts[1], types: types, confounds: confounds, instincts: instincts, validity: null };
  }

  /* ---- Result history (stays in this browser via localStorage) ---- */

  const HISTORY_KEY = "enneaguide_history";

  function loadHistory() {
    try {
      const h = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      return Array.isArray(h) ? h : [];
    } catch (e) { return []; }
  }

  function saveToHistory(result) {
    try {
      const h = loadHistory();
      h.unshift({
        ts: Date.now(),
        bank: bankName,
        types: result.types,
        confounds: result.confounds,
        instincts: result.instincts || null,
        adjusted: result.adjusted || null
      });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 50)));
    } catch (e) { /* storage unavailable (private mode etc.) — skip silently */ }
    renderHistory();
  }

  function renderHistory() {
    const card = $("#history-card");
    if (!card) return;
    const h = loadHistory();
    if (!h.length) { card.hidden = true; return; }
    card.hidden = false;
    let rows = "";
    h.forEach(function (e, i) {
      const top = e.types[0];
      const wing = wingFor(top.type, e.types);
      const when = new Date(e.ts).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      rows += '<tr><td>' + esc(when) + "</td><td>" + esc(BANKS[e.bank] ? BANKS[e.bank].label : e.bank) +
        "</td><td><strong>Type " + top.type + "</strong> (" + esc(wing.label) + ")</td>" +
        '<td><button class="btn ghost btn-small" data-view="' + i + '" type="button">View</button> ' +
        '<button class="btn ghost btn-small" data-del="' + i + '" type="button">Delete</button></td></tr>';
    });
    $("#history-list").innerHTML =
      '<div class="table-scroll"><table><thead><tr><th scope="col">Date</th><th scope="col">Test</th>' +
      '<th scope="col">Result</th><th scope="col"></th></tr></thead><tbody>' + rows + "</tbody></table></div>";
  }

  function shareUrl() {
    return location.origin + location.pathname + "?r=" + encodeResult(lastResult);
  }

  function shareResult() {
    const top = lastResult.types[0];
    const t = ENNEAGRAM_TYPES[top.type];
    const wing = wingFor(top.type, lastResult.types);
    const url = shareUrl();
    const text = "I got Type " + top.type + " — " + t.name + " (" + wing.label + ") on the enneaguide enneagram test.";
    const status = $("#share-status");
    if (navigator.share) {
      navigator.share({ title: "My enneagram result", text: text, url: url }).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text + " " + url).then(function () {
        status.textContent = "Link copied to clipboard.";
      }, function () {
        window.prompt("Copy this link to share your result:", url);
      });
    } else {
      window.prompt("Copy this link to share your result:", url);
    }
  }

  /* ---- PDF download: print-formatted report + the browser's Save as PDF ---- */

  function buildPrintHtml(result) {
    const top = result.types[0];
    const second = result.types[1];
    const t = ENNEAGRAM_TYPES[top.type];
    const wing = wingFor(top.type, result.types);
    const flags = buildFlags(result);
    const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    let h = "";
    h += '<p class="p-brand">enneaguide · enneagram test result · ' + esc(date) + "</p>";
    h += "<h1>Type " + top.type + " — " + esc(t.name) + "</h1>";
    h += "<p><strong>" + esc(BANKS[bankName].label) + "</strong> · Likely wing: <strong>" + esc(wing.label) +
         "</strong> · Runner-up: Type " + second.type + " — " + esc(ENNEAGRAM_TYPES[second.type].name) + "</p>";
    h += "<p>" + esc(t.summary) + "</p>";
    if (wing.text) h += "<p><strong>Wing:</strong> " + esc(wing.text) + "</p>";
    h += "<p><strong>Growth:</strong> " + esc(t.growthArrow.text) + "<br><strong>Stress:</strong> " + esc(t.stressArrow.text) + "</p>";
    if (result.instincts) {
      const ranked = ["sp", "so", "sx"].map(function (k) { return { k: k, pct: result.instincts[k] }; })
        .sort(function (a, b) { return b.pct - a.pct; });
      const sub = SUBTYPES[top.type][ranked[0].k];
      h += "<p><strong>Instinct stacking:</strong> " + ranked[0].k + "/" + ranked[1].k +
           " (" + ranked.map(function (r) { return r.k + " " + r.pct; }).join(" · ") + ")<br>" +
           "<strong>Likely subtype:</strong> " + ranked[0].k + top.type + ' · "' + esc(sub.name) + '"' +
           (sub.counter ? " (countertype)" : "") + " — " + esc(sub.blurb) + "</p>";
    }

    h += "<h2>Fit with all nine types</h2><table><thead><tr><th>Type</th><th>Score (0–100)</th><th></th></tr></thead><tbody>";
    result.types.forEach(function (r) {
      h += "<tr><td>Type " + r.type + " — " + esc(ENNEAGRAM_TYPES[r.type].name) + "</td><td>" + r.pct +
           '</td><td class="p-track"><span class="p-bar" style="width:' + r.pct + '%"></span></td></tr>';
    });
    h += "</tbody></table>";

    if (flags.length) {
      h += "<h2>⚑ Possible mislabeling flags</h2>";
      flags.forEach(function (f) {
        h += "<p><strong>" + esc(f.scale.label) + " (screen score " + f.pct + "/100) — overlaps Type " +
             f.hitTypes.join(" and Type ") + ".</strong> " + esc(f.scale.explain) + "</p>";
      });
      if (result.adjusted) {
        const adjTop = result.adjusted.types[0];
        h += "<p><strong>Sensitivity check:</strong> with the " + result.adjusted.excluded +
             " flag-overlapping question" + (result.adjusted.excluded === 1 ? "" : "s") + " excluded, the top type is Type " +
             adjTop.type + " — " + esc(ENNEAGRAM_TYPES[adjTop.type].name) +
             (adjTop.type === top.type ? " (unchanged — the result is robust to the overlap)." : " (changed — read both profiles before settling).") + "</p>";
      }
    } else {
      h += "<p><strong>No mislabeling flags were raised</strong> by the screening items.</p>";
    }
    h += '<p class="p-foot">This result is a self-observation hypothesis, not a measurement or a diagnosis. ' +
         "It cannot detect or rule out ADHD, anxiety, depression, autism, PTSD, or any other condition. " +
         "Full type profiles and the mislabelings guide: " + esc(location.origin + location.pathname.replace(/tests\.html$/, "")) + "</p>";
    return h;
  }

  function downloadPdf() {
    const area = $("#print-area");
    area.innerHTML = buildPrintHtml(lastResult);
    const prevTitle = document.title;
    document.body.classList.add("print-result");
    document.title = "enneagram-result-type-" + lastResult.types[0].type;
    let done = false;
    const cleanup = function () {
      if (done) return;
      done = true;
      document.body.classList.remove("print-result");
      document.title = prevTitle;
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
    setTimeout(cleanup, 3000);
  }

  function showResults() {
    $("#progress-fill").style.width = "100%";
    const result = computeScores();
    // When look-alike flags fire, attach a confound-adjusted view of the
    // type ranking so the flag becomes actionable, not just a warning.
    const flags = buildFlags(result);
    if (flags.length) {
      const adj = computeAdjustedTypes(flags.map(function (f) { return f.key; }));
      if (adj.excluded > 0) {
        result.adjusted = { keys: flags.map(function (f) { return f.key; }), types: adj.types, excluded: adj.excluded };
      }
    }
    saveToHistory(result);
    renderResults(result, { shared: false });
  }

  function renderResults(result, opts) {
    lastResult = result;
    const top = result.types[0];
    const second = result.types[1];
    const t = ENNEAGRAM_TYPES[top.type];
    const wing = wingFor(top.type, result.types);
    const flags = buildFlags(result);

    let html = "";
    if (opts.shared) {
      html += '<div class="callout" style="margin-top:0"><p style="margin:0"><strong>Shared result.</strong> ' +
        "Someone took this test and shared their outcome with you. Their answers stayed on their device — " +
        "only the scores travel in the link.</p></div>";
    }
    html += '<p class="kicker">' + BANKS[bankName].label + " result</p>";
    html += "<h2 style='margin-top:0'>Type " + top.type + " — " + esc(t.name) + "</h2>";
    html += '<p><span class="pill">Likely wing: ' + esc(wing.label) + '</span>' +
            '<span class="pill">Runner-up: Type ' + second.type + " — " + esc(ENNEAGRAM_TYPES[second.type].name) + "</span></p>";
    html += "<p>" + esc(t.summary) + "</p>";
    if (wing.text) html += "<p><strong>Wing:</strong> " + esc(wing.text) + "</p>";
    html += '<p><a href="types.html#type-' + top.type + '">Read the full Type ' + top.type + " profile →</a> · " +
            '<a href="growth.html#type-' + top.type + '">Growth path for Type ' + top.type + " →</a></p>";

    if (top.pct - second.pct <= 4) {
      html += '<div class="callout"><p><strong>Close call:</strong> Type ' + second.type + " — " +
        esc(ENNEAGRAM_TYPES[second.type].name) + " scored within " + (top.pct - second.pct) +
        " point" + (top.pct - second.pct === 1 ? "" : "s") + " of your top type. Read both profiles, check " +
        '<a href="similarities.html?a=' + top.type + "&b=" + second.type + '">how these two are similar</a>, ' +
        "and let the core-fear question decide — not the score.</p></div>";
    }

    // Validity checks (exhaustive Likert test only)
    if (result.validity) {
      const v = result.validity;
      if (v.sdPct !== null && v.sdPct >= 75) {
        html += '<div class="callout caution"><p><strong>Response-style check:</strong> you strongly agreed with ' +
          "statements almost nobody can truthfully endorse (“I have never envied another person”). " +
          "That pattern usually means answering as your ideal self rather than your actual self — worth a retake " +
          "with your guard down, since the whole test shifts the same way.</p></div>";
      }
      if (v.inconsistent > 0) {
        html += '<div class="callout caution"><p><strong>Consistency check:</strong> ' + v.inconsistent + " of " +
          v.checked + " paired questions that ask nearly the same thing got very different answers from you. " +
          "That can mean rushed or distracted answering — treat this result as rough and consider retaking.</p></div>";
      }
    }

    // Instinct stacking & subtype (exhaustive tests)
    if (result.instincts) {
      const ranked = ["sp", "so", "sx"].map(function (k) {
        return { k: k, pct: result.instincts[k] };
      }).sort(function (a, b) { return b.pct - a.pct; });
      const sub = SUBTYPES[top.type][ranked[0].k];
      html += "<h3>Your instinct stacking &amp; subtype</h3>";
      html += '<div class="score-chart">' + ranked.map(function (r, i) {
        return '<div class="score-row' + (i === 0 ? " top" : "") + '"><span class="name">' +
          esc(INSTINCTS[r.k].name) + '</span><span class="track"><span class="bar" style="width:' +
          r.pct + '%"></span></span><span class="val">' + r.pct + "</span></div>";
      }).join("") + "</div>";
      html += "<p><span class='pill'>" + ranked[0].k + "/" + ranked[1].k + "</span><strong>" +
        ranked[0].k + top.type + ' · "' + esc(sub.name) + '"</strong> — ' + esc(sub.blurb) + "</p>";
      if (sub.counter) {
        html += '<div class="callout flag"><p><strong>You landed on the countertype.</strong> The ' +
          ranked[0].k + top.type + " runs against Type " + top.type + "'s usual pattern, which makes it the " +
          "most-mistyped version of this type. If parts of the profile above don't fit, that's likely why — " +
          'see <a href="instincts.html">the instincts guide</a> before doubting the whole result.</p></div>';
      }
      if (ranked[0].pct - ranked[1].pct < 10) {
        html += '<p class="quiz-meta">Your top two instincts scored close together — read both subtype descriptions on the <a href="instincts.html">instincts page</a>.</p>';
      }
    } else if (!opts.shared) {
      html += '<p class="quiz-meta">This test didn\'t measure instincts — find your subtype with the <a href="instincts.html">instinct mini-test</a>, or take the exhaustive version.</p>';
    }

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

      // Sensitivity check: the same ranking with contested items excluded.
      if (result.adjusted) {
        const adjTop = result.adjusted.types[0];
        const stdTop3 = result.types.slice(0, 3).map(function (r) { return "Type " + r.type + " (" + r.pct + ")"; }).join(" · ");
        const adjTop3 = result.adjusted.types.slice(0, 3).map(function (r) { return "Type " + r.type + " (" + r.pct + ")"; }).join(" · ");
        html += '<div class="callout"><p class="kicker">Sensitivity check</p>' +
          "<p>We re-scored your types after excluding the " + result.adjusted.excluded +
          " question" + (result.adjusted.excluded === 1 ? "" : "s") +
          " whose content overlaps your flagged screen" + (result.adjusted.keys.length === 1 ? "" : "s") +
          " (" + result.adjusted.keys.map(function (k) { return esc(CONFOUNDS[k].label); }).join("; ") + "):</p>" +
          "<p><strong>Standard scoring:</strong> " + stdTop3 + "<br>" +
          "<strong>Contested items excluded:</strong> " + adjTop3 + "</p>";
        if (adjTop.type === top.type) {
          html += "<p><strong>Your top type held.</strong> Excluding the contested items doesn't change the ranking, " +
            "which is genuinely reassuring — your Type " + top.type + " result doesn't depend on the overlap.</p>";
        } else {
          html += "<p><strong>Your top type changed.</strong> Without the contested items, Type " + adjTop.type + " — " +
            esc(ENNEAGRAM_TYPES[adjTop.type].name) + " leads instead. That's the flag's warning made concrete: read both " +
            '<a href="types.html#type-' + top.type + '">Type ' + top.type + "</a> and " +
            '<a href="types.html#type-' + adjTop.type + '">Type ' + adjTop.type + "</a> profiles, and " +
            '<a href="similarities.html?a=' + top.type + "&b=" + adjTop.type + '">how they differ</a>, before settling.</p>';
        }
        html += '<p class="quiz-meta">This exclusion removes item-level overlap only — no self-report test can remove ' +
          "the deeper overlap in how a clinical pattern colors your reading of every question. The flag's advice stands either way.</p></div>";
      }
      html += '<div class="callout caution"><p><strong>Important:</strong> this test cannot diagnose ADHD, anxiety, depression, autism, PTSD, or any other condition. If a flag above resonates, the useful next step is a conversation with a qualified clinician — and holding your enneagram typing loosely until the picture is clearer.</p></div>';
    } else {
      html += '<div class="callout"><p><strong>No mislabeling flags raised.</strong> Your answers to the screening items didn\'t show the patterns that most commonly masquerade as enneagram types. As always, treat your result as a hypothesis to test against self-observation.</p></div>';
    }

    if (!opts.shared && !opts.history && (bankName === "short" || bankName === "shortmc")) {
      html += '<p>Want more confidence — including per-type discriminator items and a fuller mislabeling screen? <a href="#" id="go-full">Take the exhaustive version →</a></p>';
    }
    html += '<div class="result-actions">' +
      '<button class="btn" id="btn-pdf" type="button">Download PDF</button>' +
      '<button class="btn" id="btn-share" type="button">Share result</button>' +
      '<button class="btn ghost" id="btn-retake" type="button">' +
        (opts.shared ? "Take the test yourself" : opts.history ? "Back to tests" : "Retake") + "</button>" +
      '</div><p class="quiz-meta" id="share-status" role="status"></p>';
    if (!opts.shared && !opts.history) {
      html += '<p class="quiz-meta">Saved to your result history on this device — nothing leaves your browser.</p>';
    }

    $("#quiz").hidden = true;
    $("#results").hidden = false;
    $("#results-body").innerHTML = html;
    $("#results").scrollIntoView({ behavior: "smooth", block: "start" });

    const goFull = $("#go-full");
    if (goFull) goFull.addEventListener("click", function (e) {
      e.preventDefault();
      startQuiz(bankName === "shortmc" ? "fullmc" : "full");
    });
    $("#btn-pdf").addEventListener("click", downloadPdf);
    $("#btn-share").addEventListener("click", shareResult);
    $("#btn-retake").addEventListener("click", function () {
      if (opts.shared) history.replaceState(null, "", location.pathname);
      $("#results").hidden = true;
      $("#chooser").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("#start-short").addEventListener("click", function () { startQuiz("short"); });
    $("#start-full").addEventListener("click", function () { startQuiz("full"); });
    $("#start-short-mc").addEventListener("click", function () { startQuiz("shortmc"); });
    $("#start-full-mc").addEventListener("click", function () { startQuiz("fullmc"); });
    $("#btn-back").addEventListener("click", function () {
      if (idx > 0) { idx -= 1; renderQuestion(); }
    });

    // Result history list
    renderHistory();
    const hl = $("#history-list");
    if (hl) hl.addEventListener("click", function (e) {
      const view = e.target.closest("button[data-view]");
      const del = e.target.closest("button[data-del]");
      if (view) {
        const entry = loadHistory()[Number(view.dataset.view)];
        if (!entry) return;
        bankName = entry.bank;
        $("#chooser").hidden = true;
        $("#results").hidden = false;
        renderResults(entry, { history: true });
      } else if (del) {
        try {
          const h = loadHistory();
          h.splice(Number(del.dataset.del), 1);
          localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
        } catch (err) { /* ignore */ }
        renderHistory();
      }
    });
    const clearBtn = $("#history-clear");
    if (clearBtn) clearBtn.addEventListener("click", function () {
      try { localStorage.removeItem(HISTORY_KEY); } catch (err) { /* ignore */ }
      renderHistory();
    });

    // A shared-result link renders the encoded scores read-only.
    const token = new URLSearchParams(location.search).get("r");
    if (token) {
      const decoded = decodeResult(token);
      if (decoded) {
        bankName = decoded.bank;
        $("#chooser").hidden = true;
        $("#results").hidden = false;
        renderResults(decoded, { shared: true });
      }
    }
  });
})();
