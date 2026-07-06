import type { Shares } from "mod";

/**
 * Do all Shares objects belong to the same instrument?
 * @param objects Shares objects
 * @returns true if all objects share the same instrument id
 */
export const haveSameInstrument = (
  objects: ReadonlyArray<Shares>,
): boolean => objects.every((s) => s.instrument === objects[0]?.instrument);
