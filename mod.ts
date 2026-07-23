/**
 * Track and calculate fund share positions safely in JavaScript and
 * TypeScript.
 *
 * A position is a plain {@linkcode Shares} object — an integer `quantity` at
 * a decimal `scale` — and every function is pure and side-effect free:
 * operations (`add`, `subtract`, `multiply`, `floor`, `ceil`), conversions
 * (`toScale`), comparisons (`equal`, `isGreaterThan`, …, `isInteger`) and
 * formatting (`toDecimal`).
 *
 * @example Quick start
 * ```ts
 * import { add, toDecimal } from "@quarzo-life/portio";
 *
 * const position = add(
 *   { quantity: 300, scale: 2 },
 *   { quantity: 200, scale: 2 },
 * );
 * // { quantity: 500, scale: 2 }
 *
 * toDecimal(position); // "5.00"
 * ```
 *
 * @module
 */
export * from "api/index.ts";
