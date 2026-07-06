import { UNEQUAL_INSTRUMENTS_MESSAGE } from "messages";
import { type Shares, shares } from "shares/index.ts";
import { assert } from "helpers/assert.ts";
import { haveSameInstrument, normalizeScale } from "api/index.ts";

/**
 * Subtract a Shares object from another.
 * @param first Shares object
 * @param second Shares object
 * @returns a Shares object
 * @example // To subtract many Shares objects
 * import { Shares, subtract, shares } from "jsr:@quarzo-life/portio"
 *
 * const first = shares({ amount: 400n, instrument: "LU1234567890" });
 * const second = shares({ amount: 200n, instrument: "LU1234567890" });
 * const third = shares({ amount: 100n, instrument: "LU1234567890" });
 *
 * const subtractMany = (subtrahends: Shares[]) => subtrahends.reduce(subtract);
 *
 * subtractMany([first, second, third]); // a Shares object with amount 100
 */
export const subtract = (first: Shares, second: Shares): Shares => {
  assert(haveSameInstrument([first, second]), UNEQUAL_INSTRUMENTS_MESSAGE);

  const [normalizedFirst, normalizedSecond] = normalizeScale([first, second]);

  const { instrument, scale } = normalizedFirst;

  const amount = normalizedFirst.amount - normalizedSecond.amount;

  return shares({ amount, instrument, scale });
};
