import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MessageSquare,
  Send,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ExternalLink,
  Bot,
  User,
  CheckCircle2,
  Laptop,
  Smartphone,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';
import { ScenarioControlBar } from '../Shared/ScenarioControlBar';
import { DockedPhoneWidget } from '../Shared/DockedPhoneWidget';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId } from '../../types';

interface Scenario8Props {
  onSelectScenario: (id: ScenarioId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const Scenario8RefundHelpline: React.FC<Scenario8Props> = ({ onSelectScenario }) => {
  const currentScenario = ALL_SCENARIOS[7]; // Scenario 8
  const { recordScenarioCompletion, addEvent } = useSessionStore();

  // Steps:
  // 'search_page' -> 'search_results' -> 'helpdesk_chat' -> 'card_submitted' -> 'incident_consequence'
  const [step, setStep] = useState<
    'search_page' | 'search_results' | 'helpdesk_chat' | 'card_submitted' | 'incident_consequence'
  >('search_page');

  const [searchQuery, setSearchQuery] = useState('airline ticket refund');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatInputDisabled, setChatInputDisabled] = useState(false);

  // Phone balance shared state: starts at ₹50,000. Instead of +₹12,000, drops by ₹45,000 to ₹5,000!
  const [phoneBalance, setPhoneBalance] = useState<number>(50000);
  const [phoneNotification, setPhoneNotification] = useState<string>('');
  const [zoomScale, setZoomScale] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return Math.min(0.65, Math.max(0.48, (window.innerWidth - 24) / 720));
    }
    return 0.88;
  });
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);
  const [activeDeviceView, setActiveDeviceView] = useState<'workstation' | 'phone'>('workstation');

  // Step 1 & 2: Search -> show results with Sponsored ad
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playTapLink();
    setStep('search_results');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_8_SEARCHED',
      label: 'Searched Airline Ticket Refund',
      description: 'Browsed simulated search engine results.',
    });
  };

  // Step 3: Clicking the sponsored result opens helpdesk page with live chat
  const handleOpenSponsoredChat = () => {
    soundEffects.playTapLink();
    setStep('helpdesk_chat');
    setChatMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Welcome to 24/7 Global Air Express Priority Support. How can our automated desk assist you today?',
      },
    ]);
  };

  // Step 4 & 5: Learner sends "I need a refund" -> Bot replies asking for Debit Card number
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatInputDisabled) return;

    soundEffects.playTapLink();
    const userText = chatInput;
    setChatMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: userText },
    ]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      soundEffects.playMessageReceived();
      setChatMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'I can process your ₹12,000 refund immediately. Please provide your Debit Card number to route the funds.',
        },
      ]);
    }, 1200);
  };

  // Quick suggestion button click
  const handleSendRefundPrompt = () => {
    setChatInput('I need a refund');
  };

  // Step 6, 7, 8, 9 & 10: Submit synthetic training card number
  const handleCardNumberSubmit = () => {
    soundEffects.playTapLink();
    const cardMasked = '4532 •••• •••• 9102';
    setChatMessages((prev) => [
      ...prev,
      { id: `user-card`, sender: 'user', text: `Debit Card: ${cardMasked}` },
    ]);
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      soundEffects.playTapLink();
      setChatMessages((prev) => [
        ...prev,
        {
          id: `bot-processing`,
          sender: 'bot',
          text: 'Thank you. Processing your ₹12,000 refund now.',
        },
      ]);

      // Step 7 & 8: Docked phone lights up with banking widget update.
      // Instead of receiving ₹12,000, mock balance drops by ₹45,000!
      setTimeout(() => {
        soundEffects.playConsequenceEvent();
        soundEffects.playCashRegisterChime();

        // Animate balance drop from 50,000 to 5,000
        let curr = 50000;
        const interval = setInterval(() => {
          curr = Math.max(5000, curr - 4500);
          setPhoneBalance(curr);
          soundEffects.playMoneyDecreasing((curr - 5000) / 45000);
          if (curr <= 5000) {
            clearInterval(interval);
            soundEffects.playCashEmpty();
          }
        }, 100);

        setPhoneNotification('⚠️ ₹45,000.00 debited by Merchant "AirTravel-Refund-Desk"');

        // Step 9 & 10: Chatbot replies: "Refund failed. Please provide a different credit card to try again."
        // Disable chat input and show incident state
        setTimeout(() => {
          soundEffects.playMessageReceived();
          setChatMessages((prev) => [
            ...prev,
            {
              id: `bot-fail`,
              sender: 'bot',
              text: 'Refund failed. Please provide a different credit card to try again.',
            },
          ]);
          setChatInputDisabled(true);
          setStep('incident_consequence');
          recordScenarioCompletion('scenario-8-refund', 'missed');
        }, 2200);
      }, 1500);
    }, 1200);
  };

  const handleRecognize = () => {
    soundEffects.playSignalRecognized();
    setIsRecognized(true);
    recordScenarioCompletion('scenario-8-refund', 'recognized');
    addEvent({
      actor: 'user',
      type: 'SCENARIO_8_RECOGNIZED',
      label: 'Spotted Sponsored Ad Refund Phishing',
      description: 'Understood refunds never require providing debit card details via unverified chat.',
    });
  };

  const handleReset = () => {
    setStep('search_page');
    setPhoneBalance(50000);
    setPhoneNotification('');
    setChatMessages([]);
    setChatInputDisabled(false);
    setIsRecognized(null);
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
          <span>Phone (Bank)</span>
          {phoneNotification && (
            <span className="flex h-2 w-2 rounded-full bg-red-400 animate-ping ml-1" />
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
              {/* OS Menu Header */}
              <div className="flex h-6 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-3 text-[11px] font-mono text-neutral-400 shrink-0">
                <span className="text-neutral-200 font-bold">SearchGo Browser</span>
                <span className="text-teal-400">Web Search Active</span>
              </div>

              {/* Browser Address Bar */}
              <div className="flex h-8 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 shrink-0 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 mr-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="rounded bg-neutral-950 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 border border-neutral-800">
                    {step === 'helpdesk_chat' || step === 'incident_consequence'
                      ? '🔒 air-helpdesk-priority-refunds.com/live-chat'
                      : '🔍 searchgo.org/search?q=airline+ticket+refund'}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Dual-Device Sync</span>
              </div>

              {/* LAPTOP MAIN CONTENT VIEWPORT */}
              <div className="flex-1 min-h-0 overflow-y-auto bg-neutral-950 p-4">
                {/* 1. SEARCH INPUT SCREEN */}
                {step === 'search_page' && (
                  <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                    <div className="text-3xl font-black tracking-tight text-neutral-100 font-heading">
                      Search<span className="text-teal-400">Go</span>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="w-full max-w-md space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full rounded-2xl border border-neutral-700 bg-neutral-900 py-2.5 pl-10 pr-4 text-xs text-neutral-100 shadow-inner focus:border-teal-400 focus:outline-none"
                        />
                        <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                      </div>

                      <button
                        type="submit"
                        className="rounded-xl bg-teal-500 px-5 py-2 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
                      >
                        Search Online Refunds
                      </button>
                    </form>
                  </div>
                )}

                {/* 2. SEARCH RESULTS (WITH SPONSORED AD) */}
                {step === 'search_results' && (
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-400 font-mono">
                      Results for <span className="text-neutral-200">"airline ticket refund"</span>:
                    </div>

                    {/* THE SPONSORED TRAP AD */}
                    <div
                      onClick={handleOpenSponsoredChat}
                      className="cursor-pointer rounded-2xl border-2 border-amber-500/50 bg-neutral-900 p-3.5 shadow-xl hover:border-amber-400 transition space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-400/20 border border-amber-400/40 px-1.5 py-0.2 text-[9px] font-mono font-bold text-amber-300">
                          Sponsored
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          air-helpdesk-priority-refunds.com
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-teal-300 hover:underline">
                        24/7 Airline Ticket Refund Helpline — Instant Bank Disbursement
                      </h3>

                      <p className="text-[11px] text-neutral-300 leading-snug">
                        Immediate assistance for canceled flights and ticket refunds. Connect with an official settlement agent via live chat now.
                      </p>
                    </div>

                    {/* Organic Result (Safe) */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3 space-y-1 opacity-70">
                      <div className="text-[10px] font-mono text-neutral-500">airline.com/customer-support</div>
                      <div className="text-xs font-semibold text-neutral-300">
                        Official Airline Portal: Request a Refund or Review Policy
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Log into your official frequent flyer account to manage existing reservations.
                      </p>
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={handleRecognize}
                        className="text-[11px] text-neutral-400 hover:text-teal-300 underline font-mono"
                      >
                        Spot the imposter sponsored ad? Recognize Phishing
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. HELPDESK PAGE WITH LIVE CHAT */}
                {(step === 'helpdesk_chat' || step === 'incident_consequence') && (
                  <div className="flex h-full flex-col justify-between">
                    {/* Chat Messages Log */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[10px] font-mono">
                        <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                          <Bot className="h-4 w-4" />
                          <span>Air Express Automated Settlement Bot</span>
                        </div>
                        <span className="text-emerald-400">AGENT CONNECTED</span>
                      </div>

                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-2 ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-[10px] font-bold">
                              AI
                            </div>
                          )}
                          <div
                            className={`rounded-2xl p-2.5 max-w-[80%] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-teal-500 text-neutral-950 font-medium'
                                : 'bg-neutral-900 border border-neutral-800 text-neutral-200'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {isBotTyping && (
                        <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-mono">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce" />
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce delay-100" />
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce delay-200" />
                          <span>Support agent typing...</span>
                        </div>
                      )}

                      {/* Card Input Prompt Button when bot requests Debit Card */}
                      {chatMessages.some((m) => m.text.includes('Debit Card number')) &&
                        !chatMessages.some((m) => m.text.includes('4532')) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-amber-500/40 bg-neutral-900/90 p-3 space-y-2"
                          >
                            <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                              <CreditCard className="h-3.5 w-3.5 text-amber-400" />
                              <span>Provide Debit Card to Route ₹12,000 Refund</span>
                            </div>
                            <button
                              onClick={handleCardNumberSubmit}
                              className="w-full rounded-lg bg-teal-500 py-2 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 shadow-md shadow-teal-500/10"
                            >
                              Submit Synthetic Card [4532 •••• •••• 9102]
                            </button>
                          </motion.div>
                        )}

                      {/* Final Incident State Display */}
                      {step === 'incident_consequence' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="rounded-2xl border-2 border-red-500 bg-red-950/40 p-3.5 shadow-xl space-y-1.5 text-center"
                        >
                          <div className="flex items-center justify-center gap-1.5 text-red-400 font-bold text-xs font-mono">
                            <AlertTriangle className="h-4 w-4" />
                            <span>FINAL INCIDENT STATE // REVERSE THEFT</span>
                          </div>
                          <p className="text-xs text-neutral-200">
                            Instead of routing a ₹12,000 refund, the scammer extracted a{' '}
                            <strong className="text-red-400 font-mono">₹45,000 debit</strong> from your bank account!
                          </p>
                          <div className="text-[10px] text-neutral-400 font-mono">
                            Notice how the phone widget on the right displays the actual bank deduction.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Chat Input Bar */}
                    <div className="pt-2 border-t border-neutral-800 space-y-2">
                      {!chatMessages.some((m) => m.text.includes('Debit Card')) && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleSendRefundPrompt}
                            className="rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1 text-[10px] text-teal-300 hover:bg-neutral-800"
                          >
                            Click to fill: "I need a refund"
                          </button>
                        </div>
                      )}

                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={chatInputDisabled}
                          placeholder={
                            chatInputDisabled
                              ? 'Chat session terminated by server'
                              : 'Type message...'
                          }
                          className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-neutral-100 focus:border-teal-400 focus:outline-none disabled:opacity-40"
                        />
                        <button
                          type="submit"
                          disabled={!chatInput.trim() || chatInputDisabled}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-neutral-950 hover:bg-teal-400 transition disabled:opacity-30"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DOCKED PHONE COMPANION (Synchronized Banking Widget) */}
          <div className={`${activeDeviceView === 'phone' ? 'block' : 'hidden lg:block'} shrink-0`}>
            <DockedPhoneWidget
              time="3:42"
              bankingWidget={{
                balance: phoneBalance,
                initialBalance: 50000,
                lastTransaction: phoneNotification || undefined,
              }}
            />
          </div>
        </div>
      </div>

      {/* RECOGNITION POPUP */}
      {isRecognized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/50 bg-neutral-900 p-5 shadow-2xl text-center space-y-3">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">Sponsored Ad Scam Caught!</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Superb recognition! Attackers pay for top sponsored search ads to trap travelers searching for refunds. Official airlines process refunds directly through their official portals and never demand full card numbers over unauthenticated live chats.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border border-neutral-800 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
              >
                Replay Scenario
              </button>
              <button
                onClick={() => onSelectScenario('scenario-1-kyc')}
                className="flex-1 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 hover:bg-teal-400 transition"
              >
                Back to Scenario 1
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="relative z-20 text-center text-[11px] text-neutral-400 font-mono py-1 shrink-0">
        Cross-device simulation: Providing card details in live chat causes real-time bank deduction on phone
      </div>
    </div>
  );
};
