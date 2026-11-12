/**
 * The largest `scale` a {@linkcode Shares} position can have: `15`.
 *
 * `10 ** 15` is the largest power of ten that is still a safe integer
 * (`Number.MAX_SAFE_INTEGER` is about `9.007 × 10 ** 15`). Beyond that scale
 * a position could not even hold one whole share, nor be aligned with a
 * whole-share position, so every function rejects it with a `RangeError`.
 *
 * As a consequence, quantities of cryptocurrencies are not supported: ether,
 * for example, needs 18 decimals. Accepting them requires changes to the
 * library (a `bigint` quantity and a higher scale limit).
 *
 * @example Checking a scale before building a position
 * ```ts
 * import { MAX_SCALE, type Shares } from "@quarzo-life/portio";
 *
 * const scale = 5;
 *
 * if (scale <= MAX_SCALE) {
 *   const position: Shares = { quantity: 123456, scale }; // 1.23456 shares
 * }
 * ```
 */
export const MAX_SCALE = 15;
