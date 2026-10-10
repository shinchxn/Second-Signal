# Second Signal

> **Experience the cyber attack. Understand the human vulnerability. Recognize the signal next time.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Visualizer-black.svg)](https://threejs.org/)
[![Google GenAI](https://img.shields.io/badge/Google_GenAI-Gemini_2.5-4285f4.svg)](https://ai.google.dev/)

**Second Signal** is an interactive, browser-based cybersecurity simulation platform designed to teach real-world threat recognition through immersive experiential learning. Rather than testing users with dry multiple-choice quizzes, Second Signal places learners inside a high-fidelity simulated digital environment—operating phones, workstations, and dual-device setups—where they experience realistic social engineering attacks, witness downstream financial and corporate consequences in real time, dissect the attack chain in 2D and 3D, and build genuine reflex-level verification habits.

---

## 📋 Delivery & Review Checklist

| Deliverable | Document / Resource | Status |
|---|---|---|
| **Setup Steps & Environment Variables** | [README.md](#-getting-started) & [Environment Variables](#2-environment-variables) | ✅ Complete |
| **Technical Design Document & Architecture Diagrams** | [`TECHNICAL_DESIGN.md`](./TECHNICAL_DESIGN.md) | ✅ Complete (System Architecture, FSM, Dual-Device, 3D Graph, AI Pipeline) |
| **Sample Data & Test Cases** | [`TEST_CASES.md`](./TEST_CASES.md) | ✅ Complete (24+ Test Cases, 8 Phishing Payloads, RFC-5322 Headers, Schemas) |

---

## 🌟 Why Second Signal?

Traditional cybersecurity training is broken:
- It relies on abstract slides and annual compliance tick-boxes.
- It tests memory of static policies rather than instinctive human reflexes.
- In reality, modern attacks exploit **cognitive fatigue, authority bias, urgency, and workplace context** rather than technical ignorance.

Second Signal bridges that gap with a multi-phase experiential loop:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ 1. Everyday     │ ───► │ 2. Interactive  │ ───► │ 3. Real-Time    │
│    Persona Pick │      │    Device Sim   │      │    Consequence  │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                                           │
┌─────────────────┐      ┌─────────────────┐               ▼
│ 6. Practice     │ ◄─── │ 5. Cognitive    │ ◄─── ┌─────────────────┐
│    Workstation  │      │    Diagnosis    │      │ 4. 2D & 3D      │
└─────────────────┘      └─────────────────┘      │    Attack Replay│
         │                                        └─────────────────┘
         ▼
┌─────────────────┐
│ 7. Performance  │
│    Scorecard    │
└─────────────────┘
```

1. **Everyday Working Personas**: Walk in the shoes of everyday professionals (community librarian, café shift lead, remote contractor) rather than security analysts.
2. **High-Fidelity Simulated Hardware**: Interact with simulated smartphones (SMS, banking apps, lockscreens, photo galleries) and corporate desktop workstations.
3. **Visceral Consequence Exposure**: Witness what actually happens when malicious links or rogue MFA prompts are authorized—unauthorized drain, SIM takeover, credential harvesting, or remote desktop hijacking.
4. **Interactive 2D & 3D Attack Replay**: Rewind and inspect the attack chronologically via packet-flow animations, technical telemetry, and spatial 3D node network graphs.
5. **Human Cognitive Diagnosis**: Understand the precise behavioral levers the adversary weaponized (urgency, authority bias, financial fear, curiosity, or social compliance).
6. **Adaptive Desktop / Laptop Practice**: Shift to a simulated corporate workstation terminal and email client to inspect raw RFC-5322 email headers, examine SPF/DKIM flags, test suspicious URLs in an isolated sandbox preview, and report threats safely.
7. **Performance Scorecard & Cognitive Radar**: Track cognitive threat reflexes, reaction speed, and verification discipline over time.

---

## 🔬 The 8 Interactive Simulation Lab Environments

Second Signal includes 8 fully playable, self-contained attack environments covering the modern threat landscape:

| # | Environment | Device | Threat Vector | Primary Cognitive Lever |
|---|---|---|---|---|
| **01** | **Bank KYC & Account Freeze** | Mobile Phone | Urgent SMS threatening 24h account suspension; credential & OTP harvest | **Urgency & Panic** |
| **02** | **Corporate SSO Re-Authentication** | Dual Device *(Laptop + Phone)* | Fake IT expiring certificate notice with unauthorized mobile MFA push spam *(MFA fatigue)* | **Authority Bias** |
| **03** | **UPI Cashback Collect Request** | Mobile Phone | Bogus ₹5,000 reward popup disguising an outgoing merchant collect request requiring a PIN | **Financial Opportunism** |
| **04** | **Parcel Redelivery Fee & Card Harvest** | Mobile Phone | Micro-fee (₹15.00) delivery failure lure harvesting full debit/credit card details & CVV | **Curiosity & Low-Stakes Deception** |
| **05** | **Marketplace Buyer QR Trap** | Mobile Phone | Counterparty claims to send advance funds by sending a "Receive Payment" QR code | **Social Pressure & Confusion** |
| **06** | **Job Task Deposit & Advance-Fee Fraud** | Workstation Laptop | Micro-task product rating portal locking accumulated balances behind escalating "buffer deposits" | **Sunk-Cost Fallacy** |
| **07** | **Foreign Login Alert & Fake Tech Support** | Workstation Laptop | Full-screen fake antivirus lockdown instructing victim to install QuickAssist remote desktop software | **Fear & False Reassurance** |
| **08** | **Search Engine Refund Helpline** | Dual Device *(Laptop + Phone)* | Imposter sponsored search ad leading to a fake support chat that harvests banking cards while generating real-time phone SMS alerts | **Urgency & Search Engine Bias** |

---

## 🚀 Key Features

### 📱 Full Device Simulation & Dual-Device Orchestration
- **Simulated Mobile Phone**:
  - Realistic chassis with notch, dynamic status bar, and home indicator.
  - Multi-app OS with switcher: Messages, Bank, UPI Pay, Photos, Notes, and Lockscreen notifications.
  - Realistic haptic-style animations and responsive touch optimization.
- **Simulated Laptop Workstation**:
  - Desktop operating system shell with browser address bar, tab strip, window chrome, and status dock.
  - Enterprise email client with inbox folders, search, and sender verification chips.
  - **Raw Header Inspector**: Expand full email transport headers to inspect `Received: from`, `Authentication-Results`, `dmarc=fail`, and mismatched sender domains.
  - **Sandboxed Link Tester**: Safely inspect target URLs before visiting, revealing obfuscated redirects and tracking tokens.
- **Dual-Device Synchronized Experience**:
  - For complex attack vectors (Scenario 2 & Scenario 8), users interact simultaneously with a laptop workstation and a docked, synced mobile smartphone.
  - Includes a mobile device switcher tab (`💻 Workstation` ↔ `📱 Authenticator / Phone`) designed for frictionless operation across small viewports.

### 🌐 3D & 2D Interactive Attack Replay Engine
- **3D Spatial Visualizer (Three.js)**:
  - Interactive 3D scene mapping the four key attack nodes: **Victim Device**, **Adversary Interceptor**, **Command & Control (C2) Server**, and **Target Service / Bank**.
  - Animated pulsing packet beams, glowing compromise indicators, and camera angle rotation controls.
  - Chronological step scrubber with playback controls and camera reset.
- **2D Timeline Replay**:
  - Multi-chapter progression (Reconnaissance → Delivery → Trigger → Exfiltration).
  - Synchronized split perspective: What the victim saw vs. what the adversary's server executed behind the scenes.
  - Live technical packet logs and forensic takeaways.

### 🧠 Cognitive Diagnosis & Human Vulnerability Radar
- Evaluates human factors:
  - **Urgency Bias**: Tendency to rush when presented with manufactured deadlines.
  - **Authority Compliance**: Deference to perceived IT directors, executives, or law enforcement.
  - **Financial Anxiety & Reward Seeking**: Susceptibility to unexpected prizes or account freeze threats.
  - **Verification Discipline**: Habit of validating out-of-band communication channels.
- Provides constructive behavioral remedies and actionable "Rules of Thumb" (e.g., *"You never enter a UPI PIN to receive money"*).

### 🤖 Adaptive Scenario Engine (Powered by Gemini)
- Backend endpoints powered by the `@google/genai` TypeScript SDK:
  - `/api/scenario/generate`: Generates personalized follow-up phishing vectors targeting the learner's identified weak points.
  - `/api/diagnosis`: Generates tailored psychological breakdowns based on learner choices.
  - `/api/verify-link`: Real-time URL threat analysis in the sandbox tool.
- **100% Offline-Capable**: Fully functional curated offline fallback catalog ensures zero downtime when no API key is supplied.

### 🔊 Audio & Accessibility Engine
- Built-in Web Audio synthesis: custom synthesized phone rings, alert pulses, message notification tones, keystroke clicks, and error buzzers.
- Text-to-speech Voice Coach option using browser Web Speech API for auditory learners.
- Audio toggle and volume controls accessible from the header at all times.

### 📱 Responsive & Mobile-First Design
- Optimized for all viewport sizes, from narrow mobile screens (320px–360px) to ultra-wide desktop monitors.
- Dynamic responsive chassis scaling, touch-manipulation constraints, and zero horizontal scroll.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript | Component-driven declarative UI |
| **Build Tool & Bundler** | Vite 6 | Fast HMR, optimized production builds |
| **Backend / Dev Server** | Node.js + Express (`server.ts`) | Server-side proxy for Gemini API & Vite middleware |
| **Styling & Theming** | Tailwind CSS v4 | High-contrast cyber-defense dark aesthetic |
| **3D Rendering** | Three.js | Spatial packet-flow attack graph replay |
| **Motion & Animation** | `motion/react` + Canvas Confetti | Smooth UI transitions and reward states |
| **State Management** | Zustand (`src/state/sessionStore.ts`) | Global simulation stage, device, and scoring state |
| **Icons** | Lucide React | Consistent UI and hardware iconography |
| **AI Integration** | Google GenAI SDK (`@google/genai`) | Gemini 2.5 Flash model for dynamic vectors |
| **Data Validation** | Zod | Runtime schema validation for AI scenario output |

---

## 📂 Project Structure

```
.
├── server.ts                    # Full-stack Express server with Gemini endpoints & Vite dev middleware
├── index.html                   # HTML entry point with title, meta tags, and font definitions
├── metadata.json                # Project capabilities and metadata
├── package.json                 # Node dependencies and execution scripts
├── vite.config.ts               # Vite bundler configuration
├── tsconfig.json                # TypeScript compiler configuration
└── src/
    ├── App.tsx                  # Main stage router & scenario layout controller
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Tailwind CSS v4 directives & viewport safeguards
    ├── types/                   # TypeScript interfaces (Scenario, Persona, State, Events, Devices)
    ├── schemas/                 # Zod validation schemas for AI-generated scenarios
    ├── state/
    │   └── sessionStore.ts      # Zustand global session & digital device state
    ├── scenarios/
    │   ├── scenarioRegistry.ts  # Master registry for the 8 core scenario environments
    │   └── fallbackScenarios.ts # Curated offline scenario catalog
    ├── utils/                   # Sound effects, Web Audio synthesis, and formatting helpers
    ├── voice/                   # Speech synthesis & Voice Coach provider
    └── components/
        ├── Header/              # Navigation bar, scenario selector, sound/voice toggles, progress
        ├── Landing/             # Platform overview, hero preview, and scenario cards
        ├── Character/           # Persona selection (Clara Morales, Leo Ramirez)
        ├── Scenarios/           # The 8 interactive attack environments
        │   ├── ScenarioArena.tsx         # 8-scenario laboratory hub
        │   ├── Scenario1BankKYC.tsx      # Bank KYC freeze simulation
        │   ├── Scenario2CorporateSSO.tsx # Corporate SSO + phone MFA push simulation
        │   ├── Scenario3UpiCashback.tsx  # UPI cashback collect trap
        │   ├── Scenario4ParcelFee.tsx    # Parcel redelivery card harvest
        │   ├── Scenario5MarketplaceQR.tsx# Marketplace buyer reverse QR trap
        │   ├── Scenario6GigTaskDeposit.tsx # Task platform escrow deposit scam
        │   ├── Scenario7RemoteSupport.tsx  # Rogue browser lock & remote desktop takeover
        │   └── Scenario8RefundHelpline.tsx # Sponsored search helpline & chat card drain
        ├── Phone/               # Simulated smartphone chassis, SMS app, bank app, apps grid
        ├── Laptop/              # Workstation chassis, email client, header inspector, sandbox
        ├── Consequence/         # Realistic breach consequence simulation modal
        ├── Replay/              # Attack replays
        │   ├── AttackReplay2D.tsx        # 2D multi-chapter timeline replay
        │   └── ThreeAttackReplay.tsx     # 3D Three.js spatial attack node graph
        ├── Coach/               # Cognitive diagnosis and behavioral breakdown
        ├── Practice/            # Workstation practice mode briefing
        ├── Recognition/         # Outcome analysis for practice scenarios
        ├── Shared/              # Reusable controls, red flag modals, docked phone widgets
        └── Summary/             # Final evaluation card, cognitive radar, and shareable debrief
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (or `pnpm` / `bun` / `yarn`)

### 1. Installation

Clone or extract the repository and install all dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a local `.env` configuration file from the template:

```bash
cp .env.example .env
```

| Environment Variable | Required? | Default / Fallback | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Optional | *Curated Offline Catalog* | Google Gemini API key used by the Express backend (`server.ts`) to generate adaptive scenarios and behavioral feedback. |
| `NODE_ENV` | Optional | `development` | Setting to `production` instructs `server.ts` to serve the pre-compiled `dist/` bundle instead of mounting Vite development middleware. |
| `PORT` | Optional | `3000` | Port on which the Express server and Vite application listen. |

```env
# Example .env configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Offline-First Resilience**: If `GEMINI_API_KEY` is not provided, Second Signal seamlessly operates using its curated offline scenarios and pre-authored behavioral diagnoses. Zero crashes or missing features occur.

### 3. Running in Development

Start the full-stack dev server (Express backend + Vite client) on `http://localhost:3000`:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Building for Production

Compile TypeScript and build the production bundle:

```bash
npm run build
npm start
```

### 5. Linting & Validation

Verify code quality and type safety:

```bash
npm run lint
```

---

## 🎮 How to Play

1. **Start the Journey**: From the Landing page, click **"Begin Simulation"** or jump directly into the **"8 Scenario Lab"**.
2. **Select a Persona**: Choose between *Clara Morales* (Community Program Lead) or *Leo Ramirez* (Café Shift Lead) to establish real-world context.
3. **Experience the Attack**:
   - Receive the suspicious communication (SMS message, email, fake pop-up, or chat).
   - Test out what happens if you click the link, scan the code, or approve the prompt.
4. **Inspect the Consequence**:
   - Observe the live simulated consequence screen (account takeover, fund transfer, or credential theft).
5. **Analyze with the Replay Engine**:
   - Use the **2D Chapter Timeline** or toggle into the **3D Spatial Network** to see how the attacker intercepted and routed the payload.
6. **Review the Cognitive Diagnosis**:
   - Discover which cognitive heuristics were exploited.
7. **Practice on the Workstation**:
   - Receive an adaptive practice email on the laptop workstation.
   - Use the **Raw Header Inspector** and **Sandbox Link Preview** to confirm legitimate senders vs. imposters.
   - Click **"Flag as Phishing"** or **"Mark Legitimate"** to test your updated reflexes!
8. **View Your Final Scorecard**:
   - Review your comprehensive cognitive threat score, defense stats, and tactical key takeaways.

---

## 🛡️ Educational Guidelines & Safety

- All banking systems, SMS messages, corporate domains, and remote support tools simulated within Second Signal are **completely simulated within client memory**.
- No real financial accounts, phone numbers, or corporate infrastructure are ever accessed or contacted.
- Second Signal is designed strictly for **defensive security awareness, academic training, and enterprise employee education**.

---

## 📄 License

Created for cybersecurity awareness and educational purposes.
