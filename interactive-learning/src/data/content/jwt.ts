import type { TabOption } from '../types';

export const jwtExplorerContent = {
  tabs: [
    { id: 'structure', label: 'Structure' },
    { id: 'lifecycle', label: 'Lifecycle' },
  ] satisfies TabOption<'structure' | 'lifecycle'>[],
  structureTitle: 'JWT Structure',
  partsLegendTitle: 'Token parts',
  importantNote: {
    title: 'Important',
    body: 'JWT is signed but not encrypted. Anyone can decode it, but only the server can verify the signature.',
  },
  signatureSecurity: {
    title: 'Signature Security',
    scenarios: [
      { title: 'Valid token', body: 'Server has secret key. Signature matches. Identity accepted (authentication).' },
      { title: 'Modified token', body: 'Payload changed but signature not recalculated. Identity rejected (401).' },
      { title: 'Wrong secret', body: 'Attacker signs with different secret. Verification fails (401).' },
    ],
  },
  lifecycleSummary: {
    title: 'Lifecycle Summary',
    steps: [
      'User logs in → JWT generated with user ID and role (authentication)',
      'Client receives token and stores it',
      'Client sends token in Authorization header with each request',
      'Server verifies signature and expiration (authentication)',
      'If valid, user identity is attached to the request',
      'Separate authorization middleware decides if the action is allowed (403 if not)',
    ],
  },
  verificationChecksLabel: 'Verification checks (authentication):',
} as const;
