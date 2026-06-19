'use client';

/**
 * Dark top-of-page banner with TCPA tagline.
 * Rendered above SiteNav on every page.
 */
export function TopBanner() {
  return (
    <div
      className="relative z-50 py-2.5 border-b"
      style={{
        background: '#0A0A0A',
        borderColor: '#262626',
        color: '#A3A3A3',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 text-xs">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: '#4ADE80',
            animation: 'atx-pulse 1.5s ease-in-out infinite',
          }}
        />
        <span>
          Inbound leads called in 60 seconds. 24/7.{' '}
          <span style={{ color: '#FAFAFA' }}>
            TCPA-compliant by design.
          </span>
        </span>
      </div>
      <style>{`
        @keyframes atx-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

export default TopBanner;
