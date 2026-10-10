import React from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  Laptop,
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { useSessionStore } from '../../state/sessionStore';
import { ScenarioId } from '../../types';

interface ScenarioArenaProps {
  onSelectScenario: (id: ScenarioId) => void;
}

export const ScenarioArena: React.FC<ScenarioArenaProps> = ({ onSelectScenario }) => {
  const { scenarioProgress, setStage } = useSessionStore();

  const completedCount = Object.values(scenarioProgress).filter((p) => p.completed).length;

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-start overflow-y-auto px-4 py-6 sm:px-6">
      <div className="pointer-events-none fixed inset-0 bg-cyber-grid opacity-15" />

      <div className="relative z-10 w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-0.5 text-xs text-teal-300 font-mono font-medium mb-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Full Simulation Laboratory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 font-heading">
              8 Interactive Attack Environments
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Select any environment to experience the actual attack vectors, psychological leverage, and live digital consequences.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 px-3.5 py-2 text-left xs:text-right">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Progress</div>
              <div className="text-sm font-bold font-mono text-teal-400">
                {completedCount} / 8 Completed
              </div>
            </div>

            <button
              onClick={() => onSelectScenario('scenario-1-kyc')}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition shadow-md shadow-teal-500/10"
            >
              <Play className="h-3.5 w-3.5 fill-neutral-950" />
              <span>Start Scenario 1</span>
            </button>
          </div>
        </div>

        {/* 8 Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_SCENARIOS.map((scenario) => {
            const status = scenarioProgress[scenario.id];

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 transition hover:border-neutral-700 hover:bg-neutral-900 shadow-lg"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs font-bold">
                        #{scenario.scenarioNumber}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded-md">
                        {scenario.device === 'phone' && <Smartphone className="h-3 w-3 text-teal-400" />}
                        {scenario.device === 'laptop' && <Laptop className="h-3 w-3 text-indigo-400" />}
                        {scenario.device === 'dual' && <Layers className="h-3 w-3 text-amber-400" />}
                        <span className="capitalize">{scenario.device} Simulation</span>
                      </div>
                    </div>

                    {status.completed ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                          status.outcome === 'recognized'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {status.outcome === 'recognized' ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Recognized</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" />
                            <span>Experienced Trap</span>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-500">Not Started</span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-neutral-100 group-hover:text-teal-300 transition">
                    {scenario.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    {scenario.subtitle}
                  </p>

                  <p className="mt-2 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {scenario.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
                  <span className="text-[10px] font-mono text-neutral-500 capitalize">
                    Vector: {scenario.weaknessTag.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => onSelectScenario(scenario.id)}
                    className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl bg-neutral-800 px-3.5 py-2 text-xs font-bold text-neutral-100 hover:bg-teal-500 hover:text-neutral-950 transition active:scale-95"
                  >
                    <span>Launch Environment</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className="flex justify-center pt-2 pb-6">
          <button
            onClick={() => setStage('LANDING')}
            className="text-xs text-neutral-400 hover:text-neutral-200 font-mono underline"
          >
            ← Return to Main Second Signal Landing
          </button>
        </div>
      </div>
    </div>
  );
};
