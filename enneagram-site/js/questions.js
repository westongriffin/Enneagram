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
  { text: "I ration my time and energy like scarce resources.", w: { 5: 1 } },
  { text: "I withdraw to think things through, and engage only after I've figured them out.", w: { 5: 1 } },
  { text: "Being intruded on — emotionally or practically — drains me more than it seems to drain others.", w: { 5: 1 }, c: { autism: 0.3 } },
  { text: "I accumulate knowledge and skills to feel capable enough to face the world.", w: { 5: 1, 6: 0.2 } },
  { text: "In the moment I detach from feelings; I process them later, alone.", w: { 5: 1, 9: 0.2 } },
  { text: "I keep my needs small so that nothing and no one can hold anything over me.", w: { 5: 1 } },

  // ---- Type 6 ----
  { text: "I rehearse worst-case scenarios so nothing can catch me unprepared.", w: { 6: 1 }, c: { anxiety: 0.4 } },
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
  { text: "Around social events I'm consumed by fear of humiliation — dreading beforehand, replaying mistakes afterward.", c: { socialanx: 1 } }
];

if (typeof module !== "undefined") {
  module.exports = { SHORT_TEST, FULL_TEST };
}
