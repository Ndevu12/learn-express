import type { LabeledItem } from '../types';

export const architectureContent = {
  intro:
    'Maya uses the Taskflow React UI; each action becomes HTTP that moves through layers: React (Taskflow UI) → Route → Middleware → Controller → Service → Repository → Response. Click a layer to see its role and how it connects to the next hop.',
  separationPrinciple: {
    title: 'Key Principle: Separation of Concerns',
    body: 'Each layer has a single, well-defined responsibility. Routes handle URL matching. Middleware processes requests. Controllers handle HTTP logic. Services contain business logic. Repositories manage data access. This separation makes code easier to test, maintain, and scale. Changes to the database don\'t require changing controllers. Business logic changes don\'t require changing routes.',
  } satisfies LabeledItem,
  quickInfoLabel: 'Purpose',
  keyPointsLabel: 'Key Points',
  codeExampleLabel: 'Code Example',
} as const;
