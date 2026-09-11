import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSessionStore } from './state/sessionStore';
import { AppHeader } from './components/Header/AppHeader';
import { LandingView } from './components/Landing/LandingView';
import { CharacterIntro } from './components/Character/CharacterIntro';
import { SimulatedPhone } from './components/Phone/SimulatedPhone';
import { SimulatedConsequenceModal } from './components/Consequence/SimulatedConsequenceModal';
import { AttackReplay2D } from './components/Replay/AttackReplay2D';
import { CoachDiagnosis } from './components/Coach/CoachDiagnosis';
import { PracticeTransition } from './components/Practice/PracticeTransition';
import { SimulatedLaptop } from './components/Laptop/SimulatedLaptop';
import { RecognitionOutcome } from './components/Recognition/RecognitionOutcome';
import { FinalSummaryView } from './components/Summary/FinalSummaryView';

export default function App() {
  const { stage } = useSessionStore();

  const renderStage = () => {
    switch (stage) {
      case 'LANDING':
        return <LandingView key="landing" />;
      case 'CHARACTER_INTRO':
        return <CharacterIntro key="character" />;
      case 'SCENARIO_1_PHONE':
        return <SimulatedPhone key="phone" />;
      case 'SCENARIO_1_CONSEQUENCE':
        return <SimulatedConsequenceModal key="consequence" />;
      case 'SCENARIO_1_REPLAY':
        return <AttackReplay2D key="replay" />;
      case 'SCENARIO_1_DIAGNOSIS':
        return <CoachDiagnosis key="diagnosis" />;
      case 'PRACTICE_TRANSITION':
        return <PracticeTransition key="practice-transition" />;
      case 'SCENARIO_2_LAPTOP':
        return <SimulatedLaptop key="laptop" />;
      case 'SCENARIO_2_RECOGNITION':
        return <RecognitionOutcome key="recognition" />;
      case 'FINAL_SUMMARY':
        return <FinalSummaryView key="summary" />;
      default:
        return <LandingView key="fallback" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-teal-500/30 selection:text-teal-200">
      <AppHeader />
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
