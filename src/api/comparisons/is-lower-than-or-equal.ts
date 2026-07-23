import { subtract } from "../operations/subtract.ts";
import { Shares } from "../types.ts";

/**
 * Tells whether the first {@linkcode Shares} position is lower than or equal
 * to the second.
 *
 * The comparison is scale-aware: positions are aligned to a common scale
 * before comparing, so positions of different precisions compare correctly.
 *
 * @param first - The first position.
 * @param second - The second position.
 * @returns `true` if `first` represents at most as many shares as `second`.
 *
 * @example Comparing across scales
 * ```ts
 * import { isLowerThanOrEqual } from "@quarzo-life/portio";
 *
 * isLowerThanOrEqual({ quantity: 50, scale: 1 }, { quantity: 5, scale: 0 });
 * // true → 5.0 <= 5
 *
 * isLowerThanOrEqual({ quantity: 55, scale: 1 }, { quantity: 5, scale: 0 });
 * // false → 5.5 > 5
 * ```
 */
export const isLowerThanOrEqual = (first: Shares, second: Shares): boolean =>
  subtract(first, second).quantity <= 0;
