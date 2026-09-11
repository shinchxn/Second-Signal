import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Smartphone, UserCheck } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

export const CharacterIntro: React.FC = () => {
  const { character, setStage, addEvent } = useSessionStore();

  const handleStartPhone = () => {
    addEvent({
      actor: 'system',
      type: 'SCENARIO_STARTED',
      label: 'Session Initialized',
      description: 'Arjun unlocked his smartphone at 8:42 PM.',
    });
    setStage('SCENARIO_1_PHONE');
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Compact Character Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-2xl backdrop-blur-md"
        >
          {/* Top meta */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-teal-400">
              <Clock className="h-3 w-3" />
              <span>Tuesday 8:42 PM</span>
            </div>
            <span className="text-neutral-500">Scenario 1: Smartphone</span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            {/* Zoomed-out compact avatar */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-neutral-700 bg-gradient-to-b from-neutral-800 to-neutral-950 shadow-inner">
              <svg
                className="h-12 w-12 text-neutral-300"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="46" fill="#1e293b" />
                <circle cx="50" cy="40" r="16" fill="#cbd5e1" />
                <path d="M34 36C34 26 42 22 50 22C58 22 66 26 66 36C66 32 58 26 50 26C42 26 34 32 34 36Z" fill="#1e293b" />
                <circle cx="44" cy="40" r="2" fill="#1e293b" />
                <circle cx="56" cy="40" r="2" fill="#1e293b" />
                <path d="M46 47C48 49 52 49 54 47" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M28 80C28 66 38 60 50 60C62 60 72 66 72 80" fill="#0f766e" />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-neutral-900 bg-teal-400" />
            </div>

            {/* Persona Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-100">{character.name}</h2>
                <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                  {character.age} yrs
                </span>
              </div>
              <p className="text-xs text-teal-400">{character.role}</p>
              <p className="mt-1 text-[11px] text-neutral-400 leading-tight">
                Tired after classes, casually checking incoming notifications.
              </p>
            </div>
          </div>

          {/* Context callout */}
          <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950/70 p-3 text-xs text-neutral-300">
            <span className="font-semibold text-neutral-200">Objective:</span> Interact naturally with the phone. Make authentic choices.
          </div>

          {/* Action CTA */}
          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={handleStartPhone}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10"
            >
              <span>Unlock Phone</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
