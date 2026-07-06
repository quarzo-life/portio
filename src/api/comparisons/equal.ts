import type { Shares } from "mod";
import { haveSameAmount } from "./haveSameAmount.ts";

/**
 * Are Shares objects equal?
 * @param first Shares object
 * @param second Shares object
 * @returns true if equal
 */
export const equal = (first: Shares, second: Shares): boolean => {
  return haveSameAmount([first, second]);
};
