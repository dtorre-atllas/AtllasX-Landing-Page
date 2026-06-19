import { PhoneCall } from "lucide-react";

export function DesktopFloatingPhone() {
  return (
    <div
      className="hidden lg:block"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 50
      }}
    >
      <a
        href="tel:+14159694084"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'linear-gradient(to right, #5372ea, #7a63eb)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '50px',
          textDecoration: 'none',
          boxShadow: '0 10px 40px rgba(83, 114, 234, 0.8)',
          cursor: 'pointer',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <PhoneCall style={{ width: '20px', height: '20px', color: 'white' }} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Try it now!</div>
          <div style={{ fontWeight: 600, fontSize: '16px' }}>(415) 969-4084</div>
        </div>
      </a>
    </div>
  );
}
