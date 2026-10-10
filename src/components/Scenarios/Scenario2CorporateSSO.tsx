import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Laptop,
  Smartphone,
  Lock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Terminal,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { DockedPhoneWidget } from '../Shared/DockedPhoneWidget';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario2Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario2CorporateSSO: React.FC<Scenario2Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[1]; // Scenario 2
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Progression steps:
  // 'inbox' -> 'reading_email' -> 'sso_tab' -> 'mfa_waiting' -> 'mfa_approved' -> 'terminal_split'
  const [step, setStep] = useState<
    'inbox' | 'reading_email' | 'sso_tab' | 'mfa_waiting' | 'mfa_approved' | 'terminal_split'
  >('inbox');

  const [emailUsername, setEmailUsername] = useState('alex.turner@apexcorp.internal');
  const [emailPassword, setEmailPassword] = useState('••••••••••••');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [zoomScale, setZoomScale] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return Math.min(0.65, Math.max(0.48, (window.innerWidth - 24) / 720));
    }
    return 0.88;
  });
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);
  const [headersOpen, setHeadersOpen] = useState(false);
  const [activeDeviceView, setActiveDeviceView] = useState<'workstation' | 'phone'>('workstation');

  useEffect(() => {
    const t = setTimeout(() => {
      soundEffects.playMessageReceived();
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // Step 1: Click "Security Certificate Expiring" email
  const handleOpenEmail = () => {
    soundEffects.playTapLink();
    setStep('reading_email');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_2_EMAIL_OPENED',
      label: 'Opened Security Certificate Expiring',
      description: 'Viewed workplace compliance email.',
    });
  };

  // Step 2: Click "Re-Authenticate Now"
  const handleReAuthenticateClick = () => {
    soundEffects.playTapLink();
    setStep('sso_tab');
  };

  // Step 3: Enter credentials -> displays "Check your mobile device for MFA approval"
  const handleSsoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playTapLink();
    setStep('mfa_waiting');
    setActiveDeviceView('phone');
    // Prompt the phone to light up with audio alert
    soundEffects.playMessageReceived();
    addEvent({
      actor: 'user',
      type: 'SCENARIO_2_CREDENTIALS_ENTERED',
      label: 'Submitted Workplace SSO Credentials',
      description: 'Triggered mobile MFA push request.',
    });
  };

  // Step 4 & 5: Mobile Phone MFA Approval -> Green checkmark on laptop -> Split terminal exfiltration
  const handleApproveMfa = () => {
    soundEffects.playTapLink();
    setStep('mfa_approved');
    recordScenarioCompletion('scenario-2-sso', 'missed');

    setTimeout(() => {
      soundEffects.playConsequenceEvent();
      setStep('terminal_split');
      setActiveDeviceView('workstation');

      // Animate terminal exfiltration output line by line
      const lines = [
        'Authenticating simulated session...',
        'Access granted to training environment.',
        'Downloading Client_Database_2026.xlsx... [SIMULATED]',
        '4,201 simulated emails exposed.',
      ];

      lines.forEach((line, idx) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, line]);
          soundEffects.playTapLink();
        }, (idx + 1) * 700);
      });
    }, 1500);
  };

  const handleDenyMfa = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-2-sso', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_2_DENIED_MFA',
      label: 'Denied Unexpected MFA Push',
      description: 'Refused mobile authentication prompt, thwarting session hijack.',
    });
  };

  const handleReportEmail = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-2-sso', 'recognized');
  };

  const handleReset = () => {
    setStep('inbox');
    setTerminalLines([]);
    setIsRecognized(null);
    setHeadersOpen(false);
    setActiveDeviceView('workstation');
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

      {/* Mobile Device Switcher Tab (Visible on small screens < 1024px) */}
      <div className="flex lg:hidden items-center justify-center gap-2 mb-2 w-full max-w-sm shrink-0">
        <button
          type="button"
          onClick={() => setActiveDeviceView('workstation')}
          className={`flex-1 min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            activeDeviceView === 'workstation'
              ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>Workstation</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveDeviceView('phone')}
          className={`flex-1 min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
            activeDeviceView === 'phone'
              ? 'bg-teal-600 border-teal-400 text-white shadow-md'
              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span>Phone (MFA)</span>
          {step === 'mfa_waiting' && (
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping ml-1" />
          )}
        </button>
      </div>

      {/* DUAL WORKSTATION + DOCKED PHONE CONTAINER */}
      <div className="relative z-10 flex flex-1 items-center justify-center min-h-0 w-full max-w-6xl">
        <div
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
          className="flex flex-col lg:flex-row items-center justify-center gap-4 transition-transform duration-150 w-full"
        >
          {/* LAPTOP CHASSIS */}
          <div className={`${activeDeviceView === 'workstation' ? 'block' : 'hidden lg:block'} w-full max-w-[660px] shrink-0 rounded-2xl border-4 border-neutral-700 bg-neutral-950 p-2 shadow-2xl ring-1 ring-neutral-600/40`}>
            <div className="flex h-[470px] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-inner">
              {/* OS Menu Bar */}
              <div className="flex h-6 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-3 text-[11px] font-mono text-neutral-400 shrink-0">
                <span className="text-neutral-200 font-bold">ApexOS Workstation</span>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">Corp VPN: CONNECTED</span>
                  <span>11:18 AM</span>
                </div>
              </div>

              {/* Browser Window Bar */}
              <div className="flex h-8 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 shrink-0 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 mr-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Browser Tabs */}
                  <button
                    onClick={() => setStep(step === 'sso_tab' ? 'reading_email' : 'inbox')}
                    className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs transition ${
                      step !== 'sso_tab' && step !== 'mfa_waiting' && step !== 'mfa_approved' && step !== 'terminal_split'
                        ? 'bg-neutral-800 text-neutral-100 font-bold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Mail className="h-3 w-3 text-indigo-400" />
                    <span>Apex Corporate Mail</span>
                  </button>

                  {(step === 'sso_tab' || step === 'mfa_waiting' || step === 'mfa_approved' || step === 'terminal_split') && (
                    <div className="flex items-center gap-1.5 rounded bg-neutral-800 px-2.5 py-1 text-xs text-neutral-100 font-bold border-t-2 border-indigo-500">
                      <Lock className="h-3 w-3 text-amber-400" />
                      <span>Single Sign-On (SSO)</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-mono text-neutral-500">
                  alex.turner@apexcorp.internal
                </span>
              </div>

              {/* LAPTOP MAIN CONTENT VIEWPORT */}
              <div className="flex-1 min-h-0 overflow-hidden bg-neutral-950 p-3">
                {/* 1. INBOX LIST */}
                {step === 'inbox' && (
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2 text-xs font-mono text-neutral-400">
                        <span>Inbox (1 Unread)</span>
                        <span>Corporate IT Priority</span>
                      </div>

                      <div
                        onClick={handleOpenEmail}
                        className="cursor-pointer rounded-xl border border-red-500/40 bg-neutral-900/90 p-3 hover:border-red-400 transition space-y-1 shadow-md"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-red-400">IT Security Department</span>
                          <span className="font-mono text-[10px] text-neutral-400">11:15 AM</span>
                        </div>
                        <div className="text-xs font-semibold text-neutral-100">
                          Security Certificate Expiring — Immediate Re-Authentication
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">
                          Action Required: Re-authenticate workplace credentials before 12:00 PM to prevent automated system lock...
                        </p>
                      </div>
                    </div>

                    <div className="text-center text-[10px] text-neutral-500 font-mono">
                      Click the unread email to open the reading pane
                    </div>
                  </div>
                )}

                {/* 2. READING EMAIL PANE */}
                {step === 'reading_email' && (
                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <div>
                          <div className="text-sm font-bold text-neutral-100">
                            Security Certificate Expiring
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">
                            From:{' '}
                            <span className="font-mono text-amber-300">
                              it-admin@apexcorp-security-portal.net
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setHeadersOpen(!headersOpen)}
                          className="flex items-center gap-1 rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] text-teal-300 hover:bg-neutral-800"
                        >
                          <Info className="h-3 w-3" />
                          <span>{headersOpen ? 'Hide Headers' : 'Inspect Headers'}</span>
                        </button>
                      </div>

                      {headersOpen && (
                        <div className="rounded-lg border border-red-500/30 bg-neutral-900 p-2 font-mono text-[10px] text-neutral-300 space-y-0.5">
                          <div>SPF: <span className="text-red-400 font-bold">FAIL (External mail server spoofing IT)</span></div>
                          <div>Sender Domain: <span className="text-red-400">apexcorp-security-portal.net (Lookalike)</span></div>
                          <div>Official Domain: <span className="text-emerald-400">apexcorp.internal</span></div>
                        </div>
                      )}

                      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-xs space-y-2">
                        <div className="rounded border border-red-500/30 bg-red-950/30 p-2 text-red-200 text-[11px] font-medium">
                          ⚠️ DEADLINE: Security certificate will expire at 12:00 PM. Unauthenticated personnel will lose access to staff file shares, payroll, and internal messaging.
                        </div>
                        <p className="text-[11px] text-neutral-300">
                          Please renew your workplace authentication token via the corporate single sign-on service:
                        </p>
                        <button
                          onClick={handleReAuthenticateClick}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition active:scale-95 shadow-md shadow-indigo-600/20"
                        >
                          <span>Re-Authenticate Now</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800 pt-2 text-[11px]">
                      <span className="text-neutral-500 font-mono">Spot the lookalike domain?</span>
                      <button
                        onClick={handleReportEmail}
                        className="rounded-lg bg-emerald-600 px-3 py-1 font-bold text-white hover:bg-emerald-500 transition"
                      >
                        Report Phishing
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. SIMULATED SSO LOGIN TAB */}
                {step === 'sso_tab' && (
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
                      <div className="border-b border-neutral-800 pb-2 text-center">
                        <div className="font-mono text-[10px] text-red-400">
                          🔒 apexcorp-security-portal.net/sso-login
                        </div>
                        <h4 className="text-sm font-bold text-neutral-100 mt-1">ApexCorp Single Sign-On</h4>
                        <p className="text-[10px] text-neutral-400">Enterprise Certificate Renewal</p>
                      </div>

                      <form onSubmit={handleSsoSubmit} className="space-y-2.5 text-xs">
                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-0.5">Corporate Email</label>
                          <input
                            type="text"
                            value={emailUsername}
                            onChange={(e) => setEmailUsername(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-0.5">Password</label>
                          <input
                            type="password"
                            value={emailPassword}
                            onChange={(e) => setEmailPassword(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition active:scale-95 shadow-md"
                        >
                          Sign In & Renew Certificate
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* 4. MFA WAITING STATE */}
                {step === 'mfa_waiting' && (
                  <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-amber-400 border-t-transparent" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-100">
                        Check your mobile device for MFA approval.
                      </h4>
                      <p className="text-xs text-amber-300 font-mono mt-1">
                        An authentication notification was pushed to your registered smartphone →
                      </p>
                    </div>
                    <p className="text-[11px] text-neutral-400 max-w-sm">
                      Notice the paired phone on the right has lit up with an Authenticator prompt.
                    </p>
                  </div>
                )}

                {/* 5. MFA APPROVED CHECKMARK */}
                {step === 'mfa_approved' && (
                  <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <div className="text-sm font-bold text-emerald-300">MFA Request Approved!</div>
                    <div className="text-xs text-neutral-400 font-mono">
                      Establishing authorized employee session...
                    </div>
                  </div>
                )}

                {/* 6. VERTICALLY SPLIT TERMINAL EXFILTRATION */}
                {step === 'terminal_split' && (
                  <div className="grid grid-cols-2 gap-3 h-full">
                    {/* Left pane: Hijacked Portal */}
                    <div className="rounded-xl border border-red-500/40 bg-neutral-900/60 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold border-b border-neutral-800 pb-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Unauthorized Session Established</span>
                        </div>
                        <p className="text-xs text-neutral-300 mt-2">
                          The adversary bypassed multi-factor authentication by exploiting MFA fatigue and authority pressure.
                        </p>
                        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-950/20 p-2 text-[10px] text-red-300 font-mono">
                          Session Cookie: ACTIVE<br />
                          IP: 185.220.101.5 (External VPS)
                        </div>
                      </div>

                      <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-500 py-2 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Replay Scenario 2</span>
                      </button>
                    </div>

                    {/* Right pane: Terminal with animated output */}
                    <div className="rounded-xl border border-neutral-800 bg-black p-3 font-mono text-[11px] flex flex-col justify-between shadow-inner">
                      <div>
                        <div className="flex items-center gap-1.5 text-neutral-400 border-b border-neutral-800 pb-1.5 mb-2 text-[10px]">
                          <Terminal className="h-3.5 w-3.5 text-teal-400" />
                          <span>attacker_exfil_runner — bash</span>
                        </div>

                        <div className="space-y-1.5">
                          {terminalLines.map((line, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={
                                idx === 2 || idx === 3
                                  ? 'text-red-400 font-bold'
                                  : 'text-emerald-400'
                              }
                            >
                              &gt; {line}
                            </motion.div>
                          ))}
                          {terminalLines.length < 4 && (
                            <div className="h-3 w-1.5 bg-teal-400 animate-pulse inline-block" />
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectScenario('scenario-3-upi')}
                        className="w-full flex items-center justify-center gap-1 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 transition"
                      >
                        <span>Next Scenario: UPI Cashback</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DOCKED PHONE (Cross-device companion) */}
          <div className={`${activeDeviceView === 'phone' ? 'block' : 'hidden lg:block'} shrink-0`}>
            <DockedPhoneWidget
              time="11:18"
              isLitUp={step === 'mfa_waiting'}
              mfaPrompt={
                step === 'mfa_waiting'
                  ? {
                      appName: 'Apex Authenticator',
                      account: 'alex.turner@apexcorp.internal',
                      location: 'Unknown Device (External IP)',
                      timestamp: 'Just now',
                      onApprove: handleApproveMfa,
                      onDeny: handleDenyMfa,
                    }
                  : null
              }
            />
          </div>
        </div>
      </div>

      {/* RECOGNITION VICTORY MODAL */}
      {isRecognized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/50 bg-neutral-900 p-5 shadow-2xl text-center space-y-3">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">MFA Hijack Thwarted!</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Excellent! You never approve unexpected MFA notifications pushed to your mobile device. When an unsolicited authentication prompt appears, denying it prevents full enterprise session takeover.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border border-neutral-800 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
              >
                Replay Scenario
              </button>
              <button
                onClick={() => onSelectScenario('scenario-3-upi')}
                className="flex-1 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
              >
                Next: UPI Trap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="relative z-20 text-center text-[11px] text-neutral-400 font-mono py-1 shrink-0">
        Notice how laptop and phone interact: Action on email triggers mobile MFA push
      </div>
    </div>
  );
};
