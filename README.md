# Second Signal

> **Experience the cyber attack. Understand the human vulnerability. Recognize the signal next time.**

Second Signal is an interactive, browser-based cybersecurity simulation platform designed to teach real-world threat recognition through immersive experiential learning. Rather than testing users with dry multiple-choice quizzes, Second Signal places learners inside a high-fidelity simulated digital environment where they experience realistic social engineering attacks, witness the downstream consequences in real time, dissect the attack chain, and immediately practice spot-and-verify tactics in an adaptive follow-up scenario.

---

## 🌟 Overview

Cybersecurity training is broken when it only lectures people on abstract rules. In reality, modern phishing and social engineering succeed not because people don't know policies, but because attackers exploit cognitive fatigue, authority cues, urgency, and workplace context.

Second Signal bridges that gap with a multi-phase experiential loop:

1. **Everyday Persona Selection**: Experience scenarios from the perspective of real, everyday working individuals (e.g., Clara Morales, a community librarian, or Leo Ramirez, a café shift lead) rather than security engineers.
2. **Interactive Phone Simulation**: Receive realistic SMS/messaging communications inside an interactive simulated mobile device interface (complete with lockscreen notifications, SMS threads, simulated banking apps, and photo galleries).
3. **Realistic Consequence Exposure**: Witness what happens when an attacker link or authorization prompt is triggered—unauthorized token theft, simulated account drainage, and session hijacking.
4. **Interactive 2D Attack Replay**: Step through the attacker's timeline stage-by-stage (Reconnaissance → Delivery → Payload Trigger → Lateral Movement & Exfiltration) with synchronized victim vs. attacker views.
5. **Human Cognitive Diagnosis**: Analyze the psychological leverage the attacker used (urgency bias, misplaced trust, fatigue, authority mimicry) and receive personalized behavioral takeaways.
6. **Adaptive Desktop / Laptop Practice**: Shift to a simulated staff workstation terminal and email client to evaluate an adaptive follow-up scenario generated or customized to test the specific vulnerability identified.
7. **Verification & Flagging Tools**: Inspect raw email headers, verify sender domains, test suspicious links in a sandbox preview, or route the threat to security before falling for the trap.
8. **Final Performance Debrief**: Review total reaction metrics, cognitive radar breakdown, and tactical habits to retain in daily work.

---

## 🚀 Key Features

- **Full Device Simulation**:
  - **Simulated Mobile Phone**: Dynamic iOS/Android-inspired chassis with switchable apps (Messages, Bank, Photos, Camera, Notes, and Lockscreen notifications).
  - **Simulated Desktop Workstation**: Staff email client with folder views (Inbox, Starred, Sent, Trash), realistic email preview, sender verification chip, expandable raw email headers, and an interactive domain inspector.
- **Adaptive Scenario Generation with Gemini**:
  - Integrated Gemini API backend (`/api/scenario/generate`, `/api/diagnosis`, `/api/verify-link`) that generates tailored attack vectors based on learner performance and cognitive vulnerability tags.
  - Robust offline fallbacks ensure the simulation remains 100% playable and responsive even without an external API key.
- **Audio & Accessibility**:
  - Ambient sound effects (notifications, clicks, alert pings, success chimes) powered by HTML5 Web Audio synthesis.
  - Text-to-speech voiceover support for coach diagnoses and debriefs.
- **Interactive Replay Engine**:
  - Visual 2D playback timeline with scrubber controls, chapter selection, packet flow animations, and technical telemetry logs.
- **Cognitive Threat Scoring**:
  - Tracks urgency vulnerability, authority compliance, curiosity trigger, and verification discipline.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript (Vite bundler) |
| **Backend & Dev Server** | Node.js Express server (`server.ts` with Vite middleware) |
| **Styling & Design** | Tailwind CSS v4, Lucide React icons |
| **State Management** | Zustand (`src/state/sessionStore.ts`) |
| **Animations** | Motion (`motion/react`), Canvas Confetti |
| **AI Integration** | Google GenAI SDK (`@google/genai`) for adaptive social engineering vectors |
| **Validation** | Zod schemas (`src/schemas/scenario.schema.ts`) |

---

## 📂 Project Structure

```
.
├── server.ts                    # Express server with Gemini API routes & Vite middleware
├── index.html                   # HTML entry point with metadata & font setup
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies and script declarations
├── vite.config.ts               # Vite configuration with React & Tailwind plugins
├── tsconfig.json                # TypeScript compiler configuration
└── src/
    ├── App.tsx                  # Main stage router and application shell
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Global styles and Tailwind imports
    ├── types/                   # TypeScript interfaces (Scenario, Persona, State, Events)
    ├── schemas/                 # Zod validation schemas for AI-generated scenarios
    ├── state/
    │   └── sessionStore.ts      # Zustand global session & digital device state
    ├── scenarios/
    │   └── fallbackScenarios.ts # Curated offline scenario catalog
    ├── utils/                   # Sound effects, sound synthesis, and helper functions
    ├── voice/                   # Speech synthesis & voice coach provider
    └── components/
        ├── Header/              # Global application header, sound toggle, & stage progress
        ├── Landing/             # Introduction and overview screen
        ├── Character/           # Persona selection (Clara Morales, Leo Ramirez)
        ├── Phone/               # Mobile simulation chassis, SMS app, bank app, notifications
        ├── Consequence/         # Realistic breach consequence simulation modal
        ├── Replay/              # Interactive 2D attack timeline and packet-flow replay
        ├── Coach/               # Cognitive diagnosis and behavioral breakdown
        ├── Practice/            # Transition modal to desktop practice session
        ├── Laptop/              # Workstation email client, header inspector, sandbox link tester
        ├── Recognition/         # Outcome analysis for the practice scenario
        └── Summary/             # Final evaluation card, stats, and download/share report
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **bun** / **yarn**

### 1. Installation

Clone or extract the repository and install dependencies:

```bash
npm install
```

### 2. Environment Variables (Optional)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

To enable dynamic AI scenario generation via Gemini, add your API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

*(Note: If no API key is provided, Second Signal seamlessly operates using its curated offline scenarios.)*

### 3. Development Server

Start the full-stack development server on `http://localhost:3000`:

```bash
npm run dev
```

### 4. Production Build

To build the client and bundle the server:

```bash
npm run build
npm start
```

### 5. Linting & Type Checking

Validate TypeScript types across the codebase:

```bash
npm run lint
```

---

## 🎯 The Learning Journey

```
Landing View
   └── Character Selection (Everyday Working Personas)
         └── Scenario 1: Mobile Phone (SMS / Direct-Deposit Phish)
               └── Consequence Modal (Breach & Account Diverted)
                     └── 2D Attack Replay (Technical Breakdown)
                           └── Coach Diagnosis (Cognitive Traps)
                                 └── Practice Transition
                                       └── Scenario 2: Workstation Email Client
                                             └── Threat Recognition (Flagging & Verification)
                                                   └── Final Performance Summary & Takeaways
```

---

## 📄 License

This project is created for cybersecurity awareness and educational purposes.
