import { subtract } from "../operations/subtract.ts";
import { Shares } from "../types.ts";

/**
 * Tells whether the first {@linkcode Shares} position is strictly lower than
 * the second.
 *
 * The comparison is scale-aware: positions are aligned to a common scale
 * before comparing, so positions of different precisions compare correctly.
 *
 * @param first - The first position.
 * @param second - The second position.
 * @returns `true` if `first` represents strictly fewer shares than `second`.
 * @throws {RangeError} If a position is not valid (safe-integer quantity,
 * non-negative integer scale) or cannot be aligned exactly to the other's
 * scale.
 *
 * @example Comparing across scales
 * ```ts
 * import { isLowerThan } from "@quarzo-life/portio";
 *
 * isLowerThan({ quantity: 49, scale: 1 }, { quantity: 5, scale: 0 });
 * // true → 4.9 < 5
 *
 * isLowerThan({ quantity: 50, scale: 1 }, { quantity: 5, scale: 0 });
 * // false → 5.0 is not strictly lower than 5
 * ```
 */
export const isLowerThan = (first: Shares, second: Shares): boolean =>
  subtract(first, second).quantity < 0;
