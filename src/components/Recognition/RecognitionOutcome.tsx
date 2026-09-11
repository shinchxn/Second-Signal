import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

export const RecognitionOutcome: React.FC = () => {
  const { encounter2Outcome, setStage, speakCoachText, addEvent } = useSessionStore();
  const isRecognized = encounter2Outcome === 'recognized';

  useEffect(() => {
    if (isRecognized) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#6366f1', '#10b981'],
      });
      speakCoachText('Signal recognized! Pausing when rushed stopped the exploit.');
    } else {
      speakCoachText('The same urgency cue triggered the rush. Notice that physical rush sensation.');
    }
  }, [isRecognized]);

  const handleProceedToSummary = () => {
    addEvent({
      actor: 'user',
      type: 'USER_COMPLETED_SESSION',
      label: 'Session Completed',
      description: 'Navigated to final practice summary.',
    });
    setStage('FINAL_SUMMARY');
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-2">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          isRecognized ? 'bg-emerald-500/10' : 'bg-amber-500/10'
        }`}
      />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-2xl backdrop-blur-md space-y-4"
        >
          {/* Status Badge */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono font-bold ${
                isRecognized
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
              }`}
            >
              {isRecognized ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>REFLEX MASTERED // SIGNAL CAUGHT</span>
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5 text-amber-400" />
                  <span>URGENCY TRAP REPEATED</span>
                </>
              )}
            </div>

            <span className="text-xs font-mono text-neutral-500">Targeted Transfer Test</span>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-xl font-bold text-neutral-100">
              {isRecognized ? 'You Caught The Urgency Cue' : 'The Urgency Trap Repeated'}
            </h2>
            <p className="mt-1 text-xs text-neutral-400 leading-snug">
              {isRecognized
                ? 'When the 6:00 PM corporate deadline arrived, you hesitated and verified the sender before acting.'
                : 'The artificial deadline triggered cognitive tunneling. Practicing the pause reflex builds immunity.'}
            </p>
          </div>

          {/* Clean 2-Box Visual Contrast */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-amber-500/30 bg-neutral-950 p-3 space-y-1">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">Encounter 01</div>
              <div className="text-neutral-300 font-medium">Mobile SMS: Missed</div>
              <div className="text-[10px] text-neutral-500 font-mono">Trigger: 7:00 PM deadline</div>
            </div>

            <div
              className={`rounded-xl border p-3 space-y-1 ${
                isRecognized
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : 'border-neutral-800 bg-neutral-950'
              }`}
            >
              <div
                className={`text-[10px] font-mono uppercase font-bold ${
                  isRecognized ? 'text-emerald-300' : 'text-neutral-400'
                }`}
              >
                Encounter 02
              </div>
              <div className="text-neutral-200 font-medium">
                {isRecognized ? 'Laptop: Recognized ✓' : 'Laptop: Missed'}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono">
                {isRecognized ? 'Paused & verified on Slack' : 'Rushed into renewal'}
              </div>
            </div>
          </div>

          {/* CTA Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-neutral-500 font-mono">
              Completed the full experiential learning loop.
            </span>
            <button
              onClick={handleProceedToSummary}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10"
            >
              <span>View Summary</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
