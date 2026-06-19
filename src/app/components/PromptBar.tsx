import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mic } from "lucide-react";
import { Button } from "./ui/button";

const PROMPTS = [
  "Call my 500 leads and book demos for next week…",
  "Follow up with everyone who didn't pick up yesterday…",
  "Qualify my inbound list and forward the hot ones…",
  "Call my no-shows and rebook them…",
];

export function PromptBar() {
  const [inputValue, setInputValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Cycle through placeholder prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PROMPTS.length);
        setIsTyping(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedPrompt = encodeURIComponent(inputValue.trim());
    if (inputValue.trim()) {
      window.location.href = `https://app.atllasx.com/dashboard/ai-calling/create?prompt=${encodedPrompt}`;
    } else {
      window.location.href = "https://app.atllasx.com/dashboard/ai-calling/create";
    }
  };

  const handleMicClick = () => {
    // Navigate to create flow - in a real implementation, this could trigger speech recognition
    window.location.href = "https://app.atllasx.com/dashboard/ai-calling/create";
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit}
      className="mb-6 md:mb-8 px-2"
    >
      <div className="relative group max-w-4xl mx-auto">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-xl md:rounded-2xl blur-md md:blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />

        {/* Input container */}
        <div className="relative bg-[#0a0a0f] border-2 border-white/20 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-stretch gap-2 p-1.5 sm:p-2 md:p-3">
            {/* Text Input */}
            <div className="flex-1 relative min-w-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent text-white text-sm sm:text-base md:text-lg px-3 sm:px-4 py-3 md:py-4 focus:outline-none placeholder:text-white/40"
                aria-label="Enter your campaign prompt"
              />
              {!inputValue && (
                <div className="absolute inset-0 px-3 sm:px-4 py-3 md:py-4 pointer-events-none flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isTyping ? 1 : 0, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/40 text-sm sm:text-base md:text-lg truncate"
                    >
                      {PROMPTS[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mic Button */}
            <motion.button
              type="button"
              onClick={handleMicClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 rounded-lg md:rounded-xl p-2.5 sm:p-3 md:p-3.5 transition-all touch-manipulation"
              aria-label="Use voice input"
            >
              <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.button>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 bg-gradient-to-r from-[#5372ea] to-[#7a63eb] hover:opacity-90 active:opacity-80 rounded-lg md:rounded-xl p-2.5 sm:p-3 md:p-3.5 transition-all shadow-lg touch-manipulation"
              aria-label="Submit campaign"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
