import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="lg:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '16px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(2, 2, 19, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '16px',
          boxShadow: '0 -10px 40px rgba(83, 114, 234, 0.4), 0 0 0 1px rgba(83, 114, 234, 0.2)',
        }}
      >
        <a
          href="https://app.atllasx.com/dashboard/ai-calling/create"
          style={{
            display: 'flex',
            width: '100%',
            background: 'linear-gradient(to right, #5372ea, #7a63eb)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(83, 114, 234, 0.4)',
            marginBottom: '12px'
          }}
        >
          Get Started
          <ArrowRight style={{ width: '20px', height: '20px' }} />
        </a>
        
        <div style={{ 
          color: 'rgba(255, 255, 255, 0.6)', 
          fontSize: '13px', 
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <span>⚡</span>
          <span>Setup in minutes • 24/7 AI calling</span>
        </div>
      </div>
    </div>
  );
}