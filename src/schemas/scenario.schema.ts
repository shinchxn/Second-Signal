import { z } from 'zod';

export const ScenarioSchema = z.object({
  id: z.string(),
  title: z.string().default('Simulated Scenario'),
  channel: z.enum(['messaging', 'email']),
  attackType: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),

  victimMessage: z.object({
    sender: z.string(),
    senderHandle: z.string().optional(),
    avatarBg: z.string().optional(),
    subject: z.string().optional(),
    body: z.string(),
    ctaLabel: z.string().optional(),
    fakeUrl: z.string().optional(),
    timestamp: z.string().default('Just now'),
  }),

  weaknessTag: z.enum([
    'urgency',
    'authority_bias',
    'financial_fear',
    'curiosity',
    'social_pressure',
  ]),

  redFlags: z.array(z.string()),

  coachExplanation: z.string(),

  attackerTimeline: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      whatYouSaw: z.string(),
      whatAttackerWanted: z.string(),
    })
  ),

  contextNarration: z.string().default('Reviewing daily communications.'),
  safeAlternatives: z.array(z.string()).default([
    'Verify through the official app or website directly',
    'Check official support channels without clicking links',
    'Look for unprompted artificial deadlines',
  ]),
});

export type ScenarioGenerated = z.infer<typeof ScenarioSchema>;
