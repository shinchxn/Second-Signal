import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { ScenarioSchema } from './src/schemas/scenario.schema.ts';
import { fallbackScenario1, fallbackScenario2 } from './src/scenarios/fallbackScenarios.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Generate or customize adaptive scenario via Gemini
app.post('/api/scenario/generate', async (req, res) => {
  const { channel, weaknessTag, difficulty, context } = req.body;

  const targetChannel = channel === 'email' ? 'email' : 'messaging';
  const targetWeakness = weaknessTag || 'urgency';

  const ai = getAI();
  if (!ai) {
    // Return appropriate fallback
    const fallback = targetChannel === 'email' ? fallbackScenario2 : fallbackScenario1;
    return res.json({ scenario: fallback, source: 'fallback_offline' });
  }

  try {
    const prompt = `You are a cybersecurity simulation engine. Generate a realistic phishing / social engineering scenario for cybersecurity awareness training.
Crucial requirements:
- NEVER use real URLs, real credentials, malware, or exploit instructions. Use clearly inert fictional URLs like secure-auth-test.invalid or apexcorp-internal-auth.net.
- Weakness to target: "${targetWeakness}" (e.g. artificial urgency, deadline pressure).
- Channel: "${targetChannel}" (either messaging or email).
- Context: "${context || 'Personal financial or corporate IT account verification'}".
- The message MUST contain realistic psychological leverage (such as "must complete before 6:00 PM to avoid temporary restrictions") without being labeled as phishing.

Return a valid JSON scenario matching the exact requested schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            channel: { type: Type.STRING, enum: ['messaging', 'email'] },
            attackType: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['easy', 'medium', 'hard'] },
            victimMessage: {
              type: Type.OBJECT,
              properties: {
                sender: { type: Type.STRING },
                senderHandle: { type: Type.STRING },
                subject: { type: Type.STRING },
                body: { type: Type.STRING },
                ctaLabel: { type: Type.STRING },
                fakeUrl: { type: Type.STRING },
                timestamp: { type: Type.STRING },
              },
              required: ['sender', 'body'],
            },
            weaknessTag: {
              type: Type.STRING,
              enum: ['urgency', 'authority_bias', 'financial_fear', 'curiosity', 'social_pressure'],
            },
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            coachExplanation: { type: Type.STRING },
            attackerTimeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  description: { type: Type.STRING },
                  whatYouSaw: { type: Type.STRING },
                  whatAttackerWanted: { type: Type.STRING },
                },
                required: ['id', 'label', 'description', 'whatYouSaw', 'whatAttackerWanted'],
              },
            },
            contextNarration: { type: Type.STRING },
            safeAlternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'id',
            'channel',
            'attackType',
            'difficulty',
            'victimMessage',
            'weaknessTag',
            'redFlags',
            'coachExplanation',
            'attackerTimeline',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const validated = ScenarioSchema.safeParse(parsed);

    if (validated.success) {
      return res.json({ scenario: validated.data, source: 'gemini' });
    } else {
      console.warn('Scenario validation failed against schema, using fallback:', validated.error);
      const fallback = targetChannel === 'email' ? fallbackScenario2 : fallbackScenario1;
      return res.json({ scenario: fallback, source: 'fallback_validation_recovery' });
    }
  } catch (error) {
    console.error('Gemini scenario generation error:', error);
    const fallback = targetChannel === 'email' ? fallbackScenario2 : fallbackScenario1;
    return res.json({ scenario: fallback, source: 'fallback_error_recovery' });
  }
});

// AI Coach Behavioral Diagnosis
app.post('/api/coach/feedback', async (req, res) => {
  const { outcome, weaknessTag, scenarioType, userAction } = req.body;

  const ai = getAI();
  if (!ai) {
    const fallbackMessage =
      outcome === 'recognized'
        ? 'Excellent recognition! You noticed the artificial urgency trigger before committing any action. The attacker tried to create an immediate deadline, but you paused and cross-examined the source.'
        : "You didn't miss the message because it was clever; you acted because it felt urgent. That artificial deadline triggered a rapid response before your brain could verify the channel.";
    return res.json({ message: fallbackMessage });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are NOVA, a supportive, elite cybersecurity behavioural coach for Attack Replay.
The student just experienced a simulated scenario.
Outcome: ${outcome} (either 'missed' or 'recognized').
Weakness trigger: ${weaknessTag || 'urgency'}.
Scenario type: ${scenarioType || 'banking or corporate'}.
User action: ${userAction || 'interacted with the message'}.

Guidelines:
- 2 to 3 concise, impactful sentences maximum.
- NEVER shame the user or say "You are bad at cybersecurity".
- Focus purely on the behavioral mechanism: how artificial urgency narrows cognitive focus and forces rushed action.
- Speak with calm, professional warmth.`,
    });

    return res.json({ message: response.text?.trim() });
  } catch (err) {
    console.error('Coach feedback error:', err);
    return res.json({
      message:
        "The message weaponized artificial urgency to reduce your verification window. Recognizing that pressure sensation is the key to stopping social engineering before it starts.",
    });
  }
});

// Vite Middleware for development / Production Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Attack Replay Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
