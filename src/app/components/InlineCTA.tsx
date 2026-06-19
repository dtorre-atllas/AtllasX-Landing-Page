import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Phone, ArrowRight } from "lucide-react";

interface InlineCTAProps {
  variant?: "primary" | "secondary";
}

export function InlineCTA({ variant = "primary" }: InlineCTAProps) {
  if (variant === "primary") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative my-16"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-2xl blur-2xl opacity-20" />
        <div className="relative bg-gradient-to-r from-[#5372ea]/20 to-[#7a63eb]/20 border border-[#5372ea]/30 backdrop-blur-xl rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-3">
            Ready to see results like this?
          </h3>
          <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
            Join 1,000+ teams closing more deals with AI calling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.atllasx.com/dashboard/ai-calling/create">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </a>
            <motion.a
              href="tel:+14159694084"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white/10 border border-white/20 text-white px-8 py-6 text-lg rounded-xl hover:bg-white/20">
                <Phone className="w-5 h-5 mr-2" />
                Call (415) 969-4084
              </Button>
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 text-center"
    >
      <div className="inline-flex flex-col sm:flex-row gap-4">
        <a href="https://app.atllasx.com/dashboard/ai-calling/create">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] text-white px-8 py-5 text-base rounded-xl">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </a>
        <motion.a
          href="tel:+14159694084"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-white/10 border border-white/20 text-white px-8 py-5 text-base rounded-xl hover:bg-white/20">
            <Phone className="w-4 h-4 mr-2" />
            Call (415) 969-4084
          </Button>
        </motion.a>
      </div>
    </motion.div>
  );
}