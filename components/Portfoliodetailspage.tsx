'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { categoryLabel, type ProjectItem } from '@/lib/Projects';

/* ---------- Count-up for result values ("99.2%", "12,540+", "Real-time") ---------- */

function parseValue(value: string) {
  const m = value.trim().match(/^(\D*?)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const num = m[2];
  return {
    prefix: m[1],
    target: parseFloat(num.replace(/,/g, '')),
    decimals: num.includes('.') ? num.split('.')[1].length : 0,
    grouped: num.includes(','),
    suffix: m[3],
  };
}

function ResultValue({ value }: { value: string }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || !ref.current) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const formatted = (eased * parsed.target).toLocaleString('en-US', {
            minimumFractionDigits: parsed.decimals,
            maximumFractionDigits: parsed.decimals,
            useGrouping: parsed.grouped,
          });
          setText(`${parsed.prefix}${formatted}${parsed.suffix}`);
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed]);

  return (
    <div className="val" ref={ref} style={parsed ? undefined : { fontSize: '20px' }}>
      {text}
    </div>
  );
}

/* ---------- Page ---------- */

type Props = { project: ProjectItem };

export const PortfolioDetailsPage: React.FC<Props> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showAllImages, setShowAllImages] = useState<boolean>(false);

  const objectives = project.objectives ?? [];
  const tags = project.tags ?? [];
  const results = project.results ?? [];
  const gallery = project.gallery_urls ?? [];
  const heroImage = project.cover_url ?? gallery[0] ?? null;
  const mainCategory = categoryLabel(project.categories[0]);

  const hasOverview = Boolean(project.overview || objectives.length);
  const hasChallenge = Boolean(project.challenge);
  const hasSolution = Boolean(project.solution);

  // Only show tabs for sections that actually have content
  const tabs = [
    { id: 'overview', label: 'Overview', show: hasOverview, icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></> },
    { id: 'challenge', label: 'The Challenge', show: hasChallenge, icon: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></> },
    { id: 'solution', label: 'Our Solution', show: hasSolution, icon: <><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /><path d="M9 21h6" /></> },
    { id: 'gallery', label: 'Gallery', show: gallery.length > 0, icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></> },
    { id: 'results', label: 'Results', show: results.length > 0, icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
  ].filter((t) => t.show);

  const tabKey = tabs.map((t) => t.id).join(',');

  // Scroll-reveal
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Tab bar: highlight the section currently in view
  useEffect(() => {
    const ids = tabKey ? tabKey.split(',') : [];
    if (!ids.length) return;
    setActiveTab(ids[0]);

    const onScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
          setActiveTab(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tabKey]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
    const target = document.getElementById(tabId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const visibleGallery = showAllImages ? gallery : gallery.slice(0, 3);

  return (
    <div className="portfolio-details-page">
      {/* ===== PROJECT HERO ===== */}
      <section className="proj-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/portfolio">Portfolio</Link>
            <span className="sep">/</span>
            <span className="current">{project.title}</span>
          </div>

          <div className="proj-hero-grid">
            <div className="proj-hero-left">
              <h1>{project.title}</h1>
              <p>{project.summary}</p>

              <div className="proj-meta-grid">
                <div className="proj-meta-item">
                  <div className="pm-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>{' '}
                    Category
                  </div>
                  <div className="pm-value">{mainCategory}</div>
                </div>
                {project.client && (
                  <div className="proj-meta-item">
                    <div className="pm-label">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>{' '}
                      Client
                    </div>
                    <div className="pm-value">{project.client}</div>
                  </div>
                )}
                <div className="proj-meta-item">
                  <div className="pm-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>{' '}
                    Year
                  </div>
                  <div className="pm-value">{project.year}</div>
                </div>
                {project.duration && (
                  <div className="proj-meta-item">
                    <div className="pm-label">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>{' '}
                      Duration
                    </div>
                    <div className="pm-value">{project.duration}</div>
                  </div>
                )}
              </div>

              {tags.length > 0 && (
                <div className="proj-tags">
                  {tags.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            {heroImage && (
              <div className="proj-hero-right">
                <img
                  src={heroImage}
                  alt={project.title}
                  style={{
                    display: 'block',
                    width: '100%',
                    maxHeight: 420,
                    objectFit: 'cover',
                    borderRadius: 16,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== TAB BAR ===== */}
      {tabs.length > 0 && (
        <nav className="proj-tabbar">
          <div className="container proj-tabbar-inner">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`proj-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={(e) => handleTabClick(e, tab.id)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {tab.icon}
                </svg>
                {tab.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* ===== OVERVIEW ===== */}
      {hasOverview && (
        <section className="section" id="overview" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="proj-overview-grid reveal">
              {project.overview && (
                <div>
                  <h2>Project Overview</h2>
                  <p style={{ whiteSpace: 'pre-line' }}>{project.overview}</p>
                </div>
              )}
              {objectives.length > 0 && (
                <div className="proj-objectives">
                  <h3>Objectives</h3>
                  <ul>
                    {objectives.map((obj, i) => (
                      <li key={i}>
                        <span className="check-ic">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== CHALLENGE / SOLUTION ===== */}
      {(hasChallenge || hasSolution) && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="container">
            <div className="proj-cs-grid reveal">
              {hasChallenge && (
                <div className="proj-cs-card challenge" id="challenge">
                  <h3>The Challenge</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{project.challenge}</p>
                </div>
              )}
              {hasSolution && (
                <div className="proj-cs-card solution" id="solution">
                  <h3>Our Solution</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{project.solution}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== GALLERY ===== */}
      {gallery.length > 0 && (
        <section className="section" id="gallery" style={{ paddingTop: '80px', paddingBottom: 0 }}>
          <div className="container">
            <div className="proj-gallery-head reveal">
              <h2>Project Gallery</h2>
            </div>
            <div className="proj-gallery-grid reveal">
              {visibleGallery.map((src, i) => (
                <div className="proj-gallery-item" key={src}>
                  <img src={src} alt={`${project.title} – image ${i + 1}`} />
                </div>
              ))}
              {gallery.length > 3 && (
                <div className="proj-gallery-item view-all">
                  <button
                    type="button"
                    className="view-all-btn"
                    onClick={() => setShowAllImages((v) => !v)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    {showAllImages ? 'Show Fewer Images' : `View All Images (${gallery.length})`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== RESULTS ===== */}
      {results.length > 0 && (
        <section className="section" id="results" style={{ paddingTop: '80px', paddingBottom: 0 }}>
          <div className="container">
            <div className="proj-results-head reveal">
              <h2>Results &amp; Impact</h2>
            </div>
            <div className="proj-results-grid">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="proj-result-card reveal"
                  style={{ '--reveal-delay': `${0.02 + i * 0.04}s` } as React.CSSProperties}
                >
                  <ResultValue value={r.value} />
                  <div className="lbl">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="section" style={{ paddingTop: '80px' }}>
        <div className="container">
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
                <h4>Want to build something similar?</h4>
                <p>Let&apos;s discuss how we can help you with your next project.</p>
              </div>
            </div>
            <div className="pf-cta-buttons">
              <Link href="/#get-in-touch" className="btn btn-white">
                Get Free Consultation
              </Link>
              <Link href="/portfolio" className="btn btn-navy-outline">
                Back to All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetailsPage;