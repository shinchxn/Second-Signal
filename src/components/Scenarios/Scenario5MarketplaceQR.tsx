import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  QrCode,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Wifi,
  Battery,
  ArrowRight,
  User,
  Coins,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { UpiKeypad } from '../Shared/UpiKeypad';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario5Props {
  onSelectScenario: (id: ScenarioId) => void;
}

export const Scenario5MarketplaceQR: React.FC<Scenario5Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[4]; // Scenario 5
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Steps:
  // 'chat' -> 'scanning' -> 'proceed_modal' -> 'upi_keypad' -> 'coin_animation' -> 'receipt_and_scammer_reply'
  const [step, setStep] = useState<
    | 'chat'
    | 'scanning'
    | 'proceed_modal'
    | 'upi_keypad'
    | 'coin_animation'
    | 'receipt_and_scammer_reply'
  >('chat');

  const [zoomScale, setZoomScale] = useState<number>(0.9);
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      soundEffects.playMessageReceived();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Step 2: Tapping the QR image starts simulated scanning interaction and opens UPI app
  const handleTapQr = () => {
    soundEffects.playTapLink();
    setStep('scanning');

    setTimeout(() => {
      setStep('proceed_modal');
      soundEffects.playTapLink();
    }, 1200);
  };

  // Step 4: Clicking Proceed opens UPI PIN keypad
  const handleProceedClick = () => {
    soundEffects.playTapLink();
    setStep('upi_keypad');
  };

  // Step 5: Submitting training PIN animates digital coin from user to scammer
  const handlePinSubmit = (_pin: string) => {
    soundEffects.playTapLink();
    setStep('coin_animation');
    soundEffects.playCashRegisterChime();

    // Step 6 & 7: Receipt + Scammer message
    setTimeout(() => {
      soundEffects.playConsequenceEvent();
      setStep('receipt_and_scammer_reply');
      recordScenarioCompletion('scenario-5-marketplace', 'missed');
      setTimeout(() => {
        soundEffects.playMessageReceived();
      }, 800);
    }, 2000);
  };

  const handleRecognize = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-5-marketplace', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_5_RECOGNIZED',
      label: 'Spotted QR Payment Reversal Scam',
      description: 'Understood that scanning a QR code is exclusively for sending funds, never receiving.',
    });
  };

  const handleReset = () => {
    setStep('chat');
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
              <span className="font-mono text-[11px]">5:20</span>
              <div className="h-3.5 w-16 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="flex items-center gap-1 text-neutral-400">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* SCREEN CONTENT */}
            <div className="flex-1 min-h-0 overflow-y-auto relative p-3">
              {/* 1. MARKETPLACE CHAT */}
              {step === 'chat' && (
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                          R
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-100">Rohit (Buyer)</div>
                          <span className="text-[10px] text-teal-400">Listing: Sony Mirrorless Camera</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">Online</span>
                    </div>

                    {/* Messages */}
                    <div className="space-y-2 text-xs">
                      <div className="rounded-xl bg-neutral-900 p-2.5 max-w-[85%] text-neutral-300">
                        Hello! I am ready to purchase your camera immediately at the listed price of ₹15,000.
                      </div>

                      <div className="rounded-2xl border border-amber-500/40 bg-neutral-900 p-3 space-y-2 max-w-[92%]">
                        <p className="text-neutral-200 text-xs font-semibold">
                          I am sending full advance payment. Scan this QR to receive.
                        </p>

                        {/* Interactive QR Code Image */}
                        <div
                          onClick={handleTapQr}
                          className="cursor-pointer rounded-xl bg-white p-3 text-center space-y-1 hover:scale-105 transition shadow-lg active:scale-95"
                        >
                          <div className="flex justify-center">
                            <QrCode className="h-24 w-24 text-black" />
                          </div>
                          <div className="text-[10px] font-mono font-bold text-black uppercase tracking-wider">
                            TAP TO SCAN & RECEIVE ₹15,000
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recognition */}
                    <div className="text-center pt-2">
                      <button
                        onClick={handleRecognize}
                        className="text-[11px] text-neutral-400 hover:text-teal-300 underline font-mono"
                      >
                        Know that scanning a QR NEVER receives money? Refuse QR
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Tap the QR code to simulate scanning interaction
                  </div>
                </div>
              )}

              {/* 2. SCANNING INTERACTION */}
              {step === 'scanning' && (
                <div className="flex h-full flex-col items-center justify-center text-center p-4 space-y-3">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-teal-400 bg-neutral-900">
                    <QrCode className="h-16 w-16 text-neutral-500" />
                    <div className="absolute inset-x-2 top-0 h-0.5 bg-teal-400 animate-[bounce_1.5s_infinite]" />
                  </div>
                  <div className="text-xs font-bold text-neutral-100">Scanning Payment QR...</div>
                  <p className="text-[10px] text-neutral-400 font-mono">Decoding merchant VPA parameters</p>
                </div>
              )}

              {/* 3. PROCEED MODAL */}
              {step === 'proceed_modal' && (
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <span className="text-xs font-bold text-neutral-100">SpeedPay QR Gateway</span>
                      <span className="text-[10px] font-mono text-neutral-500">NPCI Certified</span>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3.5 space-y-3">
                      <div className="text-center space-y-1">
                        <div className="text-[10px] font-mono text-neutral-400">Transaction Authorization</div>
                        <div className="text-xl font-extrabold font-mono text-amber-400">₹15,000.00</div>
                      </div>

                      <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-2 text-xs space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Direction:</span>
                          <span className="font-bold text-red-400 font-mono">OUTGOING PAYMENT</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Payee:</span>
                          <span className="font-mono text-neutral-200">Buyer-Account@upi</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-300">
                        Proceed with transaction?
                      </div>

                      <button
                        onClick={handleProceedClick}
                        className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 shadow-md shadow-teal-500/10"
                      >
                        Proceed to Authorize
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={handleRecognize}
                        className="text-[11px] text-neutral-400 hover:text-teal-300 underline font-mono"
                      >
                        Notice you are PAYING instead of receiving? Abort
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Click "Proceed" to open simulated UPI PIN keypad
                  </div>
                </div>
              )}

              {/* 4. UPI KEYPAD */}
              {step === 'upi_keypad' && (
                <UpiKeypad
                  title="ENTER UPI PIN"
                  recipientName="Buyer-Account@upi"
                  amount="₹15,000.00"
                  onSubmit={handlePinSubmit}
                  onCancel={() => setStep('proceed_modal')}
                />
              )}

              {/* 5. COIN ANIMATION (From User to Scammer) */}
              {step === 'coin_animation' && (
                <div className="flex h-full flex-col items-center justify-center p-4 space-y-6">
                  <div className="text-xs font-bold text-neutral-200 font-mono">
                    Authorizing Fund Transfer...
                  </div>

                  <div className="flex w-full items-center justify-between px-4">
                    {/* User Avatar */}
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md mx-auto">
                        <User className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 mt-1 block">Your Account</span>
                    </div>

                    {/* Flying Digital Coins Animation */}
                    <div className="relative flex-1 mx-2 flex justify-center">
                      <motion.div
                        initial={{ x: -40, opacity: 0, scale: 0.5 }}
                        animate={{ x: 40, opacity: [0, 1, 1, 0], scale: 1.2 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="flex items-center gap-1 text-amber-400 font-bold font-mono text-xs"
                      >
                        <Coins className="h-6 w-6 text-amber-400" />
                        <span>₹15,000</span>
                      </motion.div>
                    </div>

                    {/* Scammer Avatar */}
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md mx-auto">
                        <User className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-mono text-red-400 mt-1 block">Scammer</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 text-center">
                    Digital currency leaving your balance and routing to the scammer.
                  </p>
                </div>
              )}

              {/* 6 & 7. RECEIPT + SCAMMER'S TAUNT MESSAGE */}
              {step === 'receipt_and_scammer_reply' && (
                <div className="flex h-full flex-col justify-between space-y-3">
                  <div className="space-y-3">
                    {/* Receipt Card */}
                    <div className="rounded-2xl border border-red-500/50 bg-neutral-900 p-3.5 space-y-2 text-center">
                      <div className="text-[10px] font-mono text-red-400 uppercase font-bold">
                        Transaction Completed
                      </div>
                      <div className="text-xl font-black font-mono text-red-400">
                        You sent ₹15,000.
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        Sent to: Buyer-Account@upi • Ref: NPCI-992014
                      </div>
                    </div>

                    {/* Scammer's New Message in Marketplace Chat */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-amber-500/40 bg-neutral-900 p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span className="text-amber-400 font-bold">Rohit (Buyer)</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-snug font-medium">
                        "Thanks for the money! By the way, scan it again to get your refund."
                      </p>
                    </motion.div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-neutral-400">
                      <span className="font-bold text-neutral-200">The Reality:</span> Scammers use the "scan to receive" lie knowing many users conflate QR codes with incoming money.
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Replay Scenario 5</span>
                    </button>
                    <button
                      onClick={() => onSelectScenario('scenario-6-gig')}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition"
                    >
                      <span>Next Scenario: Job Task Deposit</span>
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
                    <h3 className="text-base font-bold text-neutral-100">QR Trap Caught!</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      You remembered that scanning a QR code is exclusively for SENDING money. Sellers should only provide their phone number or VPA to receive buyer payments.
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
                      onClick={() => onSelectScenario('scenario-6-gig')}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition flex items-center justify-center gap-1"
                    >
                      <span>Next Scenario: Gig Task Fraud</span>
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
        Key Fact: Scanning a QR code ALWAYS sends money out of your account
      </div>
    </div>
  );
};
