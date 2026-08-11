/* Practical, relational content per type: how to communicate with them,
 * working alongside them, managing them, and community-typed examples
 * (fictional-forward, explicitly speculative). */

const PRACTICAL = {
  1: {
    essence: "Strives to be good — and to make it right",
    communicate: [
      "Be precise and keep your word — sloppiness reads to them as disrespect.",
      "Criticize gently and privately: they've already criticized themselves first, and harder.",
      "Acknowledge their effort to be good; it's the thing they most doubt about themselves."
    ],
    work: [
      "Give them ownership of quality and clear standards — ambiguity is quiet torture.",
      "Protect them from perfectionism spirals on low-stakes tasks; not everything deserves an A+."
    ],
    manage: [
      "Never correct them in public; do praise their judgment, specifically.",
      "Model that done beats perfect — for a One, that permission has to come from above."
    ],
    famous: ["Atticus Finch", "Hermione Granger", "Mary Poppins", "Captain America"]
  },
  2: {
    essence: "Needs to be needed",
    communicate: [
      "Say thank you specifically and often — vague gratitude doesn't land.",
      "Ask about them, then gently insist when they deflect the question back to you.",
      "Don't mistake warmth for endless capacity; check for burnout they won't report."
    ],
    work: [
      "They're the glue: connectors, morale-keepers, client-whisperers.",
      "Watch their yes count — they'll commit past their limits rather than disappoint."
    ],
    manage: [
      "Appreciate publicly; assign boundaries privately.",
      "Give them people-facing roles — pure solo work starves them."
    ],
    famous: ["Samwise Gamgee", "Molly Weasley", "Leslie Knope", "Dolly Parton"]
  },
  3: {
    essence: "Becomes whatever succeeds",
    communicate: [
      "Be efficient; respect their time and they'll respect yours.",
      "Praise the person, not just the results — and mean it.",
      "Give them room to be unimpressive; don't punish the mask for coming off."
    ],
    work: [
      "Point them at a goal and get out of the way.",
      "They optimize whatever is measured — so measure what actually matters."
    ],
    manage: [
      "Frame feedback as a performance upgrade and it lands; frame it as personal and the image-defense goes up.",
      "Watch for exhaustion hidden behind polish — Threes crash without warning lights."
    ],
    famous: ["Don Draper", "Rachel Berry", "Tom Brady", "Oprah Winfrey"]
  },
  4: {
    essence: "Searches for the missing piece",
    communicate: [
      "Don't rush to fix their feelings — witness them first; solutions can wait ten minutes.",
      "Choose authenticity over politeness; they smell a script instantly.",
      "Reassure belonging out loud: their default assumption is that they're about to be left out."
    ],
    work: [
      "Connect the work to meaning — a task with no 'why' gets their least interested self.",
      "Expect an uneven rhythm: brilliance arrives in waves, not a steady drip."
    ],
    manage: [
      "Standardized recognition insults them; personal, specific recognition fuels them for months.",
      "Pair them with finishers, and protect the finishing from becoming the standard they're judged by."
    ],
    famous: ["Frida Kahlo", "Bob Dylan", "Severus Snape", "Amélie"]
  },
  5: {
    essence: "Conserves energy, collects understanding",
    communicate: [
      "Schedule conversations instead of springing them — ambush costs them double.",
      "Silence is processing, not absence; wait it out.",
      "Respect the closed door: interruptions cost a Five more than you think."
    ],
    work: [
      "Depth roles fit best: research, architecture, analysis, the hard unglamorous problem.",
      "Don't measure them by meetings attended or messages sent."
    ],
    manage: [
      "Give autonomy and a clear scope; check in at agreed intervals, not randomly.",
      "Invite their input explicitly in groups — they will not fight for airtime."
    ],
    famous: ["Sherlock Holmes", "Lisbeth Salander", "Albert Einstein", "Bruce Banner"]
  },
  6: {
    essence: "Scans for danger, gives loyalty",
    communicate: [
      "Be consistent; reliability is the entire love language.",
      "Answer the 'what ifs' seriously instead of waving them away — dismissal doubles the worry.",
      "Say the quiet part: unspoken agendas switch their scanner to maximum."
    ],
    work: [
      "Superb troubleshooters and devil's advocates — assign that role on purpose.",
      "Hand them the risk register; they've already written it in their head."
    ],
    manage: [
      "Praise the foresight; never mock the worry.",
      "Deliver bad news early — a surprise corrodes trust permanently."
    ],
    famous: ["Ron Weasley", "Ellen Ripley", "George Costanza", "Woody (Toy Story)"]
  },
  7: {
    essence: "Chases the next bright thing",
    communicate: [
      "Bring energy; lead with possibilities before problems.",
      "Let the excitement finish before you ask for the follow-through plan.",
      "Offer options, never ultimatums — a cornered Seven is already out the window."
    ],
    work: [
      "Ideation, launches, and rallying a room: unmatched.",
      "Pair them with closers, and celebrate finished things as loudly as started ones."
    ],
    manage: [
      "Frame constraints as challenges, not cages.",
      "Short sprints with visible variety beat long slogs every time."
    ],
    famous: ["Peter Pan", "Tigger", "Jack Sparrow", "Robin Williams"]
  },
  8: {
    essence: "Takes charge, guards the soft core",
    communicate: [
      "Be direct; hedging reads as hiding something.",
      "Push back when you disagree — respect is earned through solidity, not agreement.",
      "Never bluff. A broken word goes in the permanent file."
    ],
    work: [
      "Give real authority or don't bother — fake empowerment enrages them.",
      "They defend their team ferociously; aim that power at real external problems."
    ],
    manage: [
      "Challenge them openly and fairly; anything behind the back is unforgivable.",
      "Ask them to protect rather than dominate — the reframe changes everything."
    ],
    famous: ["Winston Churchill", "Tony Soprano", "Erin Brockovich", "Mufasa"]
  },
  9: {
    essence: "Keeps the peace, forgets themselves",
    communicate: [
      "Ask their opinion directly — then wait through the pause without filling it.",
      "Don't interrupt; they fold rather than fight for the floor.",
      "Ask about the small preferences often; unexpressed, they atrophy."
    ],
    work: [
      "Natural mediators — put them where factions meet.",
      "Deadlines are kindness; open-ended tasks drift into the fog."
    ],
    manage: [
      "Never mistake agreeableness for agreement — verify commitment explicitly.",
      "Grant explicit permission to disagree, and they become the wisest voice in the room."
    ],
    famous: ["The Dude (The Big Lebowski)", "Winnie the Pooh", "Frodo Baggins", "Keanu Reeves"]
  }
};

if (typeof module !== "undefined") {
  module.exports = { PRACTICAL };
}
