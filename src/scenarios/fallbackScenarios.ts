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
  contextNarration: 'Tuesday — 8:42 PM. Clara is relaxing at home after her shift at the community library and unlocks her phone.',
  safeAlternatives: [
    'Open your official banking app directly from your home screen',
    'Call the customer support number on the back of your debit card',
    'Remember: legitimate banks never impose sudden 30-minute ultimatums via SMS',
  ],
};

export const fallbackScenario2: Scenario = {
  id: 'scenario-2-workplace-urgency',
  title: 'Library Staff Portal & Payroll Compliance Deadline',
  channel: 'email',
  attackType: 'Workplace Credential Harvesting',
  difficulty: 'medium',
  victimMessage: {
    sender: 'Library Admin & HR',
    senderHandle: 'admin@oakridge-auth-internal.net',
    avatarBg: 'bg-indigo-600',
    subject: "Action required before today's 6:00 PM staff security deadline",
    body: "Attention Clara,\n\nAction is required before today's 6:00 PM staff security deadline. All branch personnel must re-authenticate their employee portal credentials.\n\nAccounts that fail to complete authorization before 6:00 PM will face automated suspension of staff scheduling, patron catalog circulation, and upcoming bi-weekly payroll direct deposit.",
    ctaLabel: 'Renew Staff Credentials',
    fakeUrl: 'oakridge-auth-internal.net/staff-login',
    timestamp: '11:18 AM',
  },
  weaknessTag: 'urgency',
  redFlags: [
    'Strict end-of-day deadline ("before 6:00 PM") to induce workplace anxiety',
    'Threatens disruption of payroll and daily circulation desk tools',
    'Sender domain has lookalike syntax (oakridge-auth-internal.net instead of official oakridgelibrary.org)',
    'Requests security re-authentication through an email hyperlink',
  ],
  coachExplanation:
    "Notice how the context shifted from personal banking to your workplace, but the core weapon remained identical: Artificial Urgency designed to rush your decision.",
  attackerTimeline: [
    {
      id: 'corp-1-context',
      label: 'Create Urgency',
      description: 'Manufacture end-of-day deadline threatening workplace tool and payroll suspension',
      whatYouSaw: 'Official-sounding compliance notice with 6:00 PM deadline',
      whatAttackerWanted: 'Create fear of being unable to work or missing payroll disbursement',
    },
    {
      id: 'corp-2-urgency',
      label: 'Impersonate Authority',
      description: 'Masquerade as internal Library Administration & HR department',
      whatYouSaw: 'Sender "Library Admin & HR" with official institutional styling',
      whatAttackerWanted: 'Exploit employee desire to stay compliant with administrative policies',
    },
    {
      id: 'corp-3-harvest',
      label: 'Push Immediate Action',
      description: 'Narrow time window to prevent checking with colleagues or IT staff',
      whatYouSaw: 'Pressure to click link immediately before 6:00 PM',
      whatAttackerWanted: 'Prevent asking colleagues at the front desk or checking the main portal',
    },
    {
      id: 'corp-4-pivot',
      label: 'Obtain Sensitive Info',
      description: 'Simulated employee single sign-on re-authentication',
      whatYouSaw: 'Simulated staff portal authorization prompt',
      whatAttackerWanted: 'Acquire employee login credentials to compromise records and payroll',
    },
  ],
  contextNarration: 'Wednesday — 11:18 AM. Clara is at the Oakridge Public Library circulation desk reviewing morning emails on the staff computer.',
  safeAlternatives: [
    'Check your library staff intranet portal directly using your saved bookmark',
    'Ask the Head Librarian or county IT team in the staff breakroom',
    'Notice the lookalike domain and report it using your email client phishing button',
  ],
};
