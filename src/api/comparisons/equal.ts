import type { Shares } from "mod";
import { haveSameAmount } from "./haveSameAmount.ts";
import { haveSameInstrument } from "./haveSameInstrument.ts";

/**
 * Are Shares objects equal?
 * @param first Shares object
 * @param second Shares object
 * @returns true if equal
 */
export const equal = (first: Shares, second: Shares): boolean => {
  return haveSameInstrument([first, second]) && haveSameAmount([first, second]);
};
