import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle2, X, AlertTriangle, ArrowRight } from 'lucide-react';
import { ScenarioMeta } from '../../types';

interface ScenarioRedFlagModalProps {
  scenario: ScenarioMeta;
  isOpen: boolean;
  onClose: () => void;
}

export const ScenarioRedFlagModal: React.FC<ScenarioRedFlagModalProps> = ({
  scenario,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5 shadow-2xl text-neutral-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3 pr-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                Scenario #{scenario.scenarioNumber} Security Analysis
              </span>
              <h3 className="text-sm sm:text-base font-bold text-neutral-100 leading-snug">{scenario.title}</h3>
            </div>
          </div>

          <div className="mt-3.5 space-y-3.5 text-xs">
            {/* Core Mechanism */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3">
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold mb-1">
                The Psychological Mechanism
              </div>
              <p className="text-neutral-300 leading-relaxed">{scenario.description}</p>
            </div>

            {/* Red Flags List */}
            <div>
              <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Signals & Red Flags to Spot:</span>
              </div>
              <ul className="space-y-1.5 pl-1">
                {scenario.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-neutral-300 text-[11.5px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safe Defense Action */}
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/30 p-3">
              <div className="flex items-center gap-1.5 text-teal-300 font-bold mb-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                <span>Recommended Defense Action:</span>
              </div>
              <p className="text-[11.5px] text-teal-200 leading-relaxed font-medium">
                {scenario.safeAction}
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
            >
              Got It, Return to Simulation
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
