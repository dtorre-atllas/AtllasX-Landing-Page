import { useEffect } from 'react';

export function Intercom() {
  useEffect(() => {
    // Set Intercom settings
    (window as any).intercomSettings = {
      api_base: "https://api-iam.intercom.io",
      app_id: "i0g3zedr",
    };

    // Load Intercom widget
    const w = window as any;
    const ic = w.Intercom;
    
    if (typeof ic === "function") {
      ic('reattach_activator');
      ic('update', w.intercomSettings);
    } else {
      const d = document;
      const i = function(...args: any[]) {
        i.c(args);
      };
      i.q = [] as any[];
      i.c = function(args: any) {
        i.q.push(args);
      };
      w.Intercom = i;
      
      const l = function() {
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/i0g3zedr';
        const x = d.getElementsByTagName('script')[0];
        x.parentNode!.insertBefore(s, x);
      };
      
      if (document.readyState === 'complete') {
        l();
      } else if (w.attachEvent) {
        w.attachEvent('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    }

    // Add custom CSS to position Intercom button above sticky CTA on mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 1023px) {
        #intercom-container .intercom-launcher-frame,
        #intercom-container iframe[name*="intercom-launcher"] {
          bottom: 130px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if ((window as any).Intercom) {
        (window as any).Intercom('shutdown');
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}