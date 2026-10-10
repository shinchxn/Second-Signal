import React, { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Smartphone,
  Laptop,
  Layers,
  AlertTriangle,
  RotateCcw,
  Lock,
  Eye,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Radio,
  Clock,
  KeyRound,
  CreditCard,
  MessageSquare,
  Sparkles,
  Info,
  Check,
  Zap,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';
import { ALL_SCENARIOS } from '../../scenarios/scenarioRegistry';
import { ScenarioId, DeviceType } from '../../types';

export const LandingView: React.FC = () => {
  const { setStage, setActiveScenarioId } = useSessionStore();

  // Filter state for scenarios catalog
  const [activeDeviceFilter, setActiveDeviceFilter] = useState<'all' | 'phone' | 'laptop' | 'dual'>('all');

  const filteredScenarios = ALL_SCENARIOS.filter((s) => {
    if (activeDeviceFilter === 'all') return true;
    return s.device === activeDeviceFilter;
  });

  const handleStartPracticing = () => {
    setStage('CHARACTER_INTRO');
  };

  const handleLaunchScenario = (id: ScenarioId) => {
    setActiveScenarioId(id);
    setStage('SCENARIO_RUNNER');
  };

  const scrollToScenarios = () => {
    const el = document.getElementById('scenarios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setStage('SCENARIOS_HUB');
    }
  };

  // Helper for human-readable weakness category
  const formatWeaknessTag = (tag: string) => {
    switch (tag) {
      case 'urgency':
        return 'Urgency Bias';
      case 'authority_bias':
        return 'Authority Pressure';
      case 'financial_fear':
        return 'Financial Deception';
      case 'curiosity':
        return 'Curiosity Bait';
      case 'social_pressure':
        return 'Social Engineering';
      default:
        return 'Deception Signal';
    }
  };

  // Helper for device label
  const formatDevice = (device: DeviceType) => {
    switch (device) {
      case 'phone':
        return 'Smartphone';
      case 'laptop':
        return 'Workstation';
      case 'dual':
        return 'Dual-Device (MFA)';
      default:
        return 'Simulation';
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#e7005e]/30 selection:text-white overflow-x-hidden">
      {/* Background Subtle Tech Ambient Grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section
        id="hero"
        aria-label="Overview"
        className="relative z-10 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#130f25]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading, Proposition & Primary Actions */}
            <div className="lg:col-span-7 space-y-7">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#231b40] bg-[#100c1e] px-3.5 py-1.5 text-xs font-mono text-[#bfbfbf]">
                <span className="flex h-2 w-2 rounded-full bg-[#e7005e] animate-pulse" aria-hidden="true" />
                <span className="font-semibold text-white tracking-wide uppercase">
                  Interactive Cyber Defense Platform
                </span>
                <span className="text-[#555555]" aria-hidden="true">|</span>
                <span className="text-[#bfbfbf]">8 Practice Scenarios</span>
              </div>

              {/* Page-level Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12]">
                Practice the attack.{' '}
                <span className="text-[#e7005e] block sm:inline">
                  Recognize the warning signs.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#bfbfbf] max-w-2xl leading-relaxed">
                Build real-world cyber awareness by experiencing realistic phishing, payment scams, and account-security threats in a safe, interactive environment.
              </p>

              {/* Action Button Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleStartPracticing}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-[#e7005e] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#e7005e]/25 transition duration-200 hover:bg-[#ff1a75] active:bg-[#b8004b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span>Start Practicing</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={scrollToScenarios}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#231b40] bg-[#100c1e] px-5 py-3 text-sm font-semibold text-[#bfbfbf] transition duration-200 hover:border-[#382b64] hover:bg-[#18132b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Layers className="h-4 w-4 text-[#e7005e]" aria-hidden="true" />
                  <span>Explore Scenarios</span>
                </button>
              </div>

              {/* Core Safety & Value Facts */}
              <div className="pt-3 border-t border-[#130f25] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#bfbfbf]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#e7005e] shrink-0" aria-hidden="true" />
                  <span>Zero Real Account Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-[#e7005e] shrink-0" aria-hidden="true" />
                  <span>Interactive Devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-[#e7005e] shrink-0" aria-hidden="true" />
                  <span>Root-Cause Replays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#e7005e] shrink-0" aria-hidden="true" />
                  <span>Safe In-Memory Sandbox</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Preview (Section 5.C) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl border border-[#231b40] bg-[#0b0817] p-5 sm:p-6 shadow-2xl">
                {/* Preview Window Header */}
                <div className="flex items-center justify-between border-b border-[#130f25] pb-3 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#e7005e]" aria-hidden="true" />
                    <span className="font-mono font-medium text-white">Interactive Attack Preview</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#888888]">Simulated Smartphone</span>
                </div>

                {/* Simulated Urgent Notification Alert */}
                <div className="rounded-lg border border-[#e7005e]/40 bg-[#160f26] p-4 mb-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e7005e]/20 text-[#e7005e]">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white tracking-wide">
                          VM-HDFCBK-ALERT
                        </div>
                        <div className="text-[10px] font-mono text-[#888888]">
                          Today • 14:22 PM
                        </div>
                      </div>
                    </div>
                    <span className="rounded bg-[#e7005e]/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#ff1a75]">
                      URGENT
                    </span>
                  </div>

                  <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                    URGENT: Your Savings A/C ending in 4082 will be suspended within 24 hours due to unverified KYC. Click to re-verify immediately:{' '}
                    <span className="font-mono text-[#ff4d8d] underline underline-offset-2 break-all">
                      https://hdfc-kyc-update.me/verify
                    </span>
                  </p>
                </div>

                {/* Warning Sign Breakdown Panel */}
                <div className="space-y-2.5 rounded-lg border border-[#130f25] bg-[#100c1e] p-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#e7005e]" />
                      <span>Warning Signs to Inspect</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#888888]">3 Critical Red Flags</span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#bfbfbf]">
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-[#e7005e] font-bold">01</span>
                      <span>
                        <strong className="text-white">Suspicious Domain:</strong> Uses <code className="text-[#ff4d8d] bg-black/50 px-1 py-0.5 rounded">.me</code> TLD instead of official banking domain.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-[#e7005e] font-bold">02</span>
                      <span>
                        <strong className="text-white">Artificial Urgency:</strong> Threatens instant account freeze within 24 hours to trigger panic.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-[#e7005e] font-bold">03</span>
                      <span>
                        <strong className="text-white">Credential Trap:</strong> Unsolicited SMS directs victim to enter net banking credentials and OTP.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Inspect Before Acting Prompt */}
                <div className="mt-4 pt-3 border-t border-[#130f25] flex items-center justify-between text-xs">
                  <span className="text-[#888888]">
                    Second Signal trains you to pause and verify.
                  </span>
                  <button
                    type="button"
                    onClick={() => handleLaunchScenario('scenario-1-kyc')}
                    className="inline-flex items-center gap-1.5 font-medium text-[#e7005e] hover:text-[#ff1a75] transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e7005e] rounded"
                  >
                    <span>Try This Scenario</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-3 text-[11px] font-mono text-[#555555] text-center">
                  Marketing preview only. In Second Signal, all interactions run in an isolated local simulator.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: HOW IT WORKS                                                   */}
      {/* ========================================================================= */}
      <section
        id="how-it-works"
        aria-label="How It Works"
        className="relative z-10 py-16 sm:py-24 border-b border-[#130f25] bg-[#05040a]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#e7005e] tracking-wider mb-2">
              <Zap className="h-3.5 w-3.5" />
              <span>The Learning Cycle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              How Second Signal Works
            </h2>
            <p className="text-base text-[#bfbfbf] leading-relaxed">
              Traditional cyber training tests your memory with multiple-choice quizzes. Second Signal develops instinctive reflexes by immersing you in simulated attacks where every action has realistic consequences.
            </p>
          </div>

          {/* Three Connected Learning Stages (Section 5.D) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Stage 01 — Experience */}
            <article className="relative rounded-xl border border-[#231b40] bg-[#0e0a1d] p-6 lg:p-7 flex flex-col justify-between transition hover:border-[#3a2c66] hover:bg-[#140e2a]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-bold text-[#e7005e]">01</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e]">
                    <Smartphone className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  Experience
                </h3>
                <p className="text-sm font-semibold text-[#e7005e] mb-3">
                  Enter a realistic simulated attack.
                </p>
                <p className="text-sm text-[#bfbfbf] leading-relaxed mb-4">
                  Step into the shoes of an employee or individual managing authentic SMS alerts, corporate webmail, payment apps, or fake support popups under real-time pressure.
                </p>
              </div>

              <div className="pt-4 border-t border-[#130f25] space-y-2 text-xs font-mono text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#e7005e]" />
                  <span>Pixel-accurate device interfaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#e7005e]" />
                  <span>Real psychological pressure hooks</span>
                </div>
              </div>
            </article>

            {/* Stage 02 — Decide */}
            <article className="relative rounded-xl border border-[#231b40] bg-[#0e0a1d] p-6 lg:p-7 flex flex-col justify-between transition hover:border-[#3a2c66] hover:bg-[#140e2a]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-bold text-[#e7005e]">02</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e]">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  Decide
                </h3>
                <p className="text-sm font-semibold text-[#e7005e] mb-3">
                  Inspect the message, request, or interface before acting.
                </p>
                <p className="text-sm text-[#bfbfbf] leading-relaxed mb-4">
                  Examine sender domains, dissect URL subdomains, detect unprompted MFA push alerts, and evaluate payment requests. You choose whether to click, enter credentials, or verify out-of-band.
                </p>
              </div>

              <div className="pt-4 border-t border-[#130f25] space-y-2 text-xs font-mono text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#e7005e]" />
                  <span>Critical hesitation training</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#e7005e]" />
                  <span>Inspection tools & domain scrutiny</span>
                </div>
              </div>
            </article>

            {/* Stage 03 — Understand */}
            <article className="relative rounded-xl border border-[#231b40] bg-[#0e0a1d] p-6 lg:p-7 flex flex-col justify-between transition hover:border-[#3a2c66] hover:bg-[#140e2a]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-bold text-[#e7005e]">03</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e]">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  Understand
                </h3>
                <p className="text-sm font-semibold text-[#e7005e] mb-3">
                  See the simulated consequence and learn a safer response.
                </p>
                <p className="text-sm text-[#bfbfbf] leading-relaxed mb-4">
                  Witness immediate consequences in a safe sandbox—like unauthorized transactions, account lockouts, or remote control. Inspect the root cognitive vulnerability and practice the safe response.
                </p>
              </div>

              <div className="pt-4 border-t border-[#130f25] space-y-2 text-xs font-mono text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#e7005e]" />
                  <span>Interactive attack replay timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#e7005e]" />
                  <span>Safe habit retention reinforcement</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: SCENARIO CATALOG PREVIEW                                       */}
      {/* ========================================================================= */}
      <section
        id="scenarios"
        aria-label="Scenario Catalog"
        className="relative z-10 py-16 sm:py-24 border-b border-[#130f25]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header with Category Filtering */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#e7005e] tracking-wider mb-2">
                <Layers className="h-3.5 w-3.5" />
                <span>Simulated Attack Library</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                Explore All 8 Practice Scenarios
              </h2>
              <p className="text-sm sm:text-base text-[#bfbfbf] leading-relaxed">
                Every scenario is an authentic interactive simulation based on actual threat vectors observed across modern banking, corporate work, delivery logistics, and digital payments.
              </p>
            </div>

            {/* Device Environment Filter Controls */}
            <div
              role="radiogroup"
              aria-label="Filter scenarios by device"
              className="flex flex-wrap sm:inline-flex p-1 rounded-lg border border-[#231b40] bg-[#100c1e] text-xs font-medium w-full sm:w-auto self-start md:self-end gap-1 sm:gap-0"
            >
              {(
                [
                  { id: 'all', label: 'All (8)' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'laptop', label: 'Laptop' },
                  { id: 'dual', label: 'Dual-Device' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={activeDeviceFilter === f.id}
                  onClick={() => setActiveDeviceFilter(f.id)}
                  className={`flex-1 sm:flex-initial min-h-[40px] px-3.5 py-1.5 rounded-md transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] text-center ${
                    activeDeviceFilter === f.id
                      ? 'bg-[#e7005e] text-white font-semibold shadow-sm'
                      : 'text-[#bfbfbf] hover:text-white hover:bg-[#18132b]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scenarios Grid (Section 5.E) */}
          {filteredScenarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredScenarios.map((scenario) => {
                const isFeatured = scenario.id === 'scenario-1-kyc';

                return (
                  <article
                    key={scenario.id}
                    className={`group relative rounded-xl border p-5 flex flex-col justify-between transition duration-200 ${
                      isFeatured
                        ? 'border-[#e7005e]/60 bg-[#120c22] shadow-lg shadow-[#e7005e]/10 hover:border-[#e7005e]'
                        : 'border-[#231b40] bg-[#0c0919] hover:border-[#3b2d69] hover:bg-[#140e2a]'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-[#e7005e]">
                          #{String(scenario.scenarioNumber).padStart(2, '0')}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="rounded bg-[#1b1532] border border-[#2b214f] px-2 py-0.5 text-[10px] font-mono font-medium text-[#bfbfbf]">
                            {formatDevice(scenario.device)}
                          </span>
                        </div>
                      </div>

                      {/* Threat Tag */}
                      <div className="mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#bfbfbf]">
                          {formatWeaknessTag(scenario.weaknessTag)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-white">
                        {scenario.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#bfbfbf] leading-relaxed line-clamp-3 mb-4">
                        {scenario.description}
                      </p>
                    </div>

                    <div>
                      {/* Safe Action Summary Note */}
                      <div className="pt-3 border-t border-[#130f25] mb-4">
                        <div className="text-[11px] font-semibold text-[#e7005e] mb-1">
                          Key Learning:
                        </div>
                        <div className="text-[11px] text-[#888888] line-clamp-2 leading-normal">
                          {scenario.learningOutcome}
                        </div>
                      </div>

                      {/* Launch Action Button */}
                      <button
                        type="button"
                        onClick={() => handleLaunchScenario(scenario.id)}
                        className={`w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] ${
                          isFeatured
                            ? 'bg-[#e7005e] text-white hover:bg-[#ff1a75] active:bg-[#b8004b]'
                            : 'border border-[#231b40] bg-[#100c1e] text-[#bfbfbf] hover:border-[#e7005e] hover:bg-[#18132b] hover:text-white'
                        }`}
                      >
                        <span>Launch Simulation</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Accessible Empty State */
            <div className="rounded-xl border border-[#231b40] bg-[#0c0919] p-12 text-center">
              <Info className="h-8 w-8 text-[#e7005e] mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No Scenarios Match Filter</h3>
              <p className="text-sm text-[#bfbfbf] mb-4">
                No simulated environments match the selected device category.
              </p>
              <button
                type="button"
                onClick={() => setActiveDeviceFilter('all')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#e7005e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff1a75]"
              >
                Reset Filter to All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: TRUST AND LEARNING VALUE                                       */}
      {/* ========================================================================= */}
      <section
        id="learning-value"
        aria-label="Trust and Learning Value"
        className="relative z-10 py-16 sm:py-24 border-b border-[#130f25] bg-[#05040a]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 5 Columns: Headline & Mission */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#e7005e] tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                <span>Evidence-Based Training</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Why Practice Outperforms Static Lectures
              </h2>
              <p className="text-sm sm:text-base text-[#bfbfbf] leading-relaxed">
                Reading security guidelines doesn't build muscle memory. When an urgent message arrives during a busy day, emotional triggers override intellectual recall. Second Signal closes that gap through experiential practice.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartPracticing}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#e7005e] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#ff1a75] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e]"
                >
                  <span>Start Practice Session</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right 7 Columns: Real Product Values (Section 5.F) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Value 1 */}
              <div className="rounded-xl border border-[#231b40] bg-[#0e0a1d] p-5 transition hover:border-[#382b64]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e] mb-3.5">
                  <Shield className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Practice with simulated cyber threats
                </h3>
                <p className="text-xs text-[#bfbfbf] leading-relaxed">
                  Engage safely with realistic smishing, spear-phishing, rogue remote popups, and QR scams without exposing real credentials or corporate credentials.
                </p>
              </div>

              {/* Value 2 */}
              <div className="rounded-xl border border-[#231b40] bg-[#0e0a1d] p-5 transition hover:border-[#382b64]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e] mb-3.5">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Recognize warning signs before responding
                </h3>
                <p className="text-xs text-[#bfbfbf] leading-relaxed">
                  Train your attention to catch deceptive top-level domains, unexpected MFA pushes, unprompted OTP requests, and subtle micro-payment fee traps.
                </p>
              </div>

              {/* Value 3 */}
              <div className="rounded-xl border border-[#231b40] bg-[#0e0a1d] p-5 transition hover:border-[#382b64]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e] mb-3.5">
                  <Clock className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Understand how everyday decisions compromise security
                </h3>
                <p className="text-xs text-[#bfbfbf] leading-relaxed">
                  Witness exactly how an attacker leverages a hasty tap into data exfiltration, account takeovers, and fraudulent fund transfers in safe replay steps.
                </p>
              </div>

              {/* Value 4 */}
              <div className="rounded-xl border border-[#231b40] bg-[#0e0a1d] p-5 transition hover:border-[#382b64]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231b40] bg-[#18132b] text-[#e7005e] mb-3.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Learn practical actions for handling suspicious messages
                </h3>
                <p className="text-xs text-[#bfbfbf] leading-relaxed">
                  Reinforce the exact protocol to follow: verifying through verified apps, contacting help desks via official channels, and reporting suspicious requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: FINAL CTA                                                      */}
      {/* ========================================================================= */}
      <section
        id="cta"
        aria-label="Get Started"
        className="relative z-10 py-16 sm:py-24 border-b border-[#130f25]"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="rounded-2xl border border-[#231b40] bg-gradient-to-b from-[#130c25] to-[#08060f] p-8 sm:p-12 shadow-2xl">
            {/* Shield Icon Badge */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#231b40] bg-[#18132b] text-[#e7005e] shadow-inner">
              <Shield className="h-7 w-7" />
            </div>

            {/* Final Headline (Section 5.G) */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              The next suspicious message deserves a second look.
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#bfbfbf] max-w-xl mx-auto mb-8 leading-relaxed">
              Start with a scenario. Learn the signs. Make a safer decision next time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleStartPracticing}
                className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#e7005e] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e7005e]/25 transition hover:bg-[#ff1a75] active:bg-[#b8004b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span>Start Practicing</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setStage('SCENARIOS_HUB')}
                className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#231b40] bg-[#100c1e] px-6 py-3.5 text-sm font-semibold text-[#bfbfbf] transition hover:border-[#382b64] hover:bg-[#18132b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7005e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Radio className="h-4 w-4 text-[#e7005e]" />
                <span>Explore All 8 Scenarios</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-12 bg-black text-[#bfbfbf] text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#130f25]">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#231b40] bg-[#100c1e] text-[#e7005e]">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <span className="font-heading text-sm font-bold text-white tracking-tight">
                  Second Signal
                </span>
                <p className="text-[11px] text-[#888888]">
                  Interactive Cybersecurity Awareness Simulation
                </p>
              </div>
            </div>

            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e7005e] rounded"
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e7005e] rounded"
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={scrollToScenarios}
                className="hover:text-white transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e7005e] rounded"
              >
                Scenarios
              </button>
              <button
                type="button"
                onClick={() => setStage('SCENARIOS_HUB')}
                className="hover:text-white transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e7005e] rounded"
              >
                8 Scenarios Lab
              </button>
            </nav>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#555555]">
            <p>
              Second Signal operates entirely in-memory within your browser. No personal credentials, emails, or financial information are collected or transmitted.
            </p>
            <p className="shrink-0">
              © {new Date().getFullYear()} Second Signal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
