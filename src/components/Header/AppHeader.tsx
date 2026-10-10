import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Shield,
  Activity,
  Sparkles,
  CheckCircle2,
  Radio,
  Bell,
  Menu,
  X,
  ArrowRight,
  Layers,
} from 'lucide-react';
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key and return focus to trigger button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleMobileNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
    menuTriggerRef.current?.focus();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dedicated Landing Page Header
  if (stage === 'LANDING') {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#130f25] bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Wordmark & Shield */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setStage('LANDING');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex min-h-[44px] items-center gap-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg px-1.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231b40] bg-[#100c1e] text-[#e7005e] shadow-sm transition group-hover:border-[#e7005e] group-hover:bg-[#18132b]">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold tracking-tight text-white">
                  Second Signal
                </span>
                <span className="text-[11px] font-medium text-[#bfbfbf] tracking-wide">
                  Cyber Defense Learning
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-1 border-l border-[#130f25] pl-6"
            >
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="min-h-[44px] px-3.5 flex items-center text-sm font-medium text-[#bfbfbf] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('scenarios')}
                className="min-h-[44px] px-3.5 flex items-center text-sm font-medium text-[#bfbfbf] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
              >
                Scenarios
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('learning-value')}
                className="min-h-[44px] px-3.5 flex items-center text-sm font-medium text-[#bfbfbf] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
              >
                Learning Value
              </button>
              <button
                type="button"
                onClick={() => setStage('SCENARIOS_HUB')}
                className="min-h-[44px] px-3 flex items-center gap-1.5 text-sm font-medium text-[#bfbfbf] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
              >
                <Radio className="h-3.5 w-3.5 text-[#e7005e]" />
                <span>8 Scenarios Lab</span>
              </button>
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Audio SFX Toggle */}
            <button
              type="button"
              onClick={() => {
                toggleSoundMute();
                if (isSoundMuted) {
                  setTimeout(() => soundEffects.playMessageReceived(), 50);
                }
              }}
              title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#130f25] bg-[#100c1e] text-[#bfbfbf] transition hover:border-[#231b40] hover:bg-[#18132b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black px-2.5"
            >
              {isSoundMuted ? (
                <Bell className="h-4 w-4 text-[#555555]" />
              ) : (
                <Bell className="h-4 w-4 text-[#e7005e]" />
              )}
              <span className="hidden lg:inline ml-1.5 text-xs font-medium">
                {isSoundMuted ? 'SFX Off' : 'SFX On'}
              </span>
            </button>

            {/* Voice Narration Toggle */}
            <button
              type="button"
              onClick={toggleVoiceMute}
              title={isVoiceMuted ? 'Unmute AI Coach Voice' : 'Mute AI Coach Voice'}
              aria-label={isVoiceMuted ? 'Unmute AI Coach Voice' : 'Mute AI Coach Voice'}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#130f25] bg-[#100c1e] text-[#bfbfbf] transition hover:border-[#231b40] hover:bg-[#18132b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black px-2.5"
            >
              {isVoiceMuted ? (
                <VolumeX className="h-4 w-4 text-[#555555]" />
              ) : (
                <Volume2 className="h-4 w-4 text-[#e7005e]" />
              )}
              <span className="hidden lg:inline ml-1.5 text-xs font-medium">
                {isVoiceMuted ? 'Voice Off' : 'Voice On'}
              </span>
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => setStage('CHARACTER_INTRO')}
              className="hidden sm:inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#e7005e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ff1a75] active:bg-[#b8004b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>Start Practicing</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#130f25] bg-[#100c1e] text-white transition hover:bg-[#18132b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Disclosure */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="md:hidden border-b border-[#130f25] bg-[#08060e] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => handleMobileNavClick(() => scrollToSection('how-it-works'))}
                className="flex min-h-[44px] w-full items-center px-3 text-left text-sm font-medium text-[#bfbfbf] hover:bg-[#100c1e] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e]"
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={() => handleMobileNavClick(() => scrollToSection('scenarios'))}
                className="flex min-h-[44px] w-full items-center px-3 text-left text-sm font-medium text-[#bfbfbf] hover:bg-[#100c1e] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e]"
              >
                Scenarios
              </button>
              <button
                type="button"
                onClick={() => handleMobileNavClick(() => scrollToSection('learning-value'))}
                className="flex min-h-[44px] w-full items-center px-3 text-left text-sm font-medium text-[#bfbfbf] hover:bg-[#100c1e] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e]"
              >
                Learning Value
              </button>
              <button
                type="button"
                onClick={() => handleMobileNavClick(() => setStage('SCENARIOS_HUB'))}
                className="flex min-h-[44px] w-full items-center justify-between px-3 text-left text-sm font-medium text-[#bfbfbf] hover:bg-[#100c1e] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e]"
              >
                <span className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-[#e7005e]" />
                  <span>8 Scenarios Lab</span>
                </span>
                <span className="text-xs text-[#888888]">Full Suite</span>
              </button>
            </nav>

            <div className="pt-2 border-t border-[#130f25]">
              <button
                type="button"
                onClick={() => handleMobileNavClick(() => setStage('CHARACTER_INTRO'))}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#e7005e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ff1a75] active:bg-[#b8004b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e]"
              >
                <span>Start Practicing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Simulator Header (Used for all interactive scenario, replay, coach & debrief screens)
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
    SCENARIOS_HUB: { label: '8 Attack Scenarios Lab', step: 0 },
    SCENARIO_RUNNER: { label: 'Interactive Scenario', step: 2 },
  };

  const currentInfo = stageLabels[stage] || { label: 'Scenario', step: 0 };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-2.5 sm:px-4 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setStage('LANDING')}
            className="group flex min-h-[44px] items-center gap-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-lg p-1"
            title="Return to Second Signal Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-400 shadow-sm transition group-hover:border-teal-400 group-hover:bg-teal-500/20 shrink-0">
              <Shield className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-heading font-bold tracking-tight text-neutral-100 text-sm sm:text-base truncate max-w-[92px] xs:max-w-none">
                Second Signal
              </span>
              <span className="hidden xs:inline-block font-human text-[10px] sm:text-[11px] font-medium text-teal-300/90 bg-teal-950/60 border border-teal-500/30 px-1.5 py-0.5 rounded-full">
                Lab
              </span>
            </div>
          </button>

          {/* Tagline for desktop */}
          <span className="hidden lg:inline-block text-xs font-human text-neutral-400 border-l border-neutral-800 pl-3">
            Experience → Consequence → Replay → Targeted Practice
          </span>
        </div>

        {/* Center Progress Steps & Scenario Hub Link */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setStage('SCENARIOS_HUB')}
            className={`flex min-h-[40px] items-center gap-1.5 rounded-lg border px-2 sm:px-3 py-1 text-xs font-human transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
              stage === 'SCENARIOS_HUB'
                ? 'border-teal-500/50 bg-teal-950/60 text-teal-300 font-bold shadow-sm'
                : 'border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100'
            }`}
          >
            <Radio className="h-3.5 w-3.5 text-teal-400 animate-pulse shrink-0" />
            <span className="font-semibold hidden sm:inline">8 Scenarios</span>
            <span className="font-semibold sm:hidden">8 Lab</span>
          </button>

          {stage !== 'SCENARIOS_HUB' && (
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-3.5 py-1 text-xs font-human">
              <span className="text-neutral-400 font-medium">Stage:</span>
              <span className="font-semibold text-neutral-200">{currentInfo.label}</span>
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Active Weakness Tag */}
          <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-human text-amber-300">
            <Activity className="h-3 w-3 shrink-0" />
            <span className="font-medium text-xs">Urgency Bias</span>
            {weaknessScores.urgency.misses > 0 && (
              <span className="rounded bg-amber-400/20 px-1.5 py-0.2 font-medium text-amber-200 text-[11px]">
                1 Miss
              </span>
            )}
            {weaknessScores.urgency.recognitions > 0 && (
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-medium text-emerald-300 text-[11px]">
                ✓ 1
              </span>
            )}
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSoundMute();
              if (isSoundMuted) {
                setTimeout(() => soundEffects.playMessageReceived(), 50);
              }
            }}
            title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 px-2 text-xs font-human text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            {isSoundMuted ? (
              <Bell className="h-4 w-4 text-neutral-500" />
            ) : (
              <Bell className="h-4 w-4 text-teal-400" />
            )}
            <span className="hidden md:inline ml-1 text-xs">
              {isSoundMuted ? 'SFX Off' : 'SFX'}
            </span>
          </button>

          {/* Voice Narration Toggle */}
          <button
            onClick={toggleVoiceMute}
            title={isVoiceMuted ? 'Unmute AI Coach Voice' : 'Mute AI Coach Voice'}
            aria-label={isVoiceMuted ? 'Unmute AI Coach Voice' : 'Mute AI Coach Voice'}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 px-2 text-xs font-human text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            {isVoiceMuted ? (
              <VolumeX className="h-4 w-4 text-neutral-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-teal-400 animate-pulse" />
            )}
            <span className="hidden md:inline ml-1 text-xs">
              {isVoiceMuted ? 'Voice Off' : 'Voice'}
            </span>
          </button>

          {/* Reset Simulation */}
          <button
            onClick={resetSimulation}
            title="Reset Simulation to Start"
            aria-label="Reset Simulation"
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 px-2 text-xs font-human text-neutral-400 transition hover:border-red-900/40 hover:bg-neutral-800 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden md:inline ml-1 text-xs">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
