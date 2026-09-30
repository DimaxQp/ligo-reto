const { existsSync } = require('node:fs');
const { resolve } = require('node:path');
const { spawn } = require('node:child_process');
require('dotenv').config({ path: resolve(__dirname, '../.env'), quiet: true });
const browser = process.argv[2] || process.env.BROWSER || 'chromium';
if (!['chromium', 'firefox'].includes(browser)) throw new Error('Navegador inválido');
const report = resolve(__dirname, '../evidence', browser, 'report.html');
if (!existsSync(report)) throw new Error('No existe el reporte; ejecuta primero npm test');
const command = process.platform === 'win32' ? 'powershell.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open';
const args = process.platform === 'win32' ? ['-NoProfile', '-Command', 'Start-Process -FilePath $env:QA_REPORT_HTML'] : [report];
const child = spawn(command, args, { env: { ...process.env, QA_REPORT_HTML: report }, stdio: 'ignore', windowsHide: true });
child.on('error', error => { console.error(error.message + '\nAbrir manualmente: ' + report); process.exitCode = 1; });

