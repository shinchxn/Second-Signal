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
import { ScenarioArena } from './components/Scenarios/ScenarioArena';
import { Scenario1BankKYC } from './components/Scenarios/Scenario1BankKYC';
import { Scenario2CorporateSSO } from './components/Scenarios/Scenario2CorporateSSO';
import { Scenario3UpiCashback } from './components/Scenarios/Scenario3UpiCashback';
import { Scenario4ParcelFee } from './components/Scenarios/Scenario4ParcelFee';
import { Scenario5MarketplaceQR } from './components/Scenarios/Scenario5MarketplaceQR';
import { Scenario6GigTaskDeposit } from './components/Scenarios/Scenario6GigTaskDeposit';
import { Scenario7RemoteSupport } from './components/Scenarios/Scenario7RemoteSupport';
import { Scenario8RefundHelpline } from './components/Scenarios/Scenario8RefundHelpline';
import { ScenarioId } from './types';

export default function App() {
  const { stage, setStage, activeScenarioId, setActiveScenarioId } = useSessionStore();

  const handleSelectScenario = (id: ScenarioId) => {
    setActiveScenarioId(id);
    setStage('SCENARIO_RUNNER');
  };

  const renderActiveScenario = () => {
    switch (activeScenarioId) {
      case 'scenario-1-kyc':
        return <Scenario1BankKYC key="sc1" onSelectScenario={handleSelectScenario} />;
      case 'scenario-2-sso':
        return <Scenario2CorporateSSO key="sc2" onSelectScenario={handleSelectScenario} />;
      case 'scenario-3-upi':
        return <Scenario3UpiCashback key="sc3" onSelectScenario={handleSelectScenario} />;
      case 'scenario-4-parcel':
        return <Scenario4ParcelFee key="sc4" onSelectScenario={handleSelectScenario} />;
      case 'scenario-5-marketplace':
        return <Scenario5MarketplaceQR key="sc5" onSelectScenario={handleSelectScenario} />;
      case 'scenario-6-gig':
        return <Scenario6GigTaskDeposit key="sc6" onSelectScenario={handleSelectScenario} />;
      case 'scenario-7-remote':
        return <Scenario7RemoteSupport key="sc7" onSelectScenario={handleSelectScenario} />;
      case 'scenario-8-refund':
        return <Scenario8RefundHelpline key="sc8" onSelectScenario={handleSelectScenario} />;
      default:
        return <Scenario1BankKYC key="sc1-fallback" onSelectScenario={handleSelectScenario} />;
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 'LANDING':
        return <LandingView key="landing" />;
      case 'CHARACTER_INTRO':
        return <CharacterIntro key="character" />;
      case 'SCENARIO_1_PHONE':
        return <Scenario1BankKYC key="sc1-direct" onSelectScenario={handleSelectScenario} />;
      case 'SCENARIO_1_CONSEQUENCE':
        return <SimulatedConsequenceModal key="consequence" />;
      case 'SCENARIO_1_REPLAY':
        return <AttackReplay2D key="replay" />;
      case 'SCENARIO_1_DIAGNOSIS':
        return <CoachDiagnosis key="diagnosis" />;
      case 'PRACTICE_TRANSITION':
        return <PracticeTransition key="practice-transition" />;
      case 'SCENARIO_2_LAPTOP':
        return <Scenario2CorporateSSO key="sc2-direct" onSelectScenario={handleSelectScenario} />;
      case 'SCENARIO_2_RECOGNITION':
        return <RecognitionOutcome key="recognition" />;
      case 'FINAL_SUMMARY':
        return <FinalSummaryView key="summary" />;
      case 'SCENARIOS_HUB':
        return <ScenarioArena key="hub" onSelectScenario={handleSelectScenario} />;
      case 'SCENARIO_RUNNER':
        return renderActiveScenario();
      default:
        return <LandingView key="fallback" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#e7005e]/30 selection:text-white">
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
