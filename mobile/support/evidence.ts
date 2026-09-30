import { browser } from '@wdio/globals';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
export async function captureCheckoutStage(stage: string) {
  const directory = new URL('../evidence/checkout/', import.meta.url);
  mkdirSync(directory, { recursive: true });
  await browser.saveScreenshot(fileURLToPath(new URL(stage + '.png', directory)));
}
