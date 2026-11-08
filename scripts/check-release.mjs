import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const tag = process.env.RELEASE_TAG;
if (!tag || !/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag)) throw new Error('RELEASE_TAG must be a version tag such as v0.4.0');
if (tag !== `v${pkg.version}`) throw new Error('Release tag must exactly match package.json version');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (git('rev-parse', `${tag}^{commit}`) !== git('rev-parse', 'HEAD')) throw new Error('Checkout must match the release tag');
git('merge-base', '--is-ancestor', 'HEAD', 'origin/main');
console.log(`Verified ${pkg.name}@${pkg.version} at ${tag} on main`);
