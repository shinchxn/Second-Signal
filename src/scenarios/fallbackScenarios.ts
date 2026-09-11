import { Scenario } from '../types';

export const fallbackScenario1: Scenario = {
  id: 'scenario-1-kyc-urgency',
  title: 'Banking Support Account Verification',
  channel: 'messaging',
  attackType: 'Fake KYC / Account Restriction Phishing',
  difficulty: 'medium',
  victimMessage: {
    sender: 'Banking Support',
    senderHandle: 'SMS Support Desk',
    avatarBg: 'bg-teal-600',
    subject: 'Action Required: Account Verification Pending',
    body: 'Banking Support — Your account verification is pending. Complete verification before 7:00 PM to avoid temporary account restrictions.',
    ctaLabel: 'Verify KYC',
    fakeUrl: 'example.invalid/verify',
    timestamp: '8:42 PM',
  },
  weaknessTag: 'urgency',
  redFlags: [
    'Artificial deadline ("before 7:00 PM") creating emotional pressure',
    'Unsolicited direct link instead of instructing you to use the official app',
    'Threat of immediate account restriction without prior notice',
    'Fictional destination domain trying to elicit quick action',
  ],
  coachExplanation:
    "You didn't miss it because it looked perfect. You acted because it felt urgent. That's the signal to recognize next time.",
  attackerTimeline: [
    {
      id: 'step-1-lure',
      label: 'Create Urgency',
      description: 'Send simulated banking alert with high emotional stakes and artificial deadline',
      whatYouSaw: 'SMS from Banking Support claiming account verification was pending before 7:00 PM',
      whatAttackerWanted: 'Trigger panic and loss aversion to bypass skepticism',
    },
    {
      id: 'step-2-urgency',
      label: 'Impersonate Authority',
      description: 'Clone institutional terminology and support desk phrasing',
      whatYouSaw: 'A familiar "Verify KYC" action button and security notice',
      whatAttackerWanted: 'Borrow trust from legitimate banking systems',
    },
    {
      id: 'step-3-authority',
      label: 'Push Immediate Action',
      description: 'Compress decision time so victim does not verify through official channels',
      whatYouSaw: 'A strict 7:00 PM deadline to avoid temporary account restriction',
      whatAttackerWanted: 'Prevent cross-checking on official standalone banking apps',
    },
    {
      id: 'step-4-capture',
      label: 'Obtain Sensitive Info',
      description: 'Simulated authorization request on lookalike verification page',
      whatYouSaw: 'A simulated verification confirmation screen with no real credential inputs',
      whatAttackerWanted: 'Extract authorization confirmation under time pressure',
    },
    {
      id: 'step-5-impact',
      label: 'Simulated Account Impact',
      description: 'Trigger simulated unknown session and transaction notice',
      whatYouSaw: 'Unknown device alert and simulated outflow notification',
      whatAttackerWanted: 'Exploit temporary session window before victim cancels',
    },
  ],
  contextNarration: 'Tuesday — 8:42 PM. Arjun is relaxing at home after classes and unlocks his phone.',
  safeAlternatives: [
    'Open your official banking app directly from your home screen',
    'Call the customer support number on the back of your debit card',
    'Remember: legitimate banks never impose sudden 30-minute ultimatums via SMS',
  ],
};

export const fallbackScenario2: Scenario = {
  id: 'scenario-2-corporate-urgency',
  title: 'Corporate Security Compliance Deadline',
  channel: 'email',
  attackType: 'Corporate Credential Harvesting',
  difficulty: 'medium',
  victimMessage: {
    sender: 'Corporate Security',
    senderHandle: 'security-admin@example.invalid',
    avatarBg: 'bg-indigo-600',
    subject: "Action required before today's security deadline",
    body: "Attention Arjun,\n\nAction is required before today's 6:00 PM security compliance deadline. All engineering associates must re-authenticate single sign-on certificates today.\n\nAccounts that fail to complete authorization before 6:00 PM will face automated suspension of corporate VPN, Slack, and code repository access.",
    ctaLabel: 'Renew SSO Certificate',
    fakeUrl: 'example.invalid/sso-renewal',
    timestamp: '11:18 AM',
  },
  weaknessTag: 'urgency',
  redFlags: [
    'Strict end-of-day deadline ("before 6:00 PM") to induce workplace anxiety',
    'Threatens disruption of daily work tools (VPN, Slack, Git)',
    'Sender domain has lookalike syntax (example.invalid instead of internal company domain)',
    'Requests security re-authentication through an email hyperlink',
  ],
  coachExplanation:
    "Notice how the context shifted from personal banking to your workplace, but the core weapon remained identical: Artificial Urgency designed to rush your decision.",
  attackerTimeline: [
    {
      id: 'corp-1-context',
      label: 'Create Urgency',
      description: 'Manufacture end-of-day deadline threatening workplace tool suspension',
      whatYouSaw: 'Official-sounding compliance notice with 6:00 PM deadline',
      whatAttackerWanted: 'Create fear of being unable to work or failing internal compliance',
    },
    {
      id: 'corp-2-urgency',
      label: 'Impersonate Authority',
      description: 'Masquerade as internal Corporate Security department',
      whatYouSaw: 'Sender "Corporate Security" with standard enterprise styling',
      whatAttackerWanted: 'Exploit employee desire to stay compliant with company policies',
    },
    {
      id: 'corp-3-harvest',
      label: 'Push Immediate Action',
      description: 'Narrow time window to prevent checking with IT team',
      whatYouSaw: 'Pressure to click link immediately before 6:00 PM',
      whatAttackerWanted: 'Prevent asking colleagues on Slack or checking the IT portal',
    },
    {
      id: 'corp-4-pivot',
      label: 'Obtain Sensitive Info',
      description: 'Simulated enterprise single sign-on re-authentication',
      whatYouSaw: 'Simulated SSO certificate authorization prompt',
      whatAttackerWanted: 'Acquire corporate access tokens to compromise network resources',
    },
  ],
  contextNarration: 'Wednesday — 11:18 AM. Arjun is at his office workstation reviewing morning emails.',
  safeAlternatives: [
    'Check your company internal IT portal directly in your browser',
    'Ask the IT team in the internal #it-support Slack channel',
    'Notice the lookalike domain and report it using your email client phishing button',
  ],
};
