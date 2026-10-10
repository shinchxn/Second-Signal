import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Laptop,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  MousePointer,
  HelpCircle,
  Skull,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario7Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario7RemoteSupport: React.FC<Scenario7Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[6]; // Scenario 7
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Steps:
  // 'browse' -> 'full_warning' -> 'quick_assist_client' -> 'remote_connecting' -> 'attacker_cursor' -> 'passwords_opened' -> 'ransom_incident'
  const [step, setStep] = useState<
    | 'browse'
    | 'full_warning'
    | 'quick_assist_client'
    | 'remote_connecting'
    | 'attacker_cursor'
    | 'passwords_opened'
    | 'ransom_incident'
  >('browse');

  const [agentPin, setAgentPin] = useState('9942');
  const [zoomScale, setZoomScale] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return Math.min(0.65, Math.max(0.48, (window.innerWidth - 24) / 720));
    }
    return 0.88;
  });
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  // Attacker cursor motion coordinates within simulation viewport
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 300, y: 300 });

  // Step 1: Clicking a link in the browser opens full-screen security warning
  const handleTriggerWarning = () => {
    soundEffects.playConsequenceEvent();
    setStep('full_warning');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_7_WARNING_TRIGGERED',
      label: 'Encountered Rogue System Alert',
      description: 'Loud browser popup demanded calling support or installing remote tool.',
    });
  };

  // Step 3: Clicking "Install Support Tool" opens fake remote-support client
  const handleInstallSupport = () => {
    soundEffects.playTapLink();
    setStep('quick_assist_client');
  };

  // Step 5, 6, 7 & 8: Entering training PIN & Connect begins remote-access sequence:
  // Fades user cursor, introduces autonomous red attacker cursor, animates opening Passwords.txt
  const handleConnectRemote = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playTapLink();
    setStep('remote_connecting');

    setTimeout(() => {
      setStep('attacker_cursor');
      soundEffects.playTapLink();

      // Animate attacker cursor moving towards Passwords.txt on desktop
      setCursorPos({ x: 140, y: 160 });

      setTimeout(() => {
        setCursorPos({ x: 80, y: 120 }); // Moving onto file icon
        soundEffects.playTapLink();

        setTimeout(() => {
          // Open Passwords.txt file
          setStep('passwords_opened');
          soundEffects.playMessageReceived();

          // Transition to Step 9 & 10: Black incident screen with red padlock "DEVICE ENCRYPTED. PAY RANSOM."
          setTimeout(() => {
            soundEffects.playConsequenceEvent();
            setStep('ransom_incident');
            recordScenarioCompletion('scenario-7-remote', 'missed');
          }, 3000);
        }, 1200);
      }, 1400);
    }, 1800);
  };

  const handleRecognize = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-7-remote', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_7_RECOGNIZED',
      label: 'Spotted Fake Tech Support',
      description: 'Understood OS never demands installing QuickAssist or calling numbers via browser banners.',
    });
  };

  const handleReset = () => {
    setStep('browse');
    setCursorPos({ x: 300, y: 300 });
    setIsRecognized(null);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-start sm:justify-between px-2 sm:px-3 py-1 sm:py-2 overflow-y-auto overflow-x-hidden select-none">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-15" />

      {/* Top Control Bar */}
      <ScenarioControlBar
        currentScenario={currentScenario}
        onSelectScenario={onSelectScenario}
        onReset={handleReset}
        zoomScale={zoomScale}
        onZoomChange={setZoomScale}
      />

      {/* CENTER WORKSTATION FRAME */}
      <div className="relative z-10 flex flex-1 items-center justify-center min-h-0 w-full max-w-4xl py-2">
        <div
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
          className="w-full max-w-3xl shrink-0 rounded-2xl border-4 border-neutral-700 bg-neutral-950 p-1.5 sm:p-2 shadow-2xl ring-1 ring-neutral-600/40 transition-transform duration-150"
        >
          <div className="relative flex h-[470px] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-inner">
            {/* OS Window Header */}
            <div className="flex h-6 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-3 text-[11px] font-mono text-neutral-400 shrink-0">
              <span className="text-neutral-200 font-bold">ApexOS Desktop</span>
              <span className="text-neutral-500">100% Sandbox Isolation</span>
            </div>

            {/* Browser Address Bar */}
            <div className="flex h-8 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 mr-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="rounded bg-neutral-950 px-2 py-0.5 text-[10px] font-mono text-neutral-300 border border-neutral-800">
                  {step === 'full_warning'
                    ? '⚠️ alert-system-critical-cleaner.network/scan'
                    : '🌐 travel-tips-archive.org/reading'}
                </div>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Browser Tab 1</span>
            </div>

            {/* WORKSTATION VIEWPORT */}
            <div className="flex-1 min-h-0 overflow-hidden relative bg-neutral-950 p-4">
              {/* 1. INITIAL BROWSE SCREEN */}
              {step === 'browse' && (
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <div className="border-b border-neutral-800 pb-2">
                      <h3 className="text-sm font-bold text-neutral-100">Tech Digest Articles</h3>
                      <p className="text-[10px] text-neutral-400">Published online 2 hours ago</p>
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 space-y-2 text-xs">
                      <p className="text-neutral-300">
                        While researching software utilities, a promotional download link is clicked:
                      </p>
                      <button
                        onClick={handleTriggerWarning}
                        className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                      >
                        <span>Download Free PDF Converter Utility</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Click download link to trigger rogue security alert simulation
                  </div>
                </div>
              )}

              {/* 2. SIMULATED FULL-SCREEN SECURITY WARNING */}
              {step === 'full_warning' && (
                <div className="flex h-full flex-col justify-between items-center text-center p-4 bg-red-950/40 border-2 border-red-500/60 rounded-xl">
                  <div className="space-y-3 pt-2">
                    <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-red-600 text-white animate-pulse shadow-xl shadow-red-600/40">
                      <ShieldAlert className="h-8 w-8" />
                    </div>

                    <h2 className="text-base font-black text-red-400 tracking-tight font-mono">
                      SYSTEM ALERT — COMPROMISED. Call Support or install QuickAssist.
                    </h2>

                    <p className="text-xs text-neutral-200 max-w-md mx-auto leading-relaxed">
                      CRITICAL: Trojan.Spyware.32 detected in root directory. Your saved credentials and banking sessions are exposed. Immediate engineer remediation required.
                    </p>

                    <div className="rounded-xl border border-red-500/40 bg-neutral-900/90 p-3 max-w-sm mx-auto space-y-1">
                      <div className="text-xs font-mono text-neutral-400">Emergency Helpline:</div>
                      <div className="text-sm font-bold font-mono text-red-400">1-800-419-HELP [SIMULATED]</div>
                      <div className="text-[10px] text-neutral-500">Remote Session Required</div>
                    </div>
                  </div>

                  <div className="w-full max-w-md flex gap-2 pt-2">
                    <button
                      onClick={handleRecognize}
                      className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800"
                    >
                      Close Tab / Ignore Warning (Safe)
                    </button>
                    <button
                      onClick={handleInstallSupport}
                      className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition active:scale-95 shadow-md shadow-red-600/20"
                    >
                      Install Support Tool
                    </button>
                  </div>
                </div>
              )}

              {/* 3 & 4. FAKE REMOTE-SUPPORT CLIENT (QuickAssist) */}
              {step === 'quick_assist_client' && (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="w-full max-w-sm rounded-2xl border-2 border-indigo-500/60 bg-neutral-900 p-4 shadow-2xl space-y-3">
                    <div className="border-b border-neutral-800 pb-2 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-indigo-400 text-xs font-bold">
                        <HelpCircle className="h-4 w-4" />
                        <span>QuickAssist Remote Desktop Agent</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Assistance Session Handshake</p>
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2.5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400">Your Session Code:</div>
                      <div className="text-xl font-extrabold font-mono text-teal-400 tracking-widest">
                        829104
                      </div>
                    </div>

                    <form onSubmit={handleConnectRemote} className="space-y-2.5 text-xs">
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-0.5">
                          Support Agent PIN (Provided by phone caller):
                        </label>
                        <input
                          type="text"
                          value={agentPin}
                          onChange={(e) => setAgentPin(e.target.value)}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition active:scale-95 shadow-md shadow-indigo-600/20"
                      >
                        Connect & Grant Remote Control
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* 5. REMOTE CONNECTING */}
              {step === 'remote_connecting' && (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                  <div className="h-10 w-10 animate-spin rounded-full border-3 border-red-500 border-t-transparent mx-auto" />
                  <div className="text-xs font-bold text-neutral-100">
                    Handing over desktop control to remote operator...
                  </div>
                  <p className="text-[10px] font-mono text-neutral-400">
                    Local input controls suspended. Establishing remote driver hook.
                  </p>
                </div>
              )}

              {/* 6, 7 & 8. AUTONOMOUS ATTACKER CURSOR & PASSWORDS.TXT EXFILTRATION */}
              {(step === 'attacker_cursor' || step === 'passwords_opened') && (
                <div className="relative h-full w-full bg-neutral-950 rounded-xl overflow-hidden p-3 select-none">
                  {/* Desktop Background & Desktop Icons */}
                  <div className="space-y-4">
                    {/* File icon on desktop */}
                    <div
                      className={`inline-flex flex-col items-center p-2 rounded-lg border transition ${
                        step === 'passwords_opened'
                          ? 'border-red-500 bg-red-950/40 text-red-300'
                          : 'border-transparent text-neutral-300 hover:border-neutral-800'
                      }`}
                    >
                      <FileText className="h-8 w-8 text-amber-400" />
                      <span className="text-[10px] font-mono mt-1 font-semibold">Passwords.txt</span>
                    </div>
                  </div>

                  {/* Open synthetic Passwords.txt window */}
                  {step === 'passwords_opened' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-12 left-28 w-80 rounded-xl border-2 border-red-500 bg-neutral-900 shadow-2xl p-3 font-mono text-[11px] text-neutral-200 z-20 space-y-1.5"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-1 text-[10px] text-red-400 font-bold">
                        <span>TextEdit — Passwords.txt [EXFILTRATING]</span>
                        <span>READ-ONLY</span>
                      </div>
                      <div className="text-neutral-400 text-[10px]">
                        Master_Bank_PIN: 8842<br />
                        Corporate_VPN: Apex_Secret_99<br />
                        AWS_Root_Access: AKIAIOSFODNN7EXAMPLE<br />
                        Personal_Crypto_Seed: 12 words exposed
                      </div>
                      <div className="text-[9px] text-red-400 font-bold animate-pulse">
                        ⚠️ File copied to attacker remote server.
                      </div>
                    </motion.div>
                  )}

                  {/* Autonomous Red Attacker Cursor moving across screen */}
                  <motion.div
                    animate={{ left: cursorPos.x, top: cursorPos.y }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="absolute pointer-events-none z-50 flex items-center gap-1"
                  >
                    <MousePointer className="h-5 w-5 text-red-500 fill-red-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.8)]" />
                    <span className="rounded bg-red-600 px-1 py-0.2 text-[8px] font-mono font-bold text-white shadow-sm">
                      Attacker (Remote)
                    </span>
                  </motion.div>

                  <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-red-400 bg-neutral-950/80 border border-red-500/30 p-1 rounded-lg">
                    Notice: The user's cursor is frozen. The red attacker cursor operates autonomously.
                  </div>
                </div>
              )}

              {/* 9 & 10. BLACK INCIDENT SCREEN WITH RED PADLOCK: "DEVICE ENCRYPTED. PAY RANSOM." */}
              {step === 'ransom_incident' && (
                <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-600/20 text-red-500 border-2 border-red-500 shadow-2xl shadow-red-500/50"
                  >
                    <Lock className="h-8 w-8" />
                  </motion.div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-red-500 font-mono tracking-wider">
                      DEVICE ENCRYPTED. PAY RANSOM.
                    </h2>
                    <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                      All your documents, credentials, and databases have been encrypted via remote Trojan payload. Remote access allowed the adversary full privileged execution.
                    </p>
                  </div>

                  <div className="rounded-xl border border-red-500/40 bg-neutral-900/80 p-3 max-w-sm text-xs font-mono text-red-300 space-y-0.5">
                    <div>Ransom Demand: 2.5 BTC</div>
                    <div>Session ID: 829104-EXFIL</div>
                    <div>Safe Educational Simulation • No real data harmed</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleReset}
                      className="rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                    >
                      Replay Scenario 7
                    </button>
                    <button
                      onClick={() => onSelectScenario('scenario-8-refund')}
                      className="rounded-xl border border-neutral-800 bg-neutral-800 px-5 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
                    >
                      Next Scenario: Refund Helpline
                    </button>
                  </div>
                </div>
              )}

              {/* RECOGNITION POPUP */}
              {isRecognized && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                  <div className="w-full max-w-md rounded-2xl border border-emerald-500/50 bg-neutral-900 p-5 shadow-2xl text-center space-y-3">
                    <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-100">Fake Tech Support Blocked!</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Outstanding! Legitimate operating systems (Apple, Microsoft, Linux) never demand you call phone numbers or install remote-access tools through browser popups. Simply closing the tab terminates the exploit.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleReset}
                        className="flex-1 rounded-xl border border-neutral-800 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
                      >
                        Replay Scenario
                      </button>
                      <button
                        onClick={() => onSelectScenario('scenario-8-refund')}
                        className="flex-1 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                      >
                        Next: Refund Helpline
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center text-[11px] text-neutral-400 font-mono py-1 shrink-0">
        Educational Sandbox: Never install remote-desktop software prompted by browser alerts
      </div>
    </div>
  );
};
