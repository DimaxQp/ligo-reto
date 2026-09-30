import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { browser } from '@wdio/globals';

const here = fileURLToPath(new URL('.', import.meta.url));
const evidence = resolve(here, 'evidence');
const app = process.env.ANDROID_APP || resolve(here, 'apps/mda-2.2.0-25.apk');
let executed = 0;

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./tests/**/*.spec.ts'],
  maxInstances: 1,
  hostname: '127.0.0.1', port: 4723, path: '/',
  logLevel: 'info', outputDir: resolve(evidence, 'logs'),
  connectionRetryCount: 0, connectionRetryTimeout: 120_000,
  waitforTimeout: 15_000,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    ...(process.env.ANDROID_UDID ? { 'appium:udid': process.env.ANDROID_UDID } : {}),
    'appium:app': app,
    'appium:appPackage': 'com.saucelabs.mydemoapp.android',
    'appium:appActivity': 'com.saucelabs.mydemoapp.android.view.activities.SplashActivity',
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.android.view.activities.MainActivity',
    'appium:fullReset': true,
    'appium:noReset': false,
    'appium:autoGrantPermissions': true,
    'appium:language': 'en', 'appium:locale': 'US',
    'appium:newCommandTimeout': 120,
  }],
  services: [['appium', { logPath: resolve(evidence, 'appium'), args: { address: '127.0.0.1', port: 4723 } }]],
  framework: 'mocha',
  reporters: ['spec', ['junit', { outputDir: resolve(evidence, 'junit') }]],
  mochaOpts: { ui: 'bdd', timeout: 120_000, retries: 0 },
  onPrepare: () => {
    mkdirSync(evidence, { recursive: true });
    if (!existsSync(app)) throw new Error('Falta APK. Ejecuta npm run app:download desde la raíz del proyecto Mobile.');
  },
  beforeTest: async () => {
    // Cada test obtiene instalación y memoria nuevas, incluso si el anterior falló.
    if (executed++ > 0) await browser.reloadSession();
  },
  afterTest: async (test, _context, result) => {
    const name = test.title.replace(/[^a-zA-Z0-9-]/g, '_');
    await browser.saveScreenshot(resolve(evidence, `${name}.png`));
    writeFileSync(resolve(evidence, `${name}.xml`), await browser.getPageSource());
    writeFileSync(resolve(evidence, `${name}.json`), JSON.stringify({ title: test.title, passed: result.passed, duration: result.duration, timestamp: new Date().toISOString() }, null, 2));
  },
};
