import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Shield,
  AlertTriangle,
  ExternalLink,
  Info,
  Lock,
  ArrowRight,
  MessageSquare,
  ZoomIn,
  ZoomOut,
  Laptop,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';

export const SimulatedLaptop: React.FC = () => {
  const {
    setEncounter2Outcome,
    recordWeaknessOutcome,
    setStage,
    addEvent,
  } = useSessionStore();

  const [headersOpen, setHeadersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'slack' | 'browser'>('email');
  const [zoomScale, setZoomScale] = useState<number>(0.9);

  useEffect(() => {
    const timer = setTimeout(() => {
      soundEffects.playMessageReceived();
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleHeaders = () => {
    soundEffects.playTapLink();
    setHeadersOpen(!headersOpen);
  };

  const handleReportPhishing = () => {
    soundEffects.playSignalRecognized();
    setEncounter2Outcome('recognized');
    recordWeaknessOutcome('urgency', 'recognized');
    addEvent({
      actor: 'user',
      type: 'USER_REPORTED_PHISHING',
      label: 'Phishing Reported',
      description: 'Arjun recognized the artificial 6:00 PM deadline and reported the email.',
    });
    setStage('SCENARIO_2_RECOGNITION');
  };

  const handleVerifySlack = () => {
    soundEffects.playSignalRecognized();
    setActiveTab('slack');
  };

  const handleClickSSO = () => {
    soundEffects.playTapLink();
    setActiveTab('browser');
  };

  const handleSubmitSSO = () => {
    soundEffects.playConsequenceEvent();
    setEncounter2Outcome('missed');
    recordWeaknessOutcome('urgency', 'missed');
    addEvent({
      actor: 'user',
      type: 'USER_SUBMITTED_CREDENTIALS',
      label: 'Submitted Credentials',
      description: 'Authorized corporate SSO under deadline pressure.',
    });
    setStage('SCENARIO_2_RECOGNITION');
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-between px-3 py-1 overflow-hidden select-none">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-15" />

      {/* TOP COMPACT BAR */}
      <div className="relative z-20 flex w-full max-w-2xl items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-1 backdrop-blur-md text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Laptop className="h-3.5 w-3.5 text-indigo-400" />
          <span className="font-semibold text-neutral-200">ApexCorp Workstation</span>
          <span className="text-neutral-600">|</span>
          <span className="font-mono text-[11px] text-amber-400">Urgency Test 02</span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="text-neutral-500">Zoom:</span>
          <button
            onClick={() => setZoomScale(Math.max(0.75, zoomScale - 0.05))}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="h-3 w-3" />
          </button>
          <span className="w-8 text-center text-indigo-300 font-bold">{Math.round(zoomScale * 100)}%</span>
          <button
            onClick={() => setZoomScale(Math.min(1.05, zoomScale + 0.05))}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            title="Zoom In"
          >
            <ZoomIn className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* WORKSTATION DISPLAY */}
      <div className="relative z-10 flex flex-1 items-center justify-center min-h-0 w-full">
        <div
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
          className="w-full max-w-3xl shrink-0 rounded-2xl border-4 border-neutral-700 bg-neutral-950 p-2 shadow-2xl ring-1 ring-neutral-600/40 transition-transform duration-150"
        >
          <div className="flex h-[450px] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-inner">
            {/* OS Menu Bar */}
            <div className="flex h-6 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-3 text-[11px] font-mono text-neutral-400 shrink-0">
              <span className="text-neutral-200 font-bold">ApexOS Enterprise</span>
              <div className="flex items-center gap-2">
                <span className="text-teal-400">VPN: OK</span>
                <span>11:18 AM</span>
              </div>
            </div>

            {/* Window Tabs Bar */}
            <div className="flex h-8 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 shrink-0 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1 mr-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <button
                  onClick={() => setActiveTab('email')}
                  className={`flex items-center gap-1 rounded px-2 py-0.5 transition ${
                    activeTab === 'email' ? 'bg-neutral-800 text-neutral-100 font-bold' : 'text-neutral-400'
                  }`}
                >
                  <Mail className="h-3 w-3 text-indigo-400" />
                  <span>Apex Mail</span>
                </button>

                <button
                  onClick={() => setActiveTab('slack')}
                  className={`flex items-center gap-1 rounded px-2 py-0.5 transition ${
                    activeTab === 'slack' ? 'bg-neutral-800 text-neutral-100 font-bold' : 'text-neutral-400'
                  }`}
                >
                  <MessageSquare className="h-3 w-3 text-teal-400" />
                  <span>IT Slack</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-neutral-500">arjun.m@apexcorp.internal</span>
            </div>

            {/* TAB CONTENT: EMAIL */}
            {activeTab === 'email' && (
              <div className="flex flex-1 min-h-0 overflow-hidden bg-neutral-950 p-3 flex-col justify-between">
                <div>
                  {/* Email header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div>
                      <div className="text-xs font-bold text-neutral-100">
                        [URGENT] Mandatory SSO Certificate Renewal
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        From: <span className="font-mono text-amber-300">security-portal@apexcorp-auth-internal.net</span>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleHeaders}
                      className="inline-flex items-center gap-1 rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] text-teal-300 hover:bg-neutral-800"
                    >
                      <Info className="h-2.5 w-2.5" />
                      <span>{headersOpen ? 'Hide Headers' : 'Inspect Headers'}</span>
                    </button>
                  </div>

                  {/* Headers Inspector */}
                  <AnimatePresence>
                    {headersOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 rounded-lg border border-neutral-800 bg-neutral-900/90 p-2 font-mono text-[10px] text-neutral-300 space-y-0.5"
                      >
                        <div>SPF: <span className="text-red-400 font-bold">FAIL (Unauthorized)</span></div>
                        <div>DKIM: <span className="text-red-400 font-bold">INVALID</span></div>
                        <div>Real Apex Domain: <span className="text-emerald-400 font-bold">apexcorp.com</span> (Lookalike domain registered 18 hrs ago)</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Body */}
                  <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-900/40 p-3 text-xs space-y-2">
                    <div className="rounded border border-red-500/30 bg-red-950/30 p-2 text-red-200 text-[11px] font-medium">
                      ⚠️ DEADLINE: Complete renewal before 6:00 PM today or VPN/Git access will be suspended.
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      All engineering staff must re-authenticate single sign-on certificates immediately:
                    </p>
                    <button
                      onClick={handleClickSSO}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500"
                    >
                      <span>Renew SSO Credentials</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Safe Actions Bottom Bar */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Recognize the 6:00 PM pressure tactic?
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleVerifySlack}
                      className="rounded bg-neutral-800 px-2.5 py-1 text-xs text-teal-300 hover:bg-neutral-700"
                    >
                      Ask IT on Slack
                    </button>
                    <button
                      onClick={handleReportPhishing}
                      className="rounded bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500"
                    >
                      Report Phishing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SLACK */}
            {activeTab === 'slack' && (
              <div className="flex flex-1 min-h-0 bg-neutral-950 p-4 flex-col justify-between text-xs">
                <div className="space-y-3">
                  <div className="border-b border-neutral-800 pb-2 flex justify-between items-center">
                    <span className="font-bold text-neutral-100">#it-support</span>
                    <button
                      onClick={() => setActiveTab('email')}
                      className="text-neutral-400 hover:text-neutral-200"
                    >
                      ← Back to Mail
                    </button>
                  </div>
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 space-y-2">
                    <div className="text-teal-400 font-bold">Arjun: "Is the 6:00 PM SSO renewal email real?"</div>
                    <div className="text-indigo-300 font-bold">IT Helpdesk: "Phishing alert! We never set same-day email deadlines. Good catch!"</div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleReportPhishing}
                    className="rounded-xl bg-emerald-600 px-5 py-2 font-bold text-white hover:bg-emerald-500"
                  >
                    Confirm Report & Complete Practice →
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BROWSER SSO PHISH */}
            {activeTab === 'browser' && (
              <div className="flex flex-1 min-h-0 bg-neutral-950 p-4 flex-col items-center justify-center text-xs">
                <div className="w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-3 text-center">
                  <div className="text-red-400 font-mono text-[10px]">🔒 apexcorp-auth-internal.net/login</div>
                  <div className="font-bold text-neutral-100">Simulated Enterprise SSO</div>
                  <div className="text-[11px] text-neutral-400">Deadline: 6:00 PM</div>
                  <button
                    onClick={handleSubmitSSO}
                    className="w-full rounded-lg bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    Authorize Certificate Renewal
                  </button>
                  <button
                    onClick={() => setActiveTab('email')}
                    className="text-[10px] text-neutral-500 hover:text-neutral-300 underline"
                  >
                    Cancel / Return to Mail
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM HINT */}
      <div className="relative z-20 text-center text-[11px] text-neutral-500 font-mono py-1 shrink-0">
        Inspect the email headers or verify out-of-band on Slack
      </div>
    </div>
  );
};
