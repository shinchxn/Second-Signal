import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  CreditCard,
  Globe,
  Settings,
  Shield,
  AlertTriangle,
  ChevronLeft,
  ExternalLink,
  Wifi,
  Battery,
  Lock,
  ArrowRight,
  Smartphone,
  Check,
  ZoomIn,
  ZoomOut,
  Vibrate,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';

export const SimulatedPhone: React.FC = () => {
  const {
    scenario1,
    digitalState,
    activePhoneApp,
    setActivePhoneApp,
    phoneMessageRead,
    setPhoneMessageRead,
    phoneBrowserUrl,
    setPhoneBrowserUrl,
    triggerSimulatedConsequence,
    setStage,
    setEncounter1Outcome,
    recordWeaknessOutcome,
    addEvent,
    setCharacterEmotion,
  } = useSessionStore();

  const [notificationBannerVisible, setNotificationBannerVisible] = useState(true);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isHapticShaking, setIsHapticShaking] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(0.9); // Default nicely zoomed out

  const browserContentRef = useRef<HTMLDivElement>(null);

  // Trigger haptic & arrival sound on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      soundEffects.playMessageReceived();
      setIsHapticShaking(true);
      setTimeout(() => setIsHapticShaking(false), 450);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenMessage = () => {
    soundEffects.playTapLink();
    setPhoneMessageRead(true);
    setNotificationBannerVisible(false);
    setActivePhoneApp('messages');
    addEvent({
      actor: 'user',
      type: 'USER_OPENED_MESSAGE',
      label: 'Opened Urgent SMS',
      description: 'Arjun opened the SMS alert.',
    });
  };

  const handleTapVerificationLink = () => {
    soundEffects.playTapLink();
    const fakeUrl = scenario1.victimMessage.fakeUrl || 'example.invalid/verify';
    setPhoneBrowserUrl(fakeUrl);
    setActivePhoneApp('browser');
    setCharacterEmotion('curious');
    addEvent({
      actor: 'user',
      type: 'USER_OPENED_SIMULATED_LINK',
      label: 'Tapped Verification Link',
      description: `Navigated to ${fakeUrl}`,
    });
  };

  const handleSimulatedSubmit = () => {
    soundEffects.playConsequenceEvent();
    setIsSubmittingForm(true);
    addEvent({
      actor: 'user',
      type: 'USER_SUBMITTED_CREDENTIALS',
      label: 'Submitted Credentials',
      description: 'Authorized verification under deadline pressure.',
    });

    setEncounter1Outcome('missed');
    recordWeaknessOutcome('urgency', 'missed');

    setTimeout(() => {
      triggerSimulatedConsequence();
      setIsSubmittingForm(false);
      setStage('SCENARIO_1_CONSEQUENCE');
    }, 800);
  };

  const handleReportPhishing = () => {
    soundEffects.playSignalRecognized();
    setEncounter1Outcome('recognized');
    recordWeaknessOutcome('urgency', 'recognized');
    addEvent({
      actor: 'user',
      type: 'USER_REPORTED_PHISHING',
      label: 'Reported Phishing',
      description: 'Spotted urgency trap and ignored link.',
    });
    setStage('SCENARIO_1_CONSEQUENCE');
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col items-center justify-between px-3 py-1 overflow-hidden select-none">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-15" />

      {/* TOP COMPACT STATUS & ZOOM BAR */}
      <div className="relative z-20 flex w-full max-w-xl items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-1 backdrop-blur-md text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Smartphone className="h-3.5 w-3.5 text-teal-400" />
          <span className="font-semibold text-neutral-200">Arjun's Phone</span>
          <span className="text-neutral-600">|</span>
          <span className="font-mono text-[11px] text-amber-400">Urgency Trigger Active</span>
        </div>

        {/* Zoom Out / Zoom In Controls */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="text-neutral-500">Zoom:</span>
          <button
            onClick={() => setZoomScale(Math.max(0.75, zoomScale - 0.05))}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="h-3 w-3" />
          </button>
          <span className="w-8 text-center text-teal-300 font-bold">{Math.round(zoomScale * 100)}%</span>
          <button
            onClick={() => setZoomScale(Math.min(1.05, zoomScale + 0.05))}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            title="Zoom In"
          >
            <ZoomIn className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* CENTERED ZOOMED-OUT PHONE CONTAINER */}
      <div className="relative z-10 flex flex-1 items-center justify-center min-h-0 w-full">
        <div
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
          className={`relative w-[300px] shrink-0 rounded-[38px] border-4 border-neutral-700 bg-neutral-950 p-2 shadow-2xl shadow-black/80 ring-1 ring-neutral-600/40 transition-transform duration-150 ${
            isHapticShaking ? 'animate-haptic-shake' : ''
          }`}
        >
          {/* Screen Chassis */}
          <div className="relative flex h-[490px] flex-col overflow-hidden rounded-[30px] bg-neutral-950 text-neutral-100 shadow-inner">
            {/* Status Bar */}
            <div className="relative z-30 flex h-7 items-center justify-between px-4 text-xs font-medium shrink-0 bg-neutral-950/80 backdrop-blur-sm">
              <span className="font-mono text-[11px]">8:42</span>
              {/* Dynamic Island */}
              <div className="h-3.5 w-16 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="flex items-center gap-1 text-neutral-400">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* Notification Banner (When on Home) */}
            <AnimatePresence>
              {notificationBannerVisible && activePhoneApp === 'home' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onClick={handleOpenMessage}
                  className="mx-2 mt-1 cursor-pointer rounded-xl border border-amber-500/40 bg-neutral-900/95 p-2 shadow-lg backdrop-blur-md transition hover:border-amber-400"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-neutral-100 truncate">
                          {scenario1.victimMessage.sender}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400">now</span>
                      </div>
                      <p className="mt-0.5 text-[10px] text-neutral-300 line-clamp-2 leading-tight">
                        {scenario1.victimMessage.body}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 text-right text-[9px] font-mono text-teal-400 font-bold">
                    Tap to open →
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* APP VIEWPORTS */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
              {/* 1. HOME SCREEN */}
              {activePhoneApp === 'home' && (
                <div className="flex h-full flex-col justify-between p-4">
                  {/* Lock Screen / Home Clock */}
                  <div className="mt-4 text-center">
                    <div className="text-3xl font-extralight tracking-tight text-neutral-100">8:42</div>
                    <div className="text-xs text-neutral-400">Tuesday, September 10</div>
                  </div>

                  {/* App Grid */}
                  <div className="grid grid-cols-4 gap-3 py-4">
                    {/* Messages */}
                    <button
                      onClick={handleOpenMessage}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md transition group-active:scale-90">
                        <MessageSquare className="h-5 w-5" />
                        {!phoneMessageRead && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold">
                            1
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-300">Messages</span>
                    </button>

                    {/* FlowPay */}
                    <button
                      onClick={() => setActivePhoneApp('payments')}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md transition group-active:scale-90">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] text-neutral-300">FlowPay</span>
                    </button>

                    {/* Browser */}
                    <button
                      onClick={() => {
                        if (!phoneBrowserUrl) setPhoneBrowserUrl('example.invalid/verify');
                        setActivePhoneApp('browser');
                      }}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md transition group-active:scale-90">
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] text-neutral-300">Browser</span>
                    </button>

                    {/* Settings */}
                    <button
                      onClick={() => setActivePhoneApp('settings')}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-800 text-neutral-300 shadow-md transition group-active:scale-90">
                        <Settings className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] text-neutral-300">Settings</span>
                    </button>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Swipe or tap app to navigate
                  </div>
                </div>
              )}

              {/* 2. MESSAGES APP */}
              {activePhoneApp === 'messages' && (
                <div className="flex h-full flex-col bg-neutral-950">
                  <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 shrink-0">
                    <button
                      onClick={() => setActivePhoneApp('home')}
                      className="flex items-center text-[11px] text-teal-400"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Back</span>
                    </button>
                    <span className="text-[11px] font-bold text-neutral-200">
                      {scenario1.victimMessage.sender}
                    </span>
                    <div className="w-8" />
                  </div>

                  <div className="flex-1 overflow-y-auto p-2.5 space-y-2 text-xs">
                    {/* SMS Bubble */}
                    <div className="rounded-xl border border-amber-500/30 bg-neutral-900 p-2.5 text-neutral-200 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span className="text-amber-400 font-bold">URGENT NOTIFICATION</span>
                        <span>8:42 PM</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-neutral-200">
                        {scenario1.victimMessage.body}
                      </p>

                      <div className="pt-1">
                        <button
                          onClick={handleTapVerificationLink}
                          className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-teal-500 px-3 py-2 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95"
                        >
                          <span>Open KYC Verification Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Safe Choice Alternative */}
                    <div className="pt-2 text-center">
                      <button
                        onClick={handleReportPhishing}
                        className="text-[10px] font-mono text-neutral-400 hover:text-teal-400 underline decoration-dotted"
                      >
                        Recognize as urgency trap? Ignore/Report
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. SIMULATED BROWSER (FAKE KYC PAGE) */}
              {activePhoneApp === 'browser' && (
                <div className="flex h-full flex-col bg-neutral-950">
                  {/* Address bar */}
                  <div className="flex items-center gap-1.5 border-b border-neutral-800 bg-neutral-900 px-2 py-1 shrink-0 text-xs font-mono">
                    <button onClick={() => setActivePhoneApp('messages')}>
                      <ChevronLeft className="h-3.5 w-3.5 text-teal-400" />
                    </button>
                    <div className="flex-1 truncate rounded bg-neutral-950 px-2 py-0.5 text-[10px] text-red-300 border border-neutral-800">
                      🔒 secure-kyc-desk.bank-auth.in/verify
                    </div>
                  </div>

                  {/* Browser content */}
                  <div ref={browserContentRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
                    <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-2 text-[10px] text-red-200">
                      ⚠️ Deadline: Immediate verification required before 7:00 PM.
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5 space-y-2">
                      <div className="text-[11px] font-bold text-neutral-200">National Bank Auth Portal</div>
                      <div className="space-y-1 text-[10px]">
                        <span className="text-neutral-400">Account Holder:</span>
                        <input
                          type="text"
                          readOnly
                          value="Arjun Mehta (••4092)"
                          className="w-full rounded bg-neutral-950 border border-neutral-800 p-1.5 text-neutral-300 font-mono text-[10px]"
                        />
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <span className="text-neutral-400">Enter Security PIN:</span>
                        <input
                          type="password"
                          readOnly
                          value="••••"
                          className="w-full rounded bg-neutral-950 border border-neutral-800 p-1.5 text-neutral-300 font-mono text-[10px]"
                        />
                      </div>

                      <button
                        onClick={handleSimulatedSubmit}
                        disabled={isSubmittingForm}
                        className="w-full rounded-lg bg-red-600 py-2 text-xs font-bold text-white hover:bg-red-500 transition active:scale-95 shadow-md"
                      >
                        {isSubmittingForm ? 'Authenticating...' : 'Authorize Account Verification'}
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <button
                        onClick={handleReportPhishing}
                        className="text-[10px] font-mono text-neutral-400 hover:text-teal-400 underline decoration-dotted"
                      >
                        Spot the fake domain? Abort to safety
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. FLOWPAY WALLET */}
              {activePhoneApp === 'payments' && (
                <div className="flex h-full flex-col bg-neutral-950">
                  <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 shrink-0">
                    <button
                      onClick={() => setActivePhoneApp('home')}
                      className="flex items-center text-[11px] text-teal-400"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Home</span>
                    </button>
                    <span className="text-[11px] font-bold text-neutral-200">FlowPay Wallet</span>
                    <div className="w-8" />
                  </div>

                  <div className="flex-1 p-3 space-y-3">
                    <div className="rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-3 text-center">
                      <div className="text-[10px] font-mono text-neutral-400">Available Balance</div>
                      <div className="text-xl font-bold font-mono text-teal-400">₹24,500.00</div>
                      <div className="text-[9px] text-neutral-500">Linked: HDFC ••4092</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SETTINGS */}
              {activePhoneApp === 'settings' && (
                <div className="flex h-full flex-col bg-neutral-950">
                  <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 shrink-0">
                    <button
                      onClick={() => setActivePhoneApp('home')}
                      className="flex items-center text-[11px] text-teal-400"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Home</span>
                    </button>
                    <span className="text-[11px] font-bold text-neutral-200">Settings</span>
                    <div className="w-8" />
                  </div>
                  <div className="p-3 text-xs text-neutral-400 space-y-2">
                    <div>Device: Arjun's Phone</div>
                    <div>OS: SimOS 14.2</div>
                    <div>Sessions: 1 Active</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Home Indicator */}
            <div className="flex h-4 items-center justify-center bg-neutral-950 shrink-0">
              <button
                onClick={() => setActivePhoneApp('home')}
                className="h-1 w-20 rounded-full bg-neutral-600 hover:bg-neutral-400 transition"
                title="Home Bar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION HINT */}
      <div className="relative z-20 text-center text-[11px] text-neutral-400 font-mono py-1 shrink-0">
        Interact with the phone directly • Tap notifications or apps to proceed
      </div>
    </div>
  );
};
