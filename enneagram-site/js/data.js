/* Enneagram type data — shared by types.html and the tests. */
const ENNEAGRAM_TYPES = {
  1: {
    name: "The Reformer",
    aka: "The Perfectionist, The Improver",
    center: "Body (Gut)",
    coreFear: "Being corrupt, defective, or morally wrong",
    coreDesire: "To be good, to have integrity, to be beyond reproach",
    vice: "Resentment (anger turned inward and rationalized)",
    virtue: "Serenity",
    summary:
      "Ones are principled, purposeful, and self-controlled. They carry an inner critic that constantly measures reality against how things should be — starting with themselves. Their anger rarely explodes; it simmers as irritation and resentment at a world that won't meet its standards.",
    atBest:
      "Wise, discerning, and realistic — accepting imperfection while still working patiently for genuine improvement. Integrated Ones become noticeably more spontaneous and joyful.",
    atStress:
      "Rigid, critical, and self-punishing. Under sustained stress Ones can become moody and withdrawn, convinced no one else cares about doing things right.",
    growthArrow: { to: 7, text: "In growth, Ones move toward healthy Seven: lighter, more playful, open to possibility instead of obligation." },
    stressArrow: { to: 4, text: "Under stress, Ones move toward unhealthy Four: melancholy, feeling misunderstood, longing for what's missing." },
    wings: {
      "1w9": "More reserved, detached, and idealistic. The critic points at abstract principles; conflict is handled coolly. Can look like a Five or Nine.",
      "1w2": "Warmer and more people-focused. Improves the world through others — teaching, advocating, correcting. More overtly fiery than 1w9."
    },
    mislabels: [
      "OCD or OCPD can look like a One's perfectionism — the difference is that a One's standards feel like ideals they endorse, while OCD rituals feel intrusive and unwanted, and OCPD rigidity persists even when the person agrees it's costing them.",
      "Anxious Sixes are often mistyped as Ones: both are rule-conscious, but Sixes follow rules for safety, Ones for rightness."
    ]
  },
  2: {
    name: "The Helper",
    aka: "The Giver, The Befriender",
    center: "Heart (Feeling)",
    coreFear: "Being unwanted, unloved, or dispensable",
    coreDesire: "To be loved and needed",
    vice: "Pride (in being indispensable; denying their own needs)",
    virtue: "Humility",
    summary:
      "Twos are warm, generous, and interpersonally gifted. They sense others' needs almost automatically and move to meet them — while quietly keeping score. Their own needs go unspoken until they leak out as martyrdom or emotional demand.",
    atBest:
      "Genuinely altruistic and nurturing without strings attached, able to receive as well as give. Integrated Twos care for themselves as attentively as they care for others.",
    atStress:
      "Possessive, flattering, and manipulative — giving in order to get. Burnout, resentment, and physical symptoms follow long self-neglect.",
    growthArrow: { to: 4, text: "In growth, Twos move toward healthy Four: honest about their own feelings and needs, creative, self-aware." },
    stressArrow: { to: 8, text: "Under stress, Twos move toward unhealthy Eight: domineering, blunt, and demanding acknowledgment." },
    wings: {
      "2w1": "More dutiful, boundaried, and service-oriented — helping through roles and responsibilities. Quieter about affection; harder on themselves.",
      "2w3": "More ambitious, sociable, and image-aware. Wins people through charm and accomplishment; can resemble a Three."
    },
    mislabels: [
      "Codependent patterns from any type (or from a caregiving upbringing) get labeled 'Two' — but learned people-pleasing isn't the same as pride-driven indispensability.",
      "Nines are often mistyped as Twos: both are accommodating, but Nines merge to keep the peace, Twos give to be needed."
    ]
  },
  3: {
    name: "The Achiever",
    aka: "The Performer, The Motivator",
    center: "Heart (Feeling)",
    coreFear: "Being worthless apart from their achievements",
    coreDesire: "To feel valuable and admired",
    vice: "Deceit (self-deception; becoming the image)",
    virtue: "Authenticity (truthfulness)",
    summary:
      "Threes are adaptable, driven, and image-conscious. They read what success means in any context and become it — efficient, polished, and hard to slow down. The cost is losing track of what they actually feel and want beneath the performance.",
    atBest:
      "Authentic, self-accepting high performers who inspire others and use their competence for more than applause.",
    atStress:
      "Image management intensifies: cutting corners, embellishing, chasing validation. Exhaustion is denied until collapse.",
    growthArrow: { to: 6, text: "In growth, Threes move toward healthy Six: committed, cooperative, loyal to something larger than their image." },
    stressArrow: { to: 9, text: "Under stress, Threes move toward unhealthy Nine: numbing out, going through the motions, disengaging." },
    wings: {
      "3w2": "Charming, warm, and people-powered — succeeds by being liked and helpful. The 'star host' energy.",
      "3w4": "More introspective, artistic, and privately self-doubting. Ambition with an inner melancholy streak; can resemble a Four."
    },
    mislabels: [
      "Narcissistic traits can mimic an average-to-unhealthy Three — but Three image-management is driven by shame and fear of worthlessness, not by entitled grandiosity, and Threes retain empathy.",
      "Hypomanic productivity is sometimes mistyped as Three drive: mood-episode energy is episodic and comes with reduced sleep and racing thoughts; Three drive is stable and goal-tracked."
    ]
  },
  4: {
    name: "The Individualist",
    aka: "The Romantic, The Artist",
    center: "Heart (Feeling)",
    coreFear: "Having no identity or personal significance",
    coreDesire: "To be uniquely themselves and authentically understood",
    vice: "Envy (others seem to have the wholeness I lack)",
    virtue: "Equanimity (emotional balance)",
    summary:
      "Fours are introspective, expressive, and emotionally deep. They feel something essential is missing in them and search for it through intensity, aesthetics, and authenticity — amplifying feelings by dwelling in them, and longing for what is absent.",
    atBest:
      "Profoundly creative and emotionally honest, able to transform pain into meaning and stay present to ordinary life without needing it to be dramatic.",
    atStress:
      "Self-absorbed melancholy, envy, and self-sabotage; pushing people away and then despairing at the abandonment.",
    growthArrow: { to: 1, text: "In growth, Fours move toward healthy One: disciplined, principled, acting on ideals instead of only feeling them." },
    stressArrow: { to: 2, text: "Under stress, Fours move toward unhealthy Two: clingy, over-involved, needing to be needed." },
    wings: {
      "4w3": "More ambitious, social, and image-aware — wants the unique self to be seen and celebrated. Higher energy, more competitive.",
      "4w5": "More withdrawn, cerebral, and unconventional. Processes internally; can resemble a Five with feelings turned up."
    },
    mislabels: [
      "Depression is the classic Four look-alike — but depression is an episode (weeks of flat anhedonia, sleep/appetite changes) while Four melancholy is a familiar, even valued, emotional home that coexists with real pleasure.",
      "Borderline-pattern emotional intensity and identity instability can read as Four; clinical instability involves frantic abandonment responses and self-harm risk that type dynamics alone don't explain."
    ]
  },
  5: {
    name: "The Investigator",
    aka: "The Observer, The Thinker",
    center: "Head (Thinking)",
    coreFear: "Being useless, incapable, or overwhelmed by demands",
    coreDesire: "To be competent and self-sufficient",
    vice: "Avarice (hoarding energy, time, knowledge, privacy)",
    virtue: "Non-attachment (generosity of self)",
    summary:
      "Fives are perceptive, innovative, and private. Feeling the world demands more than they have to give, they retreat into the mind, minimize their needs, and prepare — believing they'll engage with life once they finally know enough.",
    atBest:
      "Visionary pioneers who share what they know, stay connected to their bodies and feelings, and engage life directly rather than from the observation deck.",
    atStress:
      "Increasingly isolated, secretive, and scattered — hoarding time and energy while confidence in ever being ready erodes.",
    growthArrow: { to: 8, text: "In growth, Fives move toward healthy Eight: embodied, decisive, and confident in the world of action." },
    stressArrow: { to: 7, text: "Under stress, Fives move toward unhealthy Seven: scattered, escapist, restlessly consuming input." },
    wings: {
      "5w4": "More artistic, emotional, and idiosyncratic — knowledge in service of a personal vision. The 'iconoclast' blend.",
      "5w6": "More systematic, cautious, and loyal — drawn to frameworks, technical mastery, and trusted structures. The 'problem-solver' blend."
    },
    mislabels: [
      "Autistic traits are commonly mistyped as Five: social withdrawal and deep interests overlap, but autism involves lifelong differences in social communication and sensory processing — not an energy-conservation strategy.",
      "Social anxiety and schizoid-spectrum detachment also mimic Five withdrawal; introversion alone does not make someone a Five."
    ]
  },
  6: {
    name: "The Loyalist",
    aka: "The Skeptic, The Guardian",
    center: "Head (Thinking)",
    coreFear: "Being without support, security, or guidance",
    coreDesire: "To feel safe and supported",
    vice: "Fear (and the doubt it breeds)",
    virtue: "Courage",
    summary:
      "Sixes are committed, responsible, and vigilant. Their minds scan for what could go wrong and test what can be trusted. They oscillate between seeking authority and doubting it — phobic Sixes comply and appease; counterphobic Sixes charge at what scares them.",
    atBest:
      "Courageous, grounded, and deeply reliable — trusting themselves, so the scanning mind becomes foresight instead of dread.",
    atStress:
      "Suspicion, worst-case spirals, and reactive accusation or clinging; decisions become impossible without reassurance.",
    growthArrow: { to: 9, text: "In growth, Sixes move toward healthy Nine: relaxed, trusting, at peace with uncertainty." },
    stressArrow: { to: 3, text: "Under stress, Sixes move toward unhealthy Three: frantic activity and image management to outrun anxiety." },
    wings: {
      "6w5": "More withdrawn, cerebral, and self-contained — security through knowledge and systems. Cooler in conflict.",
      "6w7": "More engaging, playful, and outgoing — security through allies and keeping things upbeat. Can resemble a Seven."
    },
    mislabels: [
      "Generalized anxiety disorder is the classic Six look-alike — but GAD is uncontrollable, physical worry that the person experiences as an affliction; Six vigilance is a coherent worldview ('better safe than sorry') that they largely endorse.",
      "PTSD hypervigilance mimics Six scanning; trauma symptoms have an onset and triggers, while Six vigilance feels lifelong and general."
    ]
  },
  7: {
    name: "The Enthusiast",
    aka: "The Epicure, The Visionary",
    center: "Head (Thinking)",
    coreFear: "Being trapped in pain, deprivation, or limitation",
    coreDesire: "To be satisfied, free, and stimulated",
    vice: "Gluttony (for experience and possibility)",
    virtue: "Sobriety (constancy; savoring the present)",
    summary:
      "Sevens are enthusiastic, versatile, and future-oriented. Their fast minds generate options and reframe pain into silver linings before it can land. Commitment feels like a closing door; anticipation often outshines the experience itself.",
    atBest:
      "Joyful, grounded appreciators of the present — able to stay with difficulty, finish what they start, and turn genuine gratitude into depth.",
    atStress:
      "Frantic escapism: overbooking, overconsuming, abandoning plans mid-flight, increasingly harsh when cornered by limits.",
    growthArrow: { to: 5, text: "In growth, Sevens move toward healthy Five: focused, deep, content with less stimulation." },
    stressArrow: { to: 1, text: "Under stress, Sevens move toward unhealthy One: critical, impatient, and rigid about how things must go." },
    wings: {
      "7w6": "More loyal, relational, and anxious under the sparkle — wants the adventure with trusted people. Quicker, more nervous energy.",
      "7w8": "More assertive, materialistic, and driven — grabs experience with both hands and defends its freedom bluntly."
    },
    mislabels: [
      "ADHD is the classic Seven look-alike — novelty-seeking, scattered attention, many unfinished projects. But ADHD is lifelong, context-independent executive dysfunction (attention fails even for loved activities); Seven scatter is a motivated escape from pain and limitation.",
      "Hypomania (bipolar spectrum) can also read as Seven: episodic elevated mood with reduced sleep is a mood state, not a stable strategy."
    ]
  },
  8: {
    name: "The Challenger",
    aka: "The Protector, The Boss",
    center: "Body (Gut)",
    coreFear: "Being controlled, betrayed, or vulnerable to harm",
    coreDesire: "To be strong, self-determining, and in control of their own life",
    vice: "Lust (excess; intensity in everything)",
    virtue: "Innocence (openness without armor)",
    summary:
      "Eights are decisive, protective, and big-energy. They instinctively read power in a room, test people to see who's solid, and lead with strength because tenderness feels dangerous. Anger is fast, clean, and — unlike most types — comfortable.",
    atBest:
      "Magnanimous protectors and builders who use strength for others, can admit vulnerability, and temper intensity with mercy.",
    atStress:
      "Domineering, confrontational, vengeful; the armor thickens until only intensity gets through.",
    growthArrow: { to: 2, text: "In growth, Eights move toward healthy Two: open-hearted, generous, letting people matter and showing it." },
    stressArrow: { to: 5, text: "Under stress, Eights move toward unhealthy Five: withdrawn, secretive, strategizing alone." },
    wings: {
      "8w7": "More gregarious, fast, and appetite-driven — an expansive, entrepreneurial force. Quick to fight, quick to move on.",
      "8w9": "Steadier, quieter, and more patient — the 'bear' who is calm until crossed. Power held in reserve."
    },
    mislabels: [
      "ADHD impulsivity and hot temper can be mistyped as Eight; Eight intensity is about control and justice, not executive-function failure.",
      "Trauma-driven armor (fight response) mimics Eight toughness — but it has an origin story and a startle response underneath; Eight strength feels native.",
      "Narcissistic aggression is not Eight: Eights protect the vulnerable and respect pushback; narcissistic patterns exploit the vulnerable and punish pushback."
    ]
  },
  9: {
    name: "The Peacemaker",
    aka: "The Mediator, The Harmonizer",
    center: "Body (Gut)",
    coreFear: "Loss and separation; conflict that fragments their world",
    coreDesire: "Inner and outer peace; wholeness and stability",
    vice: "Sloth (self-forgetting; inertia about their own life)",
    virtue: "Right action (engaged presence)",
    summary:
      "Nines are receptive, reassuring, and agreeable. They see every side so clearly that their own side blurs; their agenda quietly becomes whatever keeps the peace. Resistance shows up as delay and comfortable routine rather than open refusal.",
    atBest:
      "Genuinely powerful mediators — present, decisive, and self-possessed, bringing people together without erasing themselves.",
    atStress:
      "Stubborn numbness: procrastination, checked-out routines, passive resistance, and a buried anger that occasionally erupts.",
    growthArrow: { to: 3, text: "In growth, Nines move toward healthy Three: energized, focused on their own goals, visible." },
    stressArrow: { to: 6, text: "Under stress, Nines move toward unhealthy Six: anxious, doubtful, catastrophizing." },
    wings: {
      "9w8": "More grounded, blunt, and stubborn — easygoing until pushed, then surprisingly forceful. Comfort with a spine of iron.",
      "9w1": "More orderly, idealistic, and principled — peace pursued through doing things properly. Quiet moral seriousness."
    },
    mislabels: [
      "Depression can mimic Nine numbness and inertia — but depressive anhedonia is an episode with vegetative signs; Nine 'comfortable numbness' is a lifelong, largely pleasant-feeling strategy.",
      "Dissociative or freeze/fawn trauma responses look like Nine merging; trauma responses have triggers and an onset.",
      "Social anxiety's conflict-avoidance is fear of judgment, not the Nine's fear of disturbing connection."
    ]
  }
};

/ Neighbors for wing calculation (the circle wraps 9→1). /
const WING_NEIGHBORS = {
  1: [9, 2], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 6],
  6: [5, 7], 7: [6, 8], 8: [7, 9], 9: [8, 1]
};

/* Confound scales: what each mimics, and how to tell the difference. */
const CONFOUNDS = {
  adhd: {
    label: "ADHD-like traits",
    mimics: [7, 8],
    explain:
      "High scores on lifelong, everywhere-at-once distractibility, impulsivity, and restlessness overlap heavily with how Type 7 (and sometimes Type 8) present. ADHD attention fails even during valued activities and shows up across every life context since childhood; Seven-style scatter is a motivated move away from pain, boredom, and limitation. If this pattern fits, your 7/8 score may be inflated by neurology rather than motivation."
  },
  anxiety: {
    label: "Generalized-anxiety-like traits",
    mimics: [6],
    explain:
      "Physical, uncontrollable worry (tension, poor sleep, worry you can't switch off even when you know it's irrational) overlaps with Type 6 vigilance. Six scanning is a strategy the person broadly endorses ('better safe than sorry'); clinical anxiety feels like an affliction. If this fits, your 6 score may partly reflect an anxiety condition rather than core type."
  },
  depression: {
    label: "Depression-like traits",
    mimics: [4, 9],
    explain:
      "Weeks-long loss of interest and pleasure, with sleep/appetite/energy changes, can mimic Type 4 melancholy or Type 9 numbness. Type patterns are lifelong and coexist with real enjoyment; depressive episodes descend and feel unlike your usual self. If this fits, consider whether a mood episode is coloring your answers."
  },
  autism: {
    label: "Autistic-like traits",
    mimics: [5],
    explain:
      "Lifelong difficulty reading unwritten social rules, sensory sensitivity, and deep special interests overlap with Type 5 withdrawal and expertise-seeking. Five detachment is an energy-conservation strategy; autistic traits are neurodevelopmental and present from early childhood. If this fits, your 5 score may reflect neurotype rather than motivation."
  },
  trauma: {
    label: "Trauma/PTSD-like traits",
    mimics: [6, 8, 9],
    explain:
      "Hypervigilance (looks like 6), armored control (looks like 8), and numbing or fawning (looks like 9) are all classic trauma responses. Unlike type patterns, they have an onset — a before and after — and often involve intrusive memories, startle, and avoidance of reminders. If this fits, your profile may reflect adaptation to events rather than core type."
  },
  ocpd: {
    label: "OCD/OCPD-like traits",
    mimics: [1],
    explain:
      "Rituals you can't skip without intense discomfort, or rigidity that persists even when you agree it's costing you, overlap with Type 1 perfectionism. One standards feel like endorsed ideals; compulsions feel intrusive or uncontrollable. If this fits, your 1 score may be inflated."
  },
  socialanx: {
    label: "Social-anxiety-like traits",
    mimics: [9, 5, 4],
    explain:
      "Wanting connection but avoiding it out of fear of embarrassment can mimic 9 (conflict avoidance), 5 (withdrawal), or 4 (feeling like an outsider). Those types withdraw for different reasons — peace, energy, identity — while social anxiety withdraws from fear of judgment specifically. If this fits, withdrawn-type scores may be inflated."
  },
  hypomania: {
    label: "Hypomania-like episodes",
    mimics: [7, 3],
    explain:
      "Episodic stretches of elevated energy with a reduced need for sleep and racing thoughts can mimic Type 7 enthusiasm or Type 3 drive. Type energy is a stable, lifelong setting; hypomanic energy arrives in episodes that feel different from your usual self. If this fits, your 7/3 score may reflect mood episodes rather than core type — and episodic mood changes are worth discussing with a clinician in their own right."
  }
};

/ Type-vs-type lookalike pairs, motivation-first. /
const TYPE_CONFUSIONS = [
  { pair: "1 vs 6", how: "Both are dutiful and rule-aware. Ones follow standards because they're right; Sixes follow them because they're safe. One anger is moral irritation; Six anger is anxious reactivity." },
  { pair: "2 vs 9", how: "Both accommodate. Twos move toward people to be needed; Nines merge to avoid disturbance. Twos have an agenda for closeness; Nines have forgotten their agenda." },
  { pair: "3 vs 7", how: "Both are fast, upbeat, and busy. Threes optimize for admiration and results; Sevens optimize for stimulation and freedom. A Three finishes to win; a Seven often leaves before the end." },
  { pair: "3 vs 8", how: "Both are driven and commanding. Threes adapt their image to succeed; Eights don't care much how they're seen as long as no one controls them." },
  { pair: "4 vs 9", how: "Both can be dreamy and withdrawn. Fours amplify emotion to feel real; Nines mute emotion to stay comfortable." },
  { pair: "5 vs 9", how: "Both detach. Fives detach into sharp, focused thought and guard their time; Nines diffuse into comfortable fog and guard their peace." },
  { pair: "6 vs 1", how: "See 1 vs 6 — the most common gut/head mix-up. Ask: is the driver rightness or safety?" },
  { pair: "7 vs 3", how: "See 3 vs 7. Also: Sevens reframe failure instantly and move on; Threes quietly metabolize failure as shame." },
  { pair: "8 vs 6 (counterphobic)", how: "Counterphobic Sixes charge at threats and look Eight-ish, but the aggression is anxiety management. Eight aggression is unhurried and clean — there's no fear engine under it." },
  { pair: "9 vs 5", how: "See 5 vs 9. A Five's inner world is precise; a Nine's is ambient. Fives withhold themselves; Nines mislay themselves." }
];

if (typeof module !== "undefined") {
  module.exports = { ENNEAGRAM_TYPES, WING_NEIGHBORS, CONFOUNDS, TYPE_CONFUSIONS };
}
