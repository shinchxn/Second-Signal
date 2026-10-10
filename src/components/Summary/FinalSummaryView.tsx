import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, RotateCcw, Sparkles, Check, Share2, ShieldCheck } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

export const FinalSummaryView: React.FC = () => {
  const { resetSimulation, encounter1Outcome, encounter2Outcome, setStage } = useSessionStore();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleGenerateFreshAI = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/scenario/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weaknessTag: 'urgency',
          channel: 'messaging',
          difficulty: 'medium',
        }),
      });
      const data = await res.json();
      if (data.scenario) {
        useSessionStore.getState().setScenario1(data.scenario);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
      resetSimulation();
      setStage('SCENARIO_1_PHONE');
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 overflow-x-hidden select-none">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 shadow-2xl backdrop-blur-md space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-950/60 text-teal-400 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-neutral-100">Practice Loop Summary</h2>
                <p className="text-[11px] font-mono text-teal-400">Targeted Behavioral Reinforcement</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300 hover:bg-neutral-700 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-teal-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Encounter 1 */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-1">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">First Encounter</div>
              <div className={`font-bold ${encounter1Outcome === 'recognized' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {encounter1Outcome === 'recognized' ? 'Recognized ✓' : 'Missed (Fell into Trap)'}
              </div>
              <div className="text-[10px] text-neutral-400">Personal phone: 7:00 PM SMS</div>
            </div>

            {/* Encounter 2 */}
            <div className="rounded-xl border border-teal-500/30 bg-neutral-950 p-3 space-y-1">
              <div className="text-[10px] font-mono text-teal-400 uppercase">Transfer Test</div>
              <div className={`font-bold ${encounter2Outcome === 'recognized' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {encounter2Outcome === 'recognized' ? 'Recognized ✓' : 'Missed'}
              </div>
              <div className="text-[10px] text-neutral-400">Corporate workstation: 6:00 PM email</div>
            </div>
          </div>

          {/* Core Takeaway Card */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-3 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-teal-400 font-bold">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>Learned Reflex: The 3-Second Pause</span>
            </div>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              Phishing relies on artificial urgency to bypass verification. Treating sudden deadlines as alarms stops attacks cold.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
            <button
              onClick={() => setStage('SCENARIOS_HUB')}
              className="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-teal-500/40 bg-teal-950/40 px-4 py-2.5 text-xs font-bold text-teal-300 hover:bg-teal-900/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <span>Explore 8 Attack Scenarios Lab →</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleGenerateFreshAI}
                disabled={isGeneratingAI}
                className="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                <span>{isGeneratingAI ? 'Generating...' : 'New AI Scenario'}</span>
              </button>

              <button
                onClick={resetSimulation}
                className="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10"
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                <span>Re-run Loop</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
