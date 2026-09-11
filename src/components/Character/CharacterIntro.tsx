import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, BookOpen, Coffee, CheckCircle2 } from 'lucide-react';
import { useSessionStore, NORMAL_PERSONAS } from '../../state/sessionStore';

export const CharacterIntro: React.FC = () => {
  const { character, selectPersona, setStage, addEvent } = useSessionStore();

  const handleStartPhone = () => {
    addEvent({
      actor: 'system',
      type: 'SCENARIO_STARTED',
      label: 'Session Initialized',
      description: `${character.name.split(' ')[0]} unlocked their phone at 8:42 PM.`,
    });
    setStage('SCENARIO_1_PHONE');
  };

  const isLibrarian = character.id === 'librarian' || character.role.includes('Librarian');

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
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs">
            <div className="flex items-center gap-1.5 text-teal-400 font-medium">
              <Clock className="h-3.5 w-3.5" />
              <span>Tuesday 8:42 PM</span>
            </div>
            <span className="text-neutral-400 font-medium text-[11px]">Everyday Persona Simulation</span>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="mt-3.5">
            <div className="text-[11px] font-medium text-neutral-400 mb-1.5 flex items-center justify-between">
              <span>Select Everyday Profile:</span>
              <span className="text-neutral-500 text-[10px]">Normal, non-tech professional</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => selectPersona('librarian')}
                className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                  isLibrarian
                    ? 'border-teal-500/60 bg-teal-950/40 text-neutral-100 shadow-sm'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isLibrarian ? 'bg-teal-500/20 text-teal-300' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-100 truncate">Clara Morales</span>
                    {isLibrarian && <CheckCircle2 className="h-3 w-3 text-teal-400 shrink-0" />}
                  </div>
                  <span className="block text-[11px] text-teal-300/80 truncate">Librarian</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectPersona('barista')}
                className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                  !isLibrarian
                    ? 'border-amber-500/60 bg-amber-950/40 text-neutral-100 shadow-sm'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  !isLibrarian ? 'bg-amber-500/20 text-amber-300' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  <Coffee className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-100 truncate">Leo Ramirez</span>
                    {!isLibrarian && <CheckCircle2 className="h-3 w-3 text-amber-400 shrink-0" />}
                  </div>
                  <span className="block text-[11px] text-amber-300/80 truncate">Coffee Shop Barista</span>
                </div>
              </button>
            </div>
          </div>

          {/* Active Character Profile Details */}
          <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-neutral-800/80 bg-neutral-950/50 p-3">
            {/* Illustrated avatar */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-gradient-to-b from-neutral-800 to-neutral-950 shadow-inner">
              {isLibrarian ? (
                <svg className="h-10 w-10 text-teal-200" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" fill="#134e4a" />
                  <circle cx="50" cy="38" r="16" fill="#fcd34d" />
                  <path d="M30 36C30 24 38 18 50 18C62 18 70 24 70 36C70 30 62 22 50 22C38 22 30 30 30 36Z" fill="#78350f" />
                  <circle cx="44" cy="38" r="2" fill="#1e293b" />
                  <circle cx="56" cy="38" r="2" fill="#1e293b" />
                  <path d="M46 45C48 47 52 47 54 45" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M26 82C26 66 36 60 50 60C64 60 74 66 74 82" fill="#0f766e" />
                </svg>
              ) : (
                <svg className="h-10 w-10 text-amber-200" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" fill="#451a03" />
                  <circle cx="50" cy="38" r="16" fill="#fde68a" />
                  <path d="M32 34C32 24 40 20 50 20C60 20 68 24 68 34C68 28 60 24 50 24C40 24 32 28 32 34Z" fill="#18181b" />
                  <circle cx="44" cy="38" r="2" fill="#1e293b" />
                  <circle cx="56" cy="38" r="2" fill="#1e293b" />
                  <path d="M46 45C48 47 52 47 54 45" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M26 82C26 66 36 60 50 60C64 60 74 66 74 82" fill="#b45309" />
                </svg>
              )}
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-neutral-900 ${isLibrarian ? 'bg-teal-400' : 'bg-amber-400'}`} />
            </div>

            {/* Persona Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-neutral-100">{character.name}</h2>
                <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
                  {character.age} yrs
                </span>
                <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-400">
                  {character.workplace}
                </span>
              </div>
              <p className={`text-xs font-medium ${isLibrarian ? 'text-teal-400' : 'text-amber-400'}`}>{character.role}</p>
              <p className="mt-1 text-[11px] text-neutral-400 leading-tight">
                {character.context}
              </p>
            </div>
          </div>

          {/* Context callout */}
          <div className="mt-3.5 rounded-xl border border-neutral-800 bg-neutral-950/70 p-3 text-xs text-neutral-300">
            <span className="font-semibold text-neutral-200">Objective:</span> Real attackers target everyday people during normal moments of distraction. Respond naturally as {character.name.split(' ')[0]}.
          </div>

          {/* Action CTA */}
          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={handleStartPhone}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10"
            >
              <span>Unlock Phone as {character.name.split(' ')[0]}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
