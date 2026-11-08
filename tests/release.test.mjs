import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

function fixture (run) {
  const dir = mkdtempSync(join(tmpdir(), 'release-guard-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' });
  try {
    mkdirSync(join(dir, 'scripts'));
    writeFileSync(join(dir, 'scripts/check-release.mjs'), readFileSync(new URL('../scripts/check-release.mjs', import.meta.url)));
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'fixture', version: '0.4.0' }));
    git('init', '-b', 'main'); git('add', '.');
    git('-c', 'user.name=Release test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'fixture');
    git('update-ref', 'refs/remotes/origin/main', 'HEAD'); git('tag', 'v0.4.0');
    run({ dir, git, check: tag => spawnSync(process.execPath, ['scripts/check-release.mjs'], { cwd: dir, env: { ...process.env, RELEASE_TAG: tag }, encoding: 'utf8' }) });
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
test('a matching tag on main is accepted', () => fixture(({ check }) => { assert.equal(check('v0.4.0').status, 0); }));
test('missing, mismatched and malformed tags are rejected', () => fixture(({ check }) => {
  for (const tag of ['', 'v0.5.0', 'main', 'v0.4.0;echo nope']) assert.notEqual(check(tag).status, 0);
}));
test('a tag on an unmerged feature commit is rejected', () => fixture(({ dir, git, check }) => {
  git('switch', '-c', 'feature');
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'fixture', version: '0.4.0-feature' }));
  git('add', '.'); git('-c', 'user.name=Release test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'feature');
  git('tag', 'v0.4.0-feature'); assert.notEqual(check('v0.4.0-feature').status, 0);
}));
