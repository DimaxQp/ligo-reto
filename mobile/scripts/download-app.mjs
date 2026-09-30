import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const lock = JSON.parse(await readFile(new URL('../app-lock.json', import.meta.url), 'utf8'));
const response = await fetch(lock.url);
if (!response.ok) throw new Error(`APK download: HTTP ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
const sha256 = createHash('sha256').update(bytes).digest('hex');
if (sha256 !== lock.sha256) throw new Error(`APK checksum mismatch: ${sha256}`);
const directory = new URL('../apps/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL(lock.filename, directory), bytes);
console.log(`APK ${lock.version} verified: ${sha256}`);
