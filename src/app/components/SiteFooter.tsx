'use client';

import { Link } from 'react-router';
import { DEMO_CTA_URL } from '../lib/constants';

type FooterLink = { label: string; to?: string; href?: string };

const PRODUCT_LINKS: FooterLink[] = [
  { label: 'Product', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Industries', to: '/industries' },
  { label: 'Book a Demo', href: DEMO_CTA_URL },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: 'About', to: '/' },
  { label: 'Compliance', to: '/compliance' },
];

const RESOURCES_LINKS: FooterLink[] = [
  { label: 'Compliance', to: '/compliance' },
  { label: 'Industries', to: '/industries' },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Terms', to: '/' },
  { label: 'Privacy', to: '/' },
  { label: 'Security', to: '/compliance' },
  { label: 'DPA', to: '/compliance' },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div className="md:col-span-2">
      <div
        className="text-xs uppercase tracking-wider mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          color: '#6B7280',
        }}
      >
        {heading}
      </div>
      <ul className="space-y-2 text-sm">
        {links.map((item) =>
          item.href ? (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                style={{ color: '#A3A3A3' }}
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.label}>
              <Link
                to={item.to ?? '/'}
                className="hover:text-white transition"
                style={{ color: '#A3A3A3' }}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="border-t py-12"
      style={{
        background: '#0A0A0A',
        borderColor: '#262626',
        color: '#FAFAFA',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-4">
            <div className="mb-4">
              <span
                className="font-black text-lg tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.04em',
                }}
              >
                AtllasX
              </span>
            </div>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: '#A3A3A3' }}
            >
              Inbound lead automation for revenue teams. Calls, texts, qualifies,
              books — TCPA-compliant.
            </p>
          </div>

          <FooterColumn heading="Product" links={PRODUCT_LINKS} />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Resources" links={RESOURCES_LINKS} />
          <FooterColumn heading="Legal" links={LEGAL_LINKS} />
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: '#262626' }}
        >
          <div
            className="text-xs"
            style={{
              fontFamily: 'var(--font-mono)',
              color: '#6B7280',
            }}
          >
            © 2026 AtllasX. All rights reserved.
          </div>
          <div
            className="text-xs flex items-center gap-4"
            style={{
              fontFamily: 'var(--font-mono)',
              color: '#6B7280',
            }}
          >
            <span>SOC 2 in progress</span>
            <span>·</span>
            <span>TCPA compliant</span>
            <span>·</span>
            <span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#4ADE80',
                  marginRight: '0.5rem',
                  animation: 'atx-pulse 1.5s ease-in-out infinite',
                }}
              />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
