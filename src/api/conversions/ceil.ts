import { type Shares, shares } from "shares/index.ts";

/**
 * Round up to the nearest whole share, keeping the same scale.
 *
 * bigint division truncates toward zero rather than toward positive
 * infinity, so a positive amount needs an explicit adjustment to ceil
 * correctly (e.g. 1.25 must ceil to 2, not 1).
 *
 * @param sharesObject Shares object
 * @returns a Shares object rounded up to a whole share
 * @example
 * import { shares, ceil, toDecimal } from "jsr:@quarzo-life/portio"
 *
 * toDecimal(ceil(shares({ amount: 1250n, instrument: "LU1234567890", scale: 2 }))); // "13.00"
 */
export const ceil = ({ amount, scale, instrument }: Shares): Shares => {
  const factor = 10n ** BigInt(scale);
  const remainder = amount % factor;
  const isWhole = remainder === 0n;

  const wholeUnits = isWhole || amount < 0n
    ? amount / factor
    : amount / factor + 1n;

  return shares({ amount: wholeUnits * factor, instrument, scale });
};
