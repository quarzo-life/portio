import { type Shares, shares } from "shares/index.ts";
import { normalizeScale } from "api/index.ts";

/**
 * Add two Shares objects.
 * @param first Shares object
 * @param second Shares object
 * @returns a Shares object
 * @example // To add many Shares objects
 * import { Shares, add, shares } from "jsr:@quarzo-life/portio"
 *
 * const first = shares({ amount: 300n });
 * const second = shares({ amount: 200n });
 * const third = shares({ amount: 100n });
 *
 * const addMany = (addends: Shares[]) => addends.reduce(add);
 *
 * addMany([first, second, third]); // a Shares object with amount 600
 */
export const add = (first: Shares, second: Shares): Shares => {
  const [normalizedFirst, normalizedSecond] = normalizeScale([first, second]);

  const { scale } = normalizedFirst;

  const amount = normalizedFirst.amount + normalizedSecond.amount;

  return shares({ amount, scale });
};
