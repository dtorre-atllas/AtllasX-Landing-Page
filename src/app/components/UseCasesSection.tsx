import { motion } from "motion/react";
import {
  PhoneOutgoing,
  PhoneIncoming,
  RotateCcw,
  Webhook,
  Users,
  Check
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function UseCasesSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-white/10 border-white/20 text-white px-4 py-2">
            The Platform
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Two AI agents. Every call handled.
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto">
            Outbound campaigns that book meetings while you sleep, and a 24/7 receptionist that never misses an inbound call.
          </p>
        </motion.div>

        {/* Two Product Pillars */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* PILLAR 1: AI CALLING (Outbound) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl p-8 h-full hover:bg-white/[0.07] transition-all">
              {/* Icon tile + Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-3">
                  <PhoneOutgoing className="w-6 h-6 text-white" />
                </div>
                <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
                  Outbound
                </span>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-white mb-4">
                AI Calling
              </h3>

              {/* Body */}
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Upload a list. The AI calls every contact, handles objections, qualifies them, and books meetings — autonomously, at scale.
              </p>

              {/* Capability chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Objection handling",
                  "Live human transfer",
                  "Books on your calendar",
                  "SMS + email follow-up",
                  "Voicemail drops"
                ].map((chip) => (
                  <span
                    key={chip}
                    className="bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white/90 text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Mock UI: Call Transcript Card */}
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 font-semibold text-sm">
                      Live Call
                    </span>
                    <span className="text-white/50 text-sm">· 02:34</span>
                    <span className="text-green-400 text-sm">· Connected</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none text-xs px-2 py-0.5">
                    HOT · 92
                  </Badge>
                </div>

                {/* Transcript lines */}
                <div className="space-y-3">
                  <div>
                    <div className="text-purple-400 text-xs font-semibold mb-1">AI AGENT</div>
                    <div className="text-white/80 text-sm">
                      Hi Sarah, this is Alex from AtllasX. We help sales teams like yours book more meetings with AI. Do you have 30 seconds?
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-400 text-xs font-semibold mb-1">PROSPECT</div>
                    <div className="text-white/80 text-sm">
                      Sure, I'm curious — how does it work?
                    </div>
                  </div>
                  <div>
                    <div className="text-purple-400 text-xs font-semibold mb-1">AI AGENT</div>
                    <div className="text-white/80 text-sm">
                      Great! Our AI calls your leads, handles objections, and books qualified meetings directly to your calendar. Would next Tuesday work for a quick demo?
                    </div>
                  </div>
                </div>

                {/* Footer: Meeting booked */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Meeting booked — Fri Nov 15, 2:00 PM PT
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* PILLAR 2: AI RECEPTIONIST (Inbound) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl p-8 h-full hover:bg-white/[0.07] transition-all">
              {/* Icon tile + Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-3">
                  <PhoneIncoming className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                  Inbound
                </span>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-white mb-4">
                AI Receptionist
              </h3>

              {/* Body */}
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Answers every inbound call 24/7. Greets callers, answers FAQs from your knowledge base, collects details, books meetings, and forwards warm leads to your team.
              </p>

              {/* Capability chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "24/7 answering",
                  "Knowledge base FAQs",
                  "Every call transcribed",
                  "Lead-warmth scoring",
                  "Warm-lead forwarding"
                ].map((chip) => (
                  <span
                    key={chip}
                    className="bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white/90 text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Mock UI: Inbox-style list */}
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-5 space-y-3">
                {/* Call 1 - Hot */}
                <div className="bg-white/5 hover:bg-white/10 transition-all border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">
                        Jessica Martinez
                      </div>
                      <div className="text-white/70 text-sm">
                        Interested in enterprise pricing, wants to schedule a call with sales
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none text-xs px-2 py-0.5 shrink-0">
                      HOT
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">2 min ago</span>
                    <span className="text-green-400 font-semibold flex items-center gap-1">
                      Forwarded to team →
                    </span>
                  </div>
                </div>

                {/* Call 2 - Warm */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">
                        David Park
                      </div>
                      <div className="text-white/70 text-sm">
                        Asked about integration options, requested a product demo
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white border-none text-xs px-2 py-0.5 shrink-0">
                      WARM
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">12 min ago</span>
                  </div>
                </div>

                {/* Call 3 - Cold */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">
                        Emily Chen
                      </div>
                      <div className="text-white/70 text-sm">
                        General inquiry about how the product works, just browsing
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none text-xs px-2 py-0.5 shrink-0">
                      COLD
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">1 hour ago</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* AUTOMATIONS BAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Wired into your stack
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Automation 1: Cancellation Recovery */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-2.5 shrink-0">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Cancellation Recovery
                  </h4>
                  <p className="text-white/70 text-sm">
                    The moment a customer cancels, the AI calls to collect feedback and win them back.
                  </p>
                </div>
              </div>
            </Card>

            {/* Automation 2: Custom Webhooks & Zapier */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-2.5 shrink-0">
                  <Webhook className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Custom Webhooks & Zapier
                  </h4>
                  <p className="text-white/70 text-sm">
                    Trigger calls from any app, push every result back out. No code required.
                  </p>
                </div>
              </div>
            </Card>

            {/* Automation 3: Teams & Shared Credits */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg p-2.5 shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Teams & Shared Credits
                  </h4>
                  <p className="text-white/70 text-sm">
                    Pool credits across your org, set roles, audit every action.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Ready to Transform Your Calling Strategy?
            </h3>
            <p className="text-white/70 mb-6">
              Get started with both AI Calling and AI Receptionist in minutes
            </p>
            <a href="https://app.atllasx.com/dashboard/ai-calling/create">
              <Button className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] hover:opacity-90 text-white px-8 py-6 text-lg rounded-full">
                Get Started
              </Button>
            </a>
            <p className="text-white/50 text-sm mt-4">
              Setup takes 5 minutes • Works with your existing tools
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
