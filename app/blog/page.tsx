'use client';
import React, { useEffect, useState } from 'react';

const Svg = ({ size = 12, children }: { size?: number; children: React.ReactNode }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {children}
    </svg>
);

const CalendarIcon = ({ size = 12 }: { size?: number }) => (
    <Svg size={size}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </Svg>
);

const ClockIcon = ({ size = 12 }: { size?: number }) => (
    <Svg size={size}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </Svg>
);

const BOOK = (
    <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
);

/* ---------- Data ---------- */
const posts = [
    {
        cat: 'Research', title: 'How to Write a Strong Research Proposal',
        text: 'A comprehensive guide to writing effective research proposals for academic success.',
        date: 'May 20, 2026', read: '6 min read',
        img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
    },
    {
        cat: 'Web Development', title: 'Top 10 Web Development Trends in 2026',
        text: 'Discover the latest trends, tools and technologies shaping the future of web development.',
        date: 'May 18, 2026', read: '5 min read',
        img: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=600&auto=format&fit=crop',
    },
    {
        cat: 'AI & ML', title: 'Understanding Machine Learning Algorithms',
        text: 'A beginner-friendly explanation of popular machine learning algorithms with real-world examples.',
        date: 'May 15, 2026', read: '8 min read',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
    },
    {
        cat: 'Graphic Design', title: 'Branding Tips for Startups',
        text: 'Learn essential branding strategies to build a strong identity and stand out in the market.',
        date: 'May 12, 2026', read: '4 min read',
        img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
    },
    {
        cat: 'Business', title: 'Digital Transformation: A Complete Guide',
        text: 'Understand the key steps and best practices for successful digital transformation.',
        date: 'May 10, 2026', read: '7 min read',
        img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop',
    },
    {
        cat: 'Tutorials', title: 'Complete Guide to WordPress for Beginners',
        text: 'Step-by-step guide to building professional websites using WordPress.',
        date: 'May 08, 2026', read: '6 min read',
        img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
    },
];

const chips = ['All', 'Research', 'AI & ML', 'Web Development', 'Tutorials', 'Business'];
const selectOptions = ['All', 'Research', 'AI & ML', 'Web Development', 'Graphic Design', 'Business', 'Tutorials'];

const categories = [
    { label: 'Research', count: 12, icon: BOOK },
    { label: 'AI & Machine Learning', count: 10, icon: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>) },
    { label: 'Web Development', count: 15, icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /> },
    {
        label: 'Graphic Design', count: 8,
        icon: (
            <>
                <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" />
                <circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.4-4.5-8-10-8z" />
            </>
        ),
    },
    { label: 'Business', count: 9, icon: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>) },
    { label: 'Tutorials', count: 11, icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>) },
    { label: 'Digital Marketing', count: 6, icon: (<><path d="M3 11l18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>) },
    { label: 'News & Updates', count: 7, icon: BOOK },
];

const tags = [
    'AI', 'Machine Learning', 'Python', 'Research', 'Web Development', 'WordPress',
    'UI/UX', 'Branding', 'SEO', 'Business', 'Tutorial', 'Data Science',
];

const delay = (i: number) =>
    ({ '--reveal-delay': `${(0.04 + (i % 3) * 0.04).toFixed(2)}s` } as React.CSSProperties);

export default function BlogPage() {
    const [category, setCategory] = useState('All');
    const [query, setQuery] = useState('');

    const q = query.trim().toLowerCase();
    const filtered = posts.filter(
        (p) =>
            (category === 'All' || p.cat === category) &&
            (!q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q))
    );

    // Scroll reveal (re-runs when the filtered list changes so new cards animate in)
    useEffect(() => {
        const els = document.querySelectorAll('.reveal:not(.in-view)');
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
    }, [category, query]);

    return (
        <>
            {/* ===== BLOG PAGE BANNER ===== */}
            <section className="page-header page-header--blog">
                <div className="page-header-bg"></div>
                <div className="page-header-overlay"></div>
                <div className="container" style={{ textAlign: 'left' }}>
                    <h1>Our Blog</h1>
                    <div className="breadcrumb">
                        <a href="index.html">Home</a>
                        <span className="sep">/</span>
                        <span className="current">Blog</span>
                    </div>
                    <p className="sub">
                        Insights, tutorials, research, technology trends and business updates to keep you informed and
                        inspired.
                    </p>
                </div>
            </section>

            {/* ===== BLOG CONTENT ===== */}
            <section className="section" style={{ paddingTop: 0, paddingBottom: '70px' }}>
                <div className="container">
                    {/* Toolbar */}
                    <div className="blog-toolbar reveal">
                        <div className="search-field">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search blog..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <select className="cat-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {selectOptions.map((o) => (
                                <option key={o} value={o}>{o === 'All' ? 'All Categories' : o}</option>
                            ))}
                        </select>
                        <div className="filter-chips">
                            {chips.map((c) => (
                                <button
                                    key={c}
                                    className={`chip${category === c ? ' active' : ''}`}
                                    onClick={() => setCategory(c)}
                                >
                                    {c}
                                </button>
                            ))}
                            <button className="chip">More ▾</button>
                        </div>
                    </div>

                    <div className="blog-layout">
                        {/* Main column */}
                        <div>
                            <div className="widget-title reveal" style={{ marginTop: '44px' }}>Featured Blog</div>
                            <div className="featured-blog reveal">
                                <div className="featured-grid">
                                    <div className="featured-img">
                                        <span className="featured-tag">Featured</span>
                                        <img
                                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=900&auto=format&fit=crop"
                                            alt="The Impact of AI on Business Transformation"
                                        />
                                    </div>
                                    <div className="featured-body">
                                        <h3>The Impact of AI on Business Transformation in 2026</h3>
                                        <p>
                                            Explore how artificial intelligence is reshaping industries, improving
                                            productivity, and driving innovation across businesses.
                                        </p>
                                        <div className="post-meta">
                                            <span className="author"><span className="avatar">ZC</span>Zulqarnain Channa</span>
                                            <span className="m-item"><CalendarIcon size={13} />May 25, 2026</span>
                                            <span className="m-item"><ClockIcon size={13} />7 min read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="all-blogs-title reveal">All Blogs</div>

                            {filtered.length === 0 ? (
                                <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
                                    No blog posts match your search. Try a different keyword or category.
                                </p>
                            ) : (
                                <div className="blog-grid-2">
                                    {filtered.map((p, i) => (
                                        <div className="blog-post-card reveal" key={p.title} style={delay(i)}>
                                            <div className="bpc-img">
                                                <span className="bpc-cat">{p.cat}</span>
                                                <img src={p.img} alt={p.title} />
                                            </div>
                                            <div className="bpc-body">
                                                <h4>{p.title}</h4>
                                                <p>{p.text}</p>
                                                <div className="bpc-meta">
                                                    <span className="m-item"><CalendarIcon />{p.date}</span>
                                                    <span className="m-item"><ClockIcon />{p.read}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="pagination reveal">
                                <a>&larr;</a>
                                <span className="active">1</span>
                                <a>2</a>
                                <a>3</a>
                                <a>4</a>
                                <a>5</a>
                                <a>&rarr;</a>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside>
                            <div className="side-widget reveal">
                                <div className="widget-title">Popular Categories</div>
                                <ul className="cat-list">
                                    {categories.map((c) => (
                                        <li key={c.label}>
                                            <a>
                                                <span className="c-ico"><Svg size={14}>{c.icon}</Svg></span>
                                                {c.label}
                                            </a>
                                            <span className="count">{c.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="side-widget reveal">
                                <div className="widget-title">Popular Tags</div>
                                <div className="tag-cloud">
                                    {tags.map((t) => (
                                        <a className="tag-chip" key={t}>{t}</a>
                                    ))}
                                </div>
                            </div>

                            <div className="side-widget newsletter-widget reveal">
                                <h4>Stay Updated</h4>
                                <p>Subscribe to our newsletter and get the latest insights straight to your inbox.</p>
                                <input type="email" placeholder="Enter your email" />
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                        </aside>
                    </div>

                    {/* Topic CTA */}
                    <div className="topic-cta reveal">
                        <div className="topic-cta-left">
                            <div className="topic-cta-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h4>Have a topic in mind?</h4>
                                <p>We love hearing ideas and suggestions for new blog posts.</p>
                            </div>
                        </div>
                        <a href="index.html#get-in-touch" className="btn btn-primary">Suggest a Topic</a>
                    </div>
                </div>
            </section>
        </>
    );
}