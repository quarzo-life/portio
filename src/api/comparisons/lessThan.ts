import type { Shares } from "mod";
import { compareAmounts } from "./compareAmounts.ts";

/**
 * Is the first Shares object less than the second?
 * @param first Shares object
 * @param second Shares object
 * @returns true if first < second
 */
export const lessThan = (first: Shares, second: Shares): boolean =>
  compareAmounts(first, second) < 0;
