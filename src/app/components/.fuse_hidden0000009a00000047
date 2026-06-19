import { Shield, Lock, Award, Zap } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your data is encrypted",
  },
  {
    icon: Award,
    title: "99.9% Uptime",
    description: "Always available",
  },
  {
    icon: Zap,
    title: "Money-Back Guarantee",
    description: "14 days after 1,000 calls",
  },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-lg p-2 mb-3">
            <badge.icon className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-white font-semibold text-sm mb-1">{badge.title}</h4>
          <p className="text-white/60 text-xs">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
