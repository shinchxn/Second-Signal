import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Laptop,
  Layers,
  RotateCcw,
  Info,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ScenarioMeta, ScenarioId } from '../../types';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioRedFlagModal } from './ScenarioRedFlagModal';

interface ScenarioControlBarProps {
  currentScenario: ScenarioMeta;
  onSelectScenario: (id: ScenarioId) => void;
  onReset: () => void;
  zoomScale: number;
  onZoomChange: (scale: number) => void;
}

export const ScenarioControlBar: React.FC<ScenarioControlBarProps> = ({
  currentScenario,
  onSelectScenario,
  onReset,
  zoomScale,
  onZoomChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className="relative z-30 flex w-full max-w-4xl items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/95 px-2 sm:px-3 py-1.5 backdrop-blur-md text-xs shrink-0 mb-1">
        {/* Left: Scenario Selector Dropdown */}
        <div className="relative flex items-center gap-1.5 sm:gap-2 min-w-0" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-label={`Select scenario, currently ${currentScenario.title}`}
              className="flex min-h-[38px] items-center gap-1.5 sm:gap-2 rounded-lg border border-neutral-700 bg-neutral-800/90 px-2 sm:px-2.5 py-1 text-xs font-semibold text-neutral-100 hover:bg-neutral-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-500/20 text-teal-300 font-mono text-[11px] font-bold shrink-0">
                #{currentScenario.scenarioNumber}
              </span>
              <span className="truncate max-w-[80px] xs:max-w-[130px] sm:max-w-[240px] md:max-w-[320px]">
                {currentScenario.shortTitle || currentScenario.title}
              </span>
              <ChevronDown className="h-3 w-3 text-neutral-400 shrink-0" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 max-w-[calc(100vw-1.5rem)] rounded-xl border border-neutral-800 bg-neutral-950 p-1.5 shadow-2xl z-50 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase">
                  All 8 Attack Scenarios
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {ALL_SCENARIOS.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        onSelectScenario(sc.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between min-h-[44px] rounded-lg p-2 text-left text-xs transition ${
                        sc.id === currentScenario.id
                          ? 'bg-teal-950/60 border border-teal-500/40 text-teal-200'
                          : 'hover:bg-neutral-900 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] font-bold text-neutral-400">
                          #{sc.scenarioNumber}
                        </span>
                        <span className="truncate">{sc.shortTitle}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase shrink-0 ml-1.5">
                        {sc.device}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Device Type Pill (Hidden on mobile phones for cleaner layout) */}
          <div className="hidden md:flex items-center gap-1 font-mono text-[10px] text-neutral-400 bg-neutral-950/60 border border-neutral-800 px-2 py-0.5 rounded-md shrink-0">
            {currentScenario.device === 'phone' && <Smartphone className="h-3 w-3 text-teal-400" />}
            {currentScenario.device === 'laptop' && <Laptop className="h-3 w-3 text-indigo-400" />}
            {currentScenario.device === 'dual' && <Layers className="h-3 w-3 text-amber-400" />}
            <span className="capitalize">{currentScenario.device}</span>
          </div>
        </div>

        {/* Right Controls: Red Flags, Zoom, Reset */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-1">
          {/* Why is this a trap? */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex min-h-[38px] items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 sm:px-2.5 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Inspect Red Flags & Psychological Mechanism"
            aria-label="Inspect Red Flags"
          >
            <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Red Flags</span>
          </button>

          {/* Zoom controls (Compact) */}
          <div className="flex items-center gap-0.5 sm:gap-1 font-mono text-[11px] bg-neutral-950/70 border border-neutral-800 rounded-lg px-1 sm:px-1.5 py-0.5">
            <button
              onClick={() => onZoomChange(Math.max(0.65, zoomScale - 0.05))}
              className="p-1 min-h-[30px] min-w-[24px] flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-3 w-3" />
            </button>
            <span className="w-6 sm:w-7 text-center text-teal-300 font-bold text-[10px]">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(1.05, zoomScale + 0.05))}
              className="p-1 min-h-[30px] min-w-[24px] flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="h-3 w-3" />
            </button>
          </div>

          {/* Restart / Reset */}
          <button
            onClick={onReset}
            className="flex min-h-[38px] items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 px-2 sm:px-2.5 py-1 text-[11px] text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            title="Reset Scenario to Start"
            aria-label="Restart Scenario"
          >
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden md:inline">Restart</span>
          </button>
        </div>
      </div>

      <ScenarioRedFlagModal
        scenario={currentScenario}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
