import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Server,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Lock,
  Unlock,
  Key,
  Database,
  Bot,
  DollarSign,
  Radio,
  Wifi,
  Send,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { soundEffects } from '../../utils/soundEffects';

interface Chapter {
  id: number;
  timeRange: string;
  title: string;
  shortLabel: string;
  simpleSubtitle: string;
  whatHappenedTitle: string;
  whatHappenedDesc: string;
  dataPacketLabel: string;
  serverState: 'idle' | 'routing' | 'harvesting' | 'siphoning';
}

const getChapters = (firstName: string): Chapter[] => [
  {
    id: 1,
    timeRange: '0:00 - 0:04',
    title: 'Urgency Trap Deployed',
    shortLabel: '1. The Urgent SMS',
    simpleSubtitle: 'Fake urgency creates panic to make you tap without thinking',
    whatHappenedTitle: 'Fake SMS Received',
    whatHappenedDesc: `A spoofed SMS creates a false 7:00 PM deadline. ${firstName} taps the suspicious verification link.`,
    dataPacketLabel: 'Outgoing Tap: Open Link',
    serverState: 'routing',
  },
  {
    id: 2,
    timeRange: '0:04 - 0:08',
    title: 'Silent Imposter Redirect',
    shortLabel: '2. The Imposter Link',
    simpleSubtitle: 'The link diverts your phone to the scammer’s computer, not your bank',
    whatHappenedTitle: 'Connecting to Imposter Server',
    whatHappenedDesc: 'The link bypasses the real bank and connects directly to the scammer’s rogue server, which sends back a cloned website.',
    dataPacketLabel: 'Downloading Fake Bank Website',
    serverState: 'routing',
  },
  {
    id: 3,
    timeRange: '0:08 - 0:12',
    title: 'Live PIN Interception',
    shortLabel: '3. PIN Copied Secretly',
    simpleSubtitle: 'Whatever you type on the fake page is captured instantly by the thief',
    whatHappenedTitle: 'Secret PIN Exfiltrated',
    whatHappenedDesc: `${firstName} types their secret banking PIN. The fake page sends it directly into the thief’s database in plain text.`,
    dataPacketLabel: 'Stolen PIN (4092) Exfiltrating',
    serverState: 'harvesting',
  },
  {
    id: 4,
    timeRange: '0:12 - 0:16',
    title: 'Automated Balance Drain',
    shortLabel: '4. Funds Siphoned',
    simpleSubtitle: 'While a fake loading circle plays, a robot script empties the bank account',
    whatHappenedTitle: '₹24,500 Siphoned via API',
    whatHappenedDesc: `While ${firstName} stares at a fake spinner, a script logs into their real bank account and transfers ₹24,500 in 1.4 seconds.`,
    dataPacketLabel: 'Siphoning ₹24,500 to Mule Account',
    serverState: 'siphoning',
  },
];

const TOTAL_DURATION = 16; // 16 seconds total replay

export const AttackReplay2D: React.FC = () => {
  const { character, setStage, addEvent } = useSessionStore();
  const firstName = character.name.split(' ')[0];
  const CHAPTERS: Chapter[] = useMemo(() => getChapters(firstName), [firstName]);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(performance.now());
  const previousChapterRef = useRef<number>(0);

  // Auto-play timer loop
  useEffect(() => {
    lastUpdateRef.current = performance.now();

    const tick = (now: number) => {
      if (isPlaying) {
        const delta = (now - lastUpdateRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return next;
        });
      }
      lastUpdateRef.current = now;
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Synchronize chapter based on currentTime
  useEffect(() => {
    const chapterDuration = TOTAL_DURATION / CHAPTERS.length;
    const rawIdx = Math.floor((Number.isFinite(currentTime) ? currentTime : 0) / chapterDuration);
    const chapterIdx = Math.max(0, Math.min(CHAPTERS.length - 1, isNaN(rawIdx) ? 0 : rawIdx));

    if (chapterIdx !== activeChapterIndex) {
      setActiveChapterIndex(chapterIdx);

      // Audio cue for chapter transition
      if (chapterIdx === 0 && previousChapterRef.current !== 0) soundEffects.playMessageReceived();
      else if (chapterIdx === 1) soundEffects.playTapLink();
      else if (chapterIdx === 2) soundEffects.playTapLink();
      else if (chapterIdx === 3) {
        soundEffects.playCashRegisterChime();
        soundEffects.playMoneyDecreasing(0.2);
      }

      previousChapterRef.current = chapterIdx;
    }
  }, [currentTime, activeChapterIndex]);

  const safeChapterIndex = Math.max(
    0,
    Math.min(CHAPTERS.length - 1, Number.isFinite(activeChapterIndex) ? activeChapterIndex : 0)
  );
  const currentChapter = CHAPTERS[safeChapterIndex] ?? CHAPTERS[0];
  const progressPercent = Math.min(100, Math.max(0, ((Number.isFinite(currentTime) ? currentTime : 0) / TOTAL_DURATION) * 100));

  const handleSeekToChapter = (index: number) => {
    soundEffects.playTapLink();
    const targetTime = index * (TOTAL_DURATION / CHAPTERS.length);
    setCurrentTime(targetTime);
    setActiveChapterIndex(index);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setActiveChapterIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    soundEffects.playTapLink();
    setCurrentTime(0);
    setActiveChapterIndex(0);
    setIsPlaying(true);
  };

  const handleProceedToDiagnosis = () => {
    addEvent({
      actor: 'user',
      type: 'USER_PROCEEDED_TO_DIAGNOSIS',
      label: 'Proceeded to Diagnosis',
      description: 'Navigated to behavioral coach diagnosis after watching attack replay.',
    });
    setStage('SCENARIO_1_DIAGNOSIS');
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const ms = Math.floor((secs - s) * 10);
    return `00:${s.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex-col justify-between overflow-hidden px-4 py-2 select-none bg-neutral-950">
      {/* Subtle cyber background */}
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-3xl" />

      {/* 1. TOP VIDEO PLAYER HEADER */}
      <div className="relative z-20 flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-1.5 backdrop-blur-md text-xs shrink-0 shadow-lg">
        {/* Title & Live Badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/50 px-2 py-0.5 font-mono text-[10px] text-red-400 font-bold">
            <span className={`h-2 w-2 rounded-full bg-red-500 ${isPlaying ? 'animate-pulse' : ''}`} />
            <span>ATTACK REPLAY • ANIMATED VISUALIZATION</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-[11px] text-neutral-300 font-medium">
            Watch how clicking the link secretly diverted funds without {firstName} noticing
          </span>
        </div>

        {/* Video Scrubber & Play Controls */}
        <div className="flex items-center gap-2">
          {/* Running Clock */}
          <div className="font-mono text-[11px] text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            <span className="text-teal-400 font-bold">{formatTime(currentTime)}</span>
            <span className="text-neutral-600"> / 00:16.0</span>
          </div>

          {/* Play/Pause */}
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1 rounded-lg border border-teal-500/40 bg-teal-950/40 px-2.5 py-1 text-xs font-mono font-bold text-teal-300 hover:bg-teal-900/50 transition active:scale-95"
          >
            {isPlaying ? <Pause className="h-3 w-3 text-amber-400" /> : <Play className="h-3 w-3 text-teal-400" />}
            <span>{isPlaying ? 'Pause' : currentTime >= TOTAL_DURATION ? 'Replay' : 'Play'}</span>
          </button>

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-1 rounded-lg border border-neutral-800 bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition"
            title="Restart Video"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : 1)}
            className="rounded border border-neutral-800 bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-300 hover:bg-neutral-700"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>

      {/* 2. TIMELINE CHAPTER STRIP */}
      <div className="relative z-20 w-full shrink-0 my-1">
        {/* 4 Chapter Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            const isCompleted = activeChapterIndex > idx;
            return (
              <button
                key={ch.id}
                onClick={() => handleSeekToChapter(idx)}
                className={`flex items-center justify-between rounded-lg border px-2.5 py-1 text-left transition ${
                  isActive
                    ? 'border-teal-500 bg-teal-950/40 text-teal-200 ring-1 ring-teal-500/50'
                    : isCompleted
                    ? 'border-neutral-700 bg-neutral-900/60 text-neutral-300'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-500 hover:border-neutral-700'
                }`}
              >
                <div className="truncate">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                    {ch.timeRange}
                  </div>
                  <div className="text-[11px] font-bold truncate">{ch.shortLabel}</div>
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. UNIFIED VISUAL STAGE: PHONE + LIVE BACKEND TRANSMISSION DIAGRAM */}
      <div className="relative z-10 flex flex-1 min-h-0 w-full items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/80 p-3 backdrop-blur-md shadow-2xl">
        <div className="relative flex h-full w-full max-w-5xl items-center justify-between gap-4">
          
          {/* A. LEFT HERO: PHONE DISPLAY (WHAT ARJUN EXPERIENCED) */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            {/* Stage Label above phone */}
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-teal-400">
              <Smartphone className="h-3.5 w-3.5" />
              <span>{firstName}'s Phone Screen</span>
            </div>

            {/* Phone Chassis */}
            <div className="relative w-[230px] h-[340px] rounded-[28px] border-4 border-neutral-700 bg-neutral-950 p-1.5 shadow-2xl ring-1 ring-neutral-600/30 overflow-hidden flex flex-col justify-between">
              {/* Phone Status Bar */}
              <div className="flex h-5 items-center justify-between px-3 text-[9px] font-mono text-neutral-400 shrink-0 border-b border-neutral-900">
                <span>8:42</span>
                <div className="h-2 w-12 rounded-full bg-neutral-900" />
                <span className="text-teal-400">4G LTE</span>
              </div>

              {/* Dynamic Screen Content Based on Video Chapter */}
              <div className="relative flex-1 min-h-0 overflow-hidden p-2 flex flex-col justify-between">
                {/* CHAPTER 1: SMS ARRIVAL & USER TAPPING LINK */}
                {safeChapterIndex === 0 && (
                  <motion.div
                    key="phone-ch1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-between h-full space-y-2 text-left"
                  >
                    <div className="text-[10px] font-bold text-neutral-400 border-b border-neutral-800 pb-1 flex justify-between">
                      <span>SMS • HDFC-Alert</span>
                      <span className="text-amber-400">8:42 PM</span>
                    </div>

                    <div className="rounded-xl border border-amber-500/40 bg-neutral-900 p-2 text-neutral-200 text-[10.5px] leading-snug relative">
                      <div className="text-[9px] text-amber-400 font-bold mb-1">
                        ⚠️ URGENT: Complete KYC before 7:00 PM
                      </div>
                      <p className="text-neutral-300">
                        Dear Customer, your bank access will be suspended unless verified:
                      </p>
                      <div className="mt-1.5 rounded bg-neutral-950 p-1 font-mono text-[9px] text-teal-300 truncate border border-neutral-800">
                        secure-kyc-desk.bank-auth.in/verify
                      </div>
                    </div>

                    {/* Simulated Finger Touch Cursor */}
                    <div className="relative pt-1 text-center">
                      <div className="inline-flex items-center gap-1 rounded-lg bg-teal-500 px-3 py-1.5 text-[10px] font-bold text-neutral-950 shadow-lg">
                        <span>Tapping Link...</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </div>
                      {/* Animated Finger Cursor */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="absolute bottom-1 right-6 h-6 w-6 rounded-full border-2 border-teal-400 bg-teal-400/30 flex items-center justify-center text-[10px]"
                      >
                        👆
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* CHAPTER 2: BROWSER LAUNCHED - FAKE KYC PORTAL */}
                {safeChapterIndex === 1 && (
                  <motion.div
                    key="phone-ch2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-between h-full space-y-1.5 text-left"
                  >
                    {/* Fake Browser URL Bar */}
                    <div className="rounded bg-neutral-900 px-1.5 py-0.5 text-[9px] font-mono text-red-400 border border-red-500/40 truncate flex items-center gap-1">
                      <span>🔒</span>
                      <span className="truncate">secure-kyc-desk.bank-auth.in</span>
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-2 space-y-1.5 text-[10px]">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-100">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>National Bank KYC Desk</span>
                      </div>
                      <div className="rounded bg-red-950/40 p-1 text-[9px] text-red-300 border border-red-500/30 font-semibold">
                        Deadline: Complete verification in 18 minutes!
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-neutral-400">Account:</span>
                        <div className="rounded bg-neutral-950 px-1.5 py-0.5 font-mono text-[9px] text-neutral-300 border border-neutral-800">
                          {character.name} (••4092)
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-[9px] font-mono text-amber-400">
                      ⚡ Cloned fake bank portal displayed
                    </div>
                  </motion.div>
                )}

                {/* CHAPTER 3: USER ENTERING PIN */}
                {safeChapterIndex === 2 && (
                  <motion.div
                    key="phone-ch3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-between h-full space-y-2 text-left"
                  >
                    <div className="text-[10px] font-bold text-neutral-200 border-b border-neutral-800 pb-1">
                      Authenticate Identity
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 space-y-2 text-center">
                      <span className="text-[9px] text-neutral-400">Enter Secret Banking PIN:</span>
                      <div className="flex justify-center gap-1.5 py-1">
                        <span className="h-3 w-3 rounded-full bg-teal-400 animate-pulse" />
                        <span className="h-3 w-3 rounded-full bg-teal-400 animate-pulse" />
                        <span className="h-3 w-3 rounded-full bg-teal-400 animate-pulse" />
                        <span className="h-3 w-3 rounded-full bg-teal-400 animate-pulse" />
                      </div>
                      <div className="rounded bg-red-600 px-2 py-1 text-[10px] font-bold text-white shadow-md">
                        Authorize Verification
                      </div>
                    </div>

                    {/* Finger tap animation on authorize */}
                    <div className="relative text-center">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="text-[10px] font-mono text-teal-300"
                      >
                        👆 Submitting PIN under rush...
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* CHAPTER 4: FAKE SPINNER + REAL BANK SMS ALERT */}
                {safeChapterIndex === 3 && (
                  <motion.div
                    key="phone-ch4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-between h-full space-y-2 text-left"
                  >
                    {/* Fake Loading Spinner */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2 text-center space-y-1">
                      <div className="h-4 w-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <div className="text-[9px] text-neutral-400">
                        Verifying credentials with server...
                      </div>
                    </div>

                    {/* Sudden incoming unauthorized transfer SMS */}
                    <motion.div
                      initial={{ scale: 0.9, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-xl border border-red-500 bg-red-950/80 p-2 shadow-lg space-y-1"
                    >
                      <div className="flex items-center justify-between text-[9px] font-bold text-red-400">
                        <span>REAL BANK SMS ALERT</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-[10px] font-bold text-neutral-100 leading-tight">
                        ₹24,500 debited from HDFC ••4092 via FastTransfer.
                      </p>
                      <div className="text-[9px] font-mono text-red-300 font-bold">New Balance: ₹0.00</div>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Phone Bar */}
              <div className="h-3 flex items-center justify-center shrink-0">
                <div className="h-1 w-14 rounded-full bg-neutral-600" />
              </div>
            </div>
          </div>

          {/* B. CENTER ANIMATED TRANSMISSION CONNECTOR */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-2 py-4">
            {/* Animated Data Packets Flowing Across */}
            <div className="relative w-full flex flex-col items-center">
              {/* Dynamic Connection Status Tag */}
              <motion.div
                key={`badge-${safeChapterIndex}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-3 rounded-full border px-3 py-1 font-mono text-[11px] font-bold shadow-md flex items-center gap-1.5 ${
                  safeChapterIndex === 0
                    ? 'border-amber-500/50 bg-amber-950/50 text-amber-300'
                    : safeChapterIndex === 1
                    ? 'border-cyan-500/50 bg-cyan-950/50 text-cyan-300'
                    : safeChapterIndex === 2
                    ? 'border-red-500/50 bg-red-950/50 text-red-300'
                    : 'border-red-500 bg-red-950 text-red-200 animate-pulse'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>{currentChapter?.dataPacketLabel || 'Data Transmission Active'}</span>
              </motion.div>

              {/* SVG Animated Transmission Path */}
              <div className="relative w-full h-16 flex items-center justify-center">
                <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
                  {/* Base track */}
                  <line
                    x1="5%"
                    y1="50%"
                    x2="95%"
                    y2="50%"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />

                  {/* Active glowing laser beam */}
                  <line
                    x1="5%"
                    y1="50%"
                    x2="95%"
                    y2="50%"
                    stroke={safeChapterIndex >= 2 ? '#ef4444' : '#14b8a6'}
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                </svg>

                {/* Animated Flying Data Packet */}
                <motion.div
                  animate={{
                    x: safeChapterIndex === 1 ? [100, -100] : [-100, 100],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold shadow-lg border ${
                    safeChapterIndex >= 2
                      ? 'bg-red-600 border-red-400 text-white'
                      : 'bg-teal-500 border-teal-300 text-neutral-950'
                  }`}
                >
                  {safeChapterIndex === 0 && '⚡ HTTP Link Click'}
                  {safeChapterIndex === 1 && '📥 Cloned Bank UI'}
                  {safeChapterIndex === 2 && '🚨 PIN: 4092 Exfiltrated'}
                  {safeChapterIndex === 3 && '💸 Drain ₹24,500'}
                </motion.div>
              </div>

              {/* Intuitive visual explanation box directly below laser stream */}
              <div className="mt-3 w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-950/90 p-2.5 text-center shadow-md">
                <div className="text-[12px] font-bold text-neutral-200">
                  {currentChapter?.whatHappenedTitle || 'Attack Replay'}
                </div>
                <p className="mt-1 text-[11px] text-neutral-400 leading-relaxed">
                  {currentChapter?.whatHappenedDesc || 'Observing live attack trajectory.'}
                </p>
              </div>
            </div>
          </div>

          {/* C. RIGHT HERO: WHAT REALLY HAPPENED BEHIND THE SCENES */}
          <div className="relative flex flex-col items-center justify-center shrink-0 space-y-3">
            {/* Real Bank (Unreached) vs Rogue Server (Compromised) */}
            
            {/* 1. REAL BANK (Safely Bypassed by the scammer) */}
            <div className="relative w-[210px] rounded-xl border border-neutral-800 bg-neutral-950/70 p-2 text-left opacity-40 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Legitimate Bank</span>
                </div>
                <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[9px] font-mono text-neutral-400">
                  Unreached
                </span>
              </div>
              <div className="mt-1 text-[10px] text-neutral-500">
                hdfcbank.com (Official domain never contacted)
              </div>
            </div>

            {/* 2. ROGUE SCAMMER SERVER (The real recipient) */}
            <div
              className={`relative w-[210px] rounded-xl border p-3 transition shadow-xl ${
                safeChapterIndex >= 2
                  ? 'border-red-500 bg-red-950/40 ring-1 ring-red-500/50'
                  : 'border-amber-500/60 bg-neutral-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                  <Server className="h-4 w-4 text-red-500" />
                  <span>Rogue Scammer Server</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              </div>
              
              <div className="mt-1 font-mono text-[9px] text-neutral-400 truncate">
                IP: 194.26.29.11 (Offshore)
              </div>

              {/* Dynamic Live Scammer Console */}
              <div className="mt-2 rounded-lg bg-black/90 p-2 font-mono text-[9.5px] border border-neutral-800 space-y-1">
                {safeChapterIndex === 0 && (
                  <div className="text-amber-400">
                    <div>[&gt;] SMS Gateway active</div>
                    <div className="text-neutral-500">Waiting for victims to tap...</div>
                  </div>
                )}
                {safeChapterIndex === 1 && (
                  <div className="text-teal-300">
                    <div>[+] Victim connected!</div>
                    <div className="text-neutral-400">Delivered fake bank UI template</div>
                  </div>
                )}
                {safeChapterIndex === 2 && (
                  <div className="text-red-400">
                    <div>[!] PIN CAPTURED: 4092</div>
                    <div>[!] Account: ••4092</div>
                    <div className="text-amber-300 font-bold">Raw credentials stored!</div>
                  </div>
                )}
                {safeChapterIndex === 3 && (
                  <div className="text-emerald-400 font-bold">
                    <div>[✓] Real API Login SUCCESS</div>
                    <div className="text-red-400">[-] Debited: ₹24,500.00</div>
                    <div className="text-neutral-300">[✓] Transferred to Mule #9182</div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-2 text-center text-[10px] font-bold text-red-400 font-mono">
                {safeChapterIndex === 0 && 'Awaiting Victim Click'}
                {safeChapterIndex === 1 && 'Serving Cloned Imposter Page'}
                {safeChapterIndex === 2 && 'Stealing Plaintext Credentials'}
                {safeChapterIndex === 3 && 'Money Transferred via Bot'}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. BOTTOM ACTION & TAKEAWAY BAR */}
      <div className="relative z-20 flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2 backdrop-blur-md text-xs shrink-0 mt-1 shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
          <span className="text-[12px] text-neutral-200">
            <strong>Simple Lesson:</strong> Real banks never send urgency countdown links in SMS. If an SMS creates an artificial rush, the rush itself is the scam alarm.
          </span>
        </div>

        <button
          onClick={handleProceedToDiagnosis}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/20 shrink-0"
        >
          <span>Behavioral Diagnosis</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
