'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Edit your menu here. Change hrefs to your real routes.
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", children: [{ label: "Service Details", href: "/services" }] },
  {
    label: "Research Community", href: "/research-community",
    children: [
      { label: "About Community", href: "/about-community" },
      { label: "Publications", href: "/publications" }
    ],
  },
  {
    label: "Portfolio", href: "/portfolio",
    children: [
      { label: "All Projects", href: "/portfolio" },
      { label: "Project Details", href: "/portfolio-details" },
    ],
  },
  { label: "Contact Us", href: "/#get-in-touch" },
];

const Caret = () => (
  <svg className="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu when the page changes
  useEffect(() => setMenuOpen(false), [pathname]);

  const mobileMenuStyle: React.CSSProperties | undefined = menuOpen
    ? {
        display: "flex", flexDirection: "column", position: "fixed", top: 72, left: 0, right: 0,
        background: "#fff", padding: "20px 24px", gap: 16, boxShadow: "0 10px 20px rgba(0,0,0,.08)",
      }
    : undefined;

  return (
    <header>
      <div className="container nav-wrap">
        <div className="logo">
          <Link href="/">ZUVEX<span>HUB</span></Link>
        </div>

        <ul className="nav-links" style={mobileMenuStyle}>
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}{l.children && <Caret />}</Link>
              {l.children && (
                <div className="nav-dropdown">
                  {l.children.map((c) => <Link key={c.label} href={c.href}>{c.label}</Link>)}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <Link href="/#get-in-touch" className="btn btn-primary" style={{ padding: "10px 20px" }}>
            Get Started
          </Link>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}