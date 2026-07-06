import { type Shares, shares } from "shares/index.ts";
import { normalizeScale } from "api/index.ts";

/**
 * Subtract a Shares object from another.
 * @param first Shares object
 * @param second Shares object
 * @returns a Shares object
 * @example // To subtract many Shares objects
 * import { Shares, subtract, shares } from "jsr:@quarzo-life/portio"
 *
 * const first = shares({ amount: 400n });
 * const second = shares({ amount: 200n });
 * const third = shares({ amount: 100n });
 *
 * const subtractMany = (subtrahends: Shares[]) => subtrahends.reduce(subtract);
 *
 * subtractMany([first, second, third]); // a Shares object with amount 100
 */
export const subtract = (first: Shares, second: Shares): Shares => {
  const [normalizedFirst, normalizedSecond] = normalizeScale([first, second]);

  const { scale } = normalizedFirst;

  const amount = normalizedFirst.amount - normalizedSecond.amount;

  return shares({ amount, scale });
};
