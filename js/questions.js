/* Question banks.
 * Each item: { text, w: {type: weight}, c: {confound: weight} }
 *  - w: contribution to type scores (Likert 1–5 scaled 0–1 before weighting)
 *  - c: contribution to confound (mislabeling) scales
 * Items may carry both: agreement raises a type score AND a confound scale,
 * which is exactly how real mistypings happen — the flag logic compares the two.
 */

const SHORT_TEST = [
  // Type items — two per type, motivation-first.
  { text: "I feel a constant inner pressure to correct what's wrong — in myself, in others, in the world.", w: { 1: 1 } },
  { text: "I find it hard to relax when something has been done carelessly or just 'good enough.'", w: { 1: 1 }, c: { ocpd: 0.4 } },
  { text: "I instinctively sense what other people need and feel compelled to provide it.", w: { 2: 1 } },
  { text: "I find it much easier to give help than to ask for it.", w: { 2: 1, 9: 0.25 } },
  { text: "I adapt how I present myself to whatever will succeed in the situation I'm in.", w: { 3: 1 } },
  { text: "Feeling worthwhile is closely tied to what I achieve and how it looks to others.", w: { 3: 1 } },
  { text: "I have a persistent sense that something essential is missing in me that other people seem to have.", w: { 4: 1 }, c: { depression: 0.3 } },
  { text: "I feel a pull to be distinct — being ordinary feels like disappearing.", w: { 4: 1 } },
  { text: "I preserve energy and privacy by minimizing what I need from other people.", w: { 5: 1 } },
  { text: "I feel safest engaging with something only after I've understood it thoroughly.", w: { 5: 1 } },
  { text: "I automatically scan for what could go wrong so nothing can catch me off guard.", w: { 6: 1 }, c: { anxiety: 0.4 } },
  { text: "I test people and ideas before trusting them — and even then I keep re-checking.", w: { 6: 1 } },
  { text: "I keep my options open, because committing to one thing means losing all the others.", w: { 7: 1 } },
  { text: "When things get painful or dull, my mind leaps to the next exciting possibility.", w: { 7: 1 }, c: { adhd: 0.4 } },
  { text: "I move instinctively to take charge of situations rather than let them control me.", w: { 8: 1 } },
  { text: "Showing vulnerability feels dangerous — I lead with strength.", w: { 8: 1 }, c: { trauma: 0.3 } },
  { text: "I keep the peace by going along with what others want — and often lose track of what I want.", w: { 9: 1 } },
  { text: "I avoid conflict by tuning out — comfortable routines, small pleasures, autopilot.", w: { 9: 1 }, c: { depression: 0.25 } },

  // Confound screeners — pure mislabeling detectors, no type weight.
  { text: "Since childhood, in every setting — school, home, work — I've struggled to sustain attention, even on things I genuinely care about.", c: { adhd: 1 } },
  { text: "I act or speak on impulse and constantly lose track of objects, time, and appointments, regardless of my mood or motivation.", c: { adhd: 1 } },
  { text: "My worry is physical and uncontrollable — racing heart, muscle tension, poor sleep — even when I know the worry is irrational.", c: { anxiety: 1 } },
  { text: "For weeks at a stretch I lose interest and pleasure in nearly everything, with changes in sleep, appetite, or energy.", c: { depression: 1 } },
  { text: "Unwritten social rules that others absorb naturally have always felt like a foreign language I had to study deliberately.", c: { autism: 1 } },
  { text: "My vigilance or need for control began after specific overwhelming events, and comes with things like intrusive memories or being easily startled.", c: { trauma: 1 } }
];

const FULL_TEST = [
  // ---- Type 1 ----
  { text: "There's a voice in my head constantly evaluating whether I'm doing things correctly.", w: { 1: 1 } },
  { text: "I feel resentful when I follow the rules and others don't — and don't seem to suffer for it.", w: { 1: 1 } },
  { text: "My mistakes feel morally weighty to me, not just inconvenient.", w: { 1: 1 } },
  { text: "I hold work back until it meets my standards, even at real cost.", w: { 1: 0.9 }, c: { ocpd: 0.5 } },
  { text: "I suppress anger because losing my temper would make me a bad person — so it leaks out as irritation instead.", w: { 1: 1 } },
  { text: "Improving myself and my surroundings feels like a duty I can never fully discharge.", w: { 1: 1 } },

  // ---- Type 2 ----
  { text: "I keep a running mental map of what everyone around me needs.", w: { 2: 1 } },
  { text: "I feel hurt when my help isn't appreciated — though I rarely say so out loud.", w: { 2: 1 } },
  { text: "Other people's warmth toward me is how I know I matter.", w: { 2: 1, 3: 0.25 } },
  { text: "I struggle to identify my own needs until they boil over or I burn out.", w: { 2: 1, 9: 0.3 } },
  { text: "Closeness is my answer to most problems — I move toward people.", w: { 2: 1 } },
  { text: "Being needed makes me proud; being unnecessary quietly frightens me.", w: { 2: 1 } },

  // ---- Type 3 ----
  { text: "I instinctively know what success looks like in any room — and I can become it.", w: { 3: 1 } },
  { text: "Slowing down feels like falling behind.", w: { 3: 1, 7: 0.25 } },
  { text: "I sometimes fear that without my achievements there'd be no 'me' underneath.", w: { 3: 1 } },
  { text: "I edit my self-presentation so smoothly that I can lose track of what's real.", w: { 3: 1 } },
  { text: "Efficiency is close to a core value for me — feelings can wait until the task is done.", w: { 3: 1, 1: 0.2 } },
  { text: "Failure doesn't just disappoint me; it threatens my sense of being valuable at all.", w: { 3: 1 } },

  // ---- Type 4 ----
  { text: "My emotional life feels deeper and more turbulent than most people's.", w: { 4: 1 } },
  { text: "I often long for what's absent — the missing person, place, or life I should be living.", w: { 4: 1 }, c: { depression: 0.3 } },
  { text: "Being truly understood matters more to me than being liked.", w: { 4: 1, 5: 0.2 } },
  { text: "I revisit and amplify my feelings — there's something almost nourishing in melancholy.", w: { 4: 1 } },
  { text: "Envy is familiar to me: others seem to possess an ease or substance that I lack.", w: { 4: 1 } },
  { text: "I would rather be authentic and difficult than pleasant and false.", w: { 4: 1, 8: 0.2 } },
  { text: "Even in dark moods, part of me feels more alive and more myself — the intensity has meaning.", w: { 4: 0.9 } },

  // ---- Type 5 ----
  { text: "I ration my time and energy like scarce resources.", w: { 5: 1 }, cid: "c2" },
  { text: "I withdraw to think things through, and engage only after I've figured them out.", w: { 5: 1 } },
  { text: "Being intruded on — emotionally or practically — drains me more than it seems to drain others.", w: { 5: 1 }, c: { autism: 0.3 } },
  { text: "I accumulate knowledge and skills to feel capable enough to face the world.", w: { 5: 1, 6: 0.2 } },
  { text: "In the moment I detach from feelings; I process them later, alone.", w: { 5: 1, 9: 0.2 } },
  { text: "I keep my needs small so that nothing and no one can hold anything over me.", w: { 5: 1 } },

  // ---- Type 6 ----
  { text: "I rehearse worst-case scenarios so nothing can catch me unprepared.", w: { 6: 1 }, c: { anxiety: 0.4 }, cid: "c1" },
  { text: "I'm skeptical of confident authorities — and yet I keep looking for something solid to rely on.", w: { 6: 1 } },
  { text: "I second-guess my own decisions and seek reassurance or outside opinions.", w: { 6: 1 } },
  { text: "Loyalty is central to me: I stand by my people and expect the same in return.", w: { 6: 1, 2: 0.2 } },
  { text: "With authority I can flip between compliance and defiance — sometimes toward the same person.", w: { 6: 1 } },
  { text: "My mind generates objections automatically; devil's advocate is my default setting.", w: { 6: 1, 5: 0.2 } },

  // ---- Type 7 ----
  { text: "I generate plans and possibilities far faster than I could ever act on them.", w: { 7: 1 }, c: { adhd: 0.35 } },
  { text: "Anticipating an experience is often more vivid for me than the experience itself.", w: { 7: 1 } },
  { text: "I reframe painful things into positives so quickly that I sometimes skip feeling the pain at all.", w: { 7: 1 } },
  { text: "Limitation — a closed door, a fixed schedule, a long commitment — makes me itch to escape.", w: { 7: 1, 8: 0.2 } },
  { text: "I stay upbeat partly because I'm a little afraid of what stillness might bring up.", w: { 7: 1 } },
  { text: "Variety isn't a preference for me, it's a need — repetition drains me fast.", w: { 7: 0.9 }, c: { adhd: 0.4 } },

  // ---- Type 8 ----
  { text: "I size up who really holds power in a room within moments of entering it.", w: { 8: 1 } },
  { text: "I respect people who push back on me — and I test them to find out if they will.", w: { 8: 1 } },
  { text: "Being controlled or betrayed angers me more than almost anything else.", w: { 8: 1, 6: 0.2 } },
  { text: "I protect the people under my wing fiercely, sometimes before they've asked.", w: { 8: 1, 2: 0.2 } },
  { text: "My energy is big — people have told me I'm 'too much' or intimidating.", w: { 8: 1, 7: 0.2 } },
  { text: "Tenderness is private; the world only gets my strength.", w: { 8: 1 }, c: { trauma: 0.35 } },

  // ---- Type 9 ----
  { text: "I see every side of a disagreement so clearly that taking my own side feels almost arbitrary.", w: { 9: 1 } },
  { text: "My agenda quietly becomes whatever the people around me want.", w: { 9: 1, 2: 0.2 } },
  { text: "I resist pressure not by refusing, but by delaying, deflecting, and going quiet.", w: { 9: 1 } },
  { text: "Comfortable routines can absorb whole evenings before I notice they've gone.", w: { 9: 1 }, c: { depression: 0.25 } },
  { text: "Conflict feels almost physically bad to me; I'll pay a high price to avoid it.", w: { 9: 1 }, c: { socialanx: 0.25 } },
  { text: "I underestimate how much my presence and opinions actually matter to other people.", w: { 9: 1 } },

  // ---- Confound screeners ----
  // ADHD
  { text: "My distractibility is lifelong and shows up everywhere — even during activities I love, with people I love.", c: { adhd: 1 } },
  { text: "I chronically lose track of objects, time, and appointments, no matter how motivated I am.", c: { adhd: 1 } },
  { text: "I feel physically restless — fidgeting, pacing, needing to move — even when I'm content.", c: { adhd: 0.9 } },
  { text: "My novelty-seeking feels less like enthusiasm and more like my brain refusing to stay put; boredom is close to painful.", c: { adhd: 0.9 } },
  // Generalized anxiety
  { text: "My body carries worry — muscle tension, stomach trouble, poor sleep — even when nothing specific is wrong.", c: { anxiety: 1 } },
  { text: "I can't switch worry off even when I can see it's irrational and it's wrecking my day.", c: { anxiety: 1 } },
  { text: "My worry arrived during a particular period of my life, rather than feeling like 'how I've always been.'", c: { anxiety: 0.6, trauma: 0.4 } },
  // Depression
  { text: "For stretches of weeks I lose interest in nearly everything — including things central to who I am.", c: { depression: 1 } },
  { text: "My low periods come with concrete changes: sleeping much more or less, appetite shifts, heavy fatigue.", c: { depression: 1 } },
  { text: "My dark moods feel like an illness that descends on me, not a temperament I recognize as mine.", c: { depression: 0.9 } },
  // Autism
  { text: "Reading between the lines socially has never come naturally to me; I've learned the rules by rote.", c: { autism: 1 } },
  { text: "Unexpected changes of plan, or intense sensory environments (noise, light, texture), genuinely destabilize me.", c: { autism: 1 } },
  { text: "My deep interests are about the pull of the subject itself — not about conserving energy or proving competence.", c: { autism: 0.8 } },
  // Trauma / PTSD
  { text: "My vigilance or armor began after specific overwhelming events; people who knew me before say I changed.", c: { trauma: 1 } },
  { text: "I experience intrusive memories, nightmares, or a jumpiness that feels bodily rather than mental.", c: { trauma: 1 } },
  { text: "I avoid particular places, topics, or people because they set me off.", c: { trauma: 0.9 } },
  // OCD / OCPD
  { text: "My standards feel less like ideals I chose and more like rituals I can't skip without intense discomfort.", c: { ocpd: 1 } },
  { text: "People close to me say my orderliness or control costs me relationships and efficiency — and I can't dial it down even when I agree.", c: { ocpd: 1 } },
  // Social anxiety
  { text: "I want connection, but fear of embarrassment or judgment keeps me isolated.", c: { socialanx: 1 } },
  { text: "Around social events I'm consumed by fear of humiliation — dreading beforehand, replaying mistakes afterward.", c: { socialanx: 1 } },

  // ---- Reverse-keyed items (one per type, counter acquiescence bias) ----
  { text: "I'm easygoing about mistakes — mine and other people's.", w: { 1: 1 }, rev: true },
  { text: "I'm comfortable letting people struggle without stepping in to help.", w: { 2: 1 }, rev: true },
  { text: "How I'm perceived has little influence on my choices.", w: { 3: 1 }, rev: true },
  { text: "I rarely feel that something important is missing from my life.", w: { 4: 1 }, rev: true },
  { text: "Sharing my time and space freely doesn't drain me.", w: { 5: 1 }, rev: true },
  { text: "I rarely rehearse what could go wrong.", w: { 6: 1 }, rev: true },
  { text: "I'm content repeating the same routines for long stretches.", w: { 7: 1 }, rev: true },
  { text: "I'm comfortable being directed by other people.", w: { 8: 1 }, rev: true },
  { text: "I state my own agenda clearly even when it causes conflict.", w: { 9: 1 }, rev: true },

  // ---- Validity: social desirability (nobody can truthfully strongly agree) ----
  { text: "I have never envied another person.", v: "sd" },
  { text: "I have never said anything unkind about someone who wasn't in the room.", v: "sd" },

  // ---- Validity: consistency twins (near-duplicates; big gaps flag careless answering) ----
  { text: "I run through worst-case scenarios ahead of time so nothing catches me by surprise.", cid: "c1" },
  { text: "I budget my energy carefully, like money that could run out.", cid: "c2" },

  // ---- Instinct scales (same items as the instincts mini-test) ----
  { text: "I track comfort, health, money, and supplies almost automatically.", i: { sp: 1 } },
  { text: "Before enjoying a place, I've noted the exits, the temperature, and where I'll sit.", i: { sp: 1 } },
  { text: "Security concerns — bills, food, sleep — can override my social plans.", i: { sp: 1 } },
  { text: "I'm the one who makes sure there are snacks, backups, and a plan B.", i: { sp: 1 } },
  { text: "I always know roughly where I stand in a group's pecking order.", i: { so: 1 } },
  { text: "Belonging to communities and causes energizes me.", i: { so: 1 } },
  { text: "I notice who's in, who's out, and how alliances are shifting.", i: { so: 1 } },
  { text: "I shape myself to be a useful contributor to whatever group I'm in.", i: { so: 1 } },
  { text: "One-on-one intensity beats any party.", i: { sx: 1 } },
  { text: "I seek full-contact chemistry with specific people, not general pleasantness.", i: { sx: 1 } },
  { text: "When someone or something fascinates me, everything else fades out.", i: { sx: 1 } },
  { text: "I would rather have one electric connection than broad, mild harmony.", i: { sx: 1 } }
];

/* ---------------------------------------------------------------------------
 * Multiple-choice banks.
 * Each item: { text, options: [{ label, w, c }, ...] } — picking an option adds
 * its full weights. Discriminator items put a type and its clinical look-alike
 * side by side, which forced choice does better than agreement ratings.
 */

const MC_CORE = [
  { text: "A group project is falling apart the week before the deadline. What's your honest first instinct?",
    options: [
      { label: "Take command, divide the work, and push it over the line.", w: { 8: 1 } },
      { label: "Quietly redo the weak parts myself so it's done properly.", w: { 1: 1 } },
      { label: "Lift the mood — panic helps nobody, and there's still an enjoyable way through this.", w: { 7: 1 } },
      { label: "Check in on whoever's overwhelmed and cover their pieces.", w: { 2: 1 } }
    ] },
  { text: "Which of these bothers you most in everyday life?",
    options: [
      { label: "Carelessness and lowered standards.", w: { 1: 1 } },
      { label: "Being told what to do.", w: { 8: 1 } },
      { label: "Giving a lot and getting no thanks.", w: { 2: 1 } },
      { label: "Boredom and repetition.", w: { 7: 1 } },
      { label: "Small talk and constant socializing.", w: { 5: 1 } }
    ] },
  { text: "At a gathering where you know almost no one, what do you usually do?",
    options: [
      { label: "Stay near the person I came with.", w: { 6: 1 } },
      { label: "Leave early — my social battery drains fast.", w: { 5: 1 } },
      { label: "Adapt to whoever I'm talking to; people generally like me.", w: { 3: 1 } },
      { label: "Drift into whatever conversation is easiest and go along with it.", w: { 9: 1 } }
    ] },
  { text: "Which best describes your relationship with rules?",
    options: [
      { label: "Rules exist for good reasons; I follow them and quietly expect others to.", w: { 1: 1, 6: 0.3 } },
      { label: "Rules that slow me down are obstacles to work around.", w: { 3: 1, 7: 0.3 } },
      { label: "I follow rules from people I trust and question the rest.", w: { 6: 1 } },
      { label: "Rules barely register; I do whatever keeps things pleasant.", w: { 9: 1 } }
    ] },
  { text: "When someone close to you is upset with you, what happens first?",
    options: [
      { label: "I can't rest until we've repaired it — I'll over-apologize if I have to.", w: { 2: 1, 9: 0.3 } },
      { label: "I get defensive first and soften later, in private.", w: { 8: 1 } },
      { label: "I replay everything I might have done wrong on a loop.", w: { 6: 1, 1: 0.3 } },
      { label: "Part of me withdraws to process what this says about us.", w: { 4: 1, 5: 0.3 } }
    ] },
  { text: "What is your mind's default background activity?",
    options: [
      { label: "Scanning for what could go wrong.", w: { 6: 1 } },
      { label: "Planning the next thing to look forward to.", w: { 7: 1 } },
      { label: "Rehearsing or reviewing my own performance.", w: { 3: 1 } },
      { label: "Drifting through comfortable daydreams.", w: { 9: 1 } }
    ] },
  { text: "Which of these would you most like people to say about you?",
    options: [
      { label: "\"Principled — they do the right thing even when it costs them.\"", w: { 1: 1 } },
      { label: "\"Impressive — they make success look easy.\"", w: { 3: 1 } },
      { label: "\"Deep — there's no one else like them.\"", w: { 4: 1 } },
      { label: "\"Strong — they protected us.\"", w: { 8: 1 } }
    ] },
  { text: "It's a free Saturday with no obligations. What are you most likely to do?",
    options: [
      { label: "Recharge alone with my current obsession.", w: { 5: 1 } },
      { label: "Line up something new and stimulating.", w: { 7: 1 } },
      { label: "Finally make the improvements I've been meaning to get to.", w: { 1: 1, 3: 0.3 } },
      { label: "Sink into low-key comfort: familiar food, familiar people, no plans.", w: { 9: 1 } }
    ] },
  { text: "Which of these is closest to your biggest fear?",
    options: [
      { label: "That I'm only loved for what I do for people.", w: { 2: 1 } },
      { label: "That without my achievements I'd be nothing.", w: { 3: 1 } },
      { label: "That something essential is missing in me.", w: { 4: 1 } },
      { label: "That I'll be left without support when it really matters.", w: { 6: 1 } }
    ] },
  { text: "Under sustained pressure, which do you become?",
    options: [
      { label: "Sharper and more controlling.", w: { 8: 1, 1: 0.3 } },
      { label: "Busier — I outrun stress with activity.", w: { 3: 1, 7: 0.3 } },
      { label: "Withdrawn — I need space to think.", w: { 5: 1 } },
      { label: "Scattered and reassurance-seeking.", w: { 6: 1 } }
    ] },
  { text: "What do the people who love you most often complain about?",
    options: [
      { label: "That I meddle or smother.", w: { 2: 1 } },
      { label: "That I nitpick or moralize.", w: { 1: 1 } },
      { label: "That I steamroll.", w: { 8: 1 } },
      { label: "That I space out and avoid.", w: { 9: 1 } },
      { label: "That I live in my feelings too much.", w: { 4: 1 } }
    ] }
];

const MC_EXTRA = [
  { text: "When you receive pointed criticism, what happens?",
    options: [
      { label: "I measure it against my own standards — if it's right, it stings for days.", w: { 1: 1 } },
      { label: "I look unbothered and privately rework my image around it.", w: { 3: 1 } },
      { label: "It confirms things I already suspected were defective in me.", w: { 4: 1 } },
      { label: "I counterattack or dismiss the source.", w: { 8: 1 } },
      { label: "I go quiet and agreeable — then do what I wanted anyway.", w: { 9: 1 } }
    ] },
  { text: "Which best describes your relationship with your own needs?",
    options: [
      { label: "I know what I need and I take it.", w: { 8: 1 } },
      { label: "I discover my needs late — often only after burnout.", w: { 2: 1, 9: 0.3 } },
      { label: "I keep my needs small so I owe nothing to anyone.", w: { 5: 1 } },
      { label: "They feel bottomless, so sometimes I dramatize them.", w: { 4: 1 } }
    ] },
  { text: "In close relationships, which recurring pattern is most yours?",
    options: [
      { label: "I test loyalty and read commitment signals constantly.", w: { 6: 1 } },
      { label: "I idealize, then feel let down by ordinary reality.", w: { 4: 1, 7: 0.3 } },
      { label: "I merge — their preferences quietly become mine.", w: { 9: 1, 2: 0.3 } },
      { label: "I stay busy enough that depth has to catch me in motion.", w: { 3: 1, 7: 0.5 } }
    ] },
  { text: "Plans collapse at the last minute. What's your honest reaction?",
    options: [
      { label: "Honestly? Relieved — more space for me.", w: { 5: 1, 9: 0.3 } },
      { label: "Annoyed — I'd structured everything around them.", w: { 1: 1, 6: 0.3 } },
      { label: "Already generating a better alternative.", w: { 7: 1 } },
      { label: "Checking whether anyone's disappointed and needs support.", w: { 2: 1 } }
    ] },
  { text: "Which best describes your anger?",
    options: [
      { label: "It's fast, clean, and over quickly.", w: { 8: 1 } },
      { label: "It simmers as irritation at carelessness.", w: { 1: 1 } },
      { label: "It comes out as tears or brooding more than heat.", w: { 4: 1 } },
      { label: "It rarely surfaces — I go pleasant and immovable instead.", w: { 9: 1 } }
    ] },
  { text: "How do you make big decisions?",
    options: [
      { label: "Fast — I decide and correct course later.", w: { 8: 1, 7: 0.3, 3: 0.3 } },
      { label: "I research until the decision makes itself.", w: { 5: 1, 6: 0.3 } },
      { label: "I canvass people I trust first.", w: { 6: 1, 2: 0.3 } },
      { label: "I postpone until circumstances decide for me.", w: { 9: 1 } }
    ] },
  { text: "Which best describes your work style?",
    options: [
      { label: "Efficient and image-aware — results that show.", w: { 3: 1 } },
      { label: "Meticulous — right beats fast.", w: { 1: 1 } },
      { label: "Mood-dependent — inspired or nothing.", w: { 4: 1 } },
      { label: "Parallel projects, strong starts, easily bored.", w: { 7: 1 } },
      { label: "Steady and supportive — I keep the team comfortable.", w: { 9: 1, 2: 0.3 } }
    ] },
  { text: "What exhausts you most?",
    options: [
      { label: "Emotional demands and intrusions on my time.", w: { 5: 1 } },
      { label: "Chaos and lowered standards.", w: { 1: 1 } },
      { label: "Conflict and pressure to take sides.", w: { 9: 1 } },
      { label: "Slowness — meetings, waiting, repetition.", w: { 3: 1, 7: 0.3, 8: 0.3 } }
    ] },
  { text: "Deep down, what does your self-respect most depend on?",
    options: [
      { label: "Being needed and appreciated.", w: { 2: 1 } },
      { label: "Being competent and knowledgeable.", w: { 5: 1 } },
      { label: "Being prepared, safe, and backed up.", w: { 6: 1 } },
      { label: "Being free — no cages, no missed experiences.", w: { 7: 1 } }
    ] },
  { text: "When you meet someone genuinely impressive, what do you do?",
    options: [
      { label: "I compare, and feel the gap.", w: { 4: 1, 3: 0.3 } },
      { label: "I study how they got there.", w: { 3: 1, 5: 0.3 } },
      { label: "I test whether they're solid or bluffing.", w: { 8: 1, 6: 0.3 } },
      { label: "I look for what they might need from me.", w: { 2: 1 } }
    ] },
  { text: "Which compliment would land deepest?",
    options: [
      { label: "\"You make everything better for everyone around you.\"", w: { 2: 1, 9: 0.3 } },
      { label: "\"You see what no one else sees.\"", w: { 4: 1, 5: 0.3 } },
      { label: "\"Nothing gets past you — you kept us out of trouble.\"", w: { 6: 1, 1: 0.3 } },
      { label: "\"Life is bigger and brighter when you're around.\"", w: { 7: 1 } }
    ] }
];

/* Discriminators: a type and its look-alike side by side. */
const MC_DISC_CORE = [
  { text: "Which is closer to your relationship with focus?",
    options: [
      { label: "I can focus deeply on what matters to me; I scatter mainly to escape boredom or pain.", w: { 7: 0.5 } },
      { label: "My focus fails everywhere — even on things I love — and it's been that way since childhood.", c: { adhd: 1 } },
      { label: "Neither — sustained focus is generally fine for me.", w: {} }
    ] },
  { text: "Which is closer to your relationship with worry?",
    options: [
      { label: "My vigilance feels like wisdom — being prepared works, and I mostly endorse it.", w: { 6: 0.5 } },
      { label: "My worry feels like an affliction — physical, uncontrollable, often irrational by my own judgment.", c: { anxiety: 1 } },
      { label: "Neither — I'm not particularly vigilant or worried.", w: {} }
    ] },
  { text: "Which is closer to your experience of low moods?",
    options: [
      { label: "Melancholy or placid lowness is my lifelong temperament, and it coexists with real enjoyment.", w: { 4: 0.3, 9: 0.2 } },
      { label: "Low periods descend like an illness — weeks of losing interest in everything, with sleep or appetite changes.", c: { depression: 1 } },
      { label: "Neither really fits me.", w: {} }
    ] }
];

const MC_DISC_FULL = [
  { text: "Which is truer of you socially?",
    options: [
      { label: "I read social currents fine — I just find them draining, so I retreat to conserve energy.", w: { 5: 0.5 } },
      { label: "Unwritten social rules have never come naturally — I've studied them deliberately, and intense sensory environments can genuinely overwhelm me.", c: { autism: 1 } },
      { label: "Neither — socializing is fairly natural and fine.", w: {} }
    ] },
  { text: "Which best describes your guardedness or vigilance?",
    options: [
      { label: "It feels like native temperament — no particular origin, just how I've always met the world.", w: { 6: 0.3, 8: 0.2 } },
      { label: "It has a clear before-and-after: it began with overwhelming events, and reminders still set me off.", c: { trauma: 1 } },
      { label: "I'm not especially guarded.", w: {} }
    ] },
  { text: "Which best describes your standards?",
    options: [
      { label: "They're ideals I believe in — high, but I can flex them when life requires it.", w: { 1: 0.5 } },
      { label: "They're rules and rituals I can't skip without intense discomfort, even when I agree they're hurting me.", c: { ocpd: 1 } },
      { label: "I'm fairly relaxed about standards.", w: {} }
    ] },
  { text: "When you avoid social situations, what's usually the real reason?",
    options: [
      { label: "I'd rather protect my time, energy, or peace.", w: { 5: 0.3, 9: 0.2 } },
      { label: "I want to go, but fear of embarrassment stops me — and I replay my missteps for days afterward.", c: { socialanx: 1 } },
      { label: "I don't often avoid social situations.", w: {} }
    ] },
  { text: "Which best describes your upbeat, high-energy stretches?",
    options: [
      { label: "They're my normal setting — steady across months and years.", w: { 7: 0.4 } },
      { label: "They come in episodes with noticeably less need for sleep and racing thoughts, unlike my usual self.", c: { hypomania: 1 } },
      { label: "Neither — my energy is fairly even or on the low side.", w: {} }
    ] }
];

/* Instinct triads (forced choice) for the exhaustive multiple-choice test. */
const MC_INSTINCTS = [
  { text: "It's Friday night with zero obligations. The genuinely best version:",
    options: [
      { label: "Home: good food, comfortable clothes, nobody needing anything from me.", i: { sp: 1 } },
      { label: "A gathering — hosting or joining the people I belong with.", i: { so: 1 } },
      { label: "One person, one long conversation that goes somewhere deep.", i: { sx: 1 } }
    ] },
  { text: "Walking into a party, what do you notice first?",
    options: [
      { label: "Temperature, food, seating, exits.", i: { sp: 1 } },
      { label: "The social map — who's here, who matters, who's talking to whom.", i: { so: 1 } },
      { label: "Whether anyone here is interesting enough to fixate on.", i: { sx: 1 } }
    ] },
  { text: "Which loss would hit hardest?",
    options: [
      { label: "My financial cushion and home base.", i: { sp: 1 } },
      { label: "My standing and belonging in my communities.", i: { so: 1 } },
      { label: "The charged closeness with my person.", i: { sx: 1 } }
    ] },
  { text: "Your friends would describe you as…",
    options: [
      { label: "The prepared one, who always has what's needed.", i: { sp: 1 } },
      { label: "The connector, who knows everyone.", i: { so: 1 } },
      { label: "The intense one, all-or-nothing about people.", i: { sx: 1 } }
    ] },
  { text: "A perfect vacation is…",
    options: [
      { label: "Comfortable, safe, and well-provisioned — a nest away from home.", i: { sp: 1 } },
      { label: "Shared — a group trip with the people I love being part of.", i: { so: 1 } },
      { label: "With one person, somewhere that makes us feel more alive.", i: { sx: 1 } }
    ] }
];

const SHORT_MC = [...MC_CORE, ...MC_DISC_CORE];
const FULL_MC = [...MC_CORE, ...MC_EXTRA, ...MC_DISC_CORE, ...MC_DISC_FULL, ...MC_INSTINCTS];

if (typeof module !== "undefined") {
  module.exports = { SHORT_TEST, FULL_TEST, SHORT_MC, FULL_MC };
}
