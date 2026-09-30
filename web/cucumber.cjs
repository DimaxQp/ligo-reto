require('tsx/cjs');
const { mkdirSync } = require('node:fs');
const { env, outputDir } = require('./config/env.ts');
mkdirSync(outputDir, { recursive: true });
// Rutas relativas de formatter evitan interpretar "C:" como separador de tipo.
const reportDir = 'evidence/' + env.browser;
const shared = {
    paths: ['features/**/*.feature'],
    requireModule: ['tsx/cjs'],
    require: ['support/**/*.ts', 'steps/**/*.ts'],
    parallel: env.workers,
    retry: 0,
    strict: true,
    publish: false,
};
module.exports = {
  default: {
    ...shared,
    format: ['progress', 'allure-cucumberjs/reporter:' + reportDir + '/allure-formatter.log', 'html:' + reportDir + '/report.html',
      'json:' + reportDir + '/results.json', 'junit:' + reportDir + '/junit.xml'],
    formatOptions: {
      resultsDir: 'evidence/allure-results',
      environmentInfo: { node: process.version, platform: process.platform },
    },
  },
  dry: { ...shared, dryRun: true, format: ['progress'] },
};
