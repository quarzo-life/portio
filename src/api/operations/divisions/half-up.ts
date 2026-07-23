import { DivideOperation } from "./types.ts";

/**
 * A {@linkcode DivideOperation} that divides a quantity by a factor and
 * rounds the result half up (a fractional part of exactly one half rounds
 * toward positive infinity).
 *
 * This is the default rounding strategy used by `toScale` when reducing the
 * precision of a position.
 *
 * @param quantity - The quantity to divide.
 * @param factor - The divisor. Must be an integer.
 * @returns The quotient, rounded half up to the nearest integer.
 * @throws If `factor` is not an integer.
 *
 * @example Rounding down, up, and at the midpoint
 * ```ts
 * import { halfUp } from "@quarzo-life/portio";
 *
 * halfUp(9, 3); // 3   → exact division
 * halfUp(5, 4); // 1   → 1.25 rounds down
 * halfUp(5, 3); // 2   → 1.66… rounds up
 * halfUp(6, 4); // 2   → 1.5 (midpoint) rounds up
 * ```
 */
export const halfUp: DivideOperation = (
  quantity: number,
  factor: number,
): number => {
  if (!Number.isInteger(factor)) {
    throw `factor must be an integer, but found ${factor}`;
  }

  const quotient = Math.floor(quantity / factor);

  const remainder = quantity % factor;

  if (remainder / factor < 0.5) {
    return quotient;
  }

  return quotient + 1;
};
