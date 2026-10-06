'use client';
import React, { useState, useEffect } from 'react';
import type { ServiceItem } from './Homepage';

const ICON = '/assets/images';

const delay = (i: number, step = 0.06) =>
    ({ ['--reveal-delay' as any]: `${(0.04 + i * step).toFixed(2)}s` } as React.CSSProperties);

const Arrow = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const Check = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

/* Fallback content: only used if the Laravel API can't be reached */
const defaultServices = [
    { icon: 'Academic & Research Consultancy.png', title: 'Academic & Research Consultancy', text: 'Professional support for research proposals, thesis writing, data analysis, publications, and academic success.' },
    { icon: 'Graphic Design & Branding.png', title: 'Graphic Design & Branding', text: 'Build a strong brand identity with creative logos, marketing materials, social media designs, and visual branding.' },
    { icon: 'Software & Web Development.png', title: 'Software & Web Development', text: 'Custom software, responsive websites, web applications, and business solutions built for performance and growth.' },
    { icon: 'IT Consultancy & Digital Solutions.png', title: 'IT Consultancy & Digital Solutions', text: 'Expert technology consulting, digital transformation, system optimization, and strategic IT support.' },
    { icon: 'Research Community.png', title: 'Research Community', text: 'Join a collaborative network of students, researchers, and professionals for learning, publications, seminars, and networking.' },
    { icon: 'Training & Professional Development.png', title: 'Training & Professional Development', text: 'Enhance your skills through practical workshops, mentorship, webinars, and industry-focused training programs.' },
];

const stats = [
    { icon: 'Client.png', count: 150, suffix: '+', label: 'Happy Clients' },
    { icon: 'Projects Delivered.png', count: 100, suffix: '+', label: 'Projects Delivered' },
    { icon: 'Years of Experience.png', count: 5, suffix: '+', label: 'Years of Experience' },
    { icon: 'Client-Centric Approach.png', count: 98, suffix: '%', label: 'Client Satisfaction' },
];

const process = [
    { title: 'Consultation', text: 'We begin by understanding your goals, challenges, and requirements to recommend the best solution for your needs.' },
    { title: 'Strategy & Planning', text: 'Our team develops a customized plan with the right approach, timeline, and resources to ensure project success.' },
    { title: 'Design & Development', text: 'We transform ideas into reality through expert research, creative design, innovative technology, and continuous collaboration.' },
    { title: 'Delivery & Support', text: 'We deliver high-quality solutions on time and provide ongoing support to help you achieve long-term success.' },
];

const plans = [
    {
        name: 'Professional', featured: true, price: '$99', cta: 'Get Started',
        desc: 'Ideal for research, branding, websites, and software projects.',
        features: ['Dedicated Project Support', 'Customized Solutions', 'Progress Updates', 'Priority Support', 'Quality Assurance'],
    },
    {
        name: 'Starter', price: '$49', cta: 'Get Started',
        desc: 'Perfect for small tasks and consultations.',
        features: ['Free Initial Consultation', 'Project Requirement Analysis', 'Email Support', 'Basic Project Guidance'],
    },
    {
        name: 'Enterprise', price: '$199', cta: 'Contact Us',
        desc: 'Designed for organizations and large-scale projects.',
        features: ['Complete End-to-End Solutions', 'Dedicated Project Manager', 'Long-Term Technical Support', 'Business & IT Consultancy', 'Priority Delivery'],
    },
];

export default function ServicesPage({ services }: { services: ServiceItem[] | null }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isHeaderSolid, setIsHeaderSolid] = useState(false);

    // Dynamic content from the dashboard, or the hardcoded fallback if the API is down
    const serviceList: ServiceItem[] =
        services ??
        defaultServices.map((s, i) => ({
            id: i,
            title: s.title,
            description: s.text,
            icon_url: `${ICON}/${s.icon}`,
        }));

    // Scroll header effect
    useEffect(() => {
        const handleScroll = () => {
            const trigger = Math.min(260, 400);
            setIsHeaderSolid(window.scrollY > trigger);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll reveal and count-up stats animations.
    // Re-runs when the service list changes so new cards get revealed too.
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el) => revealObserver.observe(el));

        const counters = document.querySelectorAll('.num[data-count]');
        const countObserver = new IntersectionObserver((entries) => {
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
        }, { threshold: 0.4 });

        counters.forEach((el) => countObserver.observe(el));

        return () => {
            revealObserver.disconnect();
            countObserver.disconnect();
        };
    }, [serviceList.length]);

    return (
        <>
            {/* ===== SERVICES PAGE BANNER ===== */}
            <section className="page-header">
                <div className="page-header-bg"></div>
                <div className="page-header-overlay"></div>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="breadcrumb" style={{ justifyContent: 'center' }}>
                        <a href="/">Home</a>
                        <span className="sep">/</span>
                        <span className="current">Our Services</span>
                    </div>
                    <h1 style={{ textAlign: 'center' }}>Our Services</h1>
                    <p style={{ textAlign: 'center', margin: '0 auto' }}>Transforming Business Performance Through Reliable IT Support</p>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="pf-stats-strip">
                <div className="container">
                    <div className="pf-stats-card reveal in-view">
                        {stats.map((s) => (
                            <div key={s.label} className="pf-stat">
                                <div className="pf-stat-icon">
                                    <img src={`${ICON}/${s.icon}`} alt={`${s.label} Icon`} width="24" height="24" />
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

            {/* ===== SERVICES (dynamic) ===== */}
            <section className="section" style={{ background: 'var(--bg-light)' }} id="services">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>WHAT WE OFFER</div>
                        <h2 className="section-heading">Our Services</h2>
                        <p className="section-sub">
                            Comprehensive solutions designed to empower students, businesses, researchers, and organizations through innovation, technology, and expert support.
                        </p>
                    </div>

                    <div className="services-grid">
                        {serviceList.map((s, i) => (
                            <div key={s.id} className="service-card reveal" style={delay(i)}>
                                <div className="s-num">{String(i + 1).padStart(2, '0')}</div>
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
                        <a href="/#services" className="btn btn-outline-dark">All Services</a>
                    </div>
                </div>
            </section>

            {/* ===== PROCESS / HOW WE WORK ===== */}
            <section className="section process-section" id="process">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center', color: '#9db4ff' }}>HOW WE WORK</div>
                        <h2 className="section-heading">Our Process</h2>
                        <p className="section-sub">A simple, transparent process designed to understand your needs, deliver tailored solutions, and build lasting partnerships.</p>
                    </div>
                    <div className="process-grid">
                        {process.map((p, i) => (
                            <div key={p.title} className="process-card reveal" style={delay(i)}>
                                <div className="p-step">{String(i + 1).padStart(2, '0')}</div>
                                <h4>{p.title}</h4>
                                <p>{p.text}</p>
                            </div>
                        ))}
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
                            <p>
                                Flexible plans designed to meet the needs of students, professionals, startups, businesses, and organizations.
                            </p>
                            <a href="#pricing" className="btn-orange">View All Plans</a>
                        </div>

                        {plans.map((p, i) => (
                            <div key={p.name} className={`price-card reveal ${p.featured ? 'featured' : ''}`} style={delay(i)}>
                                <h4>{p.name}</h4>
                                <p className="p-desc">{p.desc}</p>
                                <div className="p-amount">{p.price}<span> Starting From</span></div>
                                <ul className="p-features">
                                    {p.features.map((f) => (
                                        <li key={f}><span className="check"><Check /></span>{f}</li>
                                    ))}
                                </ul>
                                <a href="/#get-in-touch" className="btn-orange">{p.cta}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}