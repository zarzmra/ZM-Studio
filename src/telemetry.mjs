// SPDX-License-Identifier: BUSL-1.1
// MADRE · © 2026 Jossue Alcalá · Business Source License 1.1: LICENSE
// Telemetry disabled in ZM Studio: no data is sent anywhere.

export const TELEMETRY_URL = '';
export const TELEMETRY_VERSION = 1;

export function telemetryOn() { return false; }

export class Telemetry {
  constructor() {}
  count() {}
  gauge() {}
  error() { return {}; }
  async flush() { return { sent: false, reason: 'disabled' }; }
  async forget() {}
  async settled() {}
  async batch() { return { days: [], errors: [] }; }
  async preview() { return {}; }
}
