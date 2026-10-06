'use client';
import React, { useEffect, useRef, useState } from 'react';

/* ---------- Icons ---------- */
const Svg = ({
    size = 16,
    sw = 2,
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

const I = {
    users: (
        <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
    ),
    file: (
        <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
        </>
    ),
    book: (
        <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
    ),
    openBook: (
        <>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </>
    ),
    layers: (
        <>
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </>
    ),
    bars: <path d="M18 20V10M12 20V4M6 20v-6" />,
    heart: (
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </>
    ),
    target: (
        <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </>
    ),
    building: <path d="M3 21h18M4 21V9l8-6 8 6v12M9 21V13h6v8" />,
    edit: (
        <>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </>
    ),
    calendar: (
        <>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </>
    ),
    chart: (
        <>
            <path d="M3 3v18h18" />
            <path d="M18.7 8.5l-4.2 4.2-3-3-4.5 4.5" />
        </>
    ),
    trophy: (
        <>
            <path d="M8 21h8M12 17v4" />
            <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
            <path d="M17 4h3a2 2 0 0 1 0 4h-1M7 4H4a2 2 0 0 0 0 4h1" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </>
    ),
    pin: (
        <>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </>
    ),
    userCheck: (
        <>
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
            <path d="M17 8l3 3 5-5" transform="translate(-2,-1)" />
        </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    prev: <path d="M15 18l-6-6 6-6" />,
    next: <path d="M9 18l6-6-6-6" />,
};

/* ---------- Data ---------- */
const heroImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop',
];

const platformList = [
    { label: 'Expert Mentorship', icon: I.users },
    { label: 'Workshops & Training', icon: I.file },
    { label: 'Publication Support', icon: I.book },
    { label: 'Access to Resources', icon: I.layers },
    { label: 'Academic Networking', icon: I.users },
    { label: 'Career Development', icon: I.bars },
    { label: 'Research Collaboration', icon: I.heart },
    { label: 'Global Opportunities', icon: I.globe },
];

const stats = [
    { icon: I.users, count: 500, suffix: '+', label: 'Active Researchers' },
    { icon: I.file, count: 120, suffix: '+', label: 'Publications' },
    { icon: I.target, count: 40, suffix: '+', label: 'Completed Projects' },
    { icon: I.building, count: 25, suffix: '+', label: 'Partner Institutions' },
    { icon: I.globe, count: 12, suffix: '', label: 'Countries' },
    { icon: null, count: 98, suffix: '%', label: 'Member Satisfaction' }, // star icon
];

const grow = [
    { icon: I.openBook, title: 'Learn', text: 'Access research guides, tutorials and learning resources.' },
    { icon: I.edit, title: 'Publish', text: 'Publish your research papers in reputed platforms.' },
    { icon: I.users, title: 'Collaborate', text: 'Connect with researchers and work on meaningful projects.' },
    { icon: I.calendar, title: 'Attend Events', text: 'Join webinars, seminars, and international conferences.' },
    { icon: I.chart, title: 'Analyze Data', text: 'Get support for data analysis using SPSS, SmartPLS, Python, R.' },
    { icon: I.trophy, title: 'Showcase', text: 'Build your profile and showcase your research achievements.' },
];

const publications = [
    {
        title: 'The Impact of Fintech Innovation on Financial Inclusion',
        author: 'Ahmed Khan', date: 'May 20, 2024', tag: 'Finance',
        img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=500&auto=format&fit=crop',
        alt: 'Fintech innovation research',
    },
    {
        title: 'Sustainable Development Goals and Environmental Performance',
        author: 'Sara Ali', date: 'May 18, 2024', tag: 'Sustainability',
        img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=500&auto=format&fit=crop',
        alt: 'Sustainable development research',
    },
    {
        title: 'Artificial Intelligence Adoption in Higher Education',
        author: 'Usman Sheikh', date: 'May 15, 2024', tag: 'Technology',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop',
        alt: 'AI in higher education research',
    },
];

const events = [
    {
        day: '25', mon: 'May', time: '10:00 AM – 12:00 PM', place: 'Online',
        title: 'International Webinar on Data Science Innovations',
        img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=500&auto=format&fit=crop',
        alt: 'Webinar on data science',
    },
    {
        day: '05', mon: 'Jun', time: '02:00 PM – 05:00 PM', place: 'Karachi, Pakistan',
        title: 'Research Methodology Workshop for Beginners',
        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop',
        alt: 'Research methodology workshop',
    },
    {
        day: '15', mon: 'Jun', time: '09:00 AM – 05:00 PM', place: 'Online',
        title: 'International Conference on Business and Management',
        img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500&auto=format&fit=crop',
        alt: 'Conference on business and management',
    },
];

const members = [
    { name: 'Dr. Ahmed Khan', role: 'Professor, University of Karachi', field: 'Artificial Intelligence', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
    { name: 'Dr. Maria Farooq', role: 'Associate Professor, LUMS, Lahore', field: 'Finance & Banking', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Dr. Usman Tariq', role: 'Assistant Professor, NUST, Islamabad', field: 'Data Science', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop' },
    { name: 'Dr. Ayesha Noor', role: 'Researcher, IBA, Karachi', field: 'Marketing', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Dr. Bilal Ahmed', role: 'Senior Lecturer, UET, Lahore', field: 'Engineering', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop' },
];

const testimonials = [
    { name: 'Sara Ali', role: 'Research Scholar', text: 'Zuvex Hub Research Community helped me publish my first research paper and connect with amazing researchers.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' },
    { name: 'Usman Sheikh', role: 'PhD Candidate', text: 'The workshops and mentorship programs are excellent. I improved my research and analytical skills tremendously.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop' },
    { name: 'Hina Fatima', role: 'Lecturer', text: 'A great platform for networking, collaboration, and staying updated with the latest research trends.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop' },
    { name: 'Bilal Ahmed', role: 'Researcher', text: 'I found research partners and opportunities that helped me advance in my academic career.', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop' },
];

const explore = [
    { cls: 'c1', icon: I.users, stroke: 'var(--blue)', title: 'About Community', text: 'Learn about our mission, vision and values.', link: 'Learn More', href: '#platform' },
    { cls: 'c2', icon: I.userCheck, stroke: 'var(--teal)', title: 'Join Community', text: 'Become a member and start your research journey.', link: 'Join Now', href: 'index.html#get-in-touch' },
    { cls: 'c3', icon: I.book, stroke: 'var(--blue)', title: 'Publications', text: 'Browse and explore research papers and articles.', link: 'Explore Now', href: 'blog.html' },
    { cls: 'c4', icon: I.calendar, stroke: 'var(--teal)', title: 'Events', text: 'Discover upcoming events and opportunities.', link: 'View Events', href: '#events' },
];

const delay = (i: number, step = 0.04, base = 0.02) =>
    ({ '--reveal-delay': `${(base + i * step).toFixed(2)}s` } as React.CSSProperties);

export default function ResearchCommunityPage() {
    const [heroIndex, setHeroIndex] = useState(0);
    const [heroPaused, setHeroPaused] = useState(false);
    const membersRef = useRef<HTMLDivElement>(null);
    const testiRef = useRef<HTMLDivElement>(null);

    // Hero background autoplay (pauses on hover)
    useEffect(() => {
        if (heroPaused) return;
        const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 2000);
        return () => clearInterval(id);
    }, [heroPaused]);

    // Scroll reveal and count-up stats animations
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
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

    const scrollGrid = (ref: React.RefObject<HTMLDivElement | null>, dir: number) =>
        ref.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });

    return (
        <>
            {/* ===== HERO / BANNER ===== */}
            <section
                className="hero"
                id="home"
                onMouseEnter={() => setHeroPaused(true)}
                onMouseLeave={() => setHeroPaused(false)}
            >
                <div className="hero-bg-slider">
                    {heroImages.map((src, i) => (
                        <div
                            key={src}
                            className={`hero-bg-slide${i === heroIndex ? ' active' : ''}`}
                            style={{ backgroundImage: `url('${src}')` }}
                        />
                    ))}
                </div>
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-text">
                        <div className="eyebrow">INNOVATE • CREATE • GROW</div>
                        <h1>One Hub, Many Solutions</h1>
                        <p>
                            ZUVEX HUB Empowering businesses, researchers, and innovators with integrated solutions
                            in technology, research, design, and digital transformation.
                        </p>
                        <div className="hero-buttons">
                            <a href="#join" className="btn btn-primary">Join Our Community</a>
                            <a href="services.html" className="btn btn-outline">Explore Services</a>
                        </div>
                    </div>
                </div>
                <div className="hero-slider-dots">
                    {heroImages.map((src, i) => (
                        <button
                            key={src}
                            aria-label={`Go to slide ${i + 1}`}
                            className={i === heroIndex ? 'active' : ''}
                            onClick={() => setHeroIndex(i)}
                        />
                    ))}
                </div>
            </section>
            <br /><br />

            {/* ===== PLATFORM / ABOUT COMMUNITY ===== */}
            <section className="section" id="platform" style={{ paddingTop: 0 }}>
                <div className="container platform-grid">
                    <div className="platform-media reveal-left">
                        <img
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=900&auto=format&fit=crop"
                            alt="Students studying together in a library"
                        />
                    </div>
                    <div className="platform-text reveal-right">
                        <div className="eyebrow">WHY JOIN OUR COMMUNITY?</div>
                        <h2>A Platform for Collaboration and Academic Growth</h2>
                        <p>
                            Our Research Community is designed to support every stage of the research journey — from
                            learning research methodologies to publishing scholarly work and building collaborations
                            with experts worldwide.
                        </p>
                        <ul className="platform-list">
                            {platformList.map((item) => (
                                <li key={item.label}>
                                    <span className="p-ico"><Svg>{item.icon}</Svg></span>
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="stats-strip">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div className="stat-card reveal" key={s.label} style={delay(i)}>
                                {s.icon ? (
                                    <div className="st-ico"><Svg size={18}>{s.icon}</Svg></div>
                                ) : (
                                    <div className="st-ico" style={{ color: '#f5a623', background: '#fff3e0' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="num" data-count={s.count} data-suffix={s.suffix}>0</div>
                                <div className="lbl">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHAT YOU CAN DO ===== */}
            <section className="section">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>WHAT YOU CAN DO</div>
                        <h2 className="section-heading">Everything You Need to Grow as a Researcher</h2>
                    </div>
                    <div className="grow-grid">
                        {grow.map((g, i) => (
                            <div className="grow-card reveal" key={g.title} style={delay(i)}>
                                <div className="g-ico"><Svg size={22}>{g.icon}</Svg></div>
                                <h4>{g.title}</h4>
                                <p>{g.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PUBLICATIONS & EVENTS ===== */}
            <section className="section" style={{ background: 'var(--bg-light)' }} id="publications">
                <div className="container">
                    <div className="pe-grid">
                        <div>
                            <div className="pe-head reveal">
                                <div>
                                    <div className="eyebrow">LATEST PUBLICATIONS</div>
                                    <h3>Explore Recent Research</h3>
                                </div>
                                <a href="#" className="view-all">
                                    View All Publications <Svg size={12}>{I.arrow}</Svg>
                                </a>
                            </div>
                            <div className="pub-row">
                                {publications.map((p, i) => (
                                    <div className="pub-card reveal" key={p.title} style={delay(i)}>
                                        <div className="pub-img"><img src={p.img} alt={p.alt} /></div>
                                        <div className="pub-body">
                                            <h5>{p.title}</h5>
                                            <div className="pub-meta">
                                                <span>{p.author}</span><span>·</span><span>{p.date}</span>
                                                <span className="tag">{p.tag}</span>
                                            </div>
                                            <a className="pub-link" href="blog.html">
                                                Read More <Svg size={12}>{I.arrow}</Svg>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div id="events" style={{ paddingTop: '50px' }}>
                            <div className="pe-head reveal">
                                <div>
                                    <div className="eyebrow">UPCOMING EVENTS</div>
                                    <h3>Join Upcoming Events</h3>
                                </div>
                                <a href="#" className="view-all">
                                    View All Events <Svg size={12}>{I.arrow}</Svg>
                                </a>
                            </div>
                            <div className="event-row">
                                {events.map((e, i) => (
                                    <div className="event-card reveal" key={e.title} style={delay(i)}>
                                        <div className="event-img">
                                            <span className="event-date">
                                                <span className="d-num">{e.day}</span>
                                                <span className="d-mon">{e.mon}</span>
                                            </span>
                                            <img src={e.img} alt={e.alt} />
                                        </div>
                                        <div className="event-body">
                                            <h5>{e.title}</h5>
                                            <div className="event-meta">
                                                <span className="m-item"><Svg size={12}>{I.clock}</Svg>{e.time}</span>
                                                <span className="m-item"><Svg size={12}>{I.pin}</Svg>{e.place}</span>
                                            </div>
                                            <a href="index.html#get-in-touch" className="btn btn-primary">Register Now</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MEET OUR COMMUNITY ===== */}
            <section className="section">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>MEET OUR COMMUNITY</div>
                        <h2 className="section-heading">Connect with Researchers Worldwide</h2>
                    </div>
                    <div className="members-head reveal" style={{ marginTop: '-30px' }}>
                        <span></span>
                        <div className="members-nav">
                            <button aria-label="Previous" onClick={() => scrollGrid(membersRef, -1)}>
                                <Svg size={14}>{I.prev}</Svg>
                            </button>
                            <button aria-label="Next" onClick={() => scrollGrid(membersRef, 1)}>
                                <Svg size={14}>{I.next}</Svg>
                            </button>
                        </div>
                    </div>
                    <div className="members-grid" ref={membersRef}>
                        {members.map((m, i) => (
                            <div className="member-card reveal" key={m.name} style={delay(i)}>
                                <div className="member-avatar"><img src={m.img} alt={m.name} /></div>
                                <h5>{m.name}</h5>
                                <span className="member-role">{m.role}</span>
                                <div className="member-field">{m.field}</div>
                                <div className="member-socials"><a>in</a><a>G</a><a>RG</a></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section" style={{ background: 'var(--bg-light)' }}>
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>SUCCESS STORIES</div>
                        <h2 className="section-heading">What Our Members Say</h2>
                    </div>
                    <div className="testi-rc-wrap reveal">
                        <button className="testi-rc-arrow prev" aria-label="Previous" onClick={() => scrollGrid(testiRef, -1)}>
                            <Svg size={15}>{I.prev}</Svg>
                        </button>
                        <button className="testi-rc-arrow next" aria-label="Next" onClick={() => scrollGrid(testiRef, 1)}>
                            <Svg size={15}>{I.next}</Svg>
                        </button>
                        <div className="testi-rc-grid" ref={testiRef}>
                            {testimonials.map((t) => (
                                <div className="testi-rc-card" key={t.name}>
                                    <div className="testi-stars">★★★★★</div>
                                    <p>{t.text}</p>
                                    <div className="testi-rc-person">
                                        <img src={t.img} alt={t.name} />
                                        <div>
                                            <h6>{t.name}</h6><span>{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== EXPLORE RESEARCH COMMUNITY ===== */}
            <section className="section" id="join">
                <div className="container">
                    <div className="section-heading-wrap reveal">
                        <div className="eyebrow" style={{ justifyContent: 'center' }}>EXPLORE RESEARCH COMMUNITY</div>
                    </div>
                    <div className="explore-grid" style={{ marginTop: '-30px' }}>
                        {explore.map((e, i) => (
                            <div className={`explore-card ${e.cls} reveal`} key={e.title} style={delay(i)}>
                                <div className="e-ico"><Svg size={20} stroke={e.stroke}>{e.icon}</Svg></div>
                                <h5>{e.title}</h5>
                                <p>{e.text}</p>
                                <a className="e-link" href={e.href}>
                                    {e.link} <Svg size={12}>{I.arrow}</Svg>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NEWSLETTER + JOIN CTA ===== */}
            <section className="section" style={{ paddingTop: 0, paddingBottom: '90px' }}>
                <div className="container bottom-grid">
                    <div className="newsletter-box reveal-left">
                        <div className="nb-text">
                            <h4>Stay Updated with Our Newsletter</h4>
                            <p>Subscribe to receive updates on publications, events, workshops and research opportunities.</p>
                            <div className="nb-form">
                                <input type="email" placeholder="Enter your email address" />
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="join-cta-box reveal-right">
                        <div className="join-cta-text">
                            <h4>Ready to Join the Future of Research?</h4>
                            <p>
                                Become part of a growing network of innovators, researchers and academic professionals
                                making a real-world impact.
                            </p>
                            <div className="join-cta-buttons">
                                <a href="index.html#get-in-touch" className="btn btn-white">
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                        <Svg size={15}>{I.users}</Svg>
                                        Join Community
                                    </span>
                                </a>
                                <a href="index.html#get-in-touch" className="btn btn-outline-white">Contact Us</a>
                            </div>
                        </div>
                        <div className="join-cta-media">
                            <svg width="110" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                {I.globe}
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}