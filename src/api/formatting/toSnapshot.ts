import type { InstrumentId, Shares } from "mod";

/**
 * JSON snapshot of a Shares object.
 * Snapshot can't be used to store Shares objects in a database because
 * amount is a bigint and can't be serialized.
 *
 * Use `toJSON()` to serialize a Shares object to a JSON string.
 *
 * @param sharesObject Shares object to snapshot.
 * @see toJSON()
 * @returns
 */
export const toSnapshot = (sharesObject: Shares): {
  amount: bigint;
  instrument: InstrumentId;
  scale: number;
} => {
  return {
    amount: sharesObject.amount,
    instrument: sharesObject.instrument,
    scale: sharesObject.scale,
  };
};
