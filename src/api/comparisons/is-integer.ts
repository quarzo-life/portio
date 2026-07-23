import { Shares } from "../types.ts";

/**
 * Tells whether a {@linkcode Shares} position represents a whole number of
 * shares, whatever its scale.
 *
 * Useful to check that a position can be settled in whole shares (e.g.
 * before an order on a fund that does not allow fractional dealing).
 *
 * @param shares - The position to check.
 * @returns `true` if the position is a whole number of shares.
 *
 * @example Whole vs fractional positions
 * ```ts
 * import { isInteger } from "@quarzo-life/portio";
 *
 * isInteger({ quantity: 30, scale: 1 }); // true → 3.0 shares
 * isInteger({ quantity: 25, scale: 1 }); // false → 2.5 shares
 * isInteger({ quantity: 3, scale: 0 }); // true → 3 shares
 * ```
 */
export const isInteger = ({ quantity, scale }: Shares): boolean =>
  Number.isInteger(quantity / 10 ** scale);
