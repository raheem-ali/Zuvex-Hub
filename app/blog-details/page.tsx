'use client';
import React, { useEffect, useState } from 'react';

const Svg = ({
    size = 14,
    sw = 2,
    children,
}: {
    size?: number;
    sw?: number;
    children: React.ReactNode;
}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw}>
        {children}
    </svg>
);

const FilledSvg = ({ size = 14, d }: { size?: number; d: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
    </svg>
);

const FB_PATH =
    'M22 12a10 10 0 1 0-11.6 9.87v-6.98H7.9V12h2.5V9.8c0-2.48 1.48-3.85 3.74-3.85 1.08 0 2.2.19 2.2.19v2.43h-1.24c-1.22 0-1.6.76-1.6 1.53V12h2.72l-.44 2.89h-2.28v6.98A10 10 0 0 0 22 12z';
const TW_PATH =
    'M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.5 9.03c0 .34.04.67.11.98A12.15 12.15 0 0 1 2.9 5.16a4.28 4.28 0 0 0 1.32 5.7 4.25 4.25 0 0 1-1.94-.54v.06a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6z';
const LI_PATH =
    'M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.6V23H8.5V8.5z';

const LinkIcon = ({ size = 14 }: { size?: number }) => (
    <Svg size={size}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Svg>
);

/* ---------- Data ---------- */
const toc = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#transforming', label: 'How AI is Transforming Businesses' },
    { href: '#applications', label: 'Real-World Applications' },
    { href: '#applications', label: 'Benefits of AI Adoption' },
    { href: '#applications', label: 'Challenges and Considerations' },
    { href: '#conclusion', label: 'Conclusion' },
];

const iconBoxes = [
    {
        title: 'Automation', text: 'Automating repetitive tasks and workflows to improve efficiency.',
        icon: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </>
        ),
    },
    {
        title: 'Data Insights', text: 'Extracting valuable insights from data for better decisions.',
        icon: (<><path d="M3 3v18h18" /><path d="M18.7 8.5l-4.2 4.2-3-3-4.5 4.5" /></>),
    },
    {
        title: 'Customer Experience', text: 'Personalizing interactions and improving customer satisfaction.',
        icon: (
            <>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </>
        ),
    },
    {
        title: 'Innovation', text: 'Enabling new products, services and business models.',
        icon: (<><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.5.4.8 1 .8 1.7v.1h6.4v-.1c0-.7.3-1.3.8-1.7A7 7 0 0 0 12 2z" /></>),
    },
];

const takeaways = [
    'AI improves efficiency and reduces operational costs.',
    'Data-driven insights lead to smarter business decisions.',
    'Enhanced customer experiences drive loyalty and growth.',
    'Innovation and AI go hand-in-hand.',
];

const related = [
    { title: 'Understanding Machine Learning Algorithms', date: 'May 15, 2026', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop' },
    { title: 'Top 10 Web Development Trends in 2026', date: 'May 18, 2026', img: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=200&auto=format&fit=crop' },
    { title: 'Digital Transformation: A Complete Guide', date: 'May 10, 2026', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200&auto=format&fit=crop' },
];

const sectionIds = ['introduction', 'transforming', 'applications', 'conclusion'];

export default function BlogDetailsPage() {
    const [activeId, setActiveId] = useState('');

    // Scroll reveal
    useEffect(() => {
        const els = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Table of contents: highlight the section currently in view
    useEffect(() => {
        const targets = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-30% 0px -60% 0px' }
        );
        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* ===== BREADCRUMB STRIP ===== */}
            <section className="breadcrumb-strip">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="index.html">Home</a>
                        <span className="sep">/</span>
                        <a href="blog.html">Blog</a>
                        <span className="sep">/</span>
                        <span className="current">The Impact of AI on Business Transformation in 2026</span>
                    </div>
                </div>
            </section>

            {/* ===== ARTICLE ===== */}
            <section className="article-section">
                <div className="container article-layout">
                    {/* Main article */}
                    <article>
                        <div className="article-hero reveal">
                            <img
                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400&auto=format&fit=crop"
                                alt="The Impact of AI on Business Transformation"
                            />
                        </div>

                        <span className="article-cat reveal">AI &amp; Machine Learning</span>
                        <h1 className="article-title reveal">The Impact of AI on Business Transformation in 2026</h1>

                        <div className="article-meta-row reveal">
                            <div className="article-meta-left">
                                <span className="author"><span className="avatar">ZC</span>Zulqarnain Channa</span>
                                <span className="m-item">
                                    <Svg size={13}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></Svg>
                                    May 25, 2026
                                </span>
                                <span className="m-item">
                                    <Svg size={13}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>
                                    7 min read
                                </span>
                                <span className="m-item">
                                    <Svg size={13}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></Svg>
                                    152 views
                                </span>
                            </div>
                            <div className="article-share">
                                Share:
                                <a className="s-ico" aria-label="Facebook"><FilledSvg d={FB_PATH} /></a>
                                <a className="s-ico" aria-label="Twitter"><FilledSvg d={TW_PATH} /></a>
                                <a className="s-ico" aria-label="LinkedIn"><FilledSvg d={LI_PATH} /></a>
                                <a className="s-ico" aria-label="Copy link"><LinkIcon /></a>
                            </div>
                        </div>

                        <div className="article-body">
                            <h2 className="reveal" id="introduction">Introduction</h2>
                            <p className="reveal">
                                Artificial Intelligence (AI) is no longer a futuristic concept — it is here, and it is
                                transforming the way businesses operate. From automating repetitive tasks to delivering
                                data-driven insights, AI is enabling companies to improve efficiency, enhance customer
                                experiences, and drive innovation.
                            </p>

                            <h2 className="reveal" id="transforming">How AI is Transforming Businesses</h2>
                            <p className="reveal">
                                AI technologies such as machine learning, natural language processing, and computer
                                vision are being applied in various industries to solve complex problems and unlock new
                                opportunities.
                            </p>

                            <div className="icon-grid-4">
                                {iconBoxes.map((b, i) => (
                                    <div
                                        className="icon-box reveal"
                                        key={b.title}
                                        style={{ '--reveal-delay': `${(0.04 + i * 0.04).toFixed(2)}s` } as React.CSSProperties}
                                    >
                                        <div className="ib-icon"><Svg size={20}>{b.icon}</Svg></div>
                                        <h5>{b.title}</h5>
                                        <p>{b.text}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 className="reveal" id="applications">Real-World Applications</h2>
                            <p className="reveal">
                                Businesses across industries are leveraging AI for fraud detection, predictive
                                analytics, chatbots, supply chain optimization, and more.
                            </p>

                            <div className="image-pair">
                                <img
                                    className="reveal"
                                    style={{ '--reveal-delay': '.04s' } as React.CSSProperties}
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=700&auto=format&fit=crop"
                                    alt="Predictive analytics dashboard"
                                />
                                <img
                                    className="reveal"
                                    style={{ '--reveal-delay': '.08s' } as React.CSSProperties}
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop"
                                    alt="Business data charts"
                                />
                            </div>

                            <h2 className="reveal" id="conclusion">Conclusion</h2>
                            <p className="reveal">
                                AI is a powerful catalyst for business transformation. Organizations that embrace AI
                                today will be better positioned to succeed in the future.
                            </p>

                            <div className="key-takeaways reveal">
                                <h4>Key Takeaways</h4>
                                <ul>
                                    {takeaways.map((t) => (
                                        <li key={t}>
                                            <span className="k-check"><Svg size={16} sw={3}><path d="M20 6L9 17l-5-5" /></Svg></span>
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside>
                        <div className="side-widget reveal">
                            <div className="widget-title">Table of Contents</div>
                            <div className="toc-list">
                                {toc.map((t, i) => (
                                    <a
                                        key={t.label}
                                        href={t.href}
                                        className={t.href === `#${activeId}` ? 'active' : ''}
                                    >
                                        <span className="toc-num">{i + 1}.</span>
                                        {t.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="side-widget reveal">
                            <div className="widget-title">Author Bio</div>
                            <div className="author-bio">
                                <div className="author-bio-top">
                                    <div className="author-bio-avatar">ZC</div>
                                    <div>
                                        <h5>Zulqarnain Channa</h5>
                                        <span className="role">CEO &amp; Founder, ZUVEX HUB</span>
                                    </div>
                                </div>
                                <p className="bio-text">
                                    Passionate about technology, research and helping businesses grow through digital
                                    solutions.
                                </p>
                                <div className="author-bio-socials">
                                    <a href="#" aria-label="LinkedIn"><FilledSvg size={13} d={LI_PATH} /></a>
                                    <a href="#" aria-label="Twitter"><FilledSvg size={13} d={TW_PATH} /></a>
                                    <a href="#" aria-label="Link"><LinkIcon size={13} /></a>
                                </div>
                            </div>
                        </div>

                        <div className="side-widget reveal">
                            <div className="widget-title">Related Articles</div>
                            {related.map((r) => (
                                <a className="related-article" href="blog.html" key={r.title}>
                                    <img src={r.img} alt={r.title} />
                                    <div>
                                        <h6>{r.title}</h6>
                                        <span>{r.date}</span>
                                    </div>
                                </a>
                            ))}
                            <a className="related-view-all" href="blog.html">View All Blogs</a>
                        </div>

                        <div className="side-widget help-cta reveal">
                            <h4>Need Professional Help?</h4>
                            <p>Our experts can help you leverage AI and digital solutions for your business.</p>
                            <a href="index.html#get-in-touch" className="btn btn-primary">
                                Get Free Consultation
                                <Svg><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
                            </a>
                        </div>
                    </aside>
                </div>
            </section>
        </>
    );
}