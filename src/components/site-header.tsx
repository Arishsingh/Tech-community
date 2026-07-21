"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const LINKS = ["TechPass", "Events", "Connections Hub", "Contact Us"];

const linkStyle: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* fixed over every section */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <nav
          className="flex items-center justify-between"
          style={{
            paddingTop: "28px",
            paddingBottom: "28px",
            paddingLeft: "clamp(24px, 4vw, 56px)",
            paddingRight: "clamp(24px, 4vw, 56px)",
          }}
        >
          <a href="#" aria-label="Techies Community" className="press shrink-0">
            <Logo />
          </a>

          <ul
            className="hidden items-center md:flex"
            style={{ gap: "56px", listStyle: "none" }}
          >
            {LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="press block text-white transition-[color,transform] duration-150 hover:text-white/70"
                  style={linkStyle}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="press hidden items-center rounded-full bg-white md:inline-flex"
            style={{ padding: "4px 4px 4px 18px", gap: "10px" }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: 600, color: "#111318" }}
            >
              Claim TechPass
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#1c1f26",
              }}
            >
              <ArrowRight size={14} color="#fff" />
            </span>
          </a>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="press text-white md:hidden"
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </header>

      {/* kept mounted so it can animate out */}
      <div
        inert={!open}
        aria-hidden={!open}
        data-open={open}
        className="invisible fixed inset-0 z-50 bg-[#000000] opacity-0 transition-[opacity,visibility] duration-200 data-[open=true]:visible data-[open=true]:opacity-100 md:hidden"
      >
        <div
          className="flex items-center justify-between px-6"
          style={{ paddingTop: "28px", paddingBottom: "28px" }}
        >
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="press text-white"
          >
            <X className="size-6" />
          </button>
        </div>

        <ul className="mt-10 flex flex-col gap-8 px-6">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="press block text-white transition-colors hover:text-[#5ed29c]"
                style={{ fontSize: "28px", fontWeight: 700 }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Logo() {
  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <span
        aria-hidden
        style={{
          fontSize: "26px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#fff",
        }}
      >
        &lt;t&gt;
      </span>
      <span
        style={{
          marginLeft: "10px",
          fontSize: "27px",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#ffffff" }}>Techies</span>
        <span style={{ color: "#98a2b3" }}>Community</span>
      </span>
    </span>
  );
}
