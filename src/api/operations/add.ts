import { toScale } from "../conversions/to-scale.ts";
import { Shares } from "../types.ts";

/**
 * Adds two {@linkcode Shares} positions.
 *
 * Both operands are first aligned to the larger of the two scales, so
 * positions of different precisions can be added safely. The result carries
 * that common scale. No precision is lost: aligning to the larger scale only
 * multiplies quantities, it never divides them.
 *
 * @param first - The first position.
 * @param second - The second position.
 * @returns A new `Shares` at `max(first.scale, second.scale)`.
 *
 * @example Adding positions of different scales
 * ```ts
 * import { add } from "@quarzo-life/portio";
 *
 * add({ quantity: 25, scale: 1 }, { quantity: 3, scale: 0 });
 * // { quantity: 55, scale: 1 } → 2.5 + 3 = 5.5 shares
 * ```
 */
export const add = (first: Shares, second: Shares): Shares => {
  const targetScale = Math.max(first.scale, second.scale);
  const align = toScale(targetScale);
  return {
    quantity: align(first).quantity + align(second).quantity,
    scale: targetScale,
  };
};
