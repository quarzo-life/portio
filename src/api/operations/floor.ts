import { assertShares, safeInteger } from "../assertions.ts";
import { Shares } from "../types.ts";

/**
 * Rounds a {@linkcode Shares} position down (toward negative infinity) to
 * `floorScale` decimal places.
 *
 * The scale of the result is preserved — only the quantity is rounded, so
 * `floor({ quantity: 25, scale: 1 })` yields `{ quantity: 20, scale: 1 }`,
 * not `{ quantity: 2, scale: 0 }`. Negative quantities round away from zero
 * (true mathematical floor), e.g. -2.5 floors to -3.
 *
 * @param shares - The position to round down.
 * @param floorScale - The number of decimal places to keep. Defaults to `0`
 * (round down to a whole number of shares). A position whose scale is
 * already `floorScale` or less is returned unchanged.
 * @returns A new `Shares` at the same scale, rounded down.
 * @throws {RangeError} If the position is not valid (safe-integer quantity,
 * non-negative integer scale), if `floorScale` is not an integer, or if the
 * rounded quantity leaves the safe-integer range.
 *
 * @example Rounding down to whole shares (default)
 * ```ts
 * import { floor } from "@quarzo-life/portio";
 *
 * floor({ quantity: 25, scale: 1 });
 * // { quantity: 20, scale: 1 } → 2.5 floors to 2 shares
 *
 * floor({ quantity: -25, scale: 1 });
 * // { quantity: -30, scale: 1 } → -2.5 floors to -3 shares
 * ```
 *
 * @example Rounding down to a specific number of decimals
 * ```ts
 * import { floor } from "@quarzo-life/portio";
 *
 * floor({ quantity: 12345, scale: 4 }, 2);
 * // { quantity: 12300, scale: 4 } → 1.2345 floors to 1.23 shares
 * ```
 */
export const floor = (
  shares: Shares,
  floorScale: number = 0,
): Shares => {
  assertShares(shares);
  safeInteger(floorScale, "floorScale");
  const { quantity, scale } = shares;

  if (floorScale >= scale) {
    return { quantity: safeInteger(quantity, "quantity"), scale };
  }

  const factor = 10 ** (scale - floorScale);
  // `%` is exact and takes the sign of the quantity, so `quantity - rest` is
  // the quantity truncated toward zero, without any float division.
  const rest = quantity % factor;
  const truncated = quantity - rest;

  return {
    quantity: safeInteger(
      rest < 0 ? truncated - factor : truncated,
      "rounded quantity",
    ),
    scale,
  };
};
