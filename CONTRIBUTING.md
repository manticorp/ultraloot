# Contributing to UltraLoot

Ultraloot is written in [TypeScript](https://www.typescriptlang.org/) and packed with [webpack](https://webpack.js.org/).

## Code Style

Please lint code using eslint with the "[neostandard](https://github.com/neostandard/neostandard)" code style (using semicolons). An ```eslint.config.js``` style file is present.

# Building

The following command is for building the final output files:

```
npm run build
```

The final build files appear in the ```dist``` folder, along with typings in ```dist/types```.

There are four output js files for different environments/uses.

Please build before submitting pull requests.

## Documentation and Examples

If you wish to make examples, please use:

```
npm run ci
```

To build the docs folder. This will give you the necessary JS files to run the examples locally, but the ```docs/code``` and ```docs/js``` files are not tracked.

# Tests

Please write tests for any new functionality.

Unit tests a run using [jest](https://jestjs.io/) on the typescript files themselves, using ```jest.config.js```.

The following commands are included for development:

```
npm run test
```

And a watch mode:

```
npm run test-watch
```

# Dev Code

During development, a ```dev``` folder is spawned (and not tracked) containing WIP copies of the js library.

This folder can be used for testing functionality (e.g place a ```node.js``` file in there with ```import ultraloot.js``` and/or a html file with ```<script type="module" src="demo.js"></script>```).

The following commands are used for dev work:

```
npm run dev
```

or watch mode:

```
npm run watch
```

# Pull Requests

Please make all code contributions as pull requests.

All tests should be passing before submitting the PR.

If this becomes an issue I will set up an automated tests thing.
## TypeScript compiler versions

`npm run typecheck` uses TypeScript 7 to check source and tests. Packed ESM and CommonJS consumers are checked by both TypeScript 7 and 6.

The `@typescript/native` npm alias provides TypeScript 7 and `tsc`. The `typescript` alias points to the official `@typescript/typescript6` compatibility package, providing the compiler API required by ts-jest, ts-loader, TypeDoc and declaration bundling. Its CLI is `tsc6`, so it does not compete for the native `tsc` executable. Keep this alias while those tools require the older API; do not bypass peer dependency validation. See [Microsoft’s side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60).
