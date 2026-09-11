import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Laptop, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

export const PracticeTransition: React.FC = () => {
  const { setStage, addEvent } = useSessionStore();

  const handleEnterLaptop = () => {
    addEvent({
      actor: 'system',
      type: 'SCENARIO_2_INITIALIZED',
      label: 'Corporate Workstation Session Started',
      description: 'Arjun logged into his workstation at 11:18 AM.',
    });
    setStage('SCENARIO_2_LAPTOP');
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-2">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-2xl backdrop-blur-md space-y-4"
        >
          {/* Top Meta */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Wednesday 11:18 AM (Next Morning)</span>
            </div>
            <span className="text-neutral-500">Scenario 2: Workstation</span>
          </div>

          {/* Icon & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-950/60 text-indigo-400">
              <Laptop className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100">
                New Scenario, Same Psychological Weapon
              </h2>
              <p className="text-xs text-neutral-400">
                ApexCorp Engineering Laptop
              </p>
            </div>
          </div>

          {/* Quick summary comparison */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Yesterday</div>
              <div className="text-neutral-300 font-medium mt-0.5">Mobile SMS</div>
              <div className="text-[11px] text-amber-400 font-mono mt-0.5">"Before 7:00 PM"</div>
            </div>

            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3">
              <div className="text-[10px] font-mono text-indigo-400 uppercase">Today's Test</div>
              <div className="text-neutral-200 font-medium mt-0.5">Corporate Email</div>
              <div className="text-[11px] text-teal-400 font-mono mt-0.5">Apply 3-sec reflex</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-neutral-500 font-mono">
              Inspect sender and domain before clicking.
            </span>
            <button
              onClick={handleEnterLaptop}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10"
            >
              <span>Launch Laptop</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
