const { readFileSync, mkdirSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const root = resolve(__dirname, '..');
const browsers = ['chromium', 'firefox'];
const runs = browsers.map(browser => {
  const report = JSON.parse(readFileSync(resolve(root, 'evidence', browser, 'results.json'), 'utf8'));
  const scenarios = report.flatMap(feature => feature.elements || []).filter(element => element.type === 'scenario');
  if (scenarios.length !== 8) throw new Error(`Se esperaba regresión completa de 8 escenarios en ${browser}`);
  const details = scenarios.map(scenario => {
    const results = [...(scenario.before || []), ...scenario.steps, ...(scenario.after || [])];
    return { name: scenario.name, passed: results.every(step => step.result?.status === 'passed') };
  });
  return { browser, scenarios: details.length, passed: details.filter(s => s.passed).length,
    failedOrIncomplete: details.filter(s => !s.passed).length, details };
});
const summary = { generatedAt: new Date().toISOString(), runner: 'Cucumber.js',
  cucumber: require('@cucumber/cucumber/package.json').version,
  playwright: require('@playwright/test/package.json').version,
  command: 'npm run test:regression', runs };
mkdirSync(resolve(root, 'evidence/baseline'), { recursive: true });
writeFileSync(resolve(root, 'evidence/baseline/resumen.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(runs.map(run => `${run.browser}: ${run.passed}/${run.scenarios}`).join('\n'));
if (runs.some(run => run.failedOrIncomplete > 0)) process.exitCode = 1;
