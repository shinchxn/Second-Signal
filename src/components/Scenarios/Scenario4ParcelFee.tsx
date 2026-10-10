import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Package,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Wifi,
  Battery,
  Bell,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { CardCheckoutForm } from '../Shared/CardCheckoutForm';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario4Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario4ParcelFee: React.FC<Scenario4Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[3]; // Scenario 4
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Steps:
  // 'sms' -> 'tracking_page' -> 'card_checkout' -> 'payment_success' -> 'card_notifications'
  const [step, setStep] = useState<
    'sms' | 'tracking_page' | 'card_checkout' | 'payment_success' | 'card_notifications'
  >('sms');

  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(0.9);
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      soundEffects.playMessageReceived();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Step 2: Tapping link opens simulated courier tracking page
  const handleTapTrackingLink = () => {
    soundEffects.playTapLink();
    setStep('tracking_page');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_4_OPENED_TRACKING',
      label: 'Opened Courier Tracking Link',
      description: 'Navigated to parcel customs redelivery page.',
    });
  };

  // Step 3: Click "Pay ₹15.00 Fee"
  const handleOpenCheckout = () => {
    soundEffects.playTapLink();
    setStep('card_checkout');
  };

  // Step 4: Submit synthetic card details -> displays "Payment Successful" -> wait 3s -> 3 notifications
  const handleCardSubmit = () => {
    soundEffects.playTapLink();
    setStep('payment_success');

    // Wait 3 seconds as required
    setTimeout(() => {
      setStep('card_notifications');
      recordScenarioCompletion('scenario-4-parcel', 'missed');

      // Notification 1: ₹15.00 charged by Courier
      setNotificationCount(1);
      soundEffects.playMessageReceived();

      // Notification 2: ₹1.00 test charge by Apple iTunes (after 1.2s)
      setTimeout(() => {
        setNotificationCount(2);
        soundEffects.playMessageReceived();

        // Notification 3: ₹1,45,000.00 charged by Electronics Bazaar. Limit Exceeded. (after 1.6s)
        setTimeout(() => {
          setNotificationCount(3);
          soundEffects.playConsequenceEvent();
        }, 1600);
      }, 1200);
    }, 3000);
  };

  const handleRecognize = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-4-parcel', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_4_RECOGNIZED',
      label: 'Recognized Parcel Smishing',
      description: 'Did not fall for micro-fee card harvesting trick.',
    });
  };

  const handleReset = () => {
    setStep('sms');
    setNotificationCount(0);
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
              <span className="font-mono text-[11px]">4:08</span>
              <div className="h-3.5 w-16 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="flex items-center gap-1 text-neutral-400">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* SCREEN CONTENT */}
            <div className="flex-1 min-h-0 overflow-y-auto relative p-3">
              {/* 1. SMS APP */}
              {step === 'sms' && (
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-bold text-neutral-100">SpeedPost-Express</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">4:05 PM</span>
                    </div>

                    {/* SMS Bubble */}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3 space-y-2.5">
                      <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                        <span className="text-teal-400 font-bold">SHIPMENT NOTICE</span>
                        <span>4:05 PM</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        Parcel #IN-88942-X is held at regional sorting facility. Customs fee of ₹15.00 remaining. Pay to dispatch.
                      </p>
                      <button
                        onClick={handleTapTrackingLink}
                        className="w-full text-left rounded-xl bg-neutral-950 border border-teal-500/40 p-2 text-xs text-teal-300 font-mono flex items-center justify-between hover:bg-neutral-800 transition"
                      >
                        <span className="underline truncate">fasttrack-post-customs.in/pay</span>
                        <ExternalLink className="h-3.5 w-3.5 text-teal-400 shrink-0 ml-1" />
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={handleRecognize}
                        className="text-[11px] text-neutral-400 hover:text-teal-300 underline font-mono"
                      >
                        Recognize micro-fee card trap? Ignore/Report
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Tap the tracking link to inspect courier page
                  </div>
                </div>
              )}

              {/* 2. SIMULATED COURIER TRACKING PAGE */}
              {step === 'tracking_page' && (
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1 text-[10px] font-mono text-neutral-300">
                      <span>🔒 fasttrack-post-customs.in/tracking</span>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3 space-y-2.5">
                      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                        <Package className="h-5 w-5 text-teal-400" />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-100">National Delivery Clearance</h4>
                          <span className="text-[10px] font-mono text-neutral-400">Waybill: IN-88942-X</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-2.5 text-xs text-amber-200 space-y-1">
                        <div className="font-bold">Dispatch Status: On Hold</div>
                        <p className="text-[11px] text-neutral-300">
                          Package requires nominal customs clearance duty of <strong className="text-amber-300 font-mono">₹15.00</strong> to release carrier transit lock.
                        </p>
                      </div>

                      <button
                        onClick={handleOpenCheckout}
                        className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 shadow-md shadow-teal-500/10"
                      >
                        Pay ₹15.00 Fee & Dispatch
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Click "Pay ₹15.00 Fee" to proceed to card checkout
                  </div>
                </div>
              )}

              {/* 3. SIMULATED CARD CHECKOUT */}
              {step === 'card_checkout' && (
                <div className="flex h-full flex-col justify-between">
                  <CardCheckoutForm
                    amountLabel="₹15.00"
                    merchantName="National Post Clearance Desk"
                    onSubmit={handleCardSubmit}
                  />
                </div>
              )}

              {/* 4. PAYMENT SUCCESSFUL (3-second wait) */}
              {step === 'payment_success' && (
                <div className="flex h-full flex-col items-center justify-center text-center p-4 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">Payment Successful.</h4>
                    <p className="text-xs text-neutral-400 font-mono mt-1">₹15.00 authorized</p>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Carrier dispatch updated. Please wait...
                  </p>
                  <div className="h-1.5 w-24 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 animate-[pulse_1s_infinite]" />
                  </div>
                </div>
              )}

              {/* 5. THREE SEQUENTIAL CARD NOTIFICATIONS */}
              {step === 'card_notifications' && (
                <div className="flex h-full flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-xs font-mono">
                      <span className="text-neutral-400">Card Alert Feed</span>
                      <span className="text-red-400 font-bold">CRITICAL ALERTS</span>
                    </div>

                    {/* Alert 1 */}
                    {notificationCount >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-xs space-y-0.5"
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                          <Bell className="h-3 w-3 text-neutral-400" />
                          <span>SMS Notification</span>
                        </div>
                        <div className="text-[11.5px] text-neutral-200">
                          Card Alert: <strong className="font-mono text-teal-300">₹15.00</strong> charged by Courier.
                        </div>
                      </motion.div>
                    )}

                    {/* Alert 2: Test Charge */}
                    {notificationCount >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-amber-500/40 bg-neutral-900 p-2.5 text-xs space-y-0.5"
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-mono font-bold">
                          <Bell className="h-3 w-3 text-amber-400" />
                          <span>Micro Test Charge</span>
                        </div>
                        <div className="text-[11.5px] text-neutral-200">
                          Card Alert: <strong className="font-mono text-amber-300">₹1.00</strong> test charge by Apple iTunes.
                        </div>
                      </motion.div>
                    )}

                    {/* Alert 3: HIGH VALUE LIMIT EXCEEDED (Most Prominent) */}
                    {notificationCount >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl border-2 border-red-500 bg-red-950/80 p-3.5 shadow-2xl space-y-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold">
                          <AlertTriangle className="h-4 w-4 animate-bounce" />
                          <span>HIGH VALUE FRAUD ALERT</span>
                        </div>
                        <div className="text-sm font-extrabold text-neutral-100 font-mono">
                          Card Alert: ₹1,45,000.00 charged by Electronics Bazaar. Limit Exceeded.
                        </div>
                        <p className="text-[10px] text-neutral-300 leading-snug">
                          The nominal ₹15.00 delivery fee was a harvesting trap to steal complete credit card credentials.
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Replay Scenario 4</span>
                    </button>
                    <button
                      onClick={() => onSelectScenario('scenario-5-marketplace')}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition"
                    >
                      <span>Next Scenario: Marketplace QR Trap</span>
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
                    <h3 className="text-base font-bold text-neutral-100">Micro-Fee Trap Avoided!</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Brilliant! Attackers use tiny charges like ₹15 to make victims feel safe entering card details. Once captured, they immediately test and drain the card balance.
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
                      onClick={() => onSelectScenario('scenario-5-marketplace')}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition flex items-center justify-center gap-1"
                    >
                      <span>Next Scenario: Marketplace QR</span>
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
        Attack Pattern: Low-value fees are used to harvest high-value credit cards
      </div>
    </div>
  );
};
