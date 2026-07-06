import type { Shares } from "mod";
import { normalizeScale } from "api/conversions/normalizeScale.ts";

/**
 * Compare the amounts of two Shares objects.
 * @param first Shares object
 * @param second Shares object
 * @returns -1 if first < second, 0 if equal, 1 if first > second
 */
export const compareAmounts = (first: Shares, second: Shares): number => {
  const [normalizedFirst, normalizedSecond] = normalizeScale([first, second]);

  if (normalizedFirst.amount === normalizedSecond.amount) {
    return 0;
  }

  return normalizedFirst.amount > normalizedSecond.amount ? 1 : -1;
};
