import type { Shares } from "mod";

/**
 * Get the amount of a Shares object in a stringified decimal representation.
 *
 * The number of decimal places depends on the scale of the object. Unlike
 * moneta's `toDecimal`, there is no non-decimal base to guard against: a
 * Shares scale is always a plain count of decimal places.
 *
 * @param sharesObject The Shares object to format.
 * @returns The decimal string.
 *
 * @example
 * import { shares, toDecimal } from "jsr:@quarzo-life/portio";
 *
 * const s = shares({ amount: 125000n, scale: 4 });
 *
 * toDecimal(s); // "12.5000"
 */
export const toDecimal = (sharesObject: Shares): string => {
  const { amount, scale } = sharesObject;

  if (scale === 0) {
    return amount.toString();
  }

  const factor = 10n ** BigInt(scale);
  const whole = amount / factor;
  const fractionalAmount = amount % factor;
  const fractional =
    (fractionalAmount < 0n ? -fractionalAmount : fractionalAmount)
      .toString()
      .padStart(scale, "0");

  // bigint has no -0, so whole.toString() loses the sign when |amount| < factor.
  const sign = whole === 0n && fractionalAmount < 0n ? "-" : "";

  return `${sign}${whole}.${fractional}`;
};
