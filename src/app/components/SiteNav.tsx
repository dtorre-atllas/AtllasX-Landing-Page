'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { DEMO_CTA_URL } from '../lib/constants';

const NAV_ITEMS: Array<{ label: string; to: string }> = [
  { label: 'Product', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Industries', to: '/industries' },
];

/**
 * Sticky dark navigation bar shared by every page.
 * Internal links use react-router <Link> for SPA-style transitions.
 * The external demo CTA opens in a new tab.
 */
export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'rgba(10, 10, 10, 0.85)',
        borderColor: '#262626',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="font-black text-lg tracking-tight"
              style={{
                color: '#FAFAFA',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.04em',
              }}
            >
              AtllasX
            </div>
          </Link>
          <div
            className="hidden md:flex items-center gap-7 text-sm"
            style={{ color: '#A3A3A3' }}
          >
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="transition hover:text-white"
                  style={{ color: active ? '#FAFAFA' : '#A3A3A3' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={DEMO_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition"
            style={{
              background: '#F5F5F5',
              color: '#0A0A0A',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'white';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#F5F5F5';
            }}
          >
            Book a Demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 3L9 7L5 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: '#FAFAFA' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: '#0A0A0A',
            borderColor: '#262626',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm transition hover:text-white"
                style={{ color: '#A3A3A3' }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={DEMO_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{ background: '#F5F5F5', color: '#0A0A0A' }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default SiteNav;
