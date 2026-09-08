import { useEffect } from "react";
type IntercomWindow = Window & {
  Intercom?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  intercomSettings?: Record<string, string | boolean>;
};
export function Intercom() {
  useEffect(() => {
    const w = window as IntercomWindow;
    w.intercomSettings = {
      api_base: "https://api-iam.intercom.io",
      app_id: "i0g3zedr",
      hide_default_launcher: true,
      hide_notifications: true,
    };
    if (w.Intercom) {
      w.Intercom("reattach_activator");
      w.Intercom("update", w.intercomSettings);
    } else {
      const queued = (...args: unknown[]) => {
        queued.q.push(args);
      };
      queued.q = [] as unknown[][];
      w.Intercom = queued;
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://widget.intercom.io/widget/i0g3zedr";
      script.id = "hyzl-intercom";
      document.head.appendChild(script);
    }
    if (!document.getElementById("hyzl-analytics")) {
      const script = document.createElement("script");
      script.id = "hyzl-analytics";
      script.async = true;
      script.src = "https://t.contentsquare.net/uxa/d8165fcac00d7.js";
      document.head.appendChild(script);
    }
    return () => {
      w.Intercom?.("shutdown");
    };
  }, []);
  return null;
}

export function openChat() {
  const w = window as IntercomWindow;
  if (w.Intercom) w.Intercom("show");
  else window.location.href = "mailto:info@atllas.com";
}
