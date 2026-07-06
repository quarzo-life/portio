import { UNEQUAL_INSTRUMENTS_MESSAGE } from "messages";
import { type Shares, shares } from "shares/index.ts";
import { assert } from "helpers/assert.ts";
import { haveSameInstrument, normalizeScale } from "api/index.ts";

/**
 * Add two Shares objects.
 * @param first Shares object
 * @param second Shares object
 * @returns a Shares object
 * @example // To add many Shares objects
 * import { Shares, add, shares } from "jsr:@quarzo-life/portio"
 *
 * const first = shares({ amount: 300n, instrument: "LU1234567890" });
 * const second = shares({ amount: 200n, instrument: "LU1234567890" });
 * const third = shares({ amount: 100n, instrument: "LU1234567890" });
 *
 * const addMany = (addends: Shares[]) => addends.reduce(add);
 *
 * addMany([first, second, third]); // a Shares object with amount 600
 */
export const add = (first: Shares, second: Shares): Shares => {
  assert(haveSameInstrument([first, second]), UNEQUAL_INSTRUMENTS_MESSAGE);

  const [normalizedFirst, normalizedSecond] = normalizeScale([first, second]);

  const { instrument, scale } = normalizedFirst;

  const amount = normalizedFirst.amount + normalizedSecond.amount;

  return shares({ amount, instrument, scale });
};
