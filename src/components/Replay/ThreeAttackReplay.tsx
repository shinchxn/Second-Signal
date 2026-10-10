import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  Crosshair,
  AlertTriangle,
  Brain,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Layers,
  ArrowRight,
  Info,
  Maximize2,
  Lock,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useSessionStore } from '../../state/sessionStore';

interface ReplayStep {
  id: string;
  stageNumber: number;
  label: string;
  whatYouSaw: string;
  whatAttackerWanted: string;
  psychologicalLever: string;
  defenseTactic: string;
  color: string;
  nodePos: [number, number, number];
}

const REPLAY_STEPS: ReplayStep[] = [
  {
    id: 'step-1-lure',
    stageNumber: 1,
    label: 'Initial Sensory Lure',
    whatYouSaw: 'An urgent SMS banner with banking branding stating your KYC verification was pending.',
    whatAttackerWanted: 'Trigger immediate fear of financial restriction to seize your initial attention.',
    psychologicalLever: 'Loss Aversion: Humans are neurologically wired to avoid losing access more than seeking gains.',
    defenseTactic: 'Assume unsolicited account-freeze warnings are manufactured. Do not react inside the alert.',
    color: '#0d9488', // teal-600
    nodePos: [-2.5, 1.8, 0],
  },
  {
    id: 'step-2-urgency',
    stageNumber: 2,
    label: 'Artificial Urgency & Deadline',
    whatYouSaw: 'A strict time constraint: "Complete verification before 7:00 PM today to avoid restriction."',
    whatAttackerWanted: 'Reduce your cognitive deliberation time and prevent you from cross-checking official sources.',
    psychologicalLever: 'Time-Pressure Tunneling: Narrowed attention shuts down skepticism and verification reflexes.',
    defenseTactic: 'When a message imposes an arbitrary same-day deadline, treat the urgency itself as the primary warning signal.',
    color: '#f59e0b', // amber-500
    nodePos: [-0.8, 0.6, 0.4],
  },
  {
    id: 'step-3-authority',
    stageNumber: 3,
    label: 'Authority Impersonation',
    whatYouSaw: 'A simulated "Verify KYC Now" portal using institutional styling and secure badges.',
    whatAttackerWanted: 'Borrow legitimacy from genuine financial regulators to make credential entry feel routine.',
    psychologicalLever: 'Authority Bias: Default trust in institutional design cues, logos, and security badges.',
    defenseTactic: 'Look at the address bar domain. No legitimate bank sends third-party verification URLs via SMS.',
    color: '#6366f1', // indigo-500
    nodePos: [0.8, -0.4, -0.2],
  },
  {
    id: 'step-4-capture',
    stageNumber: 4,
    label: 'Session & Token Harvest',
    whatYouSaw: 'A standard verification passcode input with a pre-filled customer name.',
    whatAttackerWanted: 'Acquire real-time multi-factor or session authentication tokens under live pressure.',
    psychologicalLever: 'Commitment Escalation: Having opened the link, your brain seeks to complete the task quickly.',
    defenseTactic: 'Never enter passcodes, PINs, or OTPs on pages opened from messaging hyperlinks.',
    color: '#ec4899', // pink-500
    nodePos: [2.2, -1.5, 0.2],
  },
  {
    id: 'step-5-impact',
    stageNumber: 5,
    label: 'Simulated Extraction Impact',
    whatYouSaw: 'Sudden unknown session detected and a simulated ₹5,000 transaction notification.',
    whatAttackerWanted: 'Exploit the session window before the victim realizes the deceit and revokes access.',
    psychologicalLever: 'Exploitation of lag: Capitalizing on the minutes before manual panic and card freezing.',
    defenseTactic: 'Immediate response: Revoke active device sessions and contact the bank using the number on your card.',
    color: '#ef4444', // red-500
    nodePos: [3.4, -2.4, 0],
  },
];

export const ThreeAttackReplay: React.FC = () => {
  const { setStage, selectedReplayNodeId, setSelectedReplayNodeId } = useSessionStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(1); // Default to Step 2 (Urgency)
  const currentStep = REPLAY_STEPS[activeStepIndex];

  // Sync with store
  useEffect(() => {
    setSelectedReplayNodeId(currentStep.id);
  }, [activeStepIndex, currentStep.id, setSelectedReplayNodeId]);

  // THREE.JS 3D Scene Initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth : 800;
    const height = parent ? parent.clientHeight : 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090d16');
    scene.fog = new THREE.FogExp2('#090d16', 0.08);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 2, 20);
    tealLight.position.set(-4, 3, 4);
    scene.add(tealLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2, 20);
    amberLight.position.set(4, -3, 4);
    scene.add(amberLight);

    // Particle Background Field
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Timeline Path & Nodes
    const nodeMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];

    const curvePoints = REPLAY_STEPS.map((s) => new THREE.Vector3(...s.nodePos));
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.04, 8, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x0f172a,
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // Interactive Node Spheres
    REPLAY_STEPS.forEach((step, idx) => {
      const isSelected = idx === activeStepIndex;
      const sphereGeo = new THREE.SphereGeometry(isSelected ? 0.32 : 0.22, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(step.color),
        roughness: 0.2,
        metalness: 0.5,
        emissive: new THREE.Color(step.color),
        emissiveIntensity: isSelected ? 0.8 : 0.3,
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(...step.nodePos);
      scene.add(mesh);
      nodeMeshes.push(mesh);

      // Outer Glowing Ring
      const ringGeo = new THREE.RingGeometry(0.38, 0.44, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(step.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isSelected ? 0.8 : 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(...step.nodePos);
      scene.add(ringMesh);
      ringMeshes.push(ringMesh);
    });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle particle drift
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = elapsedTime * 0.01;

      // Pulse active node
      ringMeshes.forEach((ring, idx) => {
        ring.lookAt(camera.position);
        if (idx === activeStepIndex) {
          const scale = 1 + Math.sin(elapsedTime * 4) * 0.12;
          ring.scale.set(scale, scale, scale);
        } else {
          ring.scale.set(1, 1, 1);
        }
      });

      // Target camera smoothly towards active node position
      const targetPos = REPLAY_STEPS[activeStepIndex].nodePos;
      const targetCamX = targetPos[0] * 0.4;
      const targetCamY = targetPos[1] * 0.4;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas || !parent) return;
      const newWidth = parent.clientWidth;
      const newHeight = parent.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [activeStepIndex]);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col px-4 py-6 sm:px-6">
      {/* Top Header */}
      <div className="mx-auto flex w-full max-w-6xl flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-teal-400">
              Forensic Reconstruction
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl">
            3D Attack Replay
          </h1>
        </div>

        {/* Action button to Diagnosis */}
        <button
          onClick={() => setStage('SCENARIO_1_DIAGNOSIS')}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10 shrink-0"
        >
          <span>Continue to Behavioral Diagnosis</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Main Dual-Perspective Canvas & Insight Grid */}
      <div className="mx-auto mt-4 grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 lg:grid-cols-12">
        {/* 3D Timeline Viewport (7 Cols) */}
        <div className="relative flex h-[340px] sm:h-[420px] lg:h-auto lg:col-span-7 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
          <canvas ref={canvasRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

          {/* Perspective Legend Pills */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono gap-1.5">
            <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 px-2 sm:px-2.5 py-1 text-teal-300 backdrop-blur-md">
              <Eye className="h-3 w-3 shrink-0" />
              <span className="hidden xs:inline">Sensory Input (Victim View)</span>
              <span className="xs:hidden">Victim View</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 px-2 sm:px-2.5 py-1 text-amber-300 backdrop-blur-md">
              <Crosshair className="h-3 w-3 shrink-0" />
              <span className="hidden xs:inline">Attacker Psychology Lever</span>
              <span className="xs:hidden">Attacker Lever</span>
            </div>
          </div>

          {/* Interactive Step Scrubber at Bottom of 3D Canvas */}
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-neutral-800 bg-neutral-900/90 p-1.5 sm:p-2 backdrop-blur-md">
            <div className="flex items-center justify-between gap-1">
              {REPLAY_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-1 flex-col items-center justify-center min-h-[44px] rounded-lg py-1 px-1 text-center transition ${
                    idx === activeStepIndex
                      ? 'bg-neutral-800 border border-neutral-700 text-neutral-100 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/40'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold">0{step.stageNumber}</span>
                  <span className="hidden sm:inline truncate text-[10px] max-w-[80px]">
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Forensic Inspector (5 Cols) */}
        <div className="flex flex-col lg:col-span-5 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-xl backdrop-blur-md"
            >
              <div>
                {/* Node Title Header */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: currentStep.color }}
                    />
                    <span className="font-mono text-xs text-neutral-400">
                      Step 0{currentStep.stageNumber} of 05
                    </span>
                  </div>
                  <span className="rounded bg-neutral-800 px-2 py-0.5 text-[11px] font-mono text-neutral-300">
                    {currentStep.label}
                  </span>
                </div>

                {/* Left vs Right Comparison Cards */}
                <div className="mt-4 space-y-3">
                  {/* What You Saw */}
                  <div className="rounded-xl border border-teal-500/20 bg-teal-950/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300">
                      <Eye className="h-3.5 w-3.5" />
                      <span>WHAT YOU SAW (Surface Message)</span>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-200 leading-relaxed">
                      "{currentStep.whatYouSaw}"
                    </p>
                  </div>

                  {/* What Attacker Wanted */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                      <Crosshair className="h-3.5 w-3.5" />
                      <span>WHAT THE ATTACKER SOUGHT (Conceptual Goal)</span>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-200 leading-relaxed">
                      {currentStep.whatAttackerWanted}
                    </p>
                  </div>

                  {/* Psychological Mechanism */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
                      <Brain className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Psychological Mechanism Exploited</span>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                      {currentStep.psychologicalLever}
                    </p>
                  </div>

                  {/* Defense Tactic */}
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Actionable Behavioral Neutralizer</span>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-200 leading-relaxed">
                      {currentStep.defenseTactic}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Stepper Controls */}
              <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs">
                <button
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeStepIndex === 0}
                  className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-800/80 px-3 py-1.5 text-neutral-300 disabled:opacity-40 transition hover:bg-neutral-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.min(REPLAY_STEPS.length - 1, prev + 1))
                  }
                  disabled={activeStepIndex === REPLAY_STEPS.length - 1}
                  className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-800/80 px-3 py-1.5 text-neutral-300 disabled:opacity-40 transition hover:bg-neutral-700"
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
