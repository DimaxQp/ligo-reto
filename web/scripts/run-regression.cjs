const { spawnSync } = require('node:child_process');
const { dirname, resolve } = require('node:path');
const projectRoot = resolve(__dirname, '..');
const manifestPath = require.resolve('@cucumber/cucumber/package.json');
const cli = resolve(dirname(manifestPath), require(manifestPath).bin['cucumber-js']);
let exitCode = 0;
for (const browser of ['chromium', 'firefox']) {
  console.log('\nRunning Cucumber: ' + browser);
  const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
    cwd: projectRoot, env: { ...process.env, BROWSER: browser }, stdio: 'inherit',
  });
  if (result.error) console.error(result.error.message);
  if (result.error || result.status !== 0) exitCode = 1;
}
process.exitCode = exitCode;
