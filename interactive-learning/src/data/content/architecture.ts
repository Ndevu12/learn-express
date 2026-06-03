import type { LabeledItem } from '../types';

export const architectureContent = {
  intro:
    'Click on any layer to learn about its role, responsibilities, and how it connects with adjacent layers. This architecture enables scalable, maintainable production applications.',
  separationPrinciple: {
    title: 'Key Principle: Separation of Concerns',
    body: 'Each layer has a single, well-defined responsibility. Routes handle URL matching. Middleware processes requests. Controllers handle HTTP logic. Services contain business logic. Repositories manage data access. This separation makes code easier to test, maintain, and scale. Changes to the database don\'t require changing controllers. Business logic changes don\'t require changing routes.',
  } satisfies LabeledItem,
  quickInfoLabel: 'Purpose',
  keyPointsLabel: 'Key Points',
  codeExampleLabel: 'Code Example',
} as const;
