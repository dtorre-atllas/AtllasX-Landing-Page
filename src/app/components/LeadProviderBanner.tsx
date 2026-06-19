import { ExternalLink } from "lucide-react";

const providers = [
  {
    name: "Apollo",
    label: "Apollo.io",
    url: "https://get.apollo.io/9jbxm9ksnpyb",
    accentColor: "#F5C518",
    description: "B2B contact & company data",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#F5C518" strokeWidth="1.5" />
        <path d="M8 16l2.5-7h3L16 16" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 13h5" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "A-Leads",
    label: "A-Leads",
    url: "https://a-leads.co/?via=roderick",
    accentColor: "#4ade80",
    description: "High-intent verified leads",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 20h18L12 3z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14h6" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Seamless.AI",
    label: "Seamless.AI",
    url: "https://get.seamless.ai/fcsyolqxjwon",
    accentColor: "#38bdf8",
    description: "Real-time search engine for leads",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />
      </svg>
    ),
  },
  {
    name: "ZoomInfo",
    label: "ZoomInfo",
    url: "https://try.zoominfo.com/gdzwqctw3an8",
    accentColor: "#f87171",
    description: "Enterprise go-to-market intelligence",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#f87171" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#f87171" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#f87171" strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="#f87171" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function LeadProviderBanner() {
  return (
    <section className="relative py-20 px-6">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5372ea]/30 bg-[#5372ea]/10">
          <span className="text-[#5372ea] text-xs">✦</span>
          <span className="text-[#5372ea] text-xs uppercase tracking-widest">Trusted Lead Providers</span>
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          Source leads from the world's{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #5372ea, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            top platforms
          </span>
        </h2>
      </div>
      <p className="text-center text-white/80 text-xl mb-2 max-w-xl mx-auto">
        We've curated the best lead providers in the industry. Sign up through our partner links — it supports AtllasX at no extra cost to you.
      </p>
      <p className="text-center text-white/30 text-xs mb-12 max-w-sm mx-auto">
        AtllasX earns a commission on referrals.
      </p>

      {/* Cards */}
      <div className="max-w-5xl mx-auto">
        <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto py-4 px-4 lg:overflow-visible lg:py-0 lg:px-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
        {providers.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`Sign up for ${p.label}`}
            className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.03] flex-shrink-0 w-64 lg:w-auto snap-start"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top left, ${p.accentColor}18 0%, transparent 70%)`,
                border: `1px solid ${p.accentColor}30`,
              }}
            />

            <div className="relative z-10">
              {p.icon}
            </div>

            <div className="relative z-10 flex-1">
              <p className="text-white font-medium text-base leading-tight">{p.label}</p>
              <p className="text-white/40 text-xs mt-1 leading-relaxed">{p.description}</p>
            </div>

            <div
              className="relative z-10 flex items-center gap-1 text-xs transition-all duration-200 opacity-50 group-hover:opacity-100"
              style={{ color: p.accentColor }}
            >
              <ExternalLink size={11} />
              <span>Sign up free</span>
            </div>
          </a>
        ))}
        </div>
      </div>
    </section>
  );
}
