import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Lock,
  ExternalLink,
  ChevronLeft,
  Wifi,
  Battery,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Bell,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario1Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario1BankKYC: React.FC<Scenario1Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[0]; // Scenario 1
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Internal scenario progression state
  // Steps: 'lock_screen' -> 'sms_convo' -> 'fake_login' -> 'login_loading' -> 'otp_screen' -> 'otp_verifying' -> 'debit_interrupted' -> 'bank_app'
  const [step, setStep] = useState<
    | 'lock_screen'
    | 'sms_convo'
    | 'fake_login'
    | 'login_loading'
    | 'otp_screen'
    | 'otp_verifying'
    | 'debit_interrupted'
    | 'bank_app'
  >('lock_screen');

  const [customerId, setCustomerId] = useState<string>('48219034');
  const [password, setPassword] = useState<string>('••••••••••');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [bankBalance, setBankBalance] = useState<number>(84500);
  const [zoomScale, setZoomScale] = useState<number>(0.9);
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  // Sound upon mount
  useEffect(() => {
    const t = setTimeout(() => {
      soundEffects.playMessageReceived();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Step 2: Tapping notification unlocks phone and opens SMS
  const handleTapNotification = () => {
    soundEffects.playTapLink();
    setStep('sms_convo');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_1_UNLOCKED',
      label: 'Unlocked Phone from SMS',
      description: 'Opened urgent banking alert notification.',
    });
  };

  // Step 3: Tapping link opens fake banking login
  const handleTapLink = () => {
    soundEffects.playTapLink();
    setStep('fake_login');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_1_OPENED_LINK',
      label: 'Opened http://hdfc-kyc-update.me',
      description: 'Navigated to simulated fake banking login portal.',
    });
  };

  // Step 4: Login with 2s loading
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playTapLink();
    setStep('login_loading');
    setTimeout(() => {
      setStep('otp_screen');
    }, 2000);
  };

  // Step 6 & 7: Submit OTP -> Verifying KYC -> Debit notification interrupt
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playTapLink();
    setStep('otp_verifying');

    setTimeout(() => {
      soundEffects.playConsequenceEvent();
      setStep('debit_interrupted');
      recordScenarioCompletion('scenario-1-kyc', 'missed');

      // Step 8 & 9: Close fake browser and open simulated banking app with draining balance
      setTimeout(() => {
        setStep('bank_app');
        soundEffects.playCashRegisterChime();

        // Animate balance from 84,500 down to 0
        let current = 84500;
        const interval = setInterval(() => {
          current = Math.max(0, current - 8450);
          setBankBalance(current);
          soundEffects.playMoneyDecreasing(current / 84500);
          if (current <= 0) {
            clearInterval(interval);
            soundEffects.playCashEmpty();
          }
        }, 120);
      }, 2500);
    }, 1800);
  };

  // Safe action: Report/Recognize
  const handleRecognizePhishing = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-1-kyc', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_1_RECOGNIZED',
      label: 'Spotted KYC Phishing',
      description: 'Paused and refused to provide credentials on unsolicited domain.',
    });
  };

  const handleReset = () => {
    setStep('lock_screen');
    setBankBalance(84500);
    setOtpDigits(['', '', '', '', '', '']);
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

      {/* CENTER PHONE FRAME */}
      <div className="relative z-10 flex flex-1 items-center justify-center min-h-0 w-full py-2">
        <div
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
          className="relative w-[min(310px,calc(100vw-1.5rem))] shrink-0 rounded-[34px] sm:rounded-[38px] border-4 border-neutral-700 bg-neutral-950 p-1.5 sm:p-2 shadow-2xl shadow-black/80 ring-1 ring-neutral-600/40 transition-transform duration-150"
        >
          {/* Screen Chassis */}
          <div className="relative flex h-[480px] sm:h-[510px] flex-col overflow-hidden rounded-[26px] sm:rounded-[30px] bg-neutral-950 text-neutral-100 shadow-inner">
            {/* Status Bar */}
            <div className="relative z-30 flex h-7 items-center justify-between px-4 text-xs font-medium shrink-0 bg-neutral-950/90">
              <span className="font-mono text-[11px]">8:42</span>
              <div className="h-3.5 w-16 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="flex items-center gap-1 text-neutral-400">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* SCREEN CONTENT BY STEP */}
            <div className="flex-1 min-h-0 overflow-y-auto relative p-3">
              {/* 1. LOCK SCREEN */}
              {step === 'lock_screen' && (
                <div className="flex h-full flex-col justify-between pt-6 pb-2">
                  <div className="text-center">
                    <div className="text-4xl font-extralight tracking-tight text-neutral-100">8:42</div>
                    <div className="text-xs text-neutral-400 mt-1">Tuesday, October 10</div>
                  </div>

                  {/* Lock Screen Notification */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleTapNotification}
                    className="cursor-pointer rounded-2xl border border-red-500/50 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md transition hover:border-red-400 active:scale-95"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-100">Messages</span>
                          <span className="text-[10px] font-mono text-neutral-400">now</span>
                        </div>
                        <p className="mt-1 text-xs text-neutral-200 font-semibold leading-snug">
                          Alert: KYC Pending. Account blocking in 24 hrs.
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-right text-[10px] font-mono text-teal-400 font-bold">
                      Tap notification to unlock →
                    </div>
                  </motion.div>

                  <div className="text-center text-[10px] font-mono text-neutral-500">
                    Swipe or tap notification to unlock
                  </div>
                </div>
              )}

              {/* 2. SMS CONVERSATION */}
              {step === 'sms_convo' && (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                      <button onClick={() => setStep('lock_screen')} className="text-teal-400 text-xs flex items-center">
                        <ChevronLeft className="h-3.5 w-3.5" /> Back
                      </button>
                      <span className="text-xs font-bold">HDFC-ALERT</span>
                      <div className="w-8" />
                    </div>

                    {/* Chat Bubble */}
                    <div className="rounded-2xl border border-amber-500/40 bg-neutral-900 p-3 space-y-2.5">
                      <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                        <span className="text-amber-400 font-bold">CRITICAL NOTICE</span>
                        <span>8:42 PM</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        Dear Customer, your NetBanking account KYC is pending. Failure to update will result in permanent account blocking within 24 hrs. Update immediately at:
                      </p>
                      <button
                        onClick={handleTapLink}
                        className="w-full text-left rounded-xl bg-neutral-950 border border-teal-500/40 p-2.5 text-xs text-teal-300 font-mono flex items-center justify-between hover:bg-neutral-800 transition"
                      >
                        <span className="underline truncate">http://hdfc-kyc-update.me</span>
                        <ExternalLink className="h-3.5 w-3.5 text-teal-400 shrink-0 ml-1" />
                      </button>
                    </div>

                    {/* Recognition button */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleRecognizePhishing}
                        className="text-xs text-neutral-400 hover:text-teal-300 underline decoration-dotted font-mono"
                      >
                        Spot the fake domain (".me")? Report Phishing
                      </button>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-neutral-500 font-mono">
                    Tap the link to proceed with simulation
                  </div>
                </div>
              )}

              {/* 3. FAKE BANKING LOGIN */}
              {step === 'fake_login' && (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    {/* Fake Browser Bar */}
                    <div className="flex items-center gap-1.5 rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1 mb-3 text-[10px] font-mono text-neutral-300">
                      <Lock className="h-3 w-3 text-red-400" />
                      <span className="text-red-300 truncate">http://hdfc-kyc-update.me/login</span>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3 space-y-3">
                      <div className="border-b border-neutral-800 pb-2">
                        <h4 className="text-xs font-bold text-neutral-100">NetBanking Portal (KYC Desk)</h4>
                        <p className="text-[10px] text-red-400">Account status: Pending Re-verification</p>
                      </div>

                      <form onSubmit={handleLoginSubmit} className="space-y-2.5 text-xs">
                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-0.5">Customer ID / User ID</label>
                          <input
                            type="text"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-0.5">NetBanking Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 shadow-md shadow-teal-500/10"
                        >
                          Login to Verify KYC
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={handleRecognizePhishing}
                      className="text-[10px] text-neutral-500 hover:text-teal-400 underline font-mono"
                    >
                      Refuse to input password on non-bank URL
                    </button>
                  </div>
                </div>
              )}

              {/* 4. LOGIN LOADING (2 seconds) */}
              {step === 'login_loading' && (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                  <div className="text-xs font-bold text-neutral-200">Authenticating Customer Credentials...</div>
                  <p className="text-[10px] text-neutral-400">Establishing secure verification channel</p>
                </div>
              )}

              {/* 5. OTP INPUT */}
              {step === 'otp_screen' && (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1 mb-3 text-[10px] font-mono text-neutral-300">
                      <Lock className="h-3 w-3 text-red-400" />
                      <span className="text-red-300 truncate">http://hdfc-kyc-update.me/otp</span>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3 space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-100">Enter Six-Digit OTP</h4>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          Sent to registered mobile ending in ••4821
                        </p>
                      </div>

                      <form onSubmit={handleOtpSubmit} className="space-y-3">
                        <div className="flex justify-between gap-1">
                          {otpDigits.map((digit, i) => (
                            <input
                              key={i}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => {
                                const val = e.target.value.slice(-1);
                                const next = [...otpDigits];
                                next[i] = val;
                                setOtpDigits(next);
                              }}
                              className="h-9 w-8 rounded-lg border border-neutral-700 bg-neutral-950 text-center font-mono text-sm font-bold text-teal-400 focus:border-teal-400 focus:outline-none"
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setOtpDigits(['7', '3', '9', '2', '0', '4'])}
                          className="text-[10px] text-teal-400 underline font-mono block text-left"
                        >
                          Auto-fill synthetic OTP [739204]
                        </button>

                        <button
                          type="submit"
                          disabled={otpDigits.some((d) => !d)}
                          className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 disabled:opacity-40"
                        >
                          Submit OTP to Prevent Block
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={handleRecognizePhishing}
                      className="text-[10px] text-neutral-500 hover:text-teal-400 underline font-mono"
                    >
                      Real banks never ask for OTP via third-party link
                    </button>
                  </div>
                </div>
              )}

              {/* 6. OTP VERIFYING */}
              {step === 'otp_verifying' && (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                  <div className="text-xs font-bold text-neutral-200">Verifying KYC...</div>
                  <p className="text-[10px] text-neutral-400">Transmitting authentication token to server</p>
                </div>
              )}

              {/* 7. DEBIT NOTIFICATION INTERRUPT */}
              {step === 'debit_interrupted' && (
                <div className="flex h-full flex-col justify-between pt-4">
                  <div className="text-center text-xs text-neutral-400 font-mono">Verifying KYC...</div>

                  {/* High urgency interrupt notification */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="rounded-2xl border-2 border-red-500 bg-neutral-900 p-4 shadow-2xl space-y-2"
                  >
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                      <Bell className="h-4 w-4 animate-bounce" />
                      <span>BANK SMS NOTIFICATION</span>
                    </div>
                    <p className="text-sm font-extrabold text-neutral-100 font-mono">
                      ₹84,500.00 debited from A/C ending 4821.
                    </p>
                    <div className="text-[10px] text-neutral-400">
                      Transaction initiated via FastWire Merchant. If unauthorized, call fraud helpline.
                    </div>
                  </motion.div>

                  <div className="text-center text-[10px] font-mono text-red-400 animate-pulse">
                    Switching to official banking app...
                  </div>
                </div>
              )}

              {/* 8 & 9. SIMULATED BANKING APP WITH ANIMATED BALANCE DRAIN */}
              {step === 'bank_app' && (
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-teal-400" />
                        <span className="text-xs font-bold">Apex Bank Official</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">A/C ••4821</span>
                    </div>

                    {/* Balance Card */}
                    <div className="rounded-2xl border border-red-500/50 bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 text-center space-y-1">
                      <div className="text-[10px] font-mono text-neutral-400">Available Balance</div>
                      <div className="text-3xl font-extrabold font-mono text-red-500 tracking-tight transition-all">
                        ₹{bankBalance.toLocaleString('en-IN')}.00
                      </div>
                      <div className="text-[10px] font-mono text-red-400 font-bold">
                        {bankBalance === 0 ? 'FUNDS COMPLETELY DRAINED (₹0)' : 'Unauthorized outflow in progress...'}
                      </div>
                    </div>

                    {/* Transaction Log */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5 text-xs space-y-1.5">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Recent Transactions</div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-200">Unauthorized Wire Transfer</span>
                        <span className="font-mono font-bold text-red-400">-₹84,500.00</span>
                      </div>
                      <div className="text-[9px] font-mono text-neutral-500">Just now • Web Session Auth</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Re-run Scenario 1</span>
                    </button>
                    <button
                      onClick={() => onSelectScenario('scenario-2-sso')}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition"
                    >
                      <span>Proceed to Scenario 2: Corporate SSO</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* RECOGNITION OUTCOME (If user recognized earlier) */}
              {isRecognized && (
                <div className="absolute inset-0 z-40 bg-neutral-950 p-4 flex flex-col justify-between">
                  <div className="text-center space-y-3 pt-6">
                    <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-100">Signal Recognized!</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      You spotted the artificial 24h deadline and refused to visit the fake link. Real banks never ask you to update KYC via SMS links.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleReset}
                      className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                    >
                      Practice Again
                    </button>
                    <button
                      onClick={() => onSelectScenario('scenario-2-sso')}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition flex items-center justify-center gap-1"
                    >
                      <span>Next Scenario: Corporate SSO</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Home Indicator */}
            <div className="flex h-3 items-center justify-center bg-neutral-950 shrink-0">
              <div className="h-1 w-16 rounded-full bg-neutral-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center text-[11px] text-neutral-400 font-mono py-1 shrink-0">
        Interact with the phone to experience the complete attack progression
      </div>
    </div>
  );
};
