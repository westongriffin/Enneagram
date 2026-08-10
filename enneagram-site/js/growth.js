/* Growth paths: health levels, practices, and early-warning signs per type.
 * Level sketches condense the Riso–Hudson levels-of-development idea into
 * three bands; practices are standard inner-work staples matched to type.
 */

const GROWTH = {
  1: {
    healthy: "Wise, discerning, and genuinely serene. The inner critic retires into conscience: Ones at their best act on their ideals without punishing themselves or anyone else, and can laugh — really laugh — at imperfection, including their own.",
    average: "Tense, scheduled, and quietly resentful. The critic narrates everything; relaxation must be earned and never quite is. Irritation leaks out as correction, and 'should' runs the calendar.",
    unhealthy: "Punitive and obsessive. Standards become cudgels, self-denial turns severe, and the anger that was never allowed out turns fully inward — or explodes at hypocrisy everywhere but home.",
    watchFor: "The first sign of sliding is irritation seeping into every small interaction — traffic, typos, how the dishwasher was loaded.",
    practices: [
      "Name the critic out loud ('there's the judge again') — naming it is the fastest way to stop being it.",
      "Schedule deliberate imperfection: send the B+ email, leave the picture crooked, and observe that nothing collapses.",
      "Move the anger physically — run, chop wood, scrub — before it composts into resentment.",
      "Borrow your growth arrow on purpose: plan play with no goal, no self-improvement, no lesson (that's the Seven direction)."
    ]
  },
  2: {
    healthy: "Genuinely loving and free. Healthy Twos give without invoices, receive without squirming, and know their own needs as well as they know everyone else's. Their care becomes unconditional because it's no longer a survival strategy.",
    average: "Warm but keeping score. Help arrives before it's requested, needs go chronically unstated, and appreciation becomes the currency the household secretly runs on.",
    unhealthy: "Martyred and manipulative. Giving turns coercive ('after all I've done'), physical health breaks under self-neglect, and love is claimed through guilt.",
    watchFor: "The first sign of sliding is mentally rehearsing what you've done for people who haven't thanked you.",
    practices: [
      "Take a daily needs inventory: three times a day, ask 'what do I need right now?' — and answer before helping anyone.",
      "Ask before helping. Every time. 'Would you like help with that?' converts intrusion into love.",
      "Practice receiving without reciprocating: let a favor stand for a week before returning it.",
      "Borrow your growth arrow: spend Four-style time alone with your own feelings, making something that serves nobody."
    ]
  },
  3: {
    healthy: "Authentic and self-accepting. Healthy Threes still achieve — brilliantly — but the engine changes from proving worth to expressing it. They become the mentor who makes everyone else feel capable, and can rest without an identity crisis.",
    average: "Polished, fast, and subtly absent. Feelings are postponed for efficiency, the self-presentation is A/B tested even at home, and rest feels like losing.",
    unhealthy: "Hollow and deceptive. The image swallows the person: embellishment becomes lying, exhaustion is denied until collapse, and being unmasked feels like death.",
    watchFor: "The first sign of sliding is managing your image with the people who already love you.",
    practices: [
      "Schedule unproductive time and protect it like a board meeting — nothing performed, nothing posted.",
      "Run a feelings check three times a day: 'what am I feeling right now?' — the question Threes forget exists.",
      "Tell one unimpressive truth a week to someone safe ('I'm tired', 'I failed at this', 'I don't know').",
      "Borrow your growth arrow: commit to something bigger than your image, Six-style — a team, a cause, a person — and stay when it stops flattering you."
    ]
  },
  4: {
    healthy: "Profoundly creative and emotionally honest — equanimity without flatness. Healthy Fours transform pain into meaning for everyone, stay present to ordinary life without needing it to be dramatic, and discover that nothing essential was ever missing.",
    average: "Moody, self-conscious, and longing. Feelings are amplified by revisiting; the ordinary present loses to the idealized absent; identity gets built from what hurts.",
    unhealthy: "Self-absorbed and self-sabotaging. Envy corrodes, shame spirals, help is rejected for not understanding — and the suffering that once felt meaningful becomes the whole self.",
    watchFor: "The first sign of sliding is rejecting good things because they arrived in ordinary packaging.",
    practices: [
      "Practice gratitude for the unremarkable: name three ordinary things daily that are quietly good and completely undramatic.",
      "Act independently of mood: keep small commitments especially when uninspired — mood follows action more than it leads.",
      "Give rumination a container: fifteen minutes with the feeling, fully — then a deliberate change of scene.",
      "Borrow your growth arrow: adopt One-style structure — routines and discipline aren't the enemy of depth; they're its studio."
    ]
  },
  5: {
    healthy: "Visionary and engaged. Healthy Fives discover the battery recharges through contact, not only away from it: they share what they know, feel their feelings in real time, and participate in the world they used to only observe.",
    average: "Withdrawn and rationing. Time, energy, and presence are budgeted like wartime supplies; competence substitutes for contact; life is prepared for more than lived.",
    unhealthy: "Isolated and nihilistic. The castle becomes a bunker: needs shrink toward zero, people become intrusions, and thinking detaches from a body that's barely inhabited.",
    watchFor: "The first sign of sliding is canceling plans to conserve energy you actually have.",
    practices: [
      "Practice being in your body daily — walk, stretch, cook — attention below the neck, not another input stream.",
      "Share before you're ready: offer the half-formed thought, the unpolished draft, the feeling still in progress.",
      "Say yes to low-stakes spontaneity once a week — the coffee, the walk, the call — before the cost-benefit analysis finishes.",
      "Borrow your growth arrow: make small decisions fast and act on them, Eight-style — confidence is built in motion, not in research."
    ]
  },
  6: {
    healthy: "Courageous and grounded — the scanning mind matured into genuine foresight. Healthy Sixes trust themselves, so they can finally trust others sanely; they become the steadiest person in the room precisely because they know where the exits are.",
    average: "Vigilant and doubting. Decisions require outside votes, authorities are obeyed and resented, worst cases are rehearsed nightly, and reassurance evaporates on contact.",
    unhealthy: "Panicked or paranoid. Suspicion turns on allies, dependency and defiance alternate violently, and anxiety hardens into either clinging or preemptive attack.",
    watchFor: "The first sign of sliding is asking a second person the question the first person already answered.",
    practices: [
      "Keep an evidence journal: write the fear, write what actually happened, and review monthly — your track record is the antidote.",
      "Make small bets before certainty: act on 70% confidence weekly and let results, not reassurance, build the trust.",
      "Keep a self-trust list — every judgment call you got right — and read it before decisions, not after doubts.",
      "Borrow your growth arrow: practice Nine-style rest — breath low and slow, body unclenched — the calm isn't naivety, it's capacity."
    ]
  },
  7: {
    healthy: "Joyful and present. Healthy Sevens still sparkle, but the joy deepens from anticipation to appreciation: they finish what they start, stay through difficulty, and discover that satisfaction was never in the next thing.",
    average: "Busy and scattered. The calendar is armor; commitment feels like loss; pain is reframed before it's felt; everything is fine, fine, great, next.",
    unhealthy: "Frantic and escapist. Consumption accelerates — plans, purchases, substances, people — while an unfelt grief compounds interest underneath.",
    watchFor: "The first sign of sliding is booking something into every quiet space in the week.",
    practices: [
      "Finish one thing before starting the next — one project, one book, one conversation — and notice the specific pleasure of completion.",
      "Stay five more minutes: when discomfort arrives, don't reframe, don't joke, don't leave — just stay and breathe.",
      "Practice savoring: one meal, walk, or song a day with full attention — depth is stimulation too.",
      "Borrow your growth arrow: go Five-deep on one subject for a season and let focus prove it isn't prison."
    ]
  },
  8: {
    healthy: "Magnanimous and openhearted. Healthy Eights use their strength for people instead of over them: the armor comes off with safe people, tenderness stops being a security risk, and their protection becomes shelter instead of control.",
    average: "Armored and expansive. Everything is a test of solidity; softness is private or nonexistent; intensity substitutes for intimacy; being contradicted feels like being challenged.",
    unhealthy: "Domineering and vengeful. Control hardens into intimidation, betrayal is seen everywhere, and destruction — of relationships, of self — starts to feel like power.",
    watchFor: "The first sign of sliding is turning ordinary disagreements into loyalty tests.",
    practices: [
      "Name one vulnerability a week to someone safe — spoken softness is strength training, not exposure.",
      "Ask instead of taking: 'would you…?' where 'do this' used to be — consent is more powerful than command.",
      "Delay the counterpunch by one full day; most attacks turn out to have been clumsiness, not war.",
      "Borrow your growth arrow: practice Two-style care with no agenda — protect someone who can never repay you, gently."
    ]
  },
  9: {
    healthy: "Present and self-possessed — peace upgraded from anesthesia to power. Healthy Nines know what they want and say so; their calm becomes an active force that settles rooms and bridges people without erasing themselves.",
    average: "Pleasant and fading. Preferences dissolve into others' plans, routines eat evenings, anger naps underground, and 'whatever you'd like' answers every question.",
    unhealthy: "Stubbornly checked out. Neglect — of self, tasks, truth — becomes a fortress; the buried anger leaks as immovable passive resistance; life is watched from the couch of oneself.",
    watchFor: "The first sign of sliding is agreeing to things you have no intention of doing.",
    practices: [
      "Declare one preference daily — restaurant, movie, plan — before asking anyone else's.",
      "Practice anger-noticing: irritation is information; log it instead of erasing it, and act on one item a week.",
      "Have one uncomfortable conversation per week; disharmony survived is intimacy gained.",
      "Borrow your growth arrow: pursue one personal goal Three-style — visible, scheduled, and yours — and let people see you want it."
    ]
  }
};

if (typeof module !== "undefined") {
  module.exports = { GROWTH };
}
