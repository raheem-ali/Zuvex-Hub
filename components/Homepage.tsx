/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from "react";

/* ---------- Types for dynamic content (served by Laravel) ---------- */
export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon_url: string | null;
};

export type TeamItem = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  linkedin_url: string | null;
};

/* ---------- Small helpers ---------- */
const delay = (i: number, step = 0.06) =>
  ({ ["--reveal-delay" as any]: `${(0.04 + i * step).toFixed(2)}s` } as React.CSSProperties);

const Check = ({ size = 16, w = 3 }: { size?: number; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const LinkedIn = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.6V23H8.5V8.5z" />
  </svg>
);

const Heading = ({
  eyebrow, title, sub, light = false,
}: { eyebrow: string; title: string; sub?: string; light?: boolean }) => (
  <div className="section-heading-wrap reveal">
    <div className="eyebrow" style={{ justifyContent: "center", color: light ? "#9db4ff" : undefined }}>
      {eyebrow}
    </div>
    <h2 className="section-heading">{title}</h2>
    {sub && <p className="section-sub">{sub}</p>}
  </div>
);

/* ---------- Data ---------- */
const ICON = "/assets/images";

const heroImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop",
];

const aboutPoints = [
  "Expert Consultancy & Professional Support",
  "Creative & Technology Solutions",
  "Research Community & Continuous Learning",
];

const whyItems = [
  { tag: "Expert", icon: "Expert-Led Solutions.png", title: "Expert-Led Solutions", text: "Our experienced professionals deliver practical, high-quality solutions tailored to your unique goals." },
  { tag: "Innovation", icon: "Innovation & Technology.png", title: "Innovation & Technology", text: "From custom software and websites to branding and digital transformation, we build solutions that drive growth." },
  { tag: "Trusted", icon: "Trusted & Confidential.png", title: "Trusted & Confidential", text: "Your ideas, research, and business information are handled with complete professionalism, privacy, and security." },
  { tag: "Client First", icon: "Client-Centric Approach.png", title: "Client-Centric Approach", text: "Every project is designed around your objectives, ensuring personalized support and measurable results." },
  { tag: "Community", icon: "Research Community.png", title: "Research Community", text: "Connect with researchers, students, and professionals through collaborative learning, publications, workshops, and networking." },
  { tag: "Support", icon: "Long-Term Partnership.png", title: "Long-Term Partnership", text: "We don't just deliver projects, we provide ongoing support, guidance, and innovative solutions that help you grow." },
];

/* Fallback content: only used if the Laravel API can't be reached */
const defaultServices = [
  { icon: "Academic & Research Consultancy.png", title: "Academic & Research Consultancy", text: "Professional support for research proposals, thesis writing, data analysis, publications, and academic success." },
  { icon: "Graphic Design & Branding.png", title: "Graphic Design & Branding", text: "Build a strong brand identity with creative logos, marketing materials, social media designs, and visual branding." },
  { icon: "Software & Web Development.png", title: "Software & Web Development", text: "Custom software, responsive websites, web applications, and business solutions built for performance and growth." },
  { icon: "IT Consultancy & Digital Solutions.png", title: "IT Consultancy & Digital Solutions", text: "Expert technology consulting, digital transformation, system optimization, and strategic IT support." },
  { icon: "Research Community.png", title: "Research Community", text: "Join a collaborative network of students, researchers, and professionals for learning, publications, seminars, and networking." },
  { icon: "Training & Professional Development.png", title: "Training & Professional Development", text: "Enhance your skills through practical workshops, mentorship, webinars, and industry-focused training programs." },
];

const process = [
  { title: "Consultation", text: "We begin by understanding your goals, challenges, and requirements to recommend the best solution for your needs." },
  { title: "Strategy & Planning", text: "Our team develops a customized plan with the right approach, timeline, and resources to ensure project success." },
  { title: "Design & Development", text: "We transform ideas into reality through expert research, creative design, innovative technology, and continuous collaboration." },
  { title: "Delivery & Support", text: "We deliver high-quality solutions on time and provide ongoing support to help you achieve long-term success." },
];

const stats = [
  { icon: "Client.png", num: "150+", label: "Happy Clients" },
  { icon: "Projects Delivered.png", num: "100+", label: "Projects Delivered" },
  { icon: "Years of Experience.png", num: "5+", label: "Years of Experience" },
  { icon: "Client-Centric Approach.png", num: "98%", label: "Client Satisfaction" },
];

/* Fallback content: only used if the Laravel API can't be reached */
const defaultTeam = [
  { img: "photo-1560250097-0b93528c311a", name: "Ahmed Raza", role: "Founder & CEO", text: "Leads strategy and partnerships, driving Zuvex Hub's vision for research and innovation." },
  { img: "photo-1573496359142-b8d87734a5a2", name: "Dr. Sana Malik", role: "Head of Research", text: "Oversees academic consultancy, guiding researchers through proposals, analysis, and publication." },
  { img: "photo-1568602471122-7832951cc4c5", name: "Bilal Sheikh", role: "Lead Software Engineer", text: "Builds custom software, websites, and applications that power client growth and innovation." },
  { img: "photo-1580489944761-15a19d654956", name: "Hina Aslam", role: "Creative Director", text: "Shapes brand identities through design, ensuring every project has a strong visual voice." },
];

const portfolio = [
  { img: "photo-1555949963-aa79dcee981c", title: "Game Review Sentiment Analysis Using Deep Learning", sub: "Artificial Intelligence & Natural Language Processing", color: "#e6469c" },
  { img: "photo-1526379095098-d400fd0bf935", title: "Sindhi Keyword Extraction Using BERT", sub: "Natural Language Processing & Research", color: "var(--blue)" },
  { img: "photo-1455390582262-044cdead277a", title: "Academic Research Portfolio", sub: "20+ Thesis, Research Projects & Publications", color: "var(--orange)" },
  { img: "photo-1516321318423-f06f85e504b3", title: "Custom Software & Web Solutions", sub: "Business Applications & Digital Innovation", color: "#17a398" },
];

const partners = [
  "Karachi Research Council", "LUMS Innovation Lab", "IBA Data Center",
  "Dow Health Institute", "NED Engineering Hub", "Aga Khan Research",
];

const blogs = [
  { img: "photo-1454165804606-c3d57bc86b40", cat: "Research", title: "5 Habits of a Strong Research Proposal", text: "What reviewers actually look for, and the small changes that make a proposal stand out." },
  { img: "photo-1551288049-bebda4e38f71", cat: "Data", title: "Turning Messy Survey Data Into a Clear Story", text: "A practical walkthrough of cleaning, analyzing and visualizing field survey data." },
  { img: "photo-1517245386807-bb43f82c33c4", cat: "Community", title: "Inside Our Spring Mentorship Cohort", text: "Highlights from this season's cohort, and how to apply for the next one." },
  { img: "photo-1532094349884-543bc11b234d", cat: "Publishing", title: "How to Choose the Right Journal for Your Paper", text: "A quick framework for matching your research to the journals most likely to accept it." },
];

const testimonials = [
  { text: "Zuvex Hub helped us restructure our entire research proposal. The feedback loop was fast and genuinely useful.", name: "Dr. Ayesha Khan", role: "Public Health, University of Karachi", color: "#2f6bff" },
  { text: "The data analysis team turned three months of messy survey data into a clear, publishable story in under two weeks.", name: "Muhammad Ali", role: "Data Scientist, LUMS", color: "#5b6fe0" },
  { text: "Their workshops gave our junior researchers a real head start. Practical, not theoretical.", name: "Sana Fatima", role: "Environmental Researcher, IBA Karachi", color: "#3d8bff" },
  { text: "Consistent, professional, and genuinely invested in seeing our project succeed from start to finish.", name: "Dr. Bilal Ahmed", role: "Epidemiologist, Dow University", color: "#2454c9" },
];

const plans = [
  {
    name: "Professional", featured: true, price: "$99", cta: "Get Started",
    desc: "Ideal for research, branding, websites, and software projects.",
    features: ["Dedicated Project Support", "Customized Solutions", "Progress Updates", "Priority Support", "Quality Assurance"],
  },
  {
    name: "Starter", price: "$49", cta: "Get Started",
    desc: "Perfect for small tasks and consultations.",
    features: ["Free Initial Consultation", "Project Requirement Analysis", "Email Support", "Basic Project Guidance"],
  },
  {
    name: "Enterprise", price: "$199", cta: "Contact Us",
    desc: "Designed for organizations and large-scale projects.",
    features: ["Complete End-to-End Solutions", "Dedicated Project Manager", "Long-Term Technical Support", "Business & IT Consultancy", "Priority Delivery"],
  },
];

const reachPoints = [
  { title: "Fast Response", text: "We respond to every inquiry within 24 hours.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
  { title: "Expert Guidance", text: "Connect directly with experienced professionals who understand your requirements.", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { title: "Free Consultation", text: "Your first consultation is completely free, confidential, and without obligation.", icon: <><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> },
];

const initials = (name: string) =>
  name.replace("Dr.", "").trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* ---------- Page ---------- */
export default function HomePage({
  services,
  team,
}: {
  services: ServiceItem[] | null;
  team: TeamItem[] | null;
}) {
  const [heroCurrent, setHeroCurrent] = useState(0);
  const [testiCurrent, setTestiCurrent] = useState(0);

  // Dynamic content from the dashboard, or the hardcoded fallback if the API is down
  const serviceList: ServiceItem[] =
    services ??
    defaultServices.map((s, i) => ({
      id: i,
      title: s.title,
      description: s.text,
      icon_url: `${ICON}/${s.icon}`,
    }));

  const teamList: TeamItem[] =
    team ??
    defaultTeam.map((m, i) => ({
      id: i,
      name: m.name,
      role: m.role,
      bio: m.text,
      linkedin_url: null,
      photo_url: `https://images.unsplash.com/${m.img}?q=80&w=500&auto=format&fit=crop`,
    }));

  useEffect(() => {
    const id = setInterval(() => setHeroCurrent((p) => (p + 1) % heroImages.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTestiCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-bg-slider">
          {heroImages.map((src, i) => (
            <div key={i} className={`hero-bg-slide ${i === heroCurrent ? "active" : ""}`} style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-text">
            <div className="eyebrow">INNOVATE • CREATE • GROW</div>
            <h1>One Hub, Many Solutions</h1>
            <p>ZUVEX HUB Empowering businesses, researchers, and innovators with integrated solutions in technology, research, design, and digital transformation.</p>
            <div className="hero-buttons">
              <a href="#get-in-touch" className="btn btn-primary">Join Our Community</a>
              <a href="#services" className="btn btn-outline">Explore Services</a>
            </div>
          </div>
        </div>
        <div className="hero-slider-dots">
          {heroImages.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} className={i === heroCurrent ? "active" : ""} onClick={() => setHeroCurrent(i)} />
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section" id="about" style={{ background: "#F7F8FB" }}>
        <div className="container about-grid">
          <div className="about-media reveal-left">
            <div className="frame">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop" alt="Researchers collaborating" />
            </div>
            <div className="about-badge">
              <div className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div>
                <div className="num">100+</div>
                <div className="lbl">Projects Delivered</div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="eyebrow">ABOUT ZUVEX HUB</div>
            <h2 className="section-heading" style={{ textAlign: "left", display: "block" }}>
              Your Trusted Partner for Innovation & Digital Growth
            </h2>
            <p style={{ color: "var(--text-gray)", fontSize: 15, marginTop: 16 }}>
              ZUVEX HUB unites research, creativity, and technology under one roof. From academic consultancy and branding to software development, IT solutions, and a collaborative Research Community, we empower ideas, accelerate innovation, and build lasting success.
            </p>
            <ul className="about-list">
              {aboutPoints.map((p) => (
                <li key={p}><span className="check"><Check size={13} /></span>{p}</li>
              ))}
            </ul>
            <a href="#services" className="btn btn-primary">Discover Our Services</a>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section" id="why">
        <div className="container">
          <Heading
            eyebrow="THE ZUVEX DIFFERENCE"
            title="Why Choose Us"
            sub="At ZUVEX HUB, we go beyond delivering services, we build lasting partnerships through innovation, quality, and a commitment to helping every client succeed."
          />
          <div className="why-grid">
            {whyItems.map((w, i) => (
              <div key={w.title} className="why-card reveal" style={delay(i)}>
                <div className="w-tag">{w.tag}</div>
                <div className="s-icon"><img src={`${ICON}/${w.icon}`} alt={`${w.title} icon`} width={54} height={54} /></div>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES (dynamic) ===== */}
      <section className="section" style={{ background: "var(--bg-light)" }} id="services">
        <div className="container">
          <Heading
            eyebrow="WHAT WE OFFER"
            title="Our Services"
            sub="Comprehensive solutions designed to empower students, businesses, researchers, and organizations through innovation, technology, and expert support."
          />
          <div className="services-grid">
            {serviceList.map((s, i) => (
              <div key={s.id} className="service-card reveal" style={delay(i)}>
                <div className="s-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="s-icon">
                  {s.icon_url && <img src={s.icon_url} alt={`${s.title} icon`} width={54} height={54} />}
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="s-link">Learn More <Arrow /></span>
              </div>
            ))}
          </div>
          <div className="services-cta reveal">
            <a href="#services" className="btn btn-outline-dark">All Services</a>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section process-section" id="process">
        <div className="container">
          <Heading
            eyebrow="HOW WE WORK" title="Our Process" light
            sub="A simple, transparent process designed to understand your needs, deliver tailored solutions, and build lasting partnerships."
          />
          <div className="process-grid">
            {process.map((p, i) => (
              <div key={p.title} className="process-card reveal" style={delay(i)}>
                <div className="p-step">{String(i + 1).padStart(2, "0")}</div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="section" style={{ background: "var(--bg-light)" }}>
        <div className="container">
          <Heading eyebrow="BY THE NUMBERS" title="Our Achievements" />
          <div className="achv-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="achv-card reveal" style={delay(i)}>
                <div className="s-icon" style={{ margin: "0 auto 15px" }}>
                  <img src={`${ICON}/${s.icon}`} alt={`${s.label} icon`} width={54} height={54} />
                </div>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM (dynamic) ===== */}
      <section className="section" id="team">
        <div className="container">
          <Heading
            eyebrow="MEET THE TEAM" title="Our Team"
            sub="A dedicated team of researchers, developers, and creative professionals driving innovation at Zuvex Hub."
          />
          <div className="team-grid">
            {teamList.map((m, i) => (
              <div key={m.id} className="team-card reveal" style={delay(i)}>
                <div className="team-photo">
                  {m.photo_url && <img src={m.photo_url} alt={m.name} />}
                  {m.linkedin_url && (
                    <div className="team-overlay">
                      <div className="team-socials">
                        <a href={m.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="team-body">
                  <h4>{m.name}</h4>
                  <span className="team-role">{m.role}</span>
                  <p>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section className="section portfolio-section" id="portfolio">
        <div className="portfolio-bg" />
        <div className="container">
          <Heading
            eyebrow="OUR PORTFOLIO" title="Featured Projects" light
            sub="Discover some of our successful projects in artificial intelligence, natural language processing, academic research, and software solutions."
          />
          <div className="portfolio-grid">
            {portfolio.map((p, i) => (
              <div key={p.title} className="portfolio-card reveal" style={delay(i)}>
                <div className="portfolio-img">
                  <img src={`https://images.unsplash.com/${p.img}?q=80&w=600&auto=format&fit=crop`} alt={p.title} />
                </div>
                <div className="portfolio-label">
                  <h4 style={{ color: p.color }}>{p.title}</h4>
                  <span>{p.sub}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="portfolio-cta reveal">
            <a href="#portfolio" className="btn btn-outline-dark">All Projects</a>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="section partners-section" id="partners">
        <div className="container">
          <Heading
            eyebrow="OUR NETWORK" title="Our Community & Collaborations"
            sub="Building meaningful connections with universities, researchers, businesses, and organizations to promote innovation, knowledge sharing, and digital transformation."
          />
          <div className="reveal-scale">
            {[false, true].map((reverse) => (
              <div key={String(reverse)} className="logo-marquee-row">
                {/* list is doubled so the -50% marquee loop is seamless */}
                <div className={`logo-marquee-track ${reverse ? "reverse" : ""}`}>
                  {[...partners, ...partners].map((name, idx) => (
                    <div key={idx} className="logo-chip">
                      <span className="lc-dot">{name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}</span>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-final">
        <h2 className="reveal">Be Part of a Growing Research Community</h2>
        <p className="reveal" style={delay(1, 0.1)}>
          Connect with researchers, students, academics, and professionals to learn, collaborate, publish, attend workshops, and create meaningful impact together.
        </p>
        <div className="cta-buttons">
          <a href="#get-in-touch" className="btn btn-primary reveal" style={delay(2, 0.1)}>Join Our Community</a>
          <a href="#services" className="btn btn-outline reveal" style={delay(3, 0.1)}>Explore the Community</a>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="section" style={{ background: "var(--bg-light)" }} id="blog">
        <div className="container">
          <Heading eyebrow="Insights" title="From the Blog" sub="Guides, publications and updates from the Zuvex Hub community." />
          <div className="blog-grid">
            {blogs.map((b, i) => (
              <div key={b.title} className="blog-card reveal" style={delay(i)}>
                <div className="b-img">
                  <img src={`https://images.unsplash.com/${b.img}?q=80&w=400&auto=format&fit=crop`} alt={b.title} />
                </div>
                <div className="b-body">
                  <span className="b-cat">{b.cat}</span>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                  <span className="b-link">Read more <Arrow /></span>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-cta reveal">
            <a href="#blog" className="btn btn-outline-dark">All Blogs</a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testi-section" id="testimonials">
        <div className="container">
          <Heading
            eyebrow="CLIENT TESTIMONIALS" title="What Our Clients Say" light
            sub="Hear from students, researchers, businesses, and organizations who have trusted ZUVEX HUB to bring their ideas to life."
          />
          <div className="testi-wrap reveal">
            <button
              className="testi-arrow prev" aria-label="Previous"
              onClick={() => setTestiCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              className="testi-arrow next" aria-label="Next"
              onClick={() => setTestiCurrent((p) => (p + 1) % testimonials.length)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            <div className="testi-track">
              <div className="testi-slides" style={{ transform: `translateX(-${testiCurrent * 100}%)` }}>
                {testimonials.map((t) => (
                  <div key={t.name} className="testi-slide">
                    <div className="testi-card">
                      <div className="quote-mark">&ldquo;</div>
                      <p>{t.text}</p>
                      <div className="testi-person">
                        <div className="testi-avatar" style={{ background: t.color }}>{initials(t.name)}</div>
                        <div style={{ textAlign: "left" }}>
                          <h5>{t.name}</h5>
                          <span>{t.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="testi-dots">
              {testimonials.map((t, i) => (
                <button key={t.name} aria-label={`Testimonial ${i + 1}`} className={i === testiCurrent ? "active" : ""} onClick={() => setTestiCurrent(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="pricing-grid">
            <div className="pricing-intro reveal-left">
              <div className="eyebrow">PRICING PLANS</div>
              <h2>Choose the Right Plan</h2>
              <p>Flexible plans designed to meet the needs of students, professionals, startups, businesses, and organizations.</p>
              <a href="#pricing" className="btn-orange">View All Plans</a>
            </div>

            {plans.map((p, i) => (
              <div key={p.name} className={`price-card reveal ${p.featured ? "featured" : ""}`} style={delay(i)}>
                <h4>{p.name}</h4>
                <p className="p-desc">{p.desc}</p>
                <div className="p-amount">{p.price}<span> Starting From</span></div>
                <ul className="p-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="check"><Check /></span>{f}</li>
                  ))}
                </ul>
                <a href="#get-in-touch" className="btn-orange">{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GET IN TOUCH ===== */}
      <section className="section reach-section" id="get-in-touch">
        <div className="container reach-grid">
          <div className="reach-text reveal-left">
            <div className="eyebrow">LET&apos;S BUILD SOMETHING GREAT</div>
            <h2>Have a Project in Mind? Let&apos;s Bring It to Life</h2>
            <p>Whether you need research consultancy, software development, branding, website solutions, or IT support, our team is ready to help turn your ideas into impactful results. Let&apos;s discuss your goals and build the right solution together.</p>
            <ul className="reach-points">
              {reachPoints.map((r) => (
                <li key={r.title}>
                  <span className="r-ico">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{r.icon}</svg>
                  </span>
                  <div>
                    <h5>{r.title}</h5>
                    <span>{r.text}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#home" className="btn btn-outline">Back to Top</a>
          </div>

          <form className="reach-form reveal-right" onSubmit={(e) => e.preventDefault()}>
            <h3>Get In Touch</h3>
            <p>Tell us about your project, and our team will get back to you with the best solution tailored to your needs.</p>

            <div className="field-row">
              <div className="field"><input type="text" placeholder=" " required /><label>First Name</label></div>
              <div className="field"><input type="text" placeholder=" " required /><label>Last Name</label></div>
            </div>
            <div className="field"><input type="email" placeholder=" " required /><label>Email Address</label></div>
            <div className="field"><input type="text" placeholder=" " /><label>Subject</label></div>
            <div className="field"><textarea placeholder=" " required /><label>Your Message</label></div>

            <button type="submit" className="btn btn-primary">Get Free Consultation</button>
            <div className="form-note">No spam. Your information stays private and confidential.</div>
          </form>
        </div>
      </section>
    </main>
  );
}