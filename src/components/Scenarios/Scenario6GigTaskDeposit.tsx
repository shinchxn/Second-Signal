import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Laptop,
  Star,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Lock,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario6Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario6GigTaskDeposit: React.FC<Scenario6Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[5]; // Scenario 6
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Steps:
  // 'dashboard' -> 'combo_modal' -> 'transfer_processing' -> 'unlocked_balance' -> 'withdrawal_frozen_modal'
  const [step, setStep] = useState<
    'dashboard' | 'combo_modal' | 'transfer_processing' | 'unlocked_balance' | 'withdrawal_frozen_modal'
  >('dashboard');

  const [dashboardBalance, setDashboardBalance] = useState<number>(40000);
  const [requiredDeposit, setRequiredDeposit] = useState<number>(10000);
  const [zoomScale, setZoomScale] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return Math.min(0.65, Math.max(0.48, (window.innerWidth - 24) / 720));
    }
    return 0.88;
  });
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  // Step 1: Clicking "Submit Rating" opens Combo Task Triggered! modal
  const handleSubmitRating = () => {
    soundEffects.playTapLink();
    setStep('combo_modal');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_6_COMBO_TRIGGERED',
      label: 'Combo Task Triggered',
      description: 'Encountered fake advance-fee deposit demand.',
    });
  };

  // Step 3 & 4: Clicking "Transfer Funds" runs processing, animates balance toward ₹50,000, and triggers confetti
  const handleTransferFunds = () => {
    soundEffects.playTapLink();
    setStep('transfer_processing');

    setTimeout(() => {
      setStep('unlocked_balance');
      soundEffects.playCashRegisterChime();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#f59e0b', '#10b981'],
      });

      // Animate balance to ₹50,000
      let b = 40000;
      const interval = setInterval(() => {
        b += 1000;
        setDashboardBalance(b);
        soundEffects.playMoneyDecreasing(0.5);
        if (b >= 50000) {
          clearInterval(interval);
        }
      }, 80);
    }, 1500);
  };

  // Step 5, 6, 7 & 8: Clicking "Withdraw to Bank" triggers red warning modal:
  // "WITHDRAWAL FROZEN. ERROR 404: TAX CLEARANCE REQUIRED."
  // Increase required deposit from ₹10,000 to ₹35,000, and disable/lock withdrawal button.
  const handleWithdrawClick = () => {
    soundEffects.playConsequenceEvent();
    setRequiredDeposit(35000);
    setStep('withdrawal_frozen_modal');
    recordScenarioCompletion('scenario-6-gig', 'missed');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_6_WITHDRAWAL_FROZEN',
      label: 'Advance Fee Fraud Exposed',
      description: 'Platform demanded escalating ₹35,000 tax clearance buffer.',
    });
  };

  const handleRecognize = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-6-gig', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_6_RECOGNIZED',
      label: 'Spotted Advance-Fee Job Scam',
      description: 'Refused to deposit personal funds to unlock supposed job earnings.',
    });
  };

  const handleReset = () => {
    setStep('dashboard');
    setDashboardBalance(40000);
    setRequiredDeposit(10000);
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
          <div className="flex h-[470px] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-inner">
            {/* OS Window Header */}
            <div className="flex h-6 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-3 text-[11px] font-mono text-neutral-400 shrink-0">
              <span className="text-neutral-200 font-bold truncate">CloudWork Pro — Enterprise Task Portal</span>
              <span className="text-teal-400 shrink-0 ml-2">ACTIVE</span>
            </div>

            {/* Browser Address Bar */}
            <div className="flex h-8 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 shrink-0 text-xs">
              <div className="flex items-center gap-2 truncate mr-2">
                <div className="flex gap-1 mr-1 shrink-0">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="rounded bg-neutral-950 px-2 py-0.5 text-[10px] font-mono text-neutral-300 border border-neutral-800 truncate">
                  🔒 portal.cloudtask-opt.vip/dashboard
                </div>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline shrink-0">Tier 2 Optimizer</span>
            </div>

            {/* DASHBOARD VIEWPORT */}
            <div className="flex-1 min-h-0 overflow-y-auto bg-neutral-950 p-3 sm:p-4 space-y-3 relative">
              {/* Top Stats Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                  <div className="text-[10px] font-mono text-neutral-400">Total Accrued Balance</div>
                  <div className="text-xl font-bold font-mono text-teal-400 mt-1">
                    ₹{dashboardBalance.toLocaleString('en-IN')}.00
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono">SIMULATED / NON-WITHDRAWN</span>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                  <div className="text-[10px] font-mono text-neutral-400">Completed Ratings Today</div>
                  <div className="text-xl font-bold font-mono text-neutral-200 mt-1">
                    37 / 38 Tasks
                  </div>
                  <span className="text-[9px] text-amber-400 font-mono">1 Task to Payout</span>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-neutral-400">Wallet Action</div>
                  <button
                    onClick={handleWithdrawClick}
                    disabled={step === 'withdrawal_frozen_modal'}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      step === 'withdrawal_frozen_modal'
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {step === 'withdrawal_frozen_modal' && <Lock className="h-3 w-3 text-red-400" />}
                    <span>Withdraw to Bank</span>
                  </button>
                </div>
              </div>

              {/* Task Section */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-teal-400" />
                    <h3 className="text-xs font-bold text-neutral-100">Task 38: Product Rating Optimization</h3>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    Commission: ₹2,500.00
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-300 font-medium">Smart Noise-Canceling Headphones v2</span>
                    <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span className="text-[10px] text-neutral-400 ml-1">(5.0 Rating Selected)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitRating}
                    className="rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 shadow-md shadow-teal-500/10"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>

              {/* Recognition CTA */}
              <div className="text-center pt-2">
                <button
                  onClick={handleRecognize}
                  className="text-xs text-neutral-400 hover:text-teal-300 underline font-mono"
                >
                  Recognize advance-fee scam? Genuine employers never demand deposit buffers
                </button>
              </div>

              {/* 1. COMBO TASK TRIGGERED MODAL */}
              <AnimatePresence>
                {step === 'combo_modal' && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full max-w-md rounded-2xl border-2 border-amber-400 bg-neutral-900 p-5 shadow-2xl space-y-3 text-center"
                    >
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-0.5 text-xs font-mono font-bold text-amber-300">
                        ⚡ LUCKY TIER 2 SYSTEM EVENT
                      </div>

                      <h3 className="text-base font-extrabold text-neutral-100">
                        Combo Task Triggered!
                      </h3>

                      <p className="text-xs text-neutral-200 leading-relaxed font-semibold">
                        Deposit ₹10,000 buffer to unlock your ₹40,000 earnings.
                      </p>

                      <p className="text-[11px] text-neutral-400">
                        The platform claims this temporary security deposit will be immediately refunded along with your total ₹50,000 payout.
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={handleRecognize}
                          className="rounded-xl border border-neutral-700 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-700"
                        >
                          Decline & Exit (Scam)
                        </button>
                        <button
                          onClick={handleTransferFunds}
                          className="rounded-xl bg-amber-400 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition active:scale-95 shadow-md shadow-amber-400/20"
                        >
                          Transfer Funds (Simulate)
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* 2. TRANSFER PROCESSING MODAL */}
              {step === 'transfer_processing' && (
                <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-center space-y-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-teal-400 border-t-transparent mx-auto" />
                    <div className="text-xs font-bold text-neutral-100">Depositing ₹10,000 Buffer...</div>
                    <p className="text-[10px] text-neutral-400 font-mono">Crediting optimization contract liquidity</p>
                  </div>
                </div>
              )}

              {/* 3. WITHDRAWAL FROZEN MODAL (The Trap Springs) */}
              <AnimatePresence>
                {step === 'withdrawal_frozen_modal' && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full max-w-md rounded-2xl border-2 border-red-500 bg-neutral-900 p-5 shadow-2xl space-y-3 text-center"
                    >
                      <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40">
                        <AlertTriangle className="h-7 w-7" />
                      </div>

                      <div className="text-sm font-black text-red-400 font-mono tracking-tight">
                        WITHDRAWAL FROZEN. ERROR 404: TAX CLEARANCE REQUIRED.
                      </div>

                      <p className="text-xs text-neutral-200 leading-relaxed">
                        To unlock withdrawal of your ₹50,000 balance, you must deposit an additional{' '}
                        <strong className="text-red-400 font-mono">₹{requiredDeposit.toLocaleString('en-IN')}</strong> tax compliance fee within 2 hours.
                      </p>

                      <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-2.5 text-[11px] text-red-300 font-mono">
                        Escalating Demands: ₹10,000 → ₹35,000<br />
                        Withdrawal Button: PERMANENTLY LOCKED
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={handleReset}
                          className="flex-1 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                        >
                          Replay Scenario 6
                        </button>
                        <button
                          onClick={() => onSelectScenario('scenario-7-remote')}
                          className="flex-1 rounded-xl border border-neutral-800 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
                        >
                          Next: Remote Support Scam
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* RECOGNITION POPUP */}
              {isRecognized && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                  <div className="w-full max-w-md rounded-2xl border border-emerald-500/50 bg-neutral-900 p-5 shadow-2xl text-center space-y-3">
                    <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-100">Advance-Fee Scam Identified!</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Legitimate employers NEVER ask you to deposit money to withdraw earned income. High returns for trivial tasks coupled with mandatory buffer deposits are the hallmark of task-based advance-fee fraud.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleReset}
                        className="flex-1 rounded-xl border border-neutral-800 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
                      >
                        Replay Scenario
                      </button>
                      <button
                        onClick={() => onSelectScenario('scenario-7-remote')}
                        className="flex-1 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                      >
                        Next: Fake Remote Support
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
        All balances are fictional • Advance-fee scams lock "earnings" behind escalating deposits
      </div>
    </div>
  );
};
