'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PROJECT_CATEGORIES,
  categoryColor,
  categoryLabel,
  type ProjectItem,
} from '@/lib/Projects';

const PAGE_SIZE = 6;

const FILTERS = [
  { label: 'All', filter: 'all' },
  ...PROJECT_CATEGORIES.map((c) => ({ label: c.filterLabel, filter: c.slug as string })),
];

type Props = {
  // null = the API could not be reached
  projects: ProjectItem[] | null;
};

export const PortfolioPage: React.FC<Props> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [page, setPage] = useState<number>(1);

  // Scroll-reveal for the static sections (cards are shown immediately)
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const all = projects ?? [];

  const sorted = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = all.filter((p) => {
      const matchesFilter = activeFilter === 'all' || p.categories.includes(activeFilter);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });

    // "Featured" keeps the order set in the dashboard. Array.sort is stable,
    // so projects from the same year keep that order too.
    const list = [...filtered];
    if (sortBy === 'A–Z') list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === 'Oldest') list.sort((a, b) => a.year - b.year);
    else if (sortBy === 'Latest') list.sort((a, b) => b.year - a.year);
    return list;
  }, [all, activeFilter, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goTo = (n: number) => {
    setPage(Math.min(Math.max(n, 1), totalPages));
    document.getElementById('pfTags')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="portfolio-page-wrapper">
      {/* ===== PORTFOLIO PAGE BANNER ===== */}
      <section className="page-header">
        <div className="page-header-bg"></div>
        <div className="page-header-overlay"></div>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Portfolio</span>
          </div>
          <h1>Our Portfolio</h1>
          <p>
            Explore our diverse portfolio of innovative projects that reflect our commitment to
            excellence and impact.
          </p>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="pf-stats-strip">
        <div className="container">
          <div className="pf-stats-card reveal in-view">
            <div className="pf-stat">
              <div className="pf-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <div className="num">120+</div>
                <div className="label">Projects Delivered</div>
              </div>
            </div>
            <div className="pf-stat">
              <div className="pf-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div className="num">95%</div>
                <div className="label">Client Satisfaction</div>
              </div>
            </div>
            <div className="pf-stat">
              <div className="pf-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div>
                <div className="num">40+</div>
                <div className="label">Research Publications</div>
              </div>
            </div>
            <div className="pf-stat">
              <div className="pf-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div className="num">8+</div>
                <div className="label">Industries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTER + GRID ===== */}
      <section className="pf-filter-section">
        <div className="container">
          <div className="pf-filter-bar reveal">
            <div className="pf-search">
              <input
                type="text"
                id="pfSearchInput"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div className="pf-sort">
              Sort by:{' '}
              <select
                id="pfSortSelect"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
              >
                <option value="Featured">Featured</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
                <option value="A–Z">A–Z</option>
              </select>
            </div>
          </div>

          <div className="pf-tags reveal" id="pfTags">
            {FILTERS.map((tag) => (
              <button
                key={tag.filter}
                className={`pf-tag ${activeFilter === tag.filter ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(tag.filter);
                  setPage(1);
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {projects === null ? (
            <p style={{ textAlign: 'center', padding: '60px 0', opacity: 0.7 }}>
              We couldn&apos;t load our projects right now. Please try again in a moment.
            </p>
          ) : visible.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '60px 0', opacity: 0.7 }}>
              {all.length === 0
                ? 'No projects have been published yet.'
                : 'No projects match your search. Try a different keyword or filter.'}
            </p>
          ) : (
            <div className="pf-grid" id="pfGrid">
              {visible.map((project, index) => {
                const main = project.categories[0];
                return (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.slug}`}
                    className="pf-card reveal in-view"
                    style={{ '--reveal-delay': `${(index + 1) * 0.04}s` } as React.CSSProperties}
                  >
                    <div className="pf-card-img">
                      <span className="pf-card-badge" style={{ background: categoryColor(main) }}>
                        {categoryLabel(main)}
                      </span>
                      {project.cover_url ? (
                        <img src={project.cover_url} alt={project.title} />
                      ) : (
                        <div
                          aria-hidden="true"
                          style={{
                            width: '100%',
                            height: '100%',
                            minHeight: 180,
                            background: `linear-gradient(135deg, ${categoryColor(main)}, #0b1230)`,
                          }}
                        />
                      )}
                    </div>
                    <div className="pf-card-body">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <div className="pf-card-tags">
                        {(project.tags ?? []).map((tag, tIndex) => (
                          <span key={tIndex}>{tag}</span>
                        ))}
                      </div>
                      <div className="pf-card-footer">
                        <span className="pf-year">{project.year}</span>
                        <span className="pf-view-link">
                          View Details{' '}
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pf-pagination reveal">
              <button
                className="arrow"
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={() => goTo(currentPage - 1)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={n === currentPage ? 'active' : ''}
                  aria-current={n === currentPage ? 'page' : undefined}
                  onClick={() => goTo(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="arrow"
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => goTo(currentPage + 1)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}

          <div className="pf-cta-strip reveal">
            <div className="pf-cta-left">
              <div className="pf-cta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h4>Have a project in mind?</h4>
                <p>Let&apos;s work together to build something amazing.</p>
              </div>
            </div>
            <div className="pf-cta-buttons">
              <Link href="/#get-in-touch" className="btn btn-white">
                Get Free Consultation
              </Link>
              <Link href="/#get-in-touch" className="btn btn-navy-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;