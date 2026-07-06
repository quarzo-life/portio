<p align="center">
  <h1>Portio</h1>
</p>

<p align="center">
  <strong>Track and calculate fund share positions safely in JavaScript and TypeScript.</strong>
</p>

<p align="center">
  Portio is a lightweight library built exclusively on <code>bigint</code>
  to ensure precision and safety when tracking positions in UCITS fund shares
  and other instruments.
</p>

<p align="center">
  Sibling project to <a href="https://github.com/quarzo-life/moneta">Moneta</a>,
  applying the same bigint-only philosophy to share counts instead of money.
</p>

---

## 📦 Install

```sh
# Deno
deno add jsr:@quarzo-life/portio

# npm
npx jsr add @quarzo-life/portio

# yarn
yarn dlx jsr add @quarzo-life/portio

# pnpm
pnpm dlx jsr add @quarzo-life/portio

# bun
bunx jsr add @quarzo-life/portio
```

## ⚡️ Quick start

`Shares` objects are minimal. Every function is side-effect free, allowing you
to bundle exactly what you use.

All amounts are in `bigint`.

```ts
import { add, shares } from "jsr:@quarzo-life/portio";

const s1 = shares({ amount: 300n, scale: 2 });
const s2 = shares({ amount: 200n, scale: 2 });

add(s1, s2); // a Shares object with amount 500
```

## Fund shares in JavaScript

Fractional fund shares can't be represented safely with plain `number`
arithmetic — floating point rounding silently corrupts position counts. Portio
expresses a `Shares` position as an integer `amount` at a given decimal `scale`,
and every operation (add, subtract, multiply, floor, ceil, compare) works on
that integer, never on a float.

A `Shares` object doesn't track which instrument it belongs to — unlike a
currency, an instrument identifier (typically an ISIN) doesn't imply a fixed
decimal precision anyway, so `scale` defaults to `0` (whole shares) and must be
set explicitly wherever fractional dealing applies. Keeping track of which
instrument a position belongs to (e.g. keying a `Record<ISIN, Shares>`) is the
caller's responsibility.

## Scope

This first version covers the core `Shares` primitive: creation, arithmetic
(`add`, `subtract`, `multiply`), rounding to whole shares (`floor`, `ceil`,
`isInteger`), comparisons, and decimal formatting. It does not yet include a
NAV/valuation concept (pricing a position in money) — see `CLAUDE.md` for what's
deliberately left out.

## Links

- [Moneta](https://github.com/quarzo-life/moneta)

## License

[MIT](LICENSE)
