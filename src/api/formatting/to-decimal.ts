import { assertShares } from "../assertions.ts";
import { Shares } from "../types.ts";

/**
 * Formats a {@linkcode Shares} position as a decimal string.
 *
 * The fractional part is padded with trailing zeros to exactly `scale`
 * digits, so the precision of the position stays visible. A position at
 * scale `0` is formatted without a decimal point.
 *
 * The text is built from the integer digits of the quantity — nothing is
 * divided — so the output is exact and never uses exponent notation.
 *
 * @param shares - The position to format.
 * @returns The decimal representation, with `scale` fractional digits.
 * @throws {RangeError} If the quantity is not a safe integer or the scale is
 * not an integer between `0` and `MAX_SCALE`.
 *
 * @example Formatting positions at various scales
 * ```ts
 * import { toDecimal } from "@quarzo-life/portio";
 *
 * toDecimal({ quantity: 3, scale: 0 }); // "3"
 * toDecimal({ quantity: 55, scale: 1 }); // "5.5"
 * toDecimal({ quantity: 500, scale: 2 }); // "5.00"
 * toDecimal({ quantity: 12345, scale: 4 }); // "1.2345"
 * toDecimal({ quantity: 1, scale: 7 }); // "0.0000001"
 * toDecimal({ quantity: -5, scale: 2 }); // "-0.05"
 * ```
 */
export const toDecimal = (shares: Shares): string => {
  assertShares(shares);
  const { quantity, scale } = shares;

  const sign = quantity < 0 ? "-" : "";
  // A safe integer always prints as plain digits (no exponent below 1e21).
  const digits = String(Math.abs(quantity));

  if (scale === 0) {
    return `${sign}${digits}`;
  }

  const padded = digits.padStart(scale + 1, "0");
  const split = padded.length - scale;

  return `${sign}${padded.slice(0, split)}.${padded.slice(split)}`;
};
