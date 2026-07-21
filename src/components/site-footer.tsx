const COLUMNS = [
  {
    title: "About",
    links: [
      "About Techies",
      "The Foundation",
      "Blog",
      "Contact Us",
      "Press",
      "Merch Store",
      "Support",
    ],
  },
  {
    title: "Build",
    links: [
      "Developer Hub",
      "Documentation",
      "Academy",
      "Tools",
      "Grants",
      "Integrations",
      "Hackathons",
      "Builder Console",
      "Bug Bounty",
    ],
  },
  {
    title: "Programs",
    links: [
      "Guilds",
      "Sprints",
      "Architecture Reviews",
      "Mentorship",
      "Demo Day",
      "Student Program",
    ],
  },
  {
    title: "Community",
    links: [
      "Community Hub",
      "Events",
      "Newsletter",
      "Ecosystem",
      "Discord",
      "Open Knowledge",
    ],
  },
];

const LEGAL = [
  "Terms of Use",
  "Privacy Policy",
  "Trademark Policy",
  "Important Notice",
  "Code of Conduct",
];

const SOCIALS = ["GitHub", "Discord", "X", "LinkedIn", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <a href="#" className="ft-mark" aria-label="Techies Community">
          <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden>
            <path d="M52 0 H68 V44 H120 V60 H68 V120 H52 V60 H0 V44 H52 Z" />
          </svg>
        </a>

        <nav className="ft-cols" aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="ft-stack">
            <div>
              <h3>Legal</h3>
              <ul>
                {LEGAL.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Socials</h3>
              <ul>
                {SOCIALS.map((l) => (
                  <li key={l}>
                    <a href="#">{l} →</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Oversized wordmark, marqueeing across the base of the page */}
      <div className="ft-marquee" aria-hidden>
        <div className="ft-marquee-track">
          <span>techies community</span>
          <span>techies community</span>
          <span>techies community</span>
          <span>techies community</span>
        </div>
      </div>

      <div className="ft-base">
        <span>© {new Date().getFullYear()} Techies Community</span>
        <span>Built in the open.</span>
      </div>
    </footer>
  );
}
