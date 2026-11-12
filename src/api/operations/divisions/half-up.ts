import { safeInteger } from "../../assertions.ts";
import { DivideOperation } from "./types.ts";

/**
 * A {@linkcode DivideOperation} that divides a quantity by a factor and
 * rounds the result to the nearest integer; a tie (a fractional part of
 * exactly one half) rounds toward positive infinity.
 *
 * The rule holds for negative quantities too: -1.4 rounds to -1, -1.6
 * rounds to -2, and the tie -1.5 rounds to -1. The computation only uses
 * exact integer steps (remainder, subtraction), never a float quotient.
 *
 * This is the default rounding strategy used by `toScale` when reducing the
 * precision of a position.
 *
 * @param quantity - The quantity to divide. Must be a safe integer.
 * @param factor - The divisor. Must be a non-zero safe integer.
 * @returns The quotient, rounded half up to the nearest integer.
 * @throws {RangeError} If `quantity` is not a safe integer, or if `factor`
 * is not a non-zero safe integer.
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
 *
 * @example Negative quantities
 * ```ts
 * import { halfUp } from "@quarzo-life/portio";
 *
 * halfUp(-14, 10); // -1 → -1.4 rounds to the nearest integer
 * halfUp(-16, 10); // -2 → -1.6 rounds to the nearest integer
 * halfUp(-15, 10); // -1 → -1.5 (midpoint) rounds toward +infinity
 * ```
 */
export const halfUp: DivideOperation = (
  quantity: number,
  factor: number,
): number => {
  safeInteger(quantity, "quantity");
  safeInteger(factor, "factor");

  if (factor === 0) {
    throw new RangeError("factor must not be zero");
  }

  // Work with a positive divisor: q / f === -q / -f.
  const dividend = factor < 0 ? -quantity : quantity;
  const divisor = Math.abs(factor);

  // `%` is exact and takes the sign of the dividend, so `dividend - rest` is
  // an exact multiple of `divisor` and the division below is exact too.
  let rest = dividend % divisor;
  let quotient = (dividend - rest) / divisor;

  // Move from truncation to a true floor, with a rest in [0, divisor).
  if (rest < 0) {
    rest += divisor;
    quotient -= 1;
  }

  // Round up when rest / divisor >= 1/2, without doubling or dividing.
  return safeInteger(
    rest >= divisor - rest ? quotient + 1 : quotient,
    "quotient",
  );
};
