import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Check, Crown, ArrowRight, Sparkles, Trophy, Building2, Mail, Gem, TrendingUp } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Transparent Pricing
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            All plans include a monthly call limit. Use them anytime, any day—no daily restrictions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">

          {/* Champion Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-orange-400" />
                  <h3 className="text-xl font-semibold text-white">Champion</h3>
                </div>
                <p className="text-white/60 text-sm">Great for growing teams</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-white">$499</span>
                  <span className="text-white/50">/mo</span>
                </div>
                <p className="text-white/60 text-sm">~$0.17 per call</p>
                <p className="text-orange-300/80 text-xs mt-1.5">✦ Includes 14-day money-back guarantee</p>
              </div>

              {/* Main Highlight */}
              <div className="mb-5 pb-5 border-b border-white/10">
                <div className="text-2xl font-bold text-white mb-0.5">3,000 calls</div>
                <p className="text-white/50 text-xs">Total monthly limit · Use anytime</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-grow">
                <div className="text-orange-300 text-sm font-medium mb-3">What you unlock:</div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">AI voice clones</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">Zapier integrations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">AI Receptionist add-on</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white/90 text-sm font-medium">Live video support calls</span>
                    <p className="text-white/50 text-xs">USA-based support team</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <a href="https://app.atllasx.com/dashboard/ai-calling/create" className="block">
                  <Button className="w-full bg-white/10 border border-white/20 text-white py-5 text-base font-semibold rounded-xl hover:bg-white/20 transition-all">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Elite Plan - Most Popular */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                MOST POPULAR
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-75" />

            <div className="relative bg-white/5 backdrop-blur-sm border-2 border-purple-500/70 rounded-2xl p-8 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Elite</h3>
                </div>
                <p className="text-white/60 text-sm">Most popular for teams</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-white">$799</span>
                  <span className="text-white/50">/mo</span>
                </div>
                <p className="text-white/60 text-sm">~$0.16 per call · Save 6%</p>
                <div className="h-[18px]" />
              </div>

              {/* Main Highlight */}
              <div className="mb-5 pb-5 border-b border-white/10">
                <div className="text-2xl font-bold text-white mb-0.5">5,000 calls</div>
                <p className="text-white/50 text-xs">Total monthly limit · Use anytime</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-grow">
                <div className="text-purple-300 text-sm font-medium mb-3">Everything in Champion, plus:</div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">White-glove onboarding</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">Custom integrations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white/90 text-sm font-medium">Engineering team consultation</span>
                    <p className="text-white/50 text-xs">Hands-on setup, config & optimization</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <a href="https://app.atllasx.com/dashboard/ai-calling/create" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-5 text-base font-bold rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.02] transition-all">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Platinum Plan - Best Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Best Value badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <Gem className="w-3.5 h-3.5" />
                BEST VALUE
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-amber-500/40 rounded-2xl p-8 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Gem className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white">Platinum</h3>
                </div>
                <p className="text-white/60 text-sm">For high-volume teams</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-white">$1,499</span>
                  <span className="text-white/50">/mo</span>
                </div>
                <p className="text-white/60 text-sm">~$0.15 per call · Save 13%</p>
                <div className="h-[18px]" />
              </div>

              {/* Main Highlight */}
              <div className="mb-5 pb-5 border-b border-white/10">
                <div className="text-2xl font-bold text-white mb-0.5">10,000 calls</div>
                <p className="text-white/50 text-xs">Total monthly limit · Use anytime</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-grow">
                <div className="text-amber-300 text-sm font-medium mb-3">Everything in Elite, plus:</div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">Highest self-serve call volume</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">Dedicated success manager</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white/90 text-sm font-medium">Custom AI script optimization</span>
                    <p className="text-white/50 text-xs">Fine-tuned by our team</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <a href="https://app.atllasx.com/dashboard/ai-calling/create" className="block">
                  <Button className="w-full bg-white/10 border border-white/20 text-white py-5 text-base font-semibold rounded-xl hover:bg-white/20 transition-all">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-3xl mx-auto text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <p className="text-white/80 text-sm">
              <span className="font-semibold text-white">💡 All monthly call limits are flexible.</span> Use your calls anytime throughout the month—make 100 calls today, 500 tomorrow, or space them out. No daily restrictions.
            </p>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-xl p-3 flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-1">
                    Enterprise Solution
                  </h3>
                  <p className="text-white/60 text-sm">
                    Custom pricing for 10,000+ calls/month with volume discounts and dedicated support
                  </p>
                </div>
              </div>

              <a
                href="mailto:info@atllas.com?subject=Enterprise%20Pricing%20Inquiry&body=I'm%20interested%20in%20enterprise%20pricing%20for%20Atllas%20X."
                className="flex-shrink-0"
              >
                <Button className="bg-white/10 border border-white/20 text-white px-6 py-3 text-sm rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 whitespace-nowrap">
                  <Mail className="w-4 h-4" />
                  Contact Sales
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}