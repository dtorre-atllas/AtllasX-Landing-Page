import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Phone, CheckCircle2, TrendingUp, Zap, Users, Star, Award, Target, X } from "lucide-react";

const activities = [
  { name: "TechCorp Solutions", action: "made 347 calls", icon: Phone, time: "1m ago" },
  { name: "Jessica R.", action: "booked 12 appointments", icon: CheckCircle2, time: "3m ago" },
  { name: "Riverside Financial Group", action: "increased conversion by 58%", icon: TrendingUp, time: "7m ago" },
  { name: "David P.", action: "called (415) 969-4084", icon: Phone, time: "11m ago" },
  { name: "Sterling Insurance Co.", action: "upgraded to Enterprise", icon: Award, time: "14m ago" },
  { name: "Amanda F.", action: "completed 200 calls", icon: Phone, time: "19m ago" },
  { name: "Thompson Solar LLC", action: "started using AI calling", icon: Zap, time: "23m ago" },
  { name: "Robert W.", action: "achieved 89% connect rate", icon: TrendingUp, time: "28m ago" },
  { name: "Sarah M. from Elevate Sales", action: "closed 5 deals", icon: Target, time: "32m ago" },
  { name: "Phoenix Real Estate Partners", action: "added 3 team members", icon: Users, time: "36m ago" },
  { name: "Kevin A.", action: "reached 500 total calls", icon: Phone, time: "41m ago" },
  { name: "Blue Ocean Marketing", action: "improved quality score to 4.8★", icon: Star, time: "45m ago" },
  { name: "Jennifer W.", action: "started first campaign", icon: Zap, time: "48m ago" },
  { name: "Summit Consulting Group", action: "processed 1,000 leads", icon: TrendingUp, time: "52m ago" },
  { name: "Michael T.", action: "achieved 95% satisfaction rate", icon: CheckCircle2, time: "56m ago" },
  { name: "Coastal Properties Inc.", action: "doubled their outreach", icon: TrendingUp, time: "1h ago" },
  { name: "Lisa C.", action: "completed onboarding in 4 min", icon: Zap, time: "1h ago" },
  { name: "Velocity Sales Team", action: "hit $50K in pipeline", icon: Target, time: "1h ago" },
];

export function LiveActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500);
    }, 5000); // Changed from 4000 to 5000 (5 seconds)

    return () => clearInterval(interval);
  }, [isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  const currentActivity = activities[currentIndex];
  const Icon = currentActivity.icon;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          style={{ willChange: 'transform, opacity' }}
          className="fixed bottom-6 left-4 md:left-6 z-30 max-w-[calc(100vw-2rem)] md:max-w-sm hidden md:block bg-[#020213]/60 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-lg p-2 flex-shrink-0">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                <span className="font-semibold">{currentActivity.name}</span> {currentActivity.action}
              </p>
              <p className="text-white/60 text-xs">{currentActivity.time}</p>
            </div>
            <button
              onClick={handleDismiss}
              onMouseDown={(e) => e.stopPropagation()}
              className="flex-shrink-0 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
              aria-label="Dismiss notifications"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
