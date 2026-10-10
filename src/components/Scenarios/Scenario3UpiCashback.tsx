import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Wifi,
  Battery,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { UpiKeypad } from '../Shared/UpiKeypad';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario3Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario3UpiCashback: React.FC<Scenario3Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[2]; // Scenario 3
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Steps:
  // 'home' -> 'tx_details' -> 'upi_keypad' -> 'processing' -> 'consequence_stamp'
  const [step, setStep] = useState<
    'home' | 'tx_details' | 'upi_keypad' | 'processing' | 'consequence_stamp'
  >('home');

  const [balance, setBalance] = useState<number>(25000);
  const [zoomScale, setZoomScale] = useState<number>(0.9);
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      soundEffects.playMessageReceived();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Step 2: Tapping banner opens transaction details
  const handleTapBanner = () => {
    soundEffects.playTapLink();
    setStep('tx_details');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_3_OPENED_DETAILS',
      label: 'Opened Cashback Details',
      description: 'Inspected ₹5,000 reward claim prompt.',
    });
  };

  // Step 4: Tapping Claim opens UPI PIN keypad
  const handleClaim = () => {
    soundEffects.playTapLink();
    setStep('upi_keypad');
  };

  // Step 5: Submitting 6-digit PIN shows processing, then green checkmark followed by red stamp and balance reduction
  const handlePinSubmit = (_pin: string) => {
    soundEffects.playTapLink();
    setStep('processing');

    setTimeout(() => {
      soundEffects.playConsequenceEvent();
      setStep('consequence_stamp');
      recordScenarioCompletion('scenario-3-upi', 'missed');

      // Deduct balance by ₹5,000 with cash drain sound
      setTimeout(() => {
        soundEffects.playCashRegisterChime();
        let curr = 25000;
        const interval = setInterval(() => {
          curr = Math.max(20000, curr - 500);
          setBalance(curr);
          soundEffects.playMoneyDecreasing((curr - 20000) / 5000);
          if (curr <= 20000) {
            clearInterval(interval);
          }
        }, 100);
      }, 1200);
    }, 1800);
  };

  const handleRecognize = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-3-upi', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_3_RECOGNIZED',
      label: 'Spotted UPI Collect Trap',
      description: 'Remembered the golden rule: Receiving money NEVER requires entering a UPI PIN.',
    });
  };

  const handleReset = () => {
    setStep('home');
    setBalance(25000);
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
              <span className="font-mono text-[11px]">2:15</span>
              <div className="h-3.5 w-16 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="flex items-center gap-1 text-neutral-400">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* SCREEN CONTENT */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
              {/* 1. UPI APP HOME SCREEN */}
              {step === 'home' && (
                <div className="flex h-full flex-col justify-between p-3">
                  <div className="space-y-3">
                    {/* App Bar */}
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-teal-400" />
                        <span className="text-xs font-bold text-neutral-100">SpeedPay UPI</span>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400">NPCI Linked</span>
                    </div>

                    {/* Balance Banner */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400">Savings Account Balance</div>
                        <div className="text-lg font-bold font-mono text-teal-400">
                          ₹{balance.toLocaleString('en-IN')}.00
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">••9102</span>
                    </div>

                    {/* FLASHY CASHBACK REWARD BANNER */}
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      onClick={handleTapBanner}
                      className="cursor-pointer rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-950/80 via-neutral-900 to-amber-950/60 p-3.5 shadow-xl transition hover:border-amber-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-neutral-950 shadow-md">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono font-bold text-amber-300 tracking-wide">
                            REWARD UNLOCKED
                          </div>
                          <div className="text-sm font-extrabold text-neutral-100">
                            CASHBACK REWARD APPROVED! ₹5,000
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-[10px] text-neutral-300 leading-tight">
                        Tap here to deposit your approved ₹5,000 bonus directly to your bank account.
                      </p>
                      <div className="mt-2 text-right text-[10px] font-mono text-amber-400 font-bold">
                        Claim Now →
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Tap the cashback reward banner to inspect details
                  </div>
                </div>
              )}

              {/* 2. TRANSACTION DETAILS */}
              {step === 'tx_details' && (
                <div className="flex h-full flex-col justify-between p-3 bg-neutral-950">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <button onClick={() => setStep('home')} className="text-xs text-teal-400">
                        ← Back
                      </button>
                      <span className="text-xs font-bold text-neutral-100">Transaction Request</span>
                      <div className="w-8" />
                    </div>

                    {/* Details Box */}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
                      <div className="text-center space-y-1">
                        <div className="text-xs font-mono text-neutral-400">Amount Specified</div>
                        <div className="text-2xl font-extrabold font-mono text-amber-400">₹5,000.00</div>
                      </div>

                      <div className="border-t border-neutral-800 pt-3 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Direction:</span>
                          <span className="font-bold text-red-400 flex items-center gap-1 font-mono">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            COLLECT (Outgoing Debit)
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-neutral-400">Recipient / VPA:</span>
                          <span className="font-mono text-amber-300 text-[11px] font-bold">
                            merchant-cashback@bank
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-neutral-400">Bank Account:</span>
                          <span className="font-mono text-neutral-300">Apex Bank ••9102</span>
                        </div>
                      </div>

                      {/* Giant Claim Button */}
                      <button
                        onClick={handleClaim}
                        className="w-full rounded-xl bg-amber-400 py-3 text-xs font-extrabold text-neutral-950 hover:bg-amber-300 transition active:scale-95 shadow-lg shadow-amber-400/20"
                      >
                        Claim ₹5,000 Reward
                      </button>
                    </div>

                    {/* Defense Action */}
                    <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-2.5 text-center">
                      <button
                        onClick={handleRecognize}
                        className="text-[11px] font-bold text-teal-300 hover:text-teal-200 underline font-mono"
                      >
                        Notice it's an outgoing Collect Request? Decline & Report
                      </button>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-neutral-500 font-mono">
                    Recipient and payment direction are clearly displayed
                  </div>
                </div>
              )}

              {/* 3. SIMULATED UPI PIN KEYPAD */}
              {step === 'upi_keypad' && (
                <UpiKeypad
                  title="CONFIRM PAYMENT"
                  recipientName="merchant-cashback@bank"
                  amount="₹5,000.00"
                  onSubmit={handlePinSubmit}
                  onCancel={() => setStep('tx_details')}
                />
              )}

              {/* 4. PROCESSING INDICATOR */}
              {step === 'processing' && (
                <div className="flex h-full flex-col items-center justify-center text-center p-4 space-y-3">
                  <div className="h-10 w-10 animate-spin rounded-full border-3 border-teal-400 border-t-transparent" />
                  <div className="text-xs font-bold text-neutral-100">Processing Payment with NPCI...</div>
                  <p className="text-[10px] text-neutral-400 font-mono">Authorizing bank debit voucher</p>
                </div>
              )}

              {/* 5. SUCCESS CHECKMARK FOLLOWED BY RED STAMP */}
              {step === 'consequence_stamp' && (
                <div className="flex h-full flex-col justify-between p-3">
                  <div className="space-y-3 text-center pt-4">
                    {/* Green checkmark */}
                    <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="text-xs font-bold text-neutral-300 font-mono">Transaction Processed</div>

                    {/* RED STAMP: ₹5,000 PAID TO MERCHANT-SCAM */}
                    <motion.div
                      initial={{ scale: 2, opacity: 0, rotate: -15 }}
                      animate={{ scale: 1, opacity: 1, rotate: -4 }}
                      transition={{ type: 'spring', damping: 12 }}
                      className="rounded-2xl border-4 border-red-600 bg-red-950/80 p-3.5 shadow-2xl space-y-1 text-center"
                    >
                      <div className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-widest">
                        UNAUTHORIZED DEBIT
                      </div>
                      <div className="text-lg font-black text-red-500 font-mono">
                        ₹5,000 PAID TO MERCHANT-SCAM
                      </div>
                      <p className="text-[10px] text-neutral-300">
                        You entered your PIN to claim money, but UPI PINs ONLY authorize money leaving your account.
                      </p>
                    </motion.div>

                    {/* Updated Account Balance */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5 text-xs">
                      <div className="text-[10px] font-mono text-neutral-400">Remaining Balance</div>
                      <div className="text-xl font-bold font-mono text-red-400">
                        ₹{balance.toLocaleString('en-IN')}.00
                      </div>
                      <div className="text-[9.5px] font-mono text-red-400">Deduction: -₹5,000.00</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Replay Scenario 3</span>
                    </button>
                    <button
                      onClick={() => onSelectScenario('scenario-4-parcel')}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition"
                    >
                      <span>Next Scenario: Parcel Redelivery Fee</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* RECOGNITION POPUP */}
              {isRecognized && (
                <div className="absolute inset-0 z-40 bg-neutral-950 p-4 flex flex-col justify-between">
                  <div className="text-center space-y-3 pt-6">
                    <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-100">Trap Blocked Cold!</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      You remembered the golden rule of digital payments: <strong className="text-teal-300">You NEVER enter a UPI PIN to receive money.</strong> Entering a PIN always authorizes an outgoing debit.
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
                      onClick={() => onSelectScenario('scenario-4-parcel')}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition flex items-center justify-center gap-1"
                    >
                      <span>Next Scenario: Parcel Fee</span>
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
        Crucial Rule: A UPI PIN is NEVER required to receive money
      </div>
    </div>
  );
};
