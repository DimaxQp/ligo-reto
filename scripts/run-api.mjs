import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, delimiter } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const localTools = resolve(root, 'api/.tools');
const env = { ...process.env };
const localJdk = existsSync(localTools) && readdirSync(localTools).find(name => name.startsWith('jdk-'));
if (localJdk) {
  env.JAVA_HOME = resolve(localTools, localJdk);
  const pathKey = Object.keys(env).find(key => key.toLowerCase() === 'path') || 'PATH';
  env[pathKey] = resolve(env.JAVA_HOME, 'bin') + delimiter + (env[pathKey] || '');
}
const windows = process.platform === 'win32';
const portable = resolve(localTools, 'apache-maven-3.9.11/bin', windows ? 'mvn.cmd' : 'mvn');
const command = existsSync(portable) ? portable : windows ? 'mvn.cmd' : 'mvn';
const args = ['-B', '-ntp', 'test', ...(process.argv.includes('--smoke') ? ['-Dkarate.tags=@smoke'] : [])];
const result = windows
  ? spawnSync('powershell.exe', ['-NoProfile', '-Command', '& $env:QA_MAVEN -B -ntp test ' + (process.argv.includes('--smoke') ? "'-Dkarate.tags=@smoke'" : '') + '; exit $LASTEXITCODE'], { cwd: resolve(root, 'api'), env: { ...env, QA_MAVEN: command }, stdio: 'inherit' })
  : spawnSync(command, args, { cwd: resolve(root, 'api'), env, stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
