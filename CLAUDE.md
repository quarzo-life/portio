# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

`@quarzo-life/portio` — a Deno/JSR library for safely tracking positions in
UCITS fund shares (and other instruments). Sibling project to
[`@quarzo-life/moneta`](https://github.com/quarzo-life/moneta): same philosophy
applied to share counts instead of money — a position is an integer `quantity`
at a decimal `scale`, and no operation ever does float arithmetic on the share
count itself. Distributed via JSR; consumers can also pull it through
npm/yarn/pnpm/bun via the `jsr add` shim.

## Commands

The runtime is Deno, but **tests run under vitest**, not Deno's native runner
(`deno.jsonc` excludes `src/**/*.test.ts` from `deno test` discovery):

- `deno task test` — run the vitest suite once.
- `deno task test:watch` — vitest in watch mode.
- `deno task test src/api/operations/__tests__/add.test.ts` — a single file.
- `deno lint` / `deno fmt` — lint and format (lint uses the `recommended`
  ruleset). Scope them to `src mod.ts`: the generated `graphify-out/` cache is
  not fmt-clean.
- `deno check mod.ts` — type-check the public entrypoint.
- `deno doc --lint mod.ts` — must stay clean: every exported symbol needs JSDoc,
  explicit return types, and no references to private types.

Publishing to JSR happens automatically via `.github/workflows/publish.yml` on
push to `main` (`npx jsr publish`). Bump `version` in `deno.jsonc` before
merging a release. There is no CI workflow yet — run lint/fmt/check/test locally
before pushing.

## Import paths

`deno.jsonc` defines an import map, but only the `mod` and `api/` aliases are
backed by real files today (`messages`, `utils/`, `shares/`, `types/`,
`helpers/` point at paths that don't exist yet — placeholders mirroring moneta's
layout). In practice:

- `mod.ts` imports via the alias: `export * from "api/index.ts";`
- Files inside `src/api/` import each other with **relative paths** (e.g.
  `import { toScale } from "../conversions/to-scale.ts";`).

Adding a new top-level folder under `src/` requires registering it in
`deno.jsonc` _and_ exporting it from `mod.ts` if it should be public.

## Architecture

### Core data model (`src/api/types.ts`)

```ts
type Shares<Scale extends number = number> = {
  readonly quantity: number;
  readonly scale: Scale;
};
```

A plain readonly object — there is no factory, no validation, no freezing;
callers build literals directly. The real share count is
`quantity / 10 ** scale` (e.g. `{ quantity: 12345, scale: 4 }` = 1.2345 shares).

- **`Shares` has no concept of instrument identity.** Tracking which instrument
  (e.g. ISIN) a position belongs to is entirely the caller's responsibility
  (e.g. keying a `Record<ISIN, Shares>`). Do not reintroduce an instrument field
  without an explicit request.
- The `Scale` type parameter lets callers pin a precision at the type level
  (`Shares<4>`); `toScale` propagates it.

### Public API surface (`src/api/`)

Functions are pure (one file per function) and grouped by intent:

- `operations/` — `add`, `subtract`, `multiply` (curried: `multiply(n)(s)`),
  `floor`, `ceil`, and `divisions/` (`halfUp`, `DivideOperation`).
- `conversions/` — `toScale` (curried: `toScale(target, divide?)(s)`).
- `formatting/` — `toDecimal`.
- `comparisons/` — `equal`, `isGreaterThan`, `isGreaterThanOrEqual`,
  `isLowerThan`, `isLowerThanOrEqual`, `isInteger`.

Everything is re-exported through per-folder `index.ts` barrels, then
`src/api/index.ts`, then `mod.ts`.

Cross-cutting patterns to preserve when adding API:

- **Binary ops align scale first.** See `add.ts`: both operands are converted to
  `Math.max(first.scale, second.scale)` via `toScale`, then combined. New ops
  between two `Shares` values should follow the same shape. Aligning upward is
  lossless, so no rounding is involved.
- **Comparisons are built on `subtract`.** Every ordering predicate is
  `subtract(first, second).quantity` compared against `0` — scale-aware for
  free. Follow suit for new comparisons.
- **Rounding strategies are injectable.** Downscaling in `toScale` delegates to
  a `DivideOperation` (`(amount, factor) => number`), defaulting to `halfUp`. A
  new rounding behavior means a new `DivideOperation` in
  `operations/divisions/`, not a fork of `toScale`.
- **`floor`/`ceil` round the quantity while preserving scale** (they never
  truncate the scale itself): `floor({ quantity: 25, scale: 1 })` is
  `{ quantity: 20, scale: 1 }`, not `{ quantity: 2, scale: 0 }`. Both accept an
  optional target precision (`floorScale`/`ceilScale`, default `0`).
  `Math.floor`/`Math.ceil` give true toward-±infinity behavior for negative
  quantities — preserve that if touching rounding.
- **Every exported symbol carries JSDoc with `@example`.** Description first
  (behavioral notes: scale alignment, sign behavior, curried usage, throw
  conditions), then `@param`/`@returns`, then fenced ```ts examples importing
from `@quarzo-life/portio`, with a trailing comment translating the result
into a human-readable share count (`// 5.5 shares`). Take example values from
the tests so they are demonstrably correct. `deno doc --lint mod.ts` enforces
  coverage.

## Tests

Tests live next to the code in `__tests__/` directories, file names
`<feature>.test.ts`, using vitest's `describe`/`test`/`expect` (imported from
`"vitest"`). Group cases with nested `describe` blocks (see `floor.test.ts` for
the default-vs-explicit-parameter layout). Cover zero, negative quantities, and
cross-scale operands — scale alignment and negative rounding are where the bugs
hide.
