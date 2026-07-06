import type { Shares } from "shares/index.ts";

/**
 * Whether a Shares amount represents a whole number of units at its scale
 * (e.g. no fractional share).
 *
 * @param sharesObject Shares object
 * @returns true if the amount is a whole number of shares
 * @example
 * import { shares, isInteger } from "jsr:@quarzo-life/portio"
 *
 * isInteger(shares({ amount: 1200n, instrument: "LU1234567890", scale: 2 })); // true
 * isInteger(shares({ amount: 1250n, instrument: "LU1234567890", scale: 2 })); // false
 */
export const isInteger = ({ amount, scale }: Shares): boolean =>
  amount % 10n ** BigInt(scale) === 0n;
