import type { Shares } from "mod";
import { assert } from "helpers/assert.ts";
import { UNEQUAL_INSTRUMENTS_MESSAGE } from "messages";
import { haveSameInstrument } from "./haveSameInstrument.ts";
import { normalizeScale } from "api/conversions/normalizeScale.ts";

/**
 * Compare the amounts of two Shares objects of the same instrument.
 * @param first Shares object
 * @param second Shares object
 * @returns -1 if first < second, 0 if equal, 1 if first > second
 */
export const compareAmounts = (first: Shares, second: Shares): number => {
  assert(haveSameInstrument([first, second]), UNEQUAL_INSTRUMENTS_MESSAGE);

  const [normalizedFirst, normalizedSecond] = normalizeScale([first, second]);

  if (normalizedFirst.amount === normalizedSecond.amount) {
    return 0;
  }

  return normalizedFirst.amount > normalizedSecond.amount ? 1 : -1;
};
