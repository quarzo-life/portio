import { type Shares, shares } from "shares/index.ts";

/**
 * Round down to the nearest whole share, keeping the same scale (e.g. useful
 * to know how many whole shares can be redeemed from a fractional position).
 *
 * bigint division truncates toward zero rather than toward negative
 * infinity, so a negative amount needs an explicit adjustment to floor
 * correctly (e.g. -1.25 must floor to -2, not -1).
 *
 * @param sharesObject Shares object
 * @returns a Shares object rounded down to a whole share
 * @example
 * import { shares, floor, toDecimal } from "jsr:@quarzo-life/portio"
 *
 * toDecimal(floor(shares({ amount: 1250n, scale: 2 }))); // "12.00"
 */
export const floor = ({ amount, scale }: Shares): Shares => {
  const factor = 10n ** BigInt(scale);

  const quotient = amount / factor;
  const remainder = amount % factor;

  const wholeUnits = remainder === 0n || amount > 0n ? quotient : quotient - 1n;

  return shares({
    amount: wholeUnits * factor,
    scale,
  });
};
