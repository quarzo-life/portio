import { toScale } from "../conversions/to-scale.ts";
import { Shares } from "../types.ts";

/**
 * Subtracts the second {@linkcode Shares} position from the first.
 *
 * Both operands are first aligned to the larger of the two scales, so
 * positions of different precisions can be subtracted safely. The result
 * carries that common scale and may have a negative quantity (e.g. for a
 * short position or an over-redemption check).
 *
 * @param first - The position to subtract from.
 * @param second - The position to subtract.
 * @returns A new `Shares` at `max(first.scale, second.scale)`.
 *
 * @example Subtracting positions of different scales
 * ```ts
 * import { subtract } from "@quarzo-life/portio";
 *
 * subtract({ quantity: 55, scale: 1 }, { quantity: 3, scale: 0 });
 * // { quantity: 25, scale: 1 } → 5.5 - 3 = 2.5 shares
 * ```
 */
export const subtract = (first: Shares, second: Shares): Shares => {
  const targetScale = Math.max(first.scale, second.scale);
  const align = toScale(targetScale);
  return {
    quantity: align(first).quantity - align(second).quantity,
    scale: targetScale,
  };
};
