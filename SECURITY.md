# Dependency security and releases

The package has no runtime dependencies. Development tooling is updated and audited in CI; weekly Dependabot PRs group compatible development updates. Audits fail on moderate or higher findings and check the runtime dependency graph separately.

## Current triage (8 November 2026)

High and moderate npm advisory findings have been resolved. Seven low-severity dependency-path findings remain from one upstream issue: [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) in `deepmerge`, via Jest/ts-jest. The audited upstream range has no patched current replacement. Jest reads repository-controlled configuration; these tools are development-only and are not included in the published library. Do not run tests or merge untrusted test configuration outside an isolated runner. Revisit when an upstream patch is released; the advisory is retained in audit output rather than suppressed or downgraded away.

Patched transitive `brace-expansion`, `minimatch`, and modern `glob` versions are pinned with npm overrides. Legacy glob consumers keep their existing API. `scripts/build-docs.mjs` adapts TypeDoc 0.28’s removed minimatch internal call to the public partial-match API; this compatibility patch is checked and applied before documentation generation. Builds, docs, tests, and package consumers verify the updated toolchain.

## Trusted release setup

The release workflow is `.github/workflows/release.yml`. It publishes only an existing version tag whose commit is on `main`, whose version matches `package.json`, and whose full checks and dependency audit pass. Prereleases use the `next` dist-tag. No long-lived npm publishing token is used.

Before the first release, a package maintainer must configure the npm trusted publisher for `@manticorp/ultraloot`:

- GitHub owner: `manticorp`
- Repository: `ultraloot`
- Workflow filename: `release.yml`
- Environment: `npm`

Create/configure the matching GitHub `npm` environment and its desired reviewer protection. A new npm trusted-publisher connection currently expires if its first publish is not completed within two days, so configure it when the release is ready. See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

Then bump the package and lockfile version in a reviewed PR, merge it, tag the merged commit as `v<version>`, and publish a GitHub release. The workflow can also be dispatched for that existing tag. Publishing is not triggered by PRs or ordinary branch pushes.
