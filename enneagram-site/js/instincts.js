/* Instinctual variants (subtypes): the three instincts, the six stackings,
 * and the 27 subtypes (type × dominant instinct). Subtype sketches follow the
 * naming tradition popularized by Beatrice Chestnut, paraphrased.
 * counter: true marks the countertype — the version of the type that runs
 * against its usual passion and is most often mistyped.
 */

const INSTINCTS = {
  sp: {
    key: "sp", name: "Self-Preservation",
    short: "Comfort, security, resources, health",
    blurb: "The instinct that watches over the body and its supplies: food, money, warmth, rest, safety. Sp-dominants track comfort and risk automatically — they know where the exits are, whether the bills are paid, and who forgot to bring a jacket."
  },
  so: {
    key: "so", name: "Social",
    short: "Belonging, groups, status, contribution",
    blurb: "The instinct that reads the herd: who's in, who's out, how coalitions form, where you stand. So-dominants orient to communities, causes, and reputations, and they feel a group's temperature the moment they walk in."
  },
  sx: {
    key: "sx", name: "Sexual (One-to-One)",
    short: "Chemistry, intensity, fusion, attraction",
    blurb: "The instinct for intensity and charged connection — with a person, a project, an experience. Sx-dominants would trade a hundred pleasant evenings for one electric one, and they aim themselves at whatever fascinates them."
  }
};

const STACKINGS = {
  "sp/so": "Grounded and dutiful: builds a secure base, then contributes to the group from it. The steadiest stacking — and the one most likely to skip the wild romance.",
  "sp/sx": "Private intensity: a cozy fortress with one favorite person allowed inside. Warm at close range, indifferent to the crowd.",
  "so/sp": "The community builder: responsible membership, well-kept networks, practical service. Intimacy is the growth edge.",
  "so/sx": "The connector: broad networks lit up by favorite people. Charismatic in groups, hungry for significance within them.",
  "sx/sp": "Intensity with a nest: deep one-to-one bonds defended like territory. The crowd can wait outside.",
  "sx/so": "The broadcaster: intensity aimed at people and causes alike — magnetic, expressive, and allergic to lukewarm anything."
};

/* The 27 subtypes. name = traditional label; counter = countertype. */
const SUBTYPES = {
  1: {
    sp: { name: "Worry", blurb: "Perfects the practical: health, savings, routines. The most anxious One — heaven is a to-do list completed correctly." },
    so: { name: "Non-adaptability", blurb: "The model citizen: embodies the right way of doing things and teaches it, calmly certain the standard applies to everyone." },
    sx: { name: "Zeal", counter: true, blurb: "The reformer with fire: goes after other people's improvement with missionary intensity. Angrier and more openly desiring than Ones 'should' be — often mistyped 8 or 6." }
  },
  2: {
    sp: { name: "Privilege", counter: true, blurb: "Earns care by being charming and a little helpless — the childlike Two who attracts protection rather than giving it. Often mistyped 4 or 7." },
    so: { name: "Ambition", blurb: "Helps at scale: the indispensable organizer who knows everyone and gives their way into influence." },
    sx: { name: "Seduction", blurb: "Aims generosity at one person at a time and makes it irresistible — devotion as a courtship strategy." }
  },
  3: {
    sp: { name: "Security", counter: true, blurb: "Works to be good, not just look good — modest, tireless, allergic to open self-promotion. The Three that swears it isn't one; mistyped 1 or 6." },
    so: { name: "Prestige", blurb: "The classic Three: reads what the audience applauds and delivers it flawlessly, trophies visible." },
    sx: { name: "Charisma", blurb: "Wins by being captivating and by promoting the people they love — the success of the 'us' is the trophy." }
  },
  4: {
    sp: { name: "Tenacity", counter: true, blurb: "Suffers in silence and endures — long-suffering stoicism instead of visible drama. Looks like a 1 or 3 with an ache underneath." },
    so: { name: "Shame", blurb: "Feels the deficiency publicly: compares, comes up short, and leads with the wound — melancholy as testimony." },
    sx: { name: "Competition", blurb: "Turns envy into contest: demanding, fiery, determined to be more — mistaken for an 8 with feelings." }
  },
  5: {
    sp: { name: "Castle", blurb: "The archetypal Five: walls, privacy, minimal needs, and a sanctuary where nobody can make demands." },
    so: { name: "Totem", blurb: "Connects through knowledge tribes — the expert among experts, intimate with ideas and the people who share them." },
    sx: { name: "Confidence", counter: true, blurb: "Searches for the one person worthy of total trust — a hidden romantic running on a Four-like current. The warmest Five, mistyped 4." }
  },
  6: {
    sp: { name: "Warmth", blurb: "Disarms danger by being likable: builds alliances, hesitates, doubts, and keeps friends close as insurance." },
    so: { name: "Duty", blurb: "Trusts systems over people: rules, procedures, and reference points keep the fear organized." },
    sx: { name: "Strength", counter: true, blurb: "The counterphobic Six: charges at what frightens it, cultivates toughness, intimidates first. Routinely mistyped 8." }
  },
  7: {
    sp: { name: "Keepers of the Castle", blurb: "The pragmatic hedonist: builds networks and opportunities that guarantee the good life keeps flowing." },
    so: { name: "Sacrifice", counter: true, blurb: "Postpones its own appetite to serve a vision or group — the idealist Seven that looks like a 2 and quietly resents the deferral." },
    sx: { name: "Fascination", blurb: "The dreamer: falls in love with people, plans, and possibilities at first sight, and lives slightly north of reality." }
  },
  8: {
    sp: { name: "Satisfaction", blurb: "Direct and territorial: knows what it needs and gets it without ceremony — the survivalist Eight." },
    so: { name: "Solidarity", counter: true, blurb: "Power in service of the group: protects, mentors, and rebels for others' sake. The friendliest Eight — mistyped 2 or 9w8." },
    sx: { name: "Possession", blurb: "Full-intensity takeover energy: magnetic, provocative, and all-in on the people it claims as its own." }
  },
  9: {
    sp: { name: "Appetite", blurb: "Merges with comfort itself: routines, food, sleep, familiar pleasures — the coziest Nine." },
    so: { name: "Participation", counter: true, blurb: "Works hard to belong: busy, generous, group-oriented — a Nine in Three's clothing that earns its place instead of asserting it." },
    sx: { name: "Fusion", blurb: "Merges with one person and lives through the union — the Nine most likely to forget where they end and the partner begins." }
  }
};

/* Pairing notes: how two dominant instincts combine in a couple.
 * delta is a small score adjustment used by the pairings page. */
const INSTINCT_PAIRS = {
  "sp-sp": { delta: 3, note: "Two self-preservation dominants build a fortress of comfort and stability — deeply restful, just remember to leave it occasionally." },
  "so-so": { delta: 3, note: "Two social dominants share a life of community and causes — the calendar is full and the friends are genuinely shared." },
  "sx-sx": { delta: 3, note: "Two sexual-instinct dominants get the intensity both crave: a private world of chemistry outsiders find slightly alarming." },
  "so-sp": { delta: 0, note: "Comfort meets community: one builds the nest, the other builds the network. Negotiate how many people get invited into the nest." },
  "sp-sx": { delta: -2, note: "The classic mismatch: one wants a safe, cozy evening in; the other wants to set the evening on fire. Name it early — it's wiring, not rejection." },
  "so-sx": { delta: 0, note: "Broad belonging versus laser focus: one works the room, the other wants to leave with exactly one person. Powerful if you let each other lead." }
};

function instinctPairKey(a, b) {
  return [a, b].sort().join("-");
}

if (typeof module !== "undefined") {
  module.exports = { INSTINCTS, STACKINGS, SUBTYPES, INSTINCT_PAIRS, instinctPairKey };
}
