# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

`@quarzo-life/portio` — a Deno/JSR library for safely tracking positions in
UCITS fund shares (and other instruments). Sibling project to
[`@quarzo-life/moneta`](https://github.com/quarzo-life/moneta): same philosophy
applied to share counts instead of money — every amount is a `bigint`, no
`number` arithmetic anywhere. Distributed via JSR; consumers can also pull it
through npm/yarn/pnpm/bun via the `jsr add` shim.

## Commands

The runtime is Deno. Tasks are defined in `deno.jsonc`:

- `deno task test` — run the test suite (parallel).
- `deno task start` — run `example.ts` (exercises the public API).
- `deno test src/api/mutations/__test__/add.test.ts` — run a single test file.
- `deno test --filter "name"` — filter by test name.
- `deno lint` / `deno fmt` — lint and format (lint uses the `recommended`
  ruleset).
- `deno check mod.ts` — type-check the public entrypoint.

Publishing to JSR happens automatically via `.github/workflows/publish.yml` on
push to `main` (`npx jsr publish`). Bump `version` in `deno.jsonc` before
merging a release. `.github/workflows/ci.yml` runs lint/fmt/check/test on every
push and PR.

## Import paths

`deno.jsonc` defines an import map (`imports`) used throughout the source.
**Always use these aliases instead of relative paths** — files in `src/` import
each other this way:

```
mod         → ./mod.ts                (re-exports the full public API)
messages    → ./src/messages.ts
api/        → ./src/api/
utils/      → ./src/utils/
shares/     → ./src/shares/
types/      → ./src/types/
helpers/    → ./src/helpers/
@std/assert → jsr:@std/assert
```

Adding a new top-level folder under `src/` requires registering it in
`deno.jsonc` _and_ exporting it from `mod.ts` if it should be public.

## Architecture

### Core data model (`src/shares/index.ts`, `src/types/types.ts`)

A `Shares` is a frozen object `{ amount: bigint, scale: number, toJSON }`. The
`shares({ amount?, scale? })` factory is the only sanctioned way to build one —
never construct a `Shares` literal directly, since `shares()` validates inputs
(safe-integer / regex checks on `string`/`number` amounts, non-negative integer
scale) and freezes the result.

- `amount` is always the integer count of shares at `scale` decimal places.
- `scale` defaults to `0` (whole shares only). Unlike moneta's `Currency`, there
  is no fixed registry to resolve a default exponent against — callers must be
  explicit about precision.
- **`Shares` has no concept of instrument identity.** Unlike the earlier design,
  there is no `InstrumentId` field and no `haveSameInstrument` guard — tracking
  which instrument (e.g. ISIN) a position belongs to is entirely the caller's
  responsibility (e.g. keying a `Record<ISIN, Shares>`). Do not reintroduce an
  instrument field without an explicit request.

### Public API surface (`src/api/`)

Functions are pure and grouped by intent — `mutations/` (add, subtract,
multiply), `conversions/` (normalizeScale, isInteger, floor, ceil),
`formatting/` (toDecimal, toSnapshot), `comparisons/` (equal, compareAmounts,
greaterThan…, haveSameAmount). Everything is re-exported through
`src/api/index.ts` and then `mod.ts`.

Cross-cutting patterns to preserve when adding API (mirrors moneta):

- **Binary ops normalize scale first.** See `add.ts`: it calls
  `normalizeScale([a, b])`, then operates on the aligned amounts. New ops
  between two `Shares` values should follow the same shape.
- **Assertions go through `helpers/assert.ts` with a string from
  `src/messages.ts`.** Don't `throw new Error(...)` ad hoc inside the API; add a
  message constant if a new error category is needed.
- **`floor`/`ceil` round the amount to the nearest whole share while preserving
  scale** (they never truncate the scale itself). bigint division truncates
  toward zero, not toward ±infinity, so negative amounts need the explicit
  adjustment implemented in `conversions/floor.ts` and `ceil.ts`. Preserve that
  logic if touching rounding.
- **`multiply` never loses precision.** Scale only grows
  (`scale + multiplierScale`), same as moneta's `multiply`. There is no
  `danger*`-prefixed variant yet because nothing in the current surface discards
  precision — introduce one (following moneta's convention) the day an operation
  needs a rounding strategy.

### Not implemented yet (compared to moneta)

No NAV/valuation type, no `allocate`, no `dangerDivide`/`dangerRound`, no docs
site, no benchmarks. Add a NAV/valuation concept only once the portfolio use
case needs to price a position in money — that would pull in
`@quarzo-life/moneta` as a dependency rather than reimplementing `Money` here.

## Tests

Tests live next to the code in `__test__/` directories (mirrors moneta's `api/`
convention), file names `<feature>.test.ts`. The core type test lives directly
next to its source as `src/shares/index_test.ts` (mirrors moneta's
`src/money/index_test.ts`). They use `jsr:@std/assert` and Deno's built-in
`Deno.test` with `t.step`.

`example.ts` doubles as documentation — when adding a public API function, add
an example demonstrating it.
