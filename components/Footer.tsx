import Link from "next/link";

const LinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.6V23H8.5V8.5z" />
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/#blog" },
  { label: "Testimonials", href: "/#testimonials" },
];

const communityLinks = [
  { label: "About Community", href: "/about-community" },
  { label: "Join Community", href: "/research-community" },
  { label: "Publications", href: "/#blog" },
  { label: "Events", href: "/research-community" },
  { label: "Resources", href: "/research-community" },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo">ZUVEX<span>HUB</span></div>
            <p>Zuvex Hub is a research and development agency committed to empowering researchers and organizations through innovative solutions and collaboration.</p>
            <div className="socials"><a href="#" aria-label="LinkedIn"><LinkedIn /></a></div>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul>{quickLinks.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h5>Research Community</h5>
            <ul>{communityLinks.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul className="foot-contact">
              <li>+92 300 0141342</li>
              <li>zuvexhub@gmail.com</li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="copyright">© 2026 Zuvex Hub. All rights reserved.</div>
      </div>
    </footer>
  );
}