import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowRight, Bell, CreditCard, Lock, RotateCcw } from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';

export const SimulatedConsequenceModal: React.FC = () => {
  const { setStage, addEvent } = useSessionStore();

  const [balance, setBalance] = useState<number>(24500);
  const [isDraining, setIsDraining] = useState<boolean>(true);
  const [step, setStep] = useState<number>(1);

  // Animate balance drain down to 0
  useEffect(() => {
    soundEffects.playConsequenceEvent();

    // Step 1: Intercepted
    const t1 = setTimeout(() => {
      setStep(2);
      // Play cash register drawer open / transaction start sound
      soundEffects.playCashRegisterChime();

      // Tick down balance with audible cash drain sound
      let current = 24500;
      const initial = 24500;
      const interval = setInterval(() => {
        current = Math.max(0, current - 3500);
        setBalance(current);
        const fraction = current / initial;
        // Money decreasing sound effect (descending pitch + coin drops + cash flutter)
        soundEffects.playMoneyDecreasing(fraction);

        if (current <= 0) {
          clearInterval(interval);
          setIsDraining(false);
          setStep(3);
          soundEffects.playCashEmpty();
        }
      }, 150);
    }, 1200);

    return () => clearTimeout(t1);
  }, []);

  const handleProceedToReplay = () => {
    addEvent({
      actor: 'user',
      type: 'USER_PROCEEDED_TO_REPLAY',
      label: 'Proceeded to Attack Replay',
      description: 'Navigated to automated Attack Replay video breakdown.',
    });
    setStage('SCENARIO_1_REPLAY');
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 overflow-x-hidden select-none">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {/* Consequence Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full rounded-2xl border border-red-500/30 bg-neutral-900/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md"
        >
          {/* Top Pill */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/40 px-2.5 py-0.5 text-xs font-mono font-bold text-red-400">
              <AlertTriangle className="h-3 w-3" />
              <span>Simulated Consequence</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">100% Safe Sandbox</span>
          </div>

          {/* 3 Step Visual Progression Indicator */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div
              className={`rounded-xl border p-2 transition ${
                step >= 1 ? 'border-amber-500/50 bg-amber-950/20 text-amber-300' : 'border-neutral-800 text-neutral-500'
              }`}
            >
              <div className="text-[10px]">1. Session</div>
              <div className="font-bold text-[11px] sm:text-xs">Intercepted</div>
            </div>

            <div
              className={`rounded-xl border p-2 transition ${
                step >= 2 ? 'border-red-500/50 bg-red-950/30 text-red-300' : 'border-neutral-800 text-neutral-500'
              }`}
            >
              <div className="text-[10px]">2. Transfer</div>
              <div className="font-bold text-[11px] sm:text-xs">Automated</div>
            </div>

            <div
              className={`rounded-xl border p-2 transition ${
                step >= 3 ? 'border-red-500 bg-red-950/60 text-red-400 ring-1 ring-red-500' : 'border-neutral-800 text-neutral-500'
              }`}
            >
              <div className="text-[10px]">3. Balance</div>
              <div className="font-bold text-[11px] sm:text-xs">Drained (₹0)</div>
            </div>
          </div>

          {/* Balance Depletion Display */}
          <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-center">
            <div className="text-xs font-mono text-neutral-400">FlowPay Wallet Balance</div>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold font-mono text-red-400 transition-all">
              ₹{balance.toLocaleString('en-IN')}.00
            </div>
            <div className="mt-1 text-[11px] font-mono text-neutral-500">
              {balance === 0 ? 'Account empty • Unauthorized transfer completed' : 'Processing unauthorized transaction...'}
            </div>
          </div>

          {/* Simulated Bank Push Notification */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-3 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-xs"
          >
            <div className="flex items-center gap-2 text-red-300 font-bold">
              <Bell className="h-3.5 w-3.5 text-red-400" />
              <span>Bank SMS Alert</span>
            </div>
            <p className="mt-1 text-[11.5px] text-neutral-200">
              Alert: <strong className="text-red-400 font-mono">₹24,500 debited</strong> via FastTransfer to Merchant #9182.
            </p>
          </motion.div>

          {/* Primary Action Button */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-neutral-800">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              Understand why this happened in 3D Replay.
            </div>
            <button
              onClick={handleProceedToReplay}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/20 shrink-0"
            >
              <span>Replay Attack</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
