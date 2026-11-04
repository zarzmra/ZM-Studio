// SPDX-License-Identifier: BUSL-1.1
// MADRE · © 2026 Jossue Alcalá · Business Source License 1.1: LICENSE

import { language, t } from './i18n.js';
import { trazoDrawing } from './icons.js';

export const AUTHOR = 'Jossue Alcalá';
export const AUTHOR_URL = 'https://jossuealcala.com';
export const YEAR = 2026;
export const LICENSE_NAME = 'Business Source License 1.1';
export const builtWith = (lang = language()) => (lang === 'en' ? `Built with MADRE by ${AUTHOR}` : `Desarrollado con MADRE de ${AUTHOR}`);
const REPO = 'https://github.com/zarzmra/ZM-Studio';
export const LEGAL_LINKS = {
  license: `${REPO}/blob/main/LICENSE`,
  source: REPO,
};

export function drawAttribution(host, version) {
  if (!host || !version) return null;
  const link = document.createElement('a');
  link.className = 'colophon-link';
  link.href = AUTHOR_URL;
  link.target = '_blank';
  link.rel = 'noopener';
  const name = document.createElement('b');
  name.textContent = `ZM ${version}`;
  link.append(name, document.createTextNode(` · ${builtWith()}`));
  host.replaceChildren(link);
  host.hidden = false;
  return link;
}
