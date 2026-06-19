import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Gift, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show popup after 8 seconds on first visit (faster trigger)
    const timer = setTimeout(() => {
      if (!hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    }, 8000);

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop when mouse leaves from top (within 50px instead of 0)
      if (e.clientY <= 50 && !hasShown && window.innerWidth >= 768) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop - doesn't block scrolling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] pointer-events-none"
            aria-hidden="true"
          />

          {/* Popup - Better centered on mobile with proper padding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[91] w-[calc(100%-2rem)] max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            aria-describedby="popup-description"
          >
            <div className="bg-gradient-to-br from-[#020213] to-[#0a0a1e] border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl relative pointer-events-auto">
              {/* Larger, easier to tap close button on mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-white/70 hover:text-white transition-colors p-2 md:p-1 hover:bg-white/10 rounded-full z-10"
                aria-label="Close popup"
              >
                <X className="w-6 h-6 md:w-5 md:h-5" />
              </button>

              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block mb-4"
                  aria-hidden="true"
                >
                  <div className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-full p-3 md:p-4">
                    <Gift className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </motion.div>

                <h3 id="popup-title" className="text-2xl md:text-3xl font-semibold text-white mb-3">
                  Ready to Scale Your Calls?
                </h3>
                <p id="popup-description" className="text-white/70 text-base md:text-lg mb-6">
                  Join 1,000+ teams closing more deals with AI calling.
                </p>

                <div className="space-y-4">
                  <a href="https://app.atllasx.com/dashboard/ai-calling/create" className="w-full block">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-[#5372ea] to-[#7a63eb] text-white py-5 md:py-6 text-base md:text-lg rounded-full">
                        Get Started Now
                        <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                      </Button>
                    </motion.div>
                  </a>

                  <motion.a
                    href="tel:+14159694084"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block"
                    aria-label="Or call us at 4 1 5 9 6 9 4 0 8 4"
                  >
                    <Button className="w-full bg-white/10 border border-white/20 text-white py-4 md:py-5 text-sm md:text-base rounded-full hover:bg-white/20">
                      <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                      Or Call (415) 969-4084
                    </Button>
                  </motion.a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPopup(false);
                    }}
                    className="text-white/50 text-xs md:text-sm hover:text-white/70 transition-colors w-full text-center"
                  >
                    No thanks, I'll miss out
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white/60 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Setup in 5 min
                  </div>
                  <div>Cancel anytime</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
