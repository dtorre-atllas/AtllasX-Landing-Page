import { motion } from "motion/react";
import { Shield, Check } from "lucide-react";

export function GuaranteeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16"
    >
      <div className="bg-gradient-to-r from-green-500/10 via-green-400/5 to-green-500/10 border border-green-500/20 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 rounded-full p-3">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">14-Day Money-Back Guarantee</div>
              <div className="text-white/60 text-sm">After 1,000 calls. No questions asked.</div>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-12 bg-white/20" />
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Free support</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
