import { existsSync, mkdirSync, cpSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const destination = resolve(root, 'evidence/runs', stamp);
mkdirSync(destination, { recursive: true });
const entries = [
  ['web', 'web/evidence'], ['api/karate', 'api/target/karate-reports'],
  ['api/surefire', 'api/target/surefire-reports'], ['mobile', 'mobile/evidence'],
];
const manifest = { collectedAt: new Date().toISOString(), note: 'Copia de archivos disponibles; no demuestra una nueva ejecución.', sources: [] };
for (const [name, source] of entries) {
  const available = existsSync(resolve(root, source));
  if (available) cpSync(resolve(root, source), resolve(destination, name), { recursive: true });
  manifest.sources.push({ module: name, source, available });
}
writeFileSync(resolve(destination, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(destination);
