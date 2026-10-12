import Link from "next/link";

const LinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.6V23H8.5V8.5z" />
  </svg>
);

const WhatsApp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923000141342"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "50%",
          width: "55px",
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
          transition: "transform 0.3s ease",
        }}
      >
        <WhatsApp />
      </a>
    </footer>
  );
}