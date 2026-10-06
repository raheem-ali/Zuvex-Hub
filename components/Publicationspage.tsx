/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useMemo, useState } from 'react';

/* ---------- Types (served by Laravel) ---------- */
export type PublicationItem = {
    id: number;
    type: string;
    year: number;
    title: string;
    authors: string;
    summary: string;
    cover_url: string | null;
    download_url: string | null;
};

/* ---------- Icons ---------- */
const Svg = ({ size = 16, children }: { size?: number; children: React.ReactNode }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {children}
    </svg>
);

const UserIcon = () => (
    <Svg size={13}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </Svg>
);

const DownloadIcon = () => (
    <Svg size={16}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
        <path d="M12 15V3" />
    </Svg>
);

/* ---------- Stats ---------- */
const stats = [
    {
        value: '50+', label: 'Research Publications',
        icon: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>),
    },
    {
        value: '25+', label: 'Research Authors',
        icon: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
    },
    {
        value: '10+', label: 'Research Areas',
        icon: (<><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>),
    },
    {
        value: '500+', label: 'Total Downloads',
        icon: (<><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></>),
    },
];

const typeOptions = ['All Categories', 'Journal Article', 'Conference Paper', 'Research Report', 'Working Paper', 'Book Chapter'];
const sortOptions = [
    { value: 'latest', label: 'Sort by: Latest' },
    { value: 'oldest', label: 'Sort by: Oldest' },
    { value: 'title', label: 'Sort by: Title (A–Z)' },
];

// Colored covers used when a publication has no cover image
const themes = ['navy', 'mint', 'sky', 'teal', 'light', 'globe', 'ice', 'purple', 'sand'];

const delay = (i: number) =>
    ({ '--reveal-delay': `${(0.04 + (i % 3) * 0.04).toFixed(2)}s` } as React.CSSProperties);

/* ---------- Cover (image with styled fallback) ---------- */
const Cover = ({ pub }: { pub: PublicationItem }) => {
    const [failed, setFailed] = useState(false);
    if (pub.cover_url && !failed) {
        return <img src={pub.cover_url} alt={`${pub.title} cover`} onError={() => setFailed(true)} loading="lazy" />;
    }
    return (
        <div className={`pubs-cover-fallback pubs-theme-${themes[pub.id % themes.length]}`}>
            <span>{pub.title}</span>
        </div>
    );
};

export default function PublicationsPage({
    publications,
}: {
    publications: PublicationItem[] | null;
}) {
    const list = publications ?? [];

    const [query, setQuery] = useState('');
    const [type, setType] = useState('All Categories');
    const [year, setYear] = useState('All Years');
    const [sort, setSort] = useState('latest');

    // Year filter is built from the years that actually exist
    const yearOptions = useMemo(
        () => ['All Years', ...Array.from(new Set(list.map((p) => String(p.year)))).sort((a, b) => Number(b) - Number(a))],
        [list]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const result = list.filter(
            (p) =>
                (type === 'All Categories' || p.type === type) &&
                (year === 'All Years' || String(p.year) === year) &&
                (!q ||
                    p.title.toLowerCase().includes(q) ||
                    p.authors.toLowerCase().includes(q) ||
                    p.summary.toLowerCase().includes(q))
        );
        const sorted = [...result];
        if (sort === 'latest') sorted.sort((a, b) => b.year - a.year);
        if (sort === 'oldest') sorted.sort((a, b) => a.year - b.year);
        if (sort === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title));
        return sorted;
    }, [list, query, type, year, sort]);

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
    }, [type, year, sort, query, list]);

    return (
        <>
            {/* ===== PUBLICATIONS BANNER ===== */}
            <section className="page-header page-header--publications">
                <div className="page-header-bg"></div>
                <div className="page-header-overlay"></div>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="breadcrumb" style={{ justifyContent: 'center' }}>
                        <a href="/">Home</a>
                        <span className="sep">/</span>
                        <span className="current">Publications</span>
                    </div>
                    <h1>Publications</h1>
                    <p className="sub">
                        Explore our latest research papers, reports, and publications that contribute to knowledge and
                        innovation.
                    </p>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="pf-stats-strip">
                <div className="container">
                    <div className="pf-stats-card reveal">
                        {stats.map((s) => (
                            <div className="pf-stat" key={s.label}>
                                <div className="pf-stat-icon">
                                    <Svg size={22}>{s.icon}</Svg>
                                </div>
                                <div>
                                    <div className="num">{s.value}</div>
                                    <div className="label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PUBLICATIONS LIST ===== */}
            <section className="section" style={{ paddingTop: '36px', paddingBottom: '70px' }}>
                <div className="container">
                    {/* Toolbar */}
                    <div className="pubs-toolbar reveal">
                        <div className="search-field pubs-search">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search publications..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search publications"
                            />
                        </div>

                        <select className="cat-select pubs-select" value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by category">
                            {typeOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>

                        <select className="cat-select pubs-select" value={year} onChange={(e) => setYear(e.target.value)} aria-label="Filter by year">
                            {yearOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>

                        <select className="cat-select pubs-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort publications">
                            {sortOptions.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>

                        <div className="pubs-total">Total {filtered.length} publications</div>
                    </div>

                    {/* Cards */}
                    {publications === null ? (
                        <p className="pubs-empty">
                            Publications are temporarily unavailable. Please try again in a few minutes.
                        </p>
                    ) : filtered.length === 0 ? (
                        <p className="pubs-empty">
                            {list.length === 0
                                ? 'No publications have been added yet.'
                                : 'No publications match your filters. Try a different keyword, category or year.'}
                        </p>
                    ) : (
                        <div className="pubs-grid">
                            {filtered.map((p, i) => (
                                <article className="pubs-card reveal" key={p.id} style={delay(i)}>
                                    <div className="pubs-cover">
                                        <Cover pub={p} />
                                    </div>

                                    <div className="pubs-body">
                                        <div className="pubs-meta">
                                            <span className="pubs-type">{p.type}</span>
                                            <span className="pubs-year">{p.year}</span>
                                        </div>
                                        <h4>{p.title}</h4>
                                        <div className="pubs-authors">
                                            <UserIcon />
                                            {p.authors}
                                        </div>
                                        <p>{p.summary}</p>
                                    </div>

                                    {p.download_url ? (
                                        <a className="btn btn-primary pubs-download" href={p.download_url}>
                                            <DownloadIcon />
                                            Download
                                        </a>
                                    ) : (
                                        <button type="button" className="btn btn-primary pubs-download" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                            <DownloadIcon />
                                            Not available
                                        </button>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}