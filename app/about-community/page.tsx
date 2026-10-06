'use client';
import React, { useEffect } from 'react';

const Svg = ({
    size = 12,
    sw = 3,
    stroke = 'currentColor',
    children,
}: {
    size?: number;
    sw?: number;
    stroke?: string;
    children: React.ReactNode;
}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}>
        {children}
    </svg>
);

const delay = (i: number, base: number, step = 0.06) =>
    ({ '--reveal-delay': `${(base + i * step).toFixed(2)}s` } as React.CSSProperties);

/* ---------- Data ---------- */
const stats = [
    { count: 150, suffix: '+', label: 'Research Members', img: 'Client.png' },
    { count: 80, suffix: '+', label: 'Published Papers', img: 'Projects Delivered.png' },
    { count: 35, suffix: '+', label: 'Research Events', img: 'Years of Experience.png' },
    { count: 20, suffix: '+', label: 'Research Projects', img: 'Client-Centric Approach.png' },
    { count: 12, suffix: '+', label: 'Industry Collaborations', img: 'Client-Centric Approach.png' },
    { count: 95, suffix: '%', label: 'Member Satisfaction', img: 'Client-Centric Approach.png' },
];

const drivers = [
    { tag: 'Expert', img: 'Expert-Led Solutions.png', title: 'Research Excellence', text: 'Promote high-quality academic research through collaboration and innovation.' },
    { tag: 'Innovation', img: 'Innovation & Technology.png', title: 'Collaboration', text: 'Connect researchers from different disciplines to solve real-world challenges.' },
    { tag: 'Trusted', img: 'Trusted & Confidential.png', title: 'Innovation', text: 'Encourage creative thinking and research methodologies creating meaningful impact.' },
];

const benefits = [
    'Access to quality research resources',
    'Personalized mentorship from experts',
    'Publish in reputed platforms',
    'Network with global researchers',
    'Workshops, seminars & webinars',
    'Collaboration and funding opportunities',
];

const steps = [
    { title: 'Register', text: 'Create your account and join.' },
    { title: 'Create Profile', text: 'Showcase your expertise.' },
    { title: 'Connect', text: 'Find mentors and colleagues.' },
    { title: 'Participate', text: 'Join events and projects.' },
    { title: 'Publish', text: 'Share your research.' },
    { title: 'Grow & Impact', text: 'Advance your career.' },
];

const values = [
    {
        title: 'Integrity', text: 'Honesty, transparency and ethical research standards.', stroke: 'var(--green)',
        icon: (<><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></>),
    },
    {
        title: 'Innovation', text: 'Creative thinking and modern research approaches.', stroke: 'var(--blue)',
        icon: (<><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></>),
    },
    {
        title: 'Collaboration', text: 'Power of working together for greater impact.', stroke: 'var(--purple)',
        icon: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
    },
    {
        title: 'Excellence', text: 'High-quality research and continuous improvement.', stroke: 'var(--accent-orange)',
        icon: (<><circle cx="12" cy="8" r="6" /><path d="M9 14.5L7 22l5-3 5 3-2-7.5" /></>),
    },
];

export default function AboutCommunityPage() {
    // Scroll reveal and count-up stats animations
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
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
            {/* ===== PAGE HEADER ===== */}
            <section className="page-header page-header--about">
                <div className="page-header-bg"></div>
                <div className="page-header-overlay"></div>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="breadcrumb" style={{ justifyContent: 'center' }}>
                        <a href="index.html">Home</a>
                        <span className="sep">/</span>
                        <span className="current">About Community</span>
                    </div>
                    <h1 style={{ textAlign: 'center' }}>About Our Research Community</h1>
                    <p style={{ textAlign: 'center', margin: '0 auto' }}>
                        A collaborative platform connecting researchers, scholars, students, and professionals to
                        share knowledge, publish research, and create meaningful impact.
                    </p>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="pf-stats-strip">
                <div className="container" style={{ maxWidth: '1300px' }}>
                    <div className="pf-stats-card pf-stats-card--6 reveal in-view">
                        {stats.map((s) => (
                            <div className="pf-stat" key={s.label}>
                                <div className="pf-stat-icon">
                                    <img src={`./assets/images/${s.img}`} alt={`${s.label} Icon`} width="24" height="24" />
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

            {/* ===== WHO WE ARE ===== */}
            <section className="section">
                <div className="container">
                    <div className="who-grid">
                        <div className="who-img reveal">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=700&auto=format&fit=crop"
                                alt="Research team"
                            />
                        </div>
                        <div className="who-text reveal" style={{ '--reveal-delay': '.08s' } as React.CSSProperties}>
                            <div className="eyebrow">WHO WE ARE</div>
                            <h2 className="section-heading" style={{ display: 'block' }}>
                                Building a Stronger Research Community
                            </h2>
                            <p style={{ marginTop: '16px' }}>
                                The ZUVEX HUB Research Community is a collaborative platform designed for students,
                                researchers, academicians, and industry professionals passionate about research and
                                innovation.
                            </p>
                            <p>
                                Our mission is to create an environment where members can share knowledge, publish
                                quality research, participate in academic events, and collaborate on interdisciplinary
                                projects.
                            </p>
                            <p>
                                Whether starting your first research project or leading advanced studies, our community
                                provides resources, mentorship, and networks to help you succeed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHAT DRIVES OUR COMMUNITY ===== */}
            <section className="section" id="why" style={{ background: 'var(--bg-light)' }}>
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>OUR MISSION</div>
                        <h2 className="section-heading">What Drives Our Community</h2>
                    </div>
                    <div className="why-grid">
                        {drivers.map((d, i) => (
                            <div className="why-card reveal" key={d.title} style={delay(i, 0.04)}>
                                <div className="w-tag">{d.tag}</div>
                                <div className="s-icon">
                                    <img src={`./assets/images/${d.img}`} alt={`${d.title} Icon`} width="54" height="54" />
                                </div>
                                <h4>{d.title}</h4>
                                <p>{d.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== BENEFITS ===== */}
            <section className="section">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="reveal">
                            <div className="eyebrow">WHY JOIN US?</div>
                            <h2 className="section-heading" style={{ display: 'block', marginBottom: '20px' }}>
                                Benefits of Being a Member
                            </h2>
                            <ul className="benefits-list">
                                {benefits.map((b) => (
                                    <li key={b}>
                                        <span className="check-ic"><Svg><path d="M20 6L9 17l-5-5" /></Svg></span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="reveal" style={{ '--reveal-delay': '.1s' } as React.CSSProperties}>
                            <svg width="380" height="320" viewBox="0 0 420 360" xmlns="http://www.w3.org/2000/svg">
                                <rect x="90" y="40" width="220" height="240" rx="10" fill="var(--blue-light)" />
                                <rect x="110" y="60" width="180" height="100" rx="6" fill="#fff" stroke="var(--card-border)" strokeWidth="1.5" />
                                <rect x="122" y="130" width="20" height="20" fill="var(--green)" />
                                <rect x="150" y="110" width="20" height="30" fill="var(--blue)" />
                                <rect x="178" y="95" width="20" height="55" fill="var(--purple)" />
                                <rect x="206" y="120" width="20" height="30" fill="var(--accent-orange)" />
                                <circle cx="180" cy="230" r="26" fill="#fff" stroke="var(--blue)" strokeWidth="3" />
                                <circle cx="180" cy="230" r="8" fill="var(--blue)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== JOURNEY (6 STEPS) ===== */}
            <section className="section process-section" id="process">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center', color: '#9db4ff' }}>HOW IT WORKS</div>
                        <h2 className="section-heading">Your Journey With Us</h2>
                        <p className="section-sub">
                            A step-by-step path designed to showcase your expertise, connect with peers, and advance
                            your career.
                        </p>
                    </div>
                    <div className="process-grid about-community-process">
                        {steps.map((s, i) => (
                            <div className="process-card reveal" key={s.title} style={delay(i, 0.04)}>
                                <div className="p-step">{String(i + 1).padStart(2, '0')}</div>
                                <h4>{s.title}</h4>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="section" style={{ paddingTop: '60px' }}>
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>OUR VALUES</div>
                        <h2 className="section-heading">Values That Guide Us</h2>
                    </div>
                    <div className="values-grid">
                        {values.map((v, i) => (
                            <div className="value-card reveal" key={v.title} style={delay(i, 0.02)}>
                                <div className="value-icon" style={{ background: 'var(--blue-light)' }}>
                                    <Svg size={22} sw={2} stroke={v.stroke}>{v.icon}</Svg>
                                </div>
                                <h4>{v.title}</h4>
                                <p>{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA STRIP ===== */}
            <section className="comm-cta">
                <div className="container comm-cta-inner">
                    <div>
                        <h3>Be Part of Something Greater!</h3>
                        <p>Join a thriving network of researchers shaping the future through innovation.</p>
                    </div>
                    <div className="comm-cta-buttons">
                        <a href="index.html#get-in-touch" className="btn btn-primary">Join Community</a>
                        <a href="index.html#get-in-touch" className="btn btn-navy-outline">Contact Us</a>
                    </div>
                </div>
            </section>
        </>
    );
}