import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Phone, PhoneCall, ArrowRight, Check } from "lucide-react";

const DEMO_PHONE_NUMBER = "+14159694084";
const DEMO_PHONE_DISPLAY = "(415) 969-4084";

interface HearItForYourselfCTAProps {
  // Allow callers to override the live counter text once we have real data.
  liveCounterText?: string;
  // Hide the live counter entirely if a placeholder feels off-brand on a given page.
  showLiveCounter?: boolean;
}

export function HearItForYourselfCTA({
  liveCounterText = "55 people called today",
  showLiveCounter = true,
}: HearItForYourselfCTAProps = {}) {
  return (
    <section
      className="relative py-24 px-6 border-t"
      style={{ background: "#0A0A0A", borderColor: "#262626" }}
      aria-label="Try our AI calling demo"
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div
          className="text-center mb-8"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#A3A3A3",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          [ Try the demo ]
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl p-10 sm:p-16 text-center"
          style={{ background: "#111111", border: "1px solid #262626" }}
        >
          <div className="relative z-10">
            {/* Phone icon with subtle pulse */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-8"
              aria-hidden="true"
            >
              <div
                className="rounded-full p-6"
                style={{ background: "#F5F5F5" }}
              >
                <PhoneCall className="w-12 h-12" style={{ color: "#0A0A0A" }} />
              </div>
            </motion.div>

            <h2
              className="text-4xl lg:text-5xl mb-6"
              style={{
                color: "#FAFAFA",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: "0.92",
              }}
            >
              Hear it for yourself.
            </h2>
            <p
              className="text-xl mb-10 max-w-2xl mx-auto"
              style={{
                color: "#A3A3A3",
                fontFamily: "var(--font-body)",
                lineHeight: 1.4,
              }}
            >
              Call our live AI demo right now. You won&apos;t believe it&apos;s not human.
            </p>

            <div className="flex justify-center">
              <motion.a
                href={`tel:${DEMO_PHONE_NUMBER}`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Call our AI assistant at 4 1 5 9 6 9 4 0 8 4"
              >
                <Button
                  className="px-8 lg:px-12 py-6 lg:py-8 text-xl lg:text-2xl rounded-full transition-all"
                  style={{
                    background: "#F5F5F5",
                    color: "#0A0A0A",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                  }}
                >
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" aria-hidden="true" />
                  {DEMO_PHONE_DISPLAY}
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 ml-2 lg:ml-3" aria-hidden="true" />
                </Button>
              </motion.a>
            </div>

            {/* Reassurance row */}
            <div
              className="flex items-center justify-center gap-6 text-sm mt-8 flex-wrap"
              style={{ color: "#A3A3A3", fontFamily: "var(--font-body)" }}
              role="list"
            >
              <div className="flex items-center gap-2" role="listitem">
                <Check className="w-4 h-4" style={{ color: "#4ADE80" }} aria-hidden="true" />
                <span>5-min setup</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                <Check className="w-4 h-4" style={{ color: "#4ADE80" }} aria-hidden="true" />
                <span>No commitment</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                <Check className="w-4 h-4" style={{ color: "#4ADE80" }} aria-hidden="true" />
                <span>Hear it live in seconds</span>
              </div>
            </div>

            {/* Live urgency indicator */}
            {showLiveCounter && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "rgba(74, 222, 128, 0.1)",
                  border: "1px solid rgba(74, 222, 128, 0.2)",
                }}
                role="status"
                aria-live="polite"
              >
                <motion.div
                  animate={{
                    opacity: [1, 0.6, 1],
                    scale: [1, 0.85, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#4ADE80" }}
                />
                <span
                  className="text-sm"
                  style={{
                    color: "#4ADE80",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {liveCounterText}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
