# Techies Community

Landing page for Techies Community, an engineering collective for people who
build things. Dark theme, scroll-driven layout, and a retrieval-backed
assistant that answers questions about the community.

Live sections, top to bottom:

| Section | What it does |
| --- | --- |
| Hero | Full-bleed HLS video background with the headline pinned to the bottom of the viewport |
| Why | Four panels that stack on scroll, each collapsing into a labelled tab |
| Showcase | Asymmetric card grid with a working tab filter |
| Build | Heading and intro stay pinned while a card rail pans horizontally |
| TechPass | Live credential builder - everything renders client side as you type |
| FAQ | Accordion |
| Footer | Link columns and an infinite marquee wordmark |
| Chat | Floating assistant, RAG over a local knowledge base |

## Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind v4 for utilities, plain CSS in `globals.css` for anything structural
- hls.js for the hero stream
- lucide-react for icons
- Gemini API for the chat assistant

## Running it

```bash
npm install
cp .env.example .env.local   # then paste your key in
npm run dev
```

Open http://localhost:3000.

### Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | for the chat widget | Get one from https://aistudio.google.com/apikey |
| `GEMINI_MODEL` | no | Defaults to `gemini-2.5-flash` |

The key is read only inside the route handler, so it never reaches the browser.
Do not prefix it with `NEXT_PUBLIC_`.

Everything except the chat widget works without a key - the widget will return
a 500 and show an error message in the panel.

## How the chat works

`src/lib/knowledge.ts` holds the corpus as short single-topic chunks. On the
first request the route embeds all of them with `gemini-embedding-001` and
keeps the vectors in module memory for the life of the process. Each incoming
question is embedded as a retrieval query, ranked against the corpus by cosine
similarity, and only the top 4 chunks are passed to the model as context.

If the embedding call fails the route falls back to word-overlap ranking, so
the assistant degrades instead of breaking.

The system prompt confines answers to the retrieved context. Ask it something
the corpus does not cover and it says so rather than guessing.

To change what the bot knows, edit `src/lib/knowledge.ts` and restart - there
is no vector database and no build step for the index.

## Layout

```
src/
  app/
    api/chat/route.ts   retrieval + generation
    globals.css         design tokens, section styles, responsive rules
    layout.tsx          fonts, preconnects
    page.tsx            section order
  components/           one file per section
  lib/
    fonts.ts            next/font setup
    knowledge.ts        chat corpus
  assets/               generated card art
```

Section styles live in `globals.css` rather than utility classes. Sticky
offsets are driven by `--nav-h` and `--stack-step` so the nav height and the
stacking rhythm can shrink together at each breakpoint.

## Motion and accessibility

Scroll-jacking is disabled under `prefers-reduced-motion` and on screens
narrower than 640px, where the pinned rail becomes a native swipeable list.
Hover-only transforms are suppressed on coarse pointers. Full-height sections
use `dvh` so mobile browser chrome collapsing does not resize a pinned element
mid-scroll.

## Performance

Videos are not fetched on load. Panel and showcase clips attach their `src`
only once they come within 300px of the viewport, and hls.js is deferred to
`requestIdleCallback` so the hero's first paint is not competing with it.
Card art is served as AVIF with blur placeholders, which takes the source
PNGs from roughly 85KB down to about 1KB each over the wire.

## Known gaps

- The images in `src/assets` are procedurally generated placeholders, not
  brand artwork. Same for the logo.
- The QR block on the TechPass card is decorative. It is a deterministic
  pattern hashed from the form values, not a scannable code.
- TechPass export covers Print/PDF and copy-to-clipboard. PNG export would
  need a DOM rasteriser and is not wired up.
- `/api/chat` has no rate limiting. Add one before putting this on a public
  domain or anyone who finds the endpoint can spend your Gemini quota.
- Media URLs for the hero stream and panel clips are hardcoded in the
  components. Move them to env vars if they need to be swapped per
  environment.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```
