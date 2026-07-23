import { subtract } from "../operations/subtract.ts";
import { Shares } from "../types.ts";

/**
 * Tells whether the first {@linkcode Shares} position is strictly greater
 * than the second.
 *
 * The comparison is scale-aware: positions are aligned to a common scale
 * before comparing, so positions of different precisions compare correctly.
 *
 * @param first - The first position.
 * @param second - The second position.
 * @returns `true` if `first` represents strictly more shares than `second`.
 *
 * @example Comparing across scales
 * ```ts
 * import { isGreaterThan } from "@quarzo-life/portio";
 *
 * isGreaterThan({ quantity: 55, scale: 1 }, { quantity: 5, scale: 0 });
 * // true → 5.5 > 5
 *
 * isGreaterThan({ quantity: 50, scale: 1 }, { quantity: 5, scale: 0 });
 * // false → 5.0 is not strictly greater than 5
 * ```
 */
export const isGreaterThan = (first: Shares, second: Shares): boolean =>
  subtract(first, second).quantity > 0;
