import React from 'react';
import { Volume2, VolumeX, RotateCcw, Shield, Activity, Sparkles, CheckCircle2, Bell, Radio } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { AppStage } from '../../types';

export const AppHeader: React.FC = () => {
  const {
    stage,
    setStage,
    isVoiceMuted,
    toggleVoiceMute,
    isSoundMuted,
    toggleSoundMute,
    resetSimulation,
    weaknessScores,
  } = useSessionStore();

  const stageLabels: Record<AppStage, { label: string; step: number }> = {
    LANDING: { label: 'Start', step: 0 },
    CHARACTER_INTRO: { label: 'Protagonist', step: 1 },
    SCENARIO_1_PHONE: { label: 'Phone Simulation', step: 2 },
    SCENARIO_1_CONSEQUENCE: { label: 'Simulated Impact', step: 3 },
    SCENARIO_1_REPLAY: { label: '3D Attack Replay', step: 4 },
    SCENARIO_1_DIAGNOSIS: { label: 'Behavioral Diagnosis', step: 5 },
    PRACTICE_TRANSITION: { label: 'Next Day', step: 6 },
    SCENARIO_2_LAPTOP: { label: 'Workstation Re-practice', step: 7 },
    SCENARIO_2_RECOGNITION: { label: 'Signal Recognition', step: 8 },
    FINAL_SUMMARY: { label: 'Practice Loop', step: 9 },
  };

  const currentInfo = stageLabels[stage];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStage('LANDING')}
            className="group flex items-center gap-2.5 text-left transition"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-400 shadow-sm transition group-hover:border-teal-400 group-hover:bg-teal-500/20">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold tracking-tight text-neutral-100 text-base">
                  Second Signal
                </span>
                <span className="font-human text-[11px] font-medium text-teal-300/90 bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded-full">
                  Awareness Lab
                </span>
              </div>
            </div>
          </button>

          {/* Tagline for desktop */}
          <span className="hidden text-xs font-human text-neutral-400 md:inline-block border-l border-neutral-800 pl-3">
            Experience → Consequence → Replay → Targeted Practice
          </span>
        </div>

        {/* Center Progress Steps */}
        {stage !== 'LANDING' && (
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-3.5 py-1 text-xs font-human">
            <span className="text-neutral-400 font-medium">
              Stage {currentInfo.step} of 9:
            </span>
            <span className="font-semibold text-neutral-200">
              {currentInfo.label}
            </span>
            <div className="ml-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === currentInfo.step
                      ? 'w-4 bg-teal-400'
                      : s < currentInfo.step
                      ? 'w-1.5 bg-teal-600'
                      : 'w-1.5 bg-neutral-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Active Weakness Tag */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-human text-amber-300">
            <Activity className="h-3 w-3" />
            <span className="font-medium">Signal: Urgency Bias</span>
            {weaknessScores.urgency.misses > 0 && (
              <span className="rounded bg-amber-400/20 px-1.5 py-0.2 font-medium text-amber-200 text-[11px]">
                1 Miss
              </span>
            )}
            {weaknessScores.urgency.recognitions > 0 && (
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-medium text-emerald-300 text-[11px]">
                ✓ 1 Recognized
              </span>
            )}
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSoundMute();
              if (isSoundMuted) {
                // Was muted, now active -> play reassuring chime
                setTimeout(() => soundEffects.playMessageReceived(), 50);
              }
            }}
            title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 text-xs font-human text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800"
          >
            {isSoundMuted ? (
              <>
                <Bell className="h-3.5 w-3.5 text-neutral-500" />
                <span className="hidden sm:inline text-neutral-500 text-xs">SFX Off</span>
              </>
            ) : (
              <>
                <Bell className="h-3.5 w-3.5 text-teal-400" />
                <span className="hidden sm:inline text-teal-300 text-xs">SFX On</span>
              </>
            )}
          </button>

          {/* Voice Narration Toggle */}
          <button
            onClick={toggleVoiceMute}
            title={isVoiceMuted ? 'Unmute AI Coach Voice' : 'Mute AI Coach Voice'}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 text-xs font-human text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800"
          >
            {isVoiceMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-neutral-500" />
                <span className="hidden sm:inline text-neutral-500 text-xs">Voice Off</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
                <span className="hidden sm:inline text-teal-300 text-xs">Voice On</span>
              </>
            )}
          </button>

          {/* Reset Simulation */}
          <button
            onClick={resetSimulation}
            title="Reset Simulation to Start"
            className="flex h-8 items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 text-xs font-human text-neutral-400 transition hover:border-red-900/40 hover:bg-neutral-800 hover:text-neutral-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
