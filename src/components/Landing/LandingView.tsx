import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Smartphone, Eye, RotateCw, ShieldCheck } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

export const LandingView: React.FC = () => {
  const { setStage } = useSessionStore();

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center flex flex-col items-center justify-center">
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/90 px-3.5 py-1 text-xs text-neutral-300 font-human"
        >
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-medium tracking-normal text-teal-200">Interactive Cybersecurity Awareness</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-100 sm:text-6xl font-heading"
        >
          Second Signal
        </motion.h1>

        {/* Punchy Essential Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-base sm:text-lg font-medium text-neutral-300"
        >
          Experience the attack.{' '}
          <span className="text-teal-400 font-semibold">Understand the mistake.</span>{' '}
          Recognize it next time.
        </motion.p>

        {/* Minimal 3-step essential process strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-3 gap-2.5 w-full max-w-lg text-left"
        >
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
              <Smartphone className="h-3.5 w-3.5" />
              <span>1. Experience</span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">Realistic device decisions</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Eye className="h-3.5 w-3.5" />
              <span>2. Replay</span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">See behind the trick</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <RotateCw className="h-3.5 w-3.5" />
              <span>3. Recognize</span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">Spot it in new contexts</p>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-7"
        >
          <button
            onClick={() => setStage('CHARACTER_INTRO')}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-md shadow-teal-500/20 transition hover:bg-teal-400 active:scale-95"
          >
            <span>Start Simulation</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        {/* Minimal Safe Sandbox Disclaimer */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
          <ShieldCheck className="h-3 w-3 text-teal-500" />
          <span>100% Safe Educational Sandbox</span>
        </div>
      </div>
    </div>
  );
};
