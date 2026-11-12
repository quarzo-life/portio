<p align="center">
  <img src="assets/logo.svg" alt="Portio logo" width="96" height="96">
</p>

<p align="center">
  <h1>Portio</h1>
</p>

<p align="center">
  <a href="https://jsr.io/@quarzo-life/portio"><img src="https://jsr.io/badges/@quarzo-life/portio" alt="JSR version"></a>
  <a href="https://jsr.io/@quarzo-life/portio"><img src="https://jsr.io/badges/@quarzo-life/portio/score" alt="JSR score"></a>
  <a href="https://github.com/quarzo-life/portio/actions/workflows/publish.yml"><img src="https://github.com/quarzo-life/portio/actions/workflows/publish.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
</p>

<p align="center">
  <strong>Track and calculate fund share positions safely in JavaScript and TypeScript.</strong>
</p>

<p align="center">
  Portio is a lightweight library that keeps a share count as an integer
  <code>quantity</code> at a decimal <code>scale</code>, so positions in UCITS
  fund shares and other instruments are computed exactly — or not at all.
</p>

<p align="center">
  Sibling project to <a href="https://github.com/quarzo-life/moneta">Moneta</a>,
  applying the same integer-only philosophy to share counts instead of money.
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

A `Shares` position is a plain object: an integer `quantity` at a decimal
`scale`. The real share count is `quantity / 10 ** scale`. There is no factory —
build the literal directly. Every function is pure and side-effect free,
allowing you to bundle exactly what you use.

```ts
import { add, type Shares, toDecimal } from "jsr:@quarzo-life/portio";

const s1: Shares = { quantity: 300, scale: 2 }; // 3.00 shares
const s2: Shares = { quantity: 25, scale: 1 }; // 2.5 shares

const total = add(s1, s2); // { quantity: 550, scale: 2 }

toDecimal(total); // "5.50"
```

## API

| Group       | Functions                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Operations  | `add`, `subtract`, `multiply` (curried), `floor`, `ceil`                                           |
| Conversions | `toScale` (curried), with an injectable rounding strategy (`DivideOperation`, `halfUp`)            |
| Comparisons | `equal`, `isGreaterThan`, `isGreaterThanOrEqual`, `isLowerThan`, `isLowerThanOrEqual`, `isInteger` |
| Formatting  | `toDecimal`                                                                                        |

```ts
import {
  floor,
  isGreaterThan,
  multiply,
  subtract,
  toScale,
} from "jsr:@quarzo-life/portio";

subtract({ quantity: 55, scale: 1 }, { quantity: 3, scale: 0 });
// { quantity: 25, scale: 1 } → 5.5 - 3 = 2.5 shares

multiply(-1)({ quantity: 25, scale: 1 });
// { quantity: -25, scale: 1 } → -2.5 shares

toScale(0)({ quantity: 55, scale: 1 });
// { quantity: 6, scale: 0 } → 5.5 rounds half up to 6 shares

floor({ quantity: 12345, scale: 4 }, 2);
// { quantity: 12300, scale: 4 } → 1.2345 floors to 1.23 shares

isGreaterThan({ quantity: 55, scale: 1 }, { quantity: 5, scale: 0 });
// true → 5.5 > 5
```

The full reference, with examples for every function, is on
[JSR](https://jsr.io/@quarzo-life/portio/doc).

## Exact, or an error

Fractional fund shares can't be represented safely with plain float arithmetic —
floating point rounding silently corrupts position counts. Portio expresses a
`Shares` position as an integer `quantity` at a given decimal `scale`, and every
operation works on that integer.

`quantity` is a JavaScript `number`, so it is exact only inside the safe-integer
range (±9 007 199 254 740 991). Portio never leaves that range silently:

- Every function checks that the `quantity` it receives is a safe integer and
  that `scale` is a non-negative integer.
- Every function checks its result. If a sum, a product or a scale alignment
  cannot be represented exactly, the function throws a `RangeError` instead of
  returning an approximation.
- `multiply` only accepts an integer multiplier.
- `toDecimal` builds its text from the integer digits — it never divides and
  never prints an exponent (`toDecimal({ quantity: 1, scale: 7 })` is
  `"0.0000001"`).

```ts
import { add, multiply } from "jsr:@quarzo-life/portio";

add({ quantity: 9007199254740991, scale: 0 }, { quantity: 2, scale: 0 });
// throws RangeError: sum must be a safe integer

multiply(1.1);
// throws RangeError: multiplier must be a safe integer
```

### Rounding

Reducing the scale with `toScale` is the only operation that rounds. It
delegates to a `DivideOperation`, `halfUp` by default: the nearest integer, and
a tie goes toward positive infinity — for negative values too.

```ts
import { type DivideOperation, toScale } from "jsr:@quarzo-life/portio";

toScale(0)({ quantity: 15, scale: 1 }); // 1.5 → 2
toScale(0)({ quantity: -14, scale: 1 }); // -1.4 → -1
toScale(0)({ quantity: -15, scale: 1 }); // -1.5 → -1 (tie, toward +infinity)

// Bring your own strategy:
const down: DivideOperation = (amount, factor) => Math.floor(amount / factor);

toScale(0, down)({ quantity: 59, scale: 1 }); // 5.9 → 5
```

`floor` and `ceil` round the quantity toward negative / positive infinity while
keeping the scale.

## Tracking an instrument

A `Shares` object doesn't track which instrument it belongs to — unlike a
currency, an instrument identifier (typically an ISIN) doesn't imply a fixed
decimal precision anyway, so `scale` is always explicit. Pair `Shares` with your
own identifier — typically branded/nominally-typed so it can't be mixed up with
a plain `string` — in whatever shape fits your domain:

```ts
import { type Shares } from "jsr:@quarzo-life/portio";

type InstrumentId = string & { readonly __brand: "InstrumentId" };

const InstrumentId = (id: string): InstrumentId => id as InstrumentId;

type Position = {
  instrumentId: InstrumentId;
  shares: Shares;
};

const position: Position = {
  instrumentId: InstrumentId("LU1234567890"),
  shares: { quantity: 125000, scale: 4 }, // 12.5000 shares
};
```

Or key a lookup by instrument if you're tracking several positions at once:

```ts
const positions: Record<InstrumentId, Shares> = {
  [InstrumentId("LU1234567890")]: { quantity: 125000, scale: 4 },
  [InstrumentId("FR0000000000")]: { quantity: 300, scale: 0 },
};
```

Guarding against mixing instruments (e.g. before calling `add`) is then a plain
equality check on `instrumentId`, done by the caller — Portio's operations only
ever look at `quantity`/`scale`.

## Scope

Portio covers the core `Shares` primitive: arithmetic (`add`, `subtract`,
`multiply`), rounding (`floor`, `ceil`, `toScale`), comparisons, and decimal
formatting. It does not include a NAV/valuation concept (pricing a position in
money), nor a `bigint` representation for quantities beyond the safe-integer
range.

## Links

- [Moneta](https://github.com/quarzo-life/moneta)

## License

[MIT](LICENSE)
