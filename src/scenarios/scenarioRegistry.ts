import { ScenarioMeta } from '../types';

export const ALL_SCENARIOS: ScenarioMeta[] = [
  {
    id: 'scenario-1-kyc',
    scenarioNumber: 1,
    title: 'Bank KYC & Account Freeze',
    shortTitle: 'Bank KYC Freeze',
    subtitle: 'Urgent SMS Threatening 24h Account Suspension',
    device: 'phone',
    weaknessTag: 'urgency',
    difficulty: 'medium',
    description:
      'A panic-inducing SMS demands immediate KYC re-verification to prevent account suspension, steering the victim to a fake banking login and OTP harvest.',
    learningOutcome:
      'Banks never send unsolicited text links threatening instant account suspension. Never enter credentials or OTPs on links sent via SMS.',
    redFlags: [
      'Artificial 24h/same-day deadline threatening severe restrictions',
      'Suspicious domain ("hdfc-kyc-update.me" instead of official banking domain)',
      'Unsolicited OTP request during an inbound message interaction',
      'Sudden prompt to enter confidential internet banking password',
    ],
    safeAction: 'Open the verified bank app directly or call customer support number on the back of your debit card.',
  },
  {
    id: 'scenario-2-sso',
    scenarioNumber: 2,
    title: 'Corporate SSO Re-Authentication',
    shortTitle: 'Corporate SSO MFA',
    subtitle: 'Workplace Security Certificate Expiring & Mobile MFA Push',
    device: 'dual',
    weaknessTag: 'authority_bias',
    difficulty: 'hard',
    description:
      'A simulated workplace email claims security certificates are expiring before end-of-day. Clicking the link triggers a fake SSO login and pushes an unauthorized MFA prompt to your phone.',
    learningOutcome:
      'MFA fatigue and authority pressure lead users to approve push notifications they did not initiate. Always deny unexpected authentication requests.',
    redFlags: [
      'Urgent IT compliance ultimatum threatening direct deposit or staff tool suspension',
      'Lookalike domain for internal company login',
      'Unexpected MFA push notification on mobile while clicking an email link',
      'Unauthorized access leading to immediate enterprise data exfiltration',
    ],
    safeAction: 'Verify directly with your internal IT helpdesk or security operations channel before approving any push.',
  },
  {
    id: 'scenario-3-upi',
    scenarioNumber: 3,
    title: 'UPI Cashback Collect Request',
    shortTitle: 'UPI Cashback Trap',
    subtitle: 'Bogus ₹5,000 Reward That Is Actually a Collect Request',
    device: 'phone',
    weaknessTag: 'financial_fear',
    difficulty: 'easy',
    description:
      'A flashy cashback banner lures the victim with ₹5,000 "approved rewards", disguising an outgoing merchant collect request requiring a secret UPI PIN.',
    learningOutcome:
      'YOU NEVER ENTER A UPI PIN TO RECEIVE MONEY. A UPI PIN is exclusively used to authorize outgoing deductions from your bank account.',
    redFlags: [
      'Unsolicited "cashback approved" popups from unknown merchant handles',
      'Payment direction shows outgoing debit rather than an incoming credit',
      'App prompts for 6-digit secret UPI PIN to "receive" funds',
      'Recipient handle shows an unfamiliar merchant VPA ("merchant-cashback@bank")',
    ],
    safeAction: 'Decline the collect request immediately. Report the merchant VPA to your UPI payment provider.',
  },
  {
    id: 'scenario-4-parcel',
    scenarioNumber: 4,
    title: 'Parcel Redelivery Fee & Card Harvesting',
    shortTitle: 'Parcel Customs Fee',
    subtitle: 'Trivial ₹15.00 Redelivery Charge Unlocking Massive Fraud',
    device: 'phone',
    weaknessTag: 'curiosity',
    difficulty: 'medium',
    description:
      'An SMS claims a delivery is held for a nominal ₹15.00 customs charge. The fake courier portal captures card details and proceeds to run unauthorized high-value charges.',
    learningOutcome:
      'Attackers use micro-charges (₹10–₹50) to lower psychological suspicion while exfiltrating complete credit/debit card credentials and CVVs.',
    redFlags: [
      'Unsolicited delivery notification with vague tracking numbers',
      'Micro-fee demanded via insecure web form to release generic package',
      'Card details, expiry date, and CVV requested on an unverified domain',
      'Immediate subsequent unauthorized test and high-value transactions',
    ],
    safeAction: 'Check your tracking number on the official courier website or app directly, not through an SMS link.',
  },
  {
    id: 'scenario-5-marketplace',
    scenarioNumber: 5,
    title: 'Marketplace Buyer QR Trap',
    shortTitle: 'Marketplace QR Scam',
    subtitle: '"Scan This QR Code to Receive Advance Payment" Deception',
    device: 'phone',
    weaknessTag: 'social_pressure',
    difficulty: 'medium',
    description:
      'A prospective online buyer claims to send full payment upfront and asks the seller to scan a QR code to "receive" money into their account.',
    learningOutcome:
      'Scanning a QR code in payment apps is SOLELY for SENDING money. Scanning a QR code cannot deposit money into your account.',
    redFlags: [
      'Buyer insists on paying exclusively via a custom QR code sent over chat',
      'Claim that scanning a QR code is required to receive funds',
      'Prompt asking to enter UPI PIN after scanning the QR',
      'Instant outgoing debit notification accompanied by a bogus "refund" follow-up',
    ],
    safeAction: 'Refuse QR codes from buyers. Provide only your phone number or standard UPI ID (VPA) to receive funds safely.',
  },
  {
    id: 'scenario-6-gig',
    scenarioNumber: 6,
    title: 'Job Task Deposit & Advance-Fee Fraud',
    shortTitle: 'Gig Task Deposit',
    subtitle: 'Fake Micro-Job Platform Locking Earnings Behind Buffer Deposits',
    device: 'laptop',
    weaknessTag: 'financial_fear',
    difficulty: 'hard',
    description:
      'A work-from-home product rating dashboard rewards fake profits, then locks withdrawals behind escalating "combo task buffer deposits" and tax clearance fees.',
    learningOutcome:
      'Legitimate employment and freelance platforms NEVER require you to pay money or deposit buffer funds in order to withdraw earned salaries.',
    redFlags: [
      'Unusually high pay for trivial repetitive tasks (e.g., clicking 5-star ratings)',
      '"Combo Task" or "Optimization Task" requiring personal deposits to continue',
      'Withdrawals suddenly frozen behind unexpected fees and tax clearance codes',
      'Escalating demands for higher deposits to recover previously deposited money (sunk-cost trap)',
    ],
    safeAction: 'Immediately cease communication. Do not deposit funds to recover "frozen" balances on unverified platforms.',
  },
  {
    id: 'scenario-7-remote',
    scenarioNumber: 7,
    title: 'Foreign Login Alert & Fake Remote Support',
    shortTitle: 'Fake Remote Support',
    subtitle: 'Full-Screen Fake Antivirus Panic Leading to Remote Access Ransom',
    device: 'laptop',
    weaknessTag: 'authority_bias',
    difficulty: 'hard',
    description:
      'A rogue browser pop-up simulates a critical virus infection, instructing the user to install a QuickAssist support tool that hands autonomous desktop control to an attacker.',
    learningOutcome:
      'Operating systems never instruct you to call phone numbers or download remote-desktop software through browser alert banners.',
    redFlags: [
      'Loud, flashing browser alerts claiming immediate infection or credential exposure',
      'Instructions to install remote assistance software (QuickAssist, AnyDesk, TeamViewer)',
      'Support agent asking for session codes or PINs to take over mouse/keyboard',
      'Unauthorized browsing of local directories and sensitive document exfiltration',
    ],
    safeAction: 'Close the browser tab or force-quit the browser. Run a scan with your operating system’s built-in security software.',
  },
  {
    id: 'scenario-8-refund',
    scenarioNumber: 8,
    title: 'Search Engine Refund Helpline',
    shortTitle: 'Refund Search Trap',
    subtitle: 'Sponsored Search Result Lures Victim into Live Chat Card Harvesting',
    device: 'dual',
    weaknessTag: 'urgency',
    difficulty: 'hard',
    description:
      'Searching for airline refunds surfaces an imposter sponsored ad. A convincing live chat agent promises instant refunds in exchange for debit card details, draining the linked bank account instead.',
    learningOutcome:
      'Scammers purchase sponsored search ads to sit at the top of search queries for customer support and refunds. Verify the root URL before trusting results.',
    redFlags: [
      'First search result marked "Sponsored" with a non-airline domain name',
      'Support chatbot asking for card number, expiry, or CVV to "route refund funds"',
      'No authentication or booking reference required prior to financial information requests',
      'Large unauthorized debit notification occurring instead of incoming credit',
    ],
    safeAction: 'Navigate directly to the airline or merchant website using their verified app or official domain address.',
  },
];
