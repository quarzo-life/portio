import { subtract } from "../operations/subtract.ts";
import { Shares } from "../types.ts";

/**
 * Tells whether two {@linkcode Shares} positions represent the same number
 * of shares.
 *
 * The comparison is scale-aware: positions are aligned to a common scale
 * before comparing, so `5.0` shares at scale 1 equal `5` shares at scale 0
 * even though their raw quantities differ.
 *
 * @param first - The first position.
 * @param second - The second position.
 * @returns `true` if both positions represent the same number of shares.
 *
 * @example Comparing across scales
 * ```ts
 * import { equal } from "@quarzo-life/portio";
 *
 * equal({ quantity: 50, scale: 1 }, { quantity: 5, scale: 0 }); // true
 * equal({ quantity: 55, scale: 1 }, { quantity: 5, scale: 0 }); // false
 * ```
 */
export const equal = (first: Shares, second: Shares): boolean =>
  subtract(first, second).quantity === 0;
