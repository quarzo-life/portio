/**
 * A rounding strategy: divides `amount` by `factor` and returns an integer
 * quotient, deciding how the remainder is rounded.
 *
 * Used by `toScale` when reducing the precision of a position. `halfUp` is
 * the built-in implementation; provide your own to control rounding (e.g.
 * always rounding down for a conservative redemption).
 *
 * @example A custom strategy that always rounds down
 * ```ts
 * import { type DivideOperation, toScale } from "@quarzo-life/portio";
 *
 * const down: DivideOperation = (amount, factor) =>
 *   Math.floor(amount / factor);
 *
 * toScale(0, down)({ quantity: 59, scale: 1 });
 * // { quantity: 5, scale: 0 } → 5.9 rounds down to 5 shares
 * ```
 */
export type DivideOperation = (amount: number, factor: number) => number;
