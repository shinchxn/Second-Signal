export type WeaknessTag =
  | 'urgency'
  | 'authority_bias'
  | 'financial_fear'
  | 'curiosity'
  | 'social_pressure';

export type ScenarioId =
  | 'scenario-1-kyc'
  | 'scenario-2-sso'
  | 'scenario-3-upi'
  | 'scenario-4-parcel'
  | 'scenario-5-marketplace'
  | 'scenario-6-gig'
  | 'scenario-7-remote'
  | 'scenario-8-refund';

export type DeviceType = 'phone' | 'laptop' | 'dual';

export interface ScenarioMeta {
  id: ScenarioId;
  scenarioNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  device: DeviceType;
  weaknessTag: WeaknessTag;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  learningOutcome: string;
  redFlags: string[];
  safeAction: string;
}

export type AppStage =
  | 'LANDING'
  | 'CHARACTER_INTRO'
  | 'SCENARIO_1_PHONE'
  | 'SCENARIO_1_CONSEQUENCE'
  | 'SCENARIO_1_REPLAY'
  | 'SCENARIO_1_DIAGNOSIS'
  | 'PRACTICE_TRANSITION'
  | 'SCENARIO_2_LAPTOP'
  | 'SCENARIO_2_RECOGNITION'
  | 'FINAL_SUMMARY'
  | 'SCENARIOS_HUB'
  | 'SCENARIO_RUNNER';

export type ActorType = 'system' | 'user' | 'attacker_concept';

export interface SimulationEvent {
  id: string;
  timestamp: number;
  actor: ActorType;
  type: string;
  label: string;
  description: string;
  nodeId?: string;
  details?: Record<string, unknown>;
}

export interface ReplayNode {
  id: string;
  title: string;
  stage: number;
  whatYouSaw: string;
  whatAttackerWanted: string;
  psychologicalLever: string;
  defenseTactic: string;
  iconType: 'alert' | 'lock' | 'cursor' | 'database' | 'dollar' | 'shield';
  position: [number, number, number];
}

export interface DigitalState {
  accountStatus: 'secure' | 'suspicious';
  personalInfoStatus: 'protected' | 'simulated_exposure';
  deviceStatus: 'trusted' | 'unknown_session';
  paymentStatus: 'normal' | 'simulated_activity';
  activeSessions: number;
  compromisedAt?: number;
  recentTransactions: Array<{
    id: string;
    title: string;
    amount: string;
    time: string;
    status: 'completed' | 'flagged' | 'pending';
    simulated: boolean;
  }>;
  systemNotifications: Array<{
    id: string;
    title: string;
    body: string;
    time: string;
    unread: boolean;
    priority?: 'high' | 'normal';
    app: string;
  }>;
}

export interface Scenario {
  id: string;
  title: string;
  channel: 'messaging' | 'email';
  attackType: string;
  difficulty: 'easy' | 'medium' | 'hard';
  victimMessage: {
    sender: string;
    senderHandle?: string;
    avatarBg?: string;
    subject?: string;
    body: string;
    ctaLabel?: string;
    fakeUrl?: string;
    timestamp: string;
  };
  weaknessTag: WeaknessTag;
  redFlags: string[];
  coachExplanation: string;
  attackerTimeline: Array<{
    id: string;
    label: string;
    description: string;
    whatYouSaw: string;
    whatAttackerWanted: string;
  }>;
  contextNarration: string;
  safeAlternatives: string[];
}

export type AvatarEmotion =
  | 'neutral'
  | 'distracted'
  | 'curious'
  | 'confused'
  | 'concerned'
  | 'realization'
  | 'confident';

export interface CharacterProfile {
  id?: 'librarian' | 'barista';
  name: string;
  age: number;
  role: string;
  workplace?: string;
  workTerminal?: string;
  workEmail?: string;
  context: string;
  emotion: AvatarEmotion;
}

export interface WeaknessScore {
  misses: number;
  recognitions: number;
  confidence: number;
}
