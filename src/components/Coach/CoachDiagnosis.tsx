import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brain, ShieldAlert, Sparkles, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

export const CoachDiagnosis: React.FC = () => {
  const {
    setStage,
    speakCoachText,
    isVoiceMuted,
    toggleVoiceMute,
    encounter1Outcome,
    addEvent,
  } = useSessionStore();

  const isMissed = encounter1Outcome === 'missed';

  useEffect(() => {
    const text = isMissed
      ? "You acted because it felt urgent, not because it looked real. When an unsolicited deadline arrives, that feeling of rush is your warning signal."
      : "Great instinct. Pausing when feeling rushed breaks the attack.";
    speakCoachText(text);
  }, [isMissed]);

  const handleStartPractice = () => {
    addEvent({
      actor: 'user',
      type: 'USER_STARTED_PRACTICE',
      label: 'Started Practice',
      description: 'Advanced to corporate workstation practice scenario.',
    });
    setStage('PRACTICE_TRANSITION');
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-2">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-2xl backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-bold text-neutral-100">Behavioral Diagnosis</h2>
            </div>
            <button
              onClick={toggleVoiceMute}
              className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-neutral-200"
            >
              {isVoiceMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-teal-400" />}
              <span>{isVoiceMuted ? 'Muted' : 'Coach Voice'}</span>
            </button>
          </div>

          {/* Coach Insight Card */}
          <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                <ShieldAlert className="h-3 w-3" />
                <span>Trigger: Urgency Trap</span>
              </span>
            </div>

            <p className="text-sm text-neutral-200 leading-relaxed font-medium">
              "You didn't act because the message looked legitimate. You acted because the{' '}
              <span className="text-amber-400 font-bold">7:00 PM deadline</span> made you hurry."
            </p>

            <div className="rounded-lg border border-teal-500/30 bg-teal-950/30 p-2.5 text-xs text-teal-200">
              <span className="font-bold">Next Time Rule:</span> When an unexpected deadline demands quick action, treat the urgency itself as proof of an attack. Pause 3 seconds.
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 font-mono">
              Apply this reflex in a corporate scenario next.
            </span>
            <button
              onClick={handleStartPractice}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10"
            >
              <span>Test Next Scenario</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
