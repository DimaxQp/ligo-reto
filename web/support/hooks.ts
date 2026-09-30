import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import 'allure-cucumberjs';
import * as allure from 'allure-js-commons';
import { chromium, firefox, selectors, type Browser } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { randomUUID } from 'node:crypto';
import { env, projectRoot, outputDir } from '../config/env';
import { ShopWorld } from './world';

let browser: Browser;
setDefaultTimeout(env.stepTimeout);
selectors.setTestIdAttribute('data-test');

BeforeAll(async () => { browser = await ({ chromium, firefox })[env.browser].launch({ headless: env.headless }); });
AfterAll(async () => { await browser?.close(); });

Before(async function (this: ShopWorld, { pickle }) {
  // El parámetro diferencia navegadores en Allure, sin tratarlos como retries.
  await allure.parameter('browser', env.browser);
  const id = pickle.name.match(/WEB-\d+[a-z]?/)?.[0] || 'scenario';
  this.artifactDir = resolve(outputDir, 'artifacts', id + '-' + randomUUID());
  mkdirSync(this.artifactDir, { recursive: true });
  const context = await browser.newContext({
    baseURL: env.baseURL, locale: 'en-US', viewport: { width: 1280, height: 720 },
    recordVideo: { dir: this.artifactDir },
  });
  this.context = context; // Asignación previa para cerrar aun si el setup posterior falla.
  context.setDefaultTimeout(env.expectTimeout);
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  await this.initialize(context);
});

AfterStep(async function (this: ShopWorld, { pickleStep, result }) {
  if (result?.status === Status.SKIPPED) return;
  if (!this.page || this.page.isClosed()) {
    await this.attach('No se pudo capturar: la página no está disponible.', 'text/plain');
    return;
  }
  const number = String(++this.stepNumber).padStart(2, '0');
  const name = `Paso ${number} - ${pickleStep.text}`;
  try {
    const png = await this.page.screenshot({ fullPage: true, timeout: 10_000 });
    writeFileSync(resolve(this.artifactDir, `step-${number}.png`), png);
    // Cucumber propaga este adjunto al paso actual en Allure y en su HTML.
    await this.attach(png, { mediaType: 'image/png', fileName: name + '.png' });
  } catch (error) {
    await this.attach(`Error al capturar ${name}: ${String(error)}`, 'text/plain');
    // Un error de evidencia no reemplaza la causa del paso que ya falló.
    if (result?.status === Status.PASSED) throw error;
  }
});

After(async function (this: ShopWorld, { pickle, result }) {
  if (!this.context) return;
  const failed = result?.status !== Status.PASSED;
  const video = this.page?.video();
  try {
    if (this.page && !this.page.isClosed() && (failed || pickle.tags.some(t => t.name === '@WEB-01'))) {
      const png = await this.page.screenshot({ fullPage: true });
      writeFileSync(resolve(this.artifactDir, 'screen.png'), png);
      await this.attach(png, 'image/png');
    }
    const tracePath = resolve(this.artifactDir, 'trace.zip');
    await this.context.tracing.stop({ path: tracePath });
    await this.attach('Trace: ' + relative(projectRoot, tracePath).split('\\').join('/'), 'text/plain');
  } finally {
    await this.context.close();
    if (video && !failed) await video.delete();
  }
});
