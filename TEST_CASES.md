# Second Signal — Test Cases & Sample Data Specification

> **Document Version:** 2.4.0  
> **Target System:** Second Signal Cyber Defense Simulation Engine  
> **Coverage:** Functional, Behavioral/Cognitive, Security Sandboxing, Responsiveness, Audio/Voice, AI/Offline Resilience  

---

## 1. Test Suite Matrix Overview

| Test Category | Suite ID | Test Count | Scope |
|---|---|---|---|
| **End-to-End User Journey** | `TC-E2E` | 4 Cases | Complete stage progression from landing through final scorecard |
| **8 Attack Environments** | `TC-SCEN` | 8 Cases | Specific vector verification for each of the 8 simulation labs |
| **Hardware Simulations** | `TC-DEV` | 4 Cases | Phone OS, Laptop OS, Dual-Device switcher, Header inspector |
| **Attack Replay Engines** | `TC-RPL` | 3 Cases | 3D Three.js graph, 2D Timeline, Chapter scrubber |
| **AI & Offline Resilience** | `TC-RES` | 3 Cases | Gemini integration, Zod schema validation recovery, Offline fallback |
| **Audio & Accessibility** | `TC-ACC` | 3 Cases | Web Audio synthesizer, Voice Coach TTS, Sound toggle |
| **Mobile & Viewport Scaling**| `TC-MOB` | 3 Cases | 320px–360px viewport tests, touch targets, zero-horizontal overflow |

---

## 2. Detailed Test Cases

### 2.1 End-to-End User Journey (`TC-E2E`)

#### TC-E2E-01: Full Simulation Loop via Persona Selection
- **Objective**: Verify standard walkthrough starting with persona selection.
- **Preconditions**: Dev server running on `http://localhost:3000`. Clean session state.
- **Test Steps**:
  1. Open `http://localhost:3000`. Verify Landing page renders with title *"Experience the cyber attack."*
  2. Click **"Begin Simulation"** button.
  3. Select persona **"Clara Morales"** (Community Program Lead).
  4. Phone simulation loads with Scenario 1 (Bank KYC).
  5. Click the SMS link *"https://hdfc-kyc-update.me/verify"*.
  6. Verify **Consequence Modal** triggers with alert sound and simulated breach breakdown.
  7. Click **"Inspect What Happened"**. Verify **2D Attack Replay** opens.
  8. Click **"Why Did This Work?"**. Verify **Coach Diagnosis** opens with cognitive score.
  9. Click **"Practice Recognition"**. Verify **Laptop Workstation** email client loads.
  10. Open **"View Raw Headers"** and **"Test Link in Sandbox"**.
  11. Click **"Flag as Phishing"**.
  12. Click **"View Final Report"**.
- **Expected Outcome**:
  - All 9 stage transitions execute smoothly without console errors.
  - Final Performance Summary displays accurate cognitive breakdown, reaction times, and congratulatory badge.

#### TC-E2E-02: Direct Scenario Arena Laboratory Navigation
- **Objective**: Verify users can freely jump between any of the 8 attack environments.
- **Preconditions**: Landing page loaded.
- **Test Steps**:
  1. Click **"8 Scenario Lab"** in the top navigation bar or landing hero.
  2. Verify the 8 Scenario grid renders with all 8 cards, difficulty badges, and device icons.
  3. Click **Scenario 6: Job Task Deposit & Advance-Fee Fraud**.
  4. Verify the laptop workstation renders with the task deposit dashboard.
  5. Click the top control bar dropdown, switch directly to **Scenario 2: Corporate SSO**.
  6. Verify the dual-device workstation + docked phone layout mounts instantly.
- **Expected Outcome**:
  - Scenario switcher works seamlessly across all 8 scenarios without stale state carryover.

---

### 2.2 The 8 Simulation Lab Environments (`TC-SCEN`)

#### TC-SCEN-01: Scenario 1 — Bank KYC & Account Freeze
- **Vector**: SMS phishing (Smishing) with artificial 24h deadline.
- **Device**: Simulated Mobile Phone.
- **Steps**:
  1. Open Scenario 1.
  2. In SMS app, inspect message from `+91-98201-BANK`.
  3. Verify message text contains: *"URGENT: Your Savings Account ... will be FROZEN within 24 hours"*.
  4. Click link. Verify simulated banking login asks for user ID and password.
  5. Click **"Submit & Verify"**.
- **Expected Result**: Consequence modal warns of unauthorized OTP interception and account draining.

#### TC-SCEN-02: Scenario 2 — Corporate SSO Re-Authentication & MFA Fatigue
- **Vector**: Corporate IT certificate expiry email combined with mobile push spam.
- **Device**: Dual Device (Workstation Laptop + Docked Smartphone).
- **Steps**:
  1. Open Scenario 2. Verify laptop displays corporate inbox with email from *"IT Security Operations"*.
  2. Click *"Update Identity Certificate"* link in laptop email.
  3. Observe docked phone immediately buzzes with an incoming push notification: *"Approve sign-in request from Moscow, RU?"*.
  4. On phone, tap **"Approve"**.
- **Expected Result**: Consequence modal triggers demonstrating session hijacking, SSO token theft, and enterprise directory exfiltration.

#### TC-SCEN-03: Scenario 3 — UPI Cashback Collect Request
- **Vector**: Reverse payment deceptive collect request disguised as a reward.
- **Device**: Simulated Mobile Phone (UPI App).
- **Steps**:
  1. Open Scenario 3.
  2. In the simulated UPI app, observe the flashing banner: *"₹5,000 Reward Approved"*.
  3. Click **"Claim Reward"**.
  4. Notice the dialogue states *"PAY TO: merchant-cashback@vpa"* and demands 6-digit UPI PIN.
  5. Enter PIN and press **Confirm**.
- **Expected Result**: Consequence modal clearly educates: *"YOU NEVER ENTER A PIN TO RECEIVE MONEY. A PIN ONLY DEDUCTS MONEY"*. Account balance drops by ₹5,000 in simulation.

#### TC-SCEN-04: Scenario 4 — Parcel Redelivery Fee & Card Harvesting
- **Vector**: Micro-charge (₹15.00) courier delivery failure trap.
- **Device**: Simulated Mobile Phone.
- **Steps**:
  1. Open Scenario 4. Read postal tracking SMS with nominal ₹15 fee lure.
  2. Click link. Enter test card details (Card Number, Expiry, CVV).
  3. Click **"Pay ₹15.00"**.
- **Expected Result**: Consequence modal reveals immediate subsequent unauthorized international card charges ($750, $1,200) following the initial ₹15 capture.

#### TC-SCEN-05: Scenario 5 — Marketplace Buyer QR Trap
- **Vector**: Buyer insists on sending advance funds by providing a QR code to "scan to receive".
- **Device**: Simulated Mobile Phone.
- **Steps**:
  1. Open Scenario 5. In chat, buyer says: *"I have generated a receive QR code for ₹3,500. Scan it in Google Pay to get your money"*.
  2. Click **"Open QR Scanner"** and simulate scan.
  3. App prompts for secret PIN to "receive".
- **Expected Result**: Consequence triggers highlighting that scanning a QR code is strictly for **sending** money, never receiving.

#### TC-SCEN-06: Scenario 6 — Job Task Deposit & Advance-Fee Fraud
- **Vector**: Fake product rating micro-job platform locking withdrawals behind "combo task" buffer deposits.
- **Device**: Workstation Laptop.
- **Steps**:
  1. Open Scenario 6. Laptop shows rating platform with accumulated fake balance of ₹14,800.
  2. Click **"Withdraw to Bank"**.
  3. Platform prompts: *"Account frozen: Combo task requires deposit of ₹4,000 to unlock withdrawal"*.
  4. Click **"Deposit Buffer Funds"**.
- **Expected Result**: Consequence modal exposes the classic sunk-cost trap where deposits escalate continuously and funds are never returned.

#### TC-SCEN-07: Scenario 7 — Foreign Login Alert & Fake Tech Support
- **Vector**: Full-screen fake antivirus lockdown instructing victim to install QuickAssist.
- **Device**: Workstation Laptop.
- **Steps**:
  1. Open Scenario 7. Laptop simulates loud flashing malware alert with siren sound.
  2. Click *"Connect to Certified Technician"*.
  3. Fake agent instructs user to run remote session code `849-201`.
  4. Click **"Grant Full Access"**.
- **Expected Result**: Consequence modal demonstrates remote desktop takeover, browser history access, and local password file exfiltration.

#### TC-SCEN-08: Scenario 8 — Search Engine Refund Helpline
- **Vector**: Sponsored search result for airline customer support leading to live chat card theft.
- **Device**: Dual Device (Workstation Laptop + Docked Smartphone).
- **Steps**:
  1. Open Scenario 8. Laptop browser shows search results for *"Airline flight cancellation refund"*.
  2. Click top result marked *"Ad • 24/7 Airline Refund Desk"*.
  3. Live chat agent asks for 16-digit debit card number to "refund your ticket directly".
  4. Submit card details.
- **Expected Result**: Docked phone immediately pings with SMS alert: *"₹45,000 debited at POS-OVERSEAS"*. Consequence modal explains how scammers purchase search engine ads to catch stranded travelers.

---

### 2.3 Hardware & Tool Subsystems (`TC-DEV`)

#### TC-DEV-01: Simulated Phone App Switcher & Notifications
- **Steps**: On any phone scenario, click between apps (Messages, Bank, Photos, Home).
- **Verification**: App transitions animate smoothly; active status bar remains visible; unread badge updates properly.

#### TC-DEV-02: Workstation Raw Header Inspector
- **Steps**: In practice mode or Scenario 2 laptop, click **"View Raw Headers"**.
- **Verification**: Drawer expands showing formatted RFC-5322 headers (`Received`, `Authentication-Results`, `From`, `Return-Path`). Domain soft-fail and SPF warning badges render in yellow/red.

#### TC-DEV-03: Sandboxed Link Tester
- **Steps**: In workstation email, click **"Test Link in Sandbox"**.
- **Verification**: Sandbox modal displays target IP, destination domain, redirection chain, and risk score without navigating or loading external content.

#### TC-DEV-04: Dual-Device Mobile Switcher
- **Steps**: In Scenario 2 or Scenario 8 on a viewport $< 1024\text{px}$, tap the **"📱 Authenticator / Phone"** tab, then tap **"💻 Workstation"**.
- **Verification**: Active device shifts instantly; inputs remain active; no horizontal jitter or overflow occurs.

---

### 2.4 Attack Replay Engines (`TC-RPL`)

#### TC-RPL-01: 3D Three.js Topological Graph Replay
- **Steps**: In the Replay stage, click **"3D Network"** toggle.
- **Verification**:
  - WebGL canvas initializes with 4 distinct nodes: Victim (Cyan), Interceptor (Amber), C2 Server (Red), Target Bank (Green).
  - Dragging the canvas orbits the camera smoothly.
  - Step buttons (Step 1 to Step 4) update the active packet laser stream and descriptive overlay.

#### TC-RPL-02: 2D Timeline & Telemetry Forensic Engine
- **Steps**: In the Replay stage, switch to **"2D Stage"**.
- **Verification**:
  - Timeline chapters (Reconnaissance, Delivery, Trigger, Exfiltration) display in chronological order.
  - Clicking any chapter updates both the victim preview and the behind-the-scenes adversary server terminal.

---

### 2.5 AI & Offline Resilience (`TC-RES`)

#### TC-RES-01: Gemini Adaptive Scenario Generation (With API Key)
- **Setup**: `GEMINI_API_KEY` set in `.env`.
- **Request**: `POST /api/scenario/generate` with `{ channel: "email", weaknessTag: "authority_bias" }`.
- **Verification**: Backend returns status `200` with `source: "gemini"` and validated `ScenarioSchema` JSON object.

#### TC-RES-02: Graceful Offline Fallback (No API Key)
- **Setup**: `GEMINI_API_KEY` unset or invalid.
- **Request**: `POST /api/scenario/generate`.
- **Verification**: Backend returns status `200` with `source: "fallback_offline"` and a curated fallback scenario. The application continues running without interruption.

#### TC-RES-03: AI Coach Behavioral Feedback
- **Request**: `POST /api/coach/feedback` with `{ outcome: "missed", weaknessTag: "urgency" }`.
- **Verification**: Coach returns a supportive, educational explanation analyzing the psychological urgency mechanism without shaming the user.

---

### 2.6 Audio, Voice & Viewport Responsiveness (`TC-ACC` & `TC-MOB`)

#### TC-ACC-01: Web Audio Synthesis & SFX Toggle
- **Steps**: Toggle Sound FX in the top header. Trigger an incoming message and a consequence alert.
- **Verification**: Sound plays when enabled; complete silence when disabled; no audio errors on initial mute.

#### TC-ACC-02: Web Speech Voice Coach
- **Steps**: Toggle Voice Coach in the top header on Coach Diagnosis stage.
- **Verification**: Synthesizer reads coach explanation aloud using browser speech synthesis; stops cleanly when navigating away.

#### TC-MOB-01: Small Mobile Viewport Responsiveness (320px–360px)
- **Steps**: Resize browser window to `320px` width (iPhone SE / Galaxy Fold outer screen).
- **Verification**:
  - `ScenarioControlBar` displays scenario title with proper truncation (`max-w-[85px]`).
  - Red Flags, Zoom, and Restart buttons stay on one row without breaking.
  - Header brand text collapses cleanly without overlapping controls.
  - Page has zero horizontal scrollbar (`overflow-x: hidden`).

---

## 3. Sample Data Catalog

### 3.1 Sample Phishing Payloads for the 8 Scenarios

#### Scenario 1 (SMS KYC Phish)
```json
{
  "sender": "+91-98201-BANK",
  "timestamp": "Today, 14:22",
  "body": "URGENT NOTICE: Your HDFC Savings Account XX4902 will be SUSPENDED within 24 hours due to pending KYC re-verification. Complete mandatory verification immediately to avoid stoppage of UPI, ATM, and NEFT services: https://hdfc-kyc-update.me/verify",
  "ctaLabel": "Verify KYC Now",
  "targetUrl": "https://hdfc-kyc-update.me/verify",
  "weaknessTag": "urgency"
}
```

#### Scenario 2 (Corporate SSO & MFA Push)
```json
{
  "email": {
    "from": "\"IT Security Operations\" <admin@apexcorp-security-verify.net>",
    "to": "clara.morales@apexcorp.org",
    "subject": "[ACTION REQUIRED] SSO Digital Certificate Expiring at 17:00 Today",
    "body": "All staff must renew their workstation digital signature certificate before end-of-day today. Failure to renew will result in automatic lockout from HR portals, Jira, and payroll direct deposits.",
    "ctaLabel": "Renew Identity Certificate Now",
    "targetUrl": "https://apexcorp-sso-login.invalid/renew"
  },
  "mfaPush": {
    "app": "Microsoft Authenticator",
    "location": "Moscow, RU (IP: 185.220.101.5)",
    "request": "Approve sign-in for clara.morales@apexcorp.org?",
    "options": ["Deny", "Approve"]
  }
}
```

#### Scenario 3 (UPI Cashback Collect Request)
```json
{
  "notificationTitle": "PhonePe Rewards: ₹5,000 Approved!",
  "merchantVpa": "merchant-cashback-settlement@okaxis",
  "amount": "₹5,000.00",
  "direction": "OUTGOING_COLLECT_REQUEST",
  "promptText": "Enter 6-digit UPI PIN to claim ₹5,000 cashback reward directly into your bank account",
  "weaknessTag": "financial_fear"
}
```

#### Scenario 4 (Parcel Delivery Customs Fee)
```json
{
  "sender": "INDIA-POST-ALERT",
  "trackingNumber": "IN-9081240-TR",
  "message": "Your parcel delivery has been suspended due to an unpaid customs redelivery charge of ₹15.00. Please clear the pending fee to release your shipment: https://indiapost-parcel-clearance.info/pay",
  "harvestedFields": ["CardNumber", "ExpiryDate", "CVV", "CardholderName"],
  "simulatedSubsequentFraud": [
    { "merchant": "DIGITAL-LUXURY-EU", "amount": "₹64,200.00", "status": "APPROVED" },
    { "merchant": "CRYPTO-EXCHANGE-GLOBAL", "amount": "₹82,500.00", "status": "APPROVED" }
  ]
}
```

---

### 3.2 Sample Raw RFC-5322 Email Headers (for Practice Mode)

```http
Delivered-To: clara.morales@community-library.org
Received: by mail-sor-f65.google.com with SMTP id 412sor9821
        for <clara.morales@community-library.org>; Wed, 10 Oct 2026 14:10:04 -0700
Received: from mail-relay-outbound.relay-host22.ru (mail-relay-outbound.relay-host22.ru. [194.26.29.112])
        by mx.google.com with ESMTPS id j8si4821919
        for <clara.morales@community-library.org>;
        Wed, 10 Oct 2026 14:10:03 -0700
Authentication-Results: mx.google.com;
       spf=softfail (google.com: domain of transition@relay-host22.ru does not designate 194.26.29.112 as permitted sender) smtp.mailfrom=transition@relay-host22.ru;
       dkim=none;
       dmarc=fail (p=REJECT sp=REJECT dis=NONE) header.from=apexcorp.org
From: "Corporate IT Support" <helpdesk@apexcorp-security-check.com>
Reply-To: <credentials-harvest@darkrelay.biz>
To: "Clara Morales" <clara.morales@community-library.org>
Subject: URGENT: Mandatory Password & 2FA Reset Required Before 18:00
Date: Wed, 10 Oct 2026 14:09:58 -0700
Message-ID: <20261010140958.981024@relay-host22.ru>
X-Priority: 1 (Highest)
X-Mailer: PHPMailer 6.5.0
Content-Type: text/html; charset=UTF-8
```

---

### 3.3 Sample Gemini Scenario Response Payload (Matching `ScenarioSchema`)

```json
{
  "id": "gen-scenario-8192",
  "title": "Vendor Invoice Route Verification",
  "channel": "email",
  "attackType": "Executive Impersonation / Business Email Compromise",
  "difficulty": "medium",
  "victimMessage": {
    "sender": "Marcus Vance (CFO)",
    "senderHandle": "marcus.vance@internal-apexcorp-finance.net",
    "subject": "Quick task: update wire routing for Q3 audit supplier",
    "body": "Clara, I am currently in offsite board presentations with spotty cell reception. Please review the attached supplier wire instructions and verify the beneficiary account change before the 3:00 PM clearing cutoff. Do not delay this.",
    "ctaLabel": "Review Supplier Wire Instructions",
    "fakeUrl": "https://internal-apexcorp-finance.net/wire-verification?token=892b1a",
    "timestamp": "Today, 11:42 AM"
  },
  "weaknessTag": "authority_bias",
  "redFlags": [
    "External lookalike domain 'internal-apexcorp-finance.net' mimicking internal organization",
    "Executive requests wire/account changes while claiming to be unreachable by phone",
    "Artificial cutoff deadline (3:00 PM) used to discourage out-of-band verification"
  ],
  "coachExplanation": "Attackers frequently impersonate senior leaders and claim they cannot take calls due to meetings. This exploits authority compliance and prevents the victim from picking up the phone to verify.",
  "attackerTimeline": [
    {
      "id": "step-1",
      "label": "Reconnaissance",
      "description": "Adversary scrapes LinkedIn to identify corporate finance personnel and reporting hierarchies.",
      "whatYouSaw": "Normal email from CFO name.",
      "whatAttackerWanted": "Immediate compliance based on executive title."
    },
    {
      "id": "step-2",
      "label": "Credential & Wire Diversion",
      "description": "Phony portal captures internal banking credentials and routes wire transfer to adversary offshore account.",
      "whatYouSaw": "Standard PDF invoice portal.",
      "whatAttackerWanted": "Direct unauthorized fund exfiltration."
    }
  ],
  "contextNarration": "You are working your midday shift when an urgent request appears from executive leadership.",
  "safeAlternatives": [
    "Verify the request through an established internal secondary channel or face-to-face confirmation.",
    "Check the raw email header domain against your company's registered internal domain."
  ]
}
```

---

### 3.4 Sample Cognitive Radar Output Data

```json
{
  "persona": "Clara Morales",
  "scenariosCompleted": 8,
  "reactionTimeAverageSec": 4.2,
  "cognitiveRadar": {
    "urgencyResistance": 78,
    "authorityCrossExamination": 84,
    "financialVigilance": 92,
    "curiosityControl": 88,
    "verificationHabit": 95
  },
  "overallCyberDefenseTier": "Vigilant Defender (Tier 1)",
  "recommendedHabit": "Always use out-of-band communication (phone call, official directory) when receiving urgent requests involving credentials, wire transfers, or MFA push notifications."
}
```

---

## 4. Test Execution Checklist

- [ ] **TC-E2E-01**: Complete walkthrough (Landing $\rightarrow$ Clara Morales $\rightarrow$ Scenario 1 $\rightarrow$ Consequence $\rightarrow$ 2D Replay $\rightarrow$ Coach $\rightarrow$ Practice $\rightarrow$ Scorecard).
- [ ] **TC-E2E-02**: Direct navigation from 8 Scenario Lab.
- [ ] **TC-SCEN-01 to TC-SCEN-08**: All 8 attack scenarios trigger distinct vectors, realistic device interfaces, and accurate consequences.
- [ ] **TC-DEV-01 to TC-DEV-04**: Phone app switcher, laptop email client, raw header inspector, sandbox link tester, and dual-device switcher function properly.
- [ ] **TC-RPL-01 & TC-RPL-02**: 3D Three.js graph renders with interactive orbiting; 2D timeline scrubs smoothly across all chapters.
- [ ] **TC-RES-01 to TC-RES-03**: Gemini API integration works with valid key; offline fallback seamlessly recovers when key is missing; Coach generates constructive feedback.
- [ ] **TC-ACC-01 & TC-ACC-02**: Web Audio synthesis plays sounds cleanly; Voice Coach reads behavioral diagnosis aloud.
- [ ] **TC-MOB-01**: Mobile viewport at 320px, 360px, and 414px renders with zero horizontal overflow and $\ge 44\text{px}$ touch targets.
- [ ] **Build & Lint Verification**: `npm run build` succeeds and `npm run lint` passes with 0 errors.
