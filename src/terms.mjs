// SPDX-License-Identifier: BUSL-1.1
// MADRE · © 2026 Jossue Alcalá · Business Source License 1.1: LICENSE
// Privacy notice for ZM Studio: no data leaves the machine.

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const TERMS_VERSION = '2026-11-04';
export const TERMS_LINKS = {
  license: { es: 'https://github.com/zarzmra/ZM-Studio/blob/main/LICENSE', en: 'https://github.com/zarzmra/ZM-Studio/blob/main/LICENSE' },
  privacy: { es: 'https://github.com/zarzmra/ZM-Studio/blob/main/PRIVACY.md', en: 'https://github.com/zarzmra/ZM-Studio/blob/main/PRIVACY.md' },
};

export const termsWaived = (env = process.env) => env.PULSE_TEST_MODE === '1' || env.PULSE_TERMS === 'accepted';

export async function readTerms(root, { env = process.env } = {}) {
  if (termsWaived(env)) return { accepted: true, version: TERMS_VERSION, at: null, waived: true };
  try {
    const kept = JSON.parse(await readFile(join(root, 'terms.json'), 'utf8'));
    return { accepted: kept?.version === TERMS_VERSION, version: TERMS_VERSION, at: typeof kept?.at === 'string' ? kept.at : null, previous: kept?.version ?? null };
  } catch {
    return { accepted: false, version: TERMS_VERSION, at: null, previous: null };
  }
}

export async function acceptTerms(root, { now = new Date() } = {}) {
  const kept = { version: TERMS_VERSION, at: now.toISOString() };
  await writeFile(join(root, 'terms.json'), `${JSON.stringify(kept)}\n`);
  return { accepted: true, ...kept };
}

// Whether this copy was in use before 1.1.0 (src/install-metrics.mjs, lifecycle.json `before`): it
// is told what changed instead of being welcomed as new.
export async function cameFromBefore(root) {
  try { return JSON.parse(await readFile(join(root, 'lifecycle.json'), 'utf8'))?.before === true; } catch { return false; }
}
