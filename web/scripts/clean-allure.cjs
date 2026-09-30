const { rmSync } = require('node:fs');
const { resolve, relative, isAbsolute } = require('node:path');
const evidenceRoot = resolve(__dirname, '../evidence');
const results = resolve(evidenceRoot, 'allure-results');
const inside = relative(evidenceRoot, results);
if (inside !== 'allure-results' || isAbsolute(inside) || inside.startsWith('..')) {
  throw new Error('La limpieza solo puede afectar evidence/allure-results');
}
// Solo resultados generados; la matriz llama esto una vez, antes de ambos browsers.
rmSync(results, { recursive: true, force: true });
