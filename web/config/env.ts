import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';

// Se ejecuta directamente desde config/; resuelve .env respecto al módulo Web.
export const projectRoot = resolve(__dirname, '..');
loadEnv({ path: resolve(projectRoot, '.env'), quiet: true });

function positiveInteger(name: string, fallback: number): number {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value <= 0) throw new Error(`${name} debe ser un entero positivo`);
  return value;
}
const browser = process.env.BROWSER || 'chromium';
if (!['chromium', 'firefox'].includes(browser)) throw new Error('BROWSER debe ser chromium o firefox');
const headless = process.env.HEADLESS ?? 'true';
if (!['true', 'false'].includes(headless)) throw new Error('HEADLESS debe ser true o false');
const baseURL = process.env.WEB_BASE_URL || 'https://www.saucedemo.com';
if (!['http:', 'https:'].includes(new URL(baseURL).protocol)) throw new Error('WEB_BASE_URL debe ser HTTP(S)');

const taxRate = process.env.WEB_TAX_RATE_PERCENT ?? '8';
if (!/^\d+(\.\d{1,2})?$/.test(taxRate) || Number(taxRate) > 100) {
  throw new Error('WEB_TAX_RATE_PERCENT debe estar entre 0 y 100, con máximo dos decimales');
}

export const env = {
  taxBasisPoints: Math.round(Number(taxRate) * 100),
  baseURL,
  browser: browser as 'chromium' | 'firefox',
  headless: headless === 'true',
  username: process.env.WEB_USERNAME || 'standard_user',
  password: process.env.WEB_PASSWORD || 'secret_sauce',
  lockedUsername: process.env.WEB_LOCKED_USERNAME || 'locked_out_user',
  stepTimeout: positiveInteger('STEP_TIMEOUT_MS', 45_000),
  expectTimeout: positiveInteger('EXPECT_TIMEOUT_MS', 10_000),
  workers: positiveInteger('CUCUMBER_WORKERS', 2),
};
export const outputDir = resolve(projectRoot, 'evidence', env.browser);

