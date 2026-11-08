# Unreleased

- Fixed disabled and exhausted unique drops, deep/shared table graph serialization, omitted unique flags, default RNG restoration, repeated collapse mutations, and ignored zero/empty seeds.
- Fixed absolute HTTP/file URLs, HTTP status diagnostics, relative nested references, reference cycles, and native Node module loading. Explicit `path` continues to be the shared base for nested references; without it, references resolve relative to their containing document.
- Implemented `saveTable()` for complete JSON graphs. It requires an explicit destination directory and refuses overwrites unless `overwrite: true` is supplied. `loadTables()` reads these files; `loadTable()` reads a single definition with external references.
- Sync rolls reject async callbacks before invocation and reject Promise/thenable returns. A regular function may start asynchronous side effects before returning a Promise; callbacks used in sync rolls must be fully synchronous. Async pool modifiers now run in result order, matching sync behaviour. Failed nested rolls release inherited callback state. Randomized null weights are sampled once per pool roll.
- Added `validateTable()`, path-specific diagnostics, and a published JSON schema, with structural checks against the documented examples. Fixed malformed example JSON and an omitted table reference.
- Corrected Gamma, Beta, Beta-binomial, Student t, and Wigner sampling using the dependency-free sampler embedded from GameRNG. The legacy UltraLoot uniform engine and its established sequence are preserved. Serialized states now record `samplingVersion: 2`; corrected derived distributions can change seeded outcomes and RNG consumption. Restoring old states uses the corrected samplers.
- Added ESM/CJS declarations, packed-package ESM/CJS/browser tests, PR validation on Node 22/24, and repeatable benchmark scenarios. Disabled logging no longer formats messages on the roll path; result arrays use the native Array subclass prototype rather than allocating a new prototype per result collection.

Run `npm run check` for embedded-source integrity, types, tests, builds, and packed-package consumers. When updating sampling code from a GameRNG checkout, run `npm run sync:rng -- --source ../gamerng`. After building both projects, run `npm run test:parity -- --source ../gamerng` to compare the sampling APIs under identical injected randomness.

Run `npm run benchmark` after building. `benchmarks/baseline.json` records local before/after measurements, not CI thresholds or guarantees for other machines.
