import type { Shares } from "mod";
import { normalizeScale } from "api/conversions/normalizeScale.ts";

/**
 * Do all Shares objects represent the same amount, regardless of scale?
 * @param objects Shares objects
 * @returns true if all objects have the same amount once normalized to the same scale
 */
export const haveSameAmount = (objects: ReadonlyArray<Shares>): boolean => {
  const normalized = normalizeScale(objects);

  return normalized.every((s) => s.amount === normalized[0]?.amount);
};
