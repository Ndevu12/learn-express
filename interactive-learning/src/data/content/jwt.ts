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
  practical: {
    title: 'Try it: send the token',
    body: 'After login, every protected request needs Authorization: Bearer <token>. Copy the snippets in **Call the API: fetch & axios** (last Day 4 module) and compare with DevTools → Network in the Taskflow UI.',
  },
  lifecycleSummary: {
    title: 'Lifecycle Summary',
    steps: [
      'User logs in → JWT generated with user ID and role (authentication)',
      'Client stores token (localStorage or a variable in your script)',
      'fetch() or axios sends Authorization: Bearer on each protected request',
      'Server verifies signature and expiration (authentication)',
      'If valid, user identity is attached to the request',
      'Separate authorization middleware decides if the action is allowed (403 if not)',
    ],
  },
  verificationChecksLabel: 'Verification checks (authentication):',
} as const;
