'use client';
import React, { useEffect } from 'react';

/* ---------- Data ---------- */
const stats = [
    { count: 150, suffix: '+', label: 'Happy Clients', img: 'Client.png', alt: 'Happy Clients Icon' },
    { count: 100, suffix: '+', label: 'Projects Delivered', img: 'Projects Delivered.png', alt: 'Projects Delivered Icon' },
    { count: 5, suffix: '+', label: 'Years of Experience', img: 'Years of Experience.png', alt: 'Years of Experience Icon' },
    { count: 98, suffix: '%', label: 'Client Satisfaction', img: 'Client-Centric Approach.png', alt: 'Client Satisfaction Icon' },
];

const team = [
    {
        name: 'Ahmed Raza',
        role: 'Founder & CEO',
        text: "Leads strategy and partnerships, driving Zuvex Hub's vision for research and innovation.",
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop',
    },
    {
        name: 'Dr. Sana Malik',
        role: 'Head of Research',
        text: 'Oversees academic consultancy, guiding researchers through proposals, analysis, and publication.',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    },
    {
        name: 'Bilal Sheikh',
        role: 'Lead Software Engineer',
        text: 'Builds custom software, websites, and applications that power client growth and innovation.',
        img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop',
    },
    {
        name: 'Hina Aslam',
        role: 'Creative Director',
        text: 'Shapes brand identities through design, ensuring every project has a strong visual voice.',
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
    },
];

const partners = [
    'Karachi Research Council',
    'LUMS Innovation Lab',
    'IBA Data Center',
    'Dow Health Institute',
    'NED Engineering Hub',
    'Aga Khan Research',
];

const LINKEDIN_PATH =
    'M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.6V23H8.5V8.5z';
const TWITTER_PATH =
    'M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.5 9.03c0 .34.04.67.11.98A12.15 12.15 0 0 1 2.9 5.16a4.28 4.28 0 0 0 1.32 5.7 4.25 4.25 0 0 1-1.94-.54v.06a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6z';

const initials = (name: string) =>
    name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const CheckIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

const SocialIcon = ({ label, d }: { label: string; d: string }) => (
    <a href="#" aria-label={label}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
            <path d={d} />
        </svg>
    </a>
);

const MarqueeTrack = ({ reverse = false }: { reverse?: boolean }) => (
    <div className="logo-marquee-row">
        <div className={`logo-marquee-track${reverse ? ' reverse' : ''}`}>
            {[...partners, ...partners].map((name, i) => (
                <div className="logo-chip" key={`${name}-${i}`}>
                    <span className="lc-dot">{initials(name)}</span>
                    <span>{name}</span>
                </div>
            ))}
        </div>
    </div>
);

export default function AboutPage() {
    // Scroll reveal and count-up stats animations
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach((el) => revealObserver.observe(el));

        const counters = document.querySelectorAll('.num[data-count]');
        const countObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const target = parseInt(el.dataset.count || '0', 10);
                        const suffix = el.dataset.suffix || '';
                        const duration = 1200;
                        const start = performance.now();

                        const tick = (now: number) => {
                            const progress = Math.min((now - start) / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            el.textContent = Math.round(eased * target) + suffix;
                            if (progress < 1) requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                        countObserver.unobserve(el);
                    }
                });
            },
            { threshold: 0.4 }
        );
        counters.forEach((el) => countObserver.observe(el));

        return () => {
            revealObserver.disconnect();
            countObserver.disconnect();
        };
    }, []);

    return (
        <>
            {/* ===== ABOUT PAGE BANNER ===== */}
            <section className="page-header page-header--about">
                <div className="page-header-bg"></div>
                <div className="page-header-overlay"></div>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="breadcrumb" style={{ justifyContent: 'center' }}>
                        <a href="index.html">Home</a>
                        <span className="sep">/</span>
                        <span className="current">About Us</span>
                    </div>
                    <h1 style={{ textAlign: 'center' }}>About Us</h1>
                    <p style={{ textAlign: 'center', margin: '0 auto' }}>
                        Transforming Business Performance Through Reliable IT Support
                    </p>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="pf-stats-strip">
                <div className="container">
                    <div className="pf-stats-card reveal in-view">
                        {stats.map((s) => (
                            <div className="pf-stat" key={s.label}>
                                <div className="pf-stat-icon">
                                    <img src={`./assets/images/${s.img}`} alt={s.alt} width="24" height="24" />
                                </div>
                                <div>
                                    <div className="num" data-count={s.count} data-suffix={s.suffix}>0</div>
                                    <div className="label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ABOUT US ===== */}
            <section className="section" id="about">
                <div className="container about-grid">
                    <div className="about-media reveal-left">
                        <div className="frame">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop"
                                alt="Researchers collaborating"
                            />
                        </div>
                        <div className="about-badge">
                            <div className="ico">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
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
                        <h2 className="section-heading" style={{ textAlign: 'left', display: 'block' }}>
                            Your Trusted Partner for Innovation &amp; Digital Growth
                        </h2>
                        <p style={{ color: 'var(--text-gray)', fontSize: '15px', marginTop: '16px' }}>
                            ZUVEX HUB unites research, creativity, and technology under one roof. From academic
                            consultancy and branding to software development, IT solutions, and a collaborative
                            Research Community, we empower ideas, accelerate innovation, and build lasting success.
                        </p>
                        <ul className="about-list">
                            {[
                                'Expert Consultancy & Professional Support',
                                'Creative & Technology Solutions',
                                'Research Community & Continuous Learning',
                            ].map((item) => (
                                <li key={item}>
                                    <span className="check"><CheckIcon /></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <a href="index.html#services" className="btn btn-primary">Discover Our Services</a>
                    </div>
                </div>
            </section>

            {/* ===== TEAM ===== */}
            <section className="section" id="team" style={{ background: 'var(--bg-light)' }}>
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>MEET THE TEAM</div>
                        <h2 className="section-heading">Our Team</h2>
                        <p className="section-sub">
                            A dedicated team of researchers, developers, and creative professionals driving
                            innovation at Zuvex Hub.
                        </p>
                    </div>

                    <div className="team-grid">
                        {team.map((m, i) => (
                            <div
                                className="team-card reveal"
                                key={m.name}
                                style={{ '--reveal-delay': `${(0.04 + i * 0.06).toFixed(2)}s` } as React.CSSProperties}
                            >
                                <div className="team-photo">
                                    <img src={m.img} alt={m.name} />
                                    <div className="team-overlay">
                                        <div className="team-socials">
                                            <SocialIcon label="LinkedIn" d={LINKEDIN_PATH} />
                                            <SocialIcon label="Twitter" d={TWITTER_PATH} />
                                        </div>
                                    </div>
                                </div>
                                <div className="team-body">
                                    <h4>{m.name}</h4>
                                    <span className="team-role">{m.role}</span>
                                    <p>{m.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="cta-final">
                <h2 className="reveal">Be Part of a Growing Research Community</h2>
                <p className="reveal" style={{ '--reveal-delay': '.1s' } as React.CSSProperties}>
                    Connect with researchers, students, academics, and professionals to learn, collaborate,
                    publish, attend workshops, and create meaningful impact together.
                </p>
                <div className="cta-buttons">
                    <a href="index.html#get-in-touch" className="btn btn-primary reveal" style={{ '--reveal-delay': '.18s' } as React.CSSProperties}>
                        Join Our Community
                    </a>
                    <a href="index.html#services" className="btn btn-outline reveal" style={{ '--reveal-delay': '.26s' } as React.CSSProperties}>
                        Explore the Community
                    </a>
                </div>
            </section>

            {/* ===== PARTNERS ===== */}
            <section className="section partners-section" id="partners">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>OUR NETWORK</div>
                        <h2 className="section-heading">Our Community &amp; Collaborations</h2>
                        <p className="section-sub">
                            Building meaningful connections with universities, researchers, businesses, and
                            organizations to promote innovation, knowledge sharing, and digital transformation.
                        </p>
                    </div>
                    <div className="reveal-scale">
                        <MarqueeTrack />
                        <MarqueeTrack reverse />
                    </div>
                </div>
            </section>
        </>
    );
}