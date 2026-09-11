import { create } from 'zustand';
import {
  AppStage,
  CharacterProfile,
  DigitalState,
  Scenario,
  SimulationEvent,
  WeaknessScore,
  WeaknessTag,
} from '../types';
import { fallbackScenario1, fallbackScenario2 } from '../scenarios/fallbackScenarios';
import { defaultVoiceProvider } from '../voice/voiceProvider';
import { soundEffects } from '../utils/soundEffects';

export const NORMAL_PERSONAS: Record<'librarian' | 'barista', CharacterProfile> = {
  librarian: {
    id: 'librarian',
    name: 'Clara Morales',
    age: 31,
    role: 'Community Librarian',
    workplace: 'Oakridge Public Library',
    workTerminal: 'Oakridge Library Staff Terminal',
    workEmail: 'clara.m@oakridgelibrary.org',
    context: 'Unwinding on the sofa after shelving books, helping patrons, and hosting the afternoon reading hour.',
    emotion: 'neutral',
  },
  barista: {
    id: 'barista',
    name: 'Leo Ramirez',
    age: 27,
    role: 'Coffee Shop Barista & Shift Lead',
    workplace: 'Roast & Bean Café',
    workTerminal: 'Roast & Bean Front Terminal',
    workEmail: 'leo.r@roastandbean.net',
    context: 'Taking a breather after a hectic morning espresso rush and restocking beans at the corner coffee shop.',
    emotion: 'neutral',
  },
};

interface SessionState {
  // Navigation & Flow
  stage: AppStage;
  setStage: (stage: AppStage) => void;

  // Character
  character: CharacterProfile;
  selectPersona: (personaKey: 'librarian' | 'barista') => void;
  setCharacterEmotion: (emotion: CharacterProfile['emotion']) => void;

  // Scenarios
  scenario1: Scenario;
  scenario2: Scenario;
  setScenario1: (s: Scenario) => void;
  setScenario2: (s: Scenario) => void;

  // Digital Life State
  digitalState: DigitalState;
  resetDigitalState: () => void;
  triggerSimulatedConsequence: () => void;

  // Event Log (powers Attack Replay)
  events: SimulationEvent[];
  addEvent: (event: Omit<SimulationEvent, 'id' | 'timestamp'>) => void;
  clearEvents: () => void;

  // Adaptive Weakness Engine
  weaknessScores: Record<WeaknessTag, WeaknessScore>;
  recordWeaknessOutcome: (tag: WeaknessTag, outcome: 'missed' | 'recognized') => void;

  // User decision outcomes in the scenarios
  encounter1Outcome: 'missed' | 'recognized' | null;
  encounter2Outcome: 'missed' | 'recognized' | null;
  setEncounter1Outcome: (outcome: 'missed' | 'recognized') => void;
  setEncounter2Outcome: (outcome: 'missed' | 'recognized') => void;

  // Phone Interaction State
  activePhoneApp: 'home' | 'messages' | 'payments' | 'browser' | 'settings';
  setActivePhoneApp: (app: 'home' | 'messages' | 'payments' | 'browser' | 'settings') => void;
  phoneMessageRead: boolean;
  setPhoneMessageRead: (read: boolean) => void;
  phoneInspectingSender: boolean;
  setPhoneInspectingSender: (inspecting: boolean) => void;
  phoneBrowserUrl: string;
  setPhoneBrowserUrl: (url: string) => void;

  // Laptop Interaction State
  activeLaptopApp: 'desktop' | 'mail' | 'browser' | 'it_portal';
  setActiveLaptopApp: (app: 'desktop' | 'mail' | 'browser' | 'it_portal') => void;
  laptopEmailRead: boolean;
  setLaptopEmailRead: (read: boolean) => void;
  laptopInspectingHeaders: boolean;
  setLaptopInspectingHeaders: (inspecting: boolean) => void;
  laptopBrowserUrl: string;
  setLaptopBrowserUrl: (url: string) => void;

  // Attack Replay Active Node
  selectedReplayNodeId: string | null;
  setSelectedReplayNodeId: (id: string | null) => void;

  // Audio / Voice / Sound Effects
  isVoiceMuted: boolean;
  toggleVoiceMute: () => void;
  speakCoachText: (text: string) => void;
  isSoundMuted: boolean;
  toggleSoundMute: () => void;

  // Reset Everything
  resetSimulation: () => void;
}

const initialDigitalState: DigitalState = {
  accountStatus: 'secure',
  personalInfoStatus: 'protected',
  deviceStatus: 'trusted',
  paymentStatus: 'normal',
  activeSessions: 1,
  recentTransactions: [
    {
      id: 'tx-01',
      title: 'Campus Cafe',
      amount: '₹140',
      time: 'Today, 4:15 PM',
      status: 'completed',
      simulated: false,
    },
    {
      id: 'tx-02',
      title: 'Metro Rail Travel',
      amount: '₹60',
      time: 'Today, 6:30 PM',
      status: 'completed',
      simulated: false,
    },
  ],
  systemNotifications: [
    {
      id: 'notif-0',
      title: 'Banking Support Desk',
      body: 'Urgent: Complete KYC verification before 7:00 PM to avoid restrictions.',
      time: '8:42 PM',
      unread: true,
      priority: 'high',
      app: 'Pulse Messages',
    },
  ],
};

export const useSessionStore = create<SessionState>((set, get) => ({
  stage: 'LANDING',
  setStage: (stage) => set({ stage }),

  character: NORMAL_PERSONAS.librarian,
  selectPersona: (personaKey: 'librarian' | 'barista') => {
    const p = NORMAL_PERSONAS[personaKey];
    set((state) => {
      const firstName = p.name.split(' ')[0];
      const updatedScenario2: Scenario =
        personaKey === 'barista'
          ? {
              ...state.scenario2,
              title: 'Café Staff Portal & Direct Deposit Deadline',
              victimMessage: {
                ...state.scenario2.victimMessage,
                sender: 'Roast & Bean Management',
                senderHandle: 'admin@roastandbean-portal.net',
                subject: "Action required before today's 6:00 PM staff security deadline",
                body: `Attention ${firstName},\n\nAction is required before today's 6:00 PM staff security deadline. All café shift employees must re-authenticate their employee portal credentials.\n\nAccounts that fail to complete authorization before 6:00 PM will face automated suspension of shift scheduling, tip payout disbursements, and inventory ordering access.`,
                fakeUrl: 'roastandbean-portal.net/shift-login',
              },
              contextNarration: `Wednesday — 11:18 AM. ${firstName} is at the Roast & Bean front terminal reviewing morning store communications.`,
            }
          : {
              ...fallbackScenario2,
            };

      return {
        character: p,
        scenario2: updatedScenario2,
      };
    });
  },
  setCharacterEmotion: (emotion) =>
    set((state) => ({ character: { ...state.character, emotion } })),

  scenario1: fallbackScenario1,
  scenario2: fallbackScenario2,
  setScenario1: (scenario1) => set({ scenario1 }),
  setScenario2: (scenario2) => set({ scenario2 }),

  digitalState: initialDigitalState,
  resetDigitalState: () => set({ digitalState: initialDigitalState }),

  triggerSimulatedConsequence: () => {
    const now = Date.now();
    const newTx = {
      id: `sim-tx-${now}`,
      title: 'Simulated FastTransfer Merchant (UNAUTHORIZED)',
      amount: '₹5,000',
      time: 'Just now',
      status: 'flagged' as const,
      simulated: true,
    };

    const newNotifications = [
      {
        id: `sim-notif-1`,
        title: '⚠️ Security Alert — Unknown Device',
        body: 'New active session authorized from Chrome / Linux (IP: 185.220.101.4).',
        time: 'Just now',
        unread: true,
        priority: 'high' as const,
        app: 'Device Security',
      },
      {
        id: `sim-notif-2`,
        title: '⚠️ FlowPay — Simulated Transaction Notice',
        body: 'SIMULATED OUTFLOW: ₹5,000 sent via FastTransfer. If not you, secure account immediately.',
        time: 'Just now',
        unread: true,
        priority: 'high' as const,
        app: 'FlowPay',
      },
      ...get().digitalState.systemNotifications,
    ];

    set((state) => ({
      digitalState: {
        ...state.digitalState,
        accountStatus: 'suspicious',
        personalInfoStatus: 'simulated_exposure',
        deviceStatus: 'unknown_session',
        paymentStatus: 'simulated_activity',
        activeSessions: 2,
        compromisedAt: now,
        recentTransactions: [newTx, ...state.digitalState.recentTransactions],
        systemNotifications: newNotifications,
      },
      character: {
        ...state.character,
        emotion: 'concerned',
      },
    }));

    get().addEvent({
      actor: 'system',
      type: 'SIMULATED_SESSION_COMPROMISE',
      label: 'Unknown Session Detected',
      description: 'Session credentials submitted on simulated portal were utilized in an unauthorized context.',
    });

    get().addEvent({
      actor: 'system',
      type: 'SIMULATED_PAYMENT_ACTIVITY',
      label: 'Simulated Outflow (₹5,000)',
      description: 'A simulated unauthorized transaction was registered under high-urgency window.',
    });

    // Trigger psychological sound effect for consequence event via Web Audio API
    soundEffects.playConsequenceEvent();
  },

  events: [],
  addEvent: (event) => {
    const newEvent: SimulationEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };
    set((state) => ({ events: [...state.events, newEvent] }));
  },
  clearEvents: () => set({ events: [] }),

  weaknessScores: {
    urgency: { misses: 0, recognitions: 0, confidence: 0.1 },
    authority_bias: { misses: 0, recognitions: 0, confidence: 0.1 },
    financial_fear: { misses: 0, recognitions: 0, confidence: 0.1 },
    curiosity: { misses: 0, recognitions: 0, confidence: 0.1 },
    social_pressure: { misses: 0, recognitions: 0, confidence: 0.1 },
  },
  recordWeaknessOutcome: (tag, outcome) => {
    set((state) => {
      const prev = state.weaknessScores[tag];
      const isMiss = outcome === 'missed';
      return {
        weaknessScores: {
          ...state.weaknessScores,
          [tag]: {
            misses: isMiss ? prev.misses + 1 : prev.misses,
            recognitions: !isMiss ? prev.recognitions + 1 : prev.recognitions,
            confidence: Math.min(1.0, prev.confidence + 0.35),
          },
        },
      };
    });
  },

  encounter1Outcome: null,
  encounter2Outcome: null,
  setEncounter1Outcome: (outcome) => {
    set({ encounter1Outcome: outcome });
    get().recordWeaknessOutcome('urgency', outcome);
  },
  setEncounter2Outcome: (outcome) => {
    set({ encounter2Outcome: outcome });
    get().recordWeaknessOutcome('urgency', outcome);
  },

  activePhoneApp: 'home',
  setActivePhoneApp: (app) => set({ activePhoneApp: app }),
  phoneMessageRead: false,
  setPhoneMessageRead: (read) => set({ phoneMessageRead: read }),
  phoneInspectingSender: false,
  setPhoneInspectingSender: (inspecting) => set({ phoneInspectingSender: inspecting }),
  phoneBrowserUrl: '',
  setPhoneBrowserUrl: (url) => set({ phoneBrowserUrl: url }),

  activeLaptopApp: 'desktop',
  setActiveLaptopApp: (app) => set({ activeLaptopApp: app }),
  laptopEmailRead: false,
  setLaptopEmailRead: (read) => set({ laptopEmailRead: read }),
  laptopInspectingHeaders: false,
  setLaptopInspectingHeaders: (inspecting) => set({ laptopInspectingHeaders: inspecting }),
  laptopBrowserUrl: '',
  setLaptopBrowserUrl: (url) => set({ laptopBrowserUrl: url }),

  selectedReplayNodeId: 'step-2-urgency',
  setSelectedReplayNodeId: (id) => set({ selectedReplayNodeId: id }),

  isVoiceMuted: false,
  toggleVoiceMute: () => {
    const nextMuted = !get().isVoiceMuted;
    if (nextMuted) {
      defaultVoiceProvider.stop();
    }
    set({ isVoiceMuted: nextMuted });
  },
  speakCoachText: (text: string) => {
    if (!get().isVoiceMuted) {
      defaultVoiceProvider.speak(text);
    }
  },

  isSoundMuted: false,
  toggleSoundMute: () => {
    const nextMuted = !get().isSoundMuted;
    soundEffects.setMuted(nextMuted);
    set({ isSoundMuted: nextMuted });
  },

  resetSimulation: () => {
    defaultVoiceProvider.stop();
    set({
      stage: 'LANDING',
      digitalState: initialDigitalState,
      events: [],
      encounter1Outcome: null,
      encounter2Outcome: null,
      activePhoneApp: 'home',
      phoneMessageRead: false,
      phoneInspectingSender: false,
      phoneBrowserUrl: '',
      activeLaptopApp: 'desktop',
      laptopEmailRead: false,
      laptopInspectingHeaders: false,
      laptopBrowserUrl: '',
      selectedReplayNodeId: 'step-2-urgency',
      character: NORMAL_PERSONAS.librarian,
      scenario2: fallbackScenario2,
    });
  },
}));
