import { Shares } from "../types.ts";

/**
 * Rounds a {@linkcode Shares} position up (toward positive infinity) to
 * `ceilScale` decimal places.
 *
 * The scale of the result is preserved — only the quantity is rounded, so
 * `ceil({ quantity: 21, scale: 1 })` yields `{ quantity: 30, scale: 1 }`,
 * not `{ quantity: 3, scale: 0 }`. Negative quantities round toward zero
 * (true mathematical ceiling), e.g. -2.5 ceils to -2.
 *
 * @param shares - The position to round up.
 * @param ceilScale - The number of decimal places to keep. Defaults to `0`
 * (round up to a whole number of shares).
 * @returns A new `Shares` at the same scale, rounded up.
 *
 * @example Rounding up to whole shares (default)
 * ```ts
 * import { ceil } from "@quarzo-life/portio";
 *
 * ceil({ quantity: 21, scale: 1 });
 * // { quantity: 30, scale: 1 } → 2.1 ceils to 3 shares
 *
 * ceil({ quantity: -25, scale: 1 });
 * // { quantity: -20, scale: 1 } → -2.5 ceils to -2 shares
 * ```
 *
 * @example Rounding up to a specific number of decimals
 * ```ts
 * import { ceil } from "@quarzo-life/portio";
 *
 * ceil({ quantity: 12345, scale: 4 }, 2);
 * // { quantity: 12400, scale: 4 } → 1.2345 ceils to 1.24 shares
 * ```
 */
export const ceil = (
  { quantity, scale }: Shares,
  ceilScale: number = 0,
): Shares => ({
  quantity: Math.ceil(quantity / 10 ** (scale - ceilScale)) *
    10 ** (scale - ceilScale),
  scale,
});
