import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { TrendingUp, DollarSign, Clock, Sparkles, Calculator } from "lucide-react";

export function ROICalculator() {
  const [callsPerDay, setCallsPerDay] = useState(50);
  const [avgDealValue, setAvgDealValue] = useState(5000);
  const [conversionRate, setConversionRate] = useState(5);

  // Current manual calling metrics (22 working days per month)
  const currentCallsPerMonth = callsPerDay * 22;
  const currentDealsPerMonth = currentCallsPerMonth * (conversionRate / 100);
  const currentMonthlyRevenue = currentDealsPerMonth * avgDealValue;
  
  // With AtllasX improvements:
  // - 3x more calls (AI handles 3x volume with consistency)
  // - +25% conversion improvement (better consistency, instant follow-up, no fatigue)
  const atllasCallsPerMonth = currentCallsPerMonth * 3;
  const atllasConversionRate = conversionRate * 1.25;
  const atllasDealsPerMonth = atllasCallsPerMonth * (atllasConversionRate / 100);
  const atllasMonthlyRevenue = atllasDealsPerMonth * avgDealValue;
  
  const additionalRevenue = atllasMonthlyRevenue - currentMonthlyRevenue;
  const additionalDeals = atllasDealsPerMonth - currentDealsPerMonth;
  
  // Time & cost savings
  const timeCurrentlySpent = currentCallsPerMonth * 5; // 5 min per call in minutes
  const timeSavedHours = Math.round((timeCurrentlySpent / 60) * 100) / 100; // Convert to hours
  
  // Cost comparison: Atllas at $499/month vs hiring ($4k-6k/month for SDR)
  const monthlyInvestment = 499;
  const avgSDRCost = 5000;
  const costSavings = avgSDRCost - monthlyInvestment;
  
  // Total value = additional revenue + cost savings
  const totalMonthlyValue = additionalRevenue + costSavings;
  const roi = Math.round(((totalMonthlyValue - monthlyInvestment) / monthlyInvestment) * 100);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-3xl blur-xl opacity-20" />
      
      <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-[#5372ea] to-[#7a63eb] rounded-xl p-2">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-white">Your ROI Calculator</h3>
          </div>
          <p className="text-white/70 text-base md:text-lg">Adjust the sliders to see your potential revenue increase</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left: Inputs */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Daily Outbound Calls</label>
                <span className="text-[#5372ea] font-semibold text-lg">{callsPerDay}</span>
              </div>
              <Slider
                value={[callsPerDay]}
                onValueChange={(value) => setCallsPerDay(value[0])}
                min={10}
                max={200}
                step={10}
                className="w-full"
              />
              <p className="text-white/50 text-sm mt-2">
                Currently making per day
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Average Deal Value</label>
                <span className="text-[#5372ea] font-semibold text-lg">${avgDealValue.toLocaleString()}</span>
              </div>
              <Slider
                value={[avgDealValue]}
                onValueChange={(value) => setAvgDealValue(value[0])}
                min={100}
                max={50000}
                step={100}
                className="w-full"
              />
              <p className="text-white/50 text-sm mt-2">
                Value per closed deal
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Current Conversion Rate</label>
                <span className="text-[#5372ea] font-semibold text-lg">{conversionRate}%</span>
              </div>
              <Slider
                value={[conversionRate]}
                onValueChange={(value) => setConversionRate(value[0])}
                min={1}
                max={20}
                step={0.5}
                className="w-full"
              />
              <p className="text-white/50 text-sm mt-2">
                Percentage of calls that convert
              </p>
            </div>
          </div>

          {/* Right: Results */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#5372ea]/20 to-[#7a63eb]/20 border border-[#5372ea]/30 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-white/70">Additional Monthly Revenue</span>
                </div>
              </div>
              <div className="text-3xl font-semibold text-white mb-1">
                +${Math.round(additionalRevenue).toLocaleString()}
              </div>
              <p className="text-white/60 text-sm">
                {Math.round(additionalDeals)} more deals/month
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                  <span className="text-white/70">Cost Savings vs Hiring</span>
                </div>
              </div>
              <div className="text-3xl font-semibold text-white mb-1">
                +${costSavings.toLocaleString()}/mo
              </div>
              <p className="text-white/60 text-sm">
                Save vs $5k/month SDR salary
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white/70">Time Saved Monthly</span>
                </div>
              </div>
              <div className="text-3xl font-semibold text-white mb-1">
                {timeSavedHours} hours
              </div>
              <p className="text-white/60 text-sm">
                Focus on closing, not dialing
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/50 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-white/70">Total ROI</span>
                </div>
              </div>
              <div className="text-4xl font-semibold text-green-400 mb-1">
                {roi > 0 ? '+' : ''}{roi.toLocaleString()}%
              </div>
              <p className="text-white/60 text-sm">
                ${Math.round(totalMonthlyValue).toLocaleString()} value for ${monthlyInvestment}/mo
              </p>
            </motion.div>

            <div className="bg-white/5 rounded-xl p-4 mt-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#5372ea] mt-0.5 flex-shrink-0" />
                <p className="text-white/70 text-sm">
                  <strong className="text-white">How we calculate:</strong> Atllas makes 3x more calls with 25% better conversion through AI consistency, instant follow-ups, and zero fatigue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
