import type { Shares } from "mod";
import { compareAmounts } from "./compareAmounts.ts";

/**
 * Is the first Shares object less than or equal to the second?
 * @param first Shares object
 * @param second Shares object
 * @returns true if first <= second
 */
export const lessThanOrEqual = (first: Shares, second: Shares): boolean =>
  compareAmounts(first, second) <= 0;
