// Source of truth for the assistant. Keep chunks short and single-topic -
// retrieval works better on focused passages than long pages.
export type Doc = { id: string; title: string; text: string };

export const KNOWLEDGE: Doc[] = [
  {
    id: "what-we-are",
    title: "What Techies Community is",
    text: "Techies Community is not a traditional student club or a passive study group. It is an autonomous engineering ecosystem built for creators who forge their own paths. Members design, code and scale breakthrough zero-to-one technologies across global domains. There are no gatekeepers - it is an open ecosystem where knowledge and resources are shared.",
  },
  {
    id: "who-its-for",
    title: "Who it is for",
    text: "It is for builders who already start things: students, self-taught engineers and early-career developers who want to ship real software alongside people who will push them. You do not need a degree or a referral. You do need something you are working on.",
  },
  {
    id: "cost",
    title: "Cost and membership",
    text: "Core membership is free and always will be. Guild infrastructure, mentor hours and demo day are funded by the partner network rather than by members. Optional paid intensives exist, but nothing behind the main door is gated.",
  },
  {
    id: "guilds",
    title: "Guilds",
    text: "A guild is a self-directed pod of five to nine people who own a domain end to end. Guilds set their own cadence, run their own reviews and answer to the work rather than a syllabus. New members join a guild within their first fortnight. This is the Autonomy Protocol: distributed guild nodes that run themselves.",
  },
  {
    id: "sprints",
    title: "Sprints and time commitment",
    text: "Work runs in two-week sprint cycles that end in a working demo, not a status update. Most members spend six to ten hours a week: one sprint session, one architecture review and their own build time. You can pause between cycles without losing your place.",
  },
  {
    id: "reviews",
    title: "Architecture reviews and mentorship",
    text: "Senior engineers tear down your design before you write the code. Mentorship runs as weekly small-group office hours with staff engineers from the teams that are hiring, plus pair-review. Every member gets access to high-concurrency cloud clusters, mentor code reviews and direct investor channels.",
  },
  {
    id: "prerequisites",
    title: "Skill prerequisites",
    text: "You do not need to be an advanced developer, but you do need fundamentals: you should be able to build and deploy something small on your own. Everything above that line is taught through pair-review rather than lectures.",
  },
  {
    id: "techpass",
    title: "TechPass",
    text: "A TechPass is your portable credential in the network: identity, expertise matrix and verified builder status in one card. You choose a name, role, organisation, up to six expertise tags, social links and a card accent style. It is generated entirely in your browser - nothing is uploaded to a server, there is no tracking and no database.",
  },
  {
    id: "joining",
    title: "How to join",
    text: "Claim a TechPass, then bring a project to the next open sprint. There is no application queue and no gatekeeping committee. You are evaluated on what you build once you are inside.",
  },
  {
    id: "open-source",
    title: "Open source and knowledge base",
    text: "The community is public by default. Architecture decisions, post-mortems and templates all live in the shared knowledge base. Members can keep commercial projects private, but learning artefacts stay open.",
  },
  {
    id: "live-build",
    title: "Live Build Matrix",
    text: "Global hackathons and sprints run continuously across time zones, with around 42 swarms deployed at any given moment. Demo day is where members ship in front of the people who hire, fund and build alongside them.",
  },
  {
    id: "tracks",
    title: "Customizable tracks",
    text: "Techies Community makes launching your own track accessible, simple to customize, smooth to maintain and quick to bring to market. The programme is anchored by a fast core curriculum and a universe of specialist paths, all connected through shared mentorship.",
  },
  {
    id: "values",
    title: "Culture and values",
    text: "High agency only: no gatekeepers, no passive seats. You arrive with something to build and leave having shipped it with people who pushed you. Questions are answered in the open so the next person finds the answer too.",
  },
  {
    id: "support",
    title: "Getting help",
    text: "Every question gets answered in the public channel rather than in private, so answers compound for everyone. You can reach the community through the community hub, events, the newsletter or Discord.",
  },
];
