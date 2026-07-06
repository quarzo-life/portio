import { assert } from "helpers/assert.ts";
import {
  INVALID_AMOUNT_MESSAGE,
  INVALID_INSTRUMENT_MESSAGE,
  INVALID_SCALE_MESSAGE,
} from "messages";
import type { InstrumentId } from "types/types.ts";

type SerializedShares = {
  amount: string;
  instrument: InstrumentId;
  scale: number;
};

/**
 * Shares object representing a quantity of units of a financial instrument
 * (e.g. 12,5000 shares of a UCITS fund).
 *
 * Plain immutable data: an integer `amount` counted at `scale` decimal
 * places, plus the `instrument` (typically an ISIN) it is a quantity of.
 * Build instances with {@link shares} or {@link zeroShares}; never mutate
 * fields directly.
 */
export type Shares = Readonly<{
  /** Amount of shares expressed as an integer at `scale` decimal places */
  amount: bigint;
  /** Identifier of the instrument these shares are units of (typically an ISIN) */
  instrument: InstrumentId;
  /** Number of decimal places the fractional part of a share is tracked at */
  scale: number;
  /**
   * JSON-serializable representation of the Shares object.
   * Called implicitly by `JSON.stringify(shares)`.
   * Use `shares(parse(jsonString))` to deserialize.
   */
  toJSON: () => SerializedShares;
}>;

const resolveInstrument = (instrument: InstrumentId): InstrumentId => {
  assert(
    typeof instrument === "string" && instrument.trim().length > 0,
    INVALID_INSTRUMENT_MESSAGE,
  );

  return instrument;
};

const resolveScale = (scale: number | undefined): number => {
  const resolved = scale ?? 0;

  assert(
    Number.isInteger(resolved),
    `${INVALID_SCALE_MESSAGE} Scale must be an integer, but received: ${resolved} (${typeof resolved})`,
  );

  assert(
    resolved >= 0,
    `${INVALID_SCALE_MESSAGE} Scale must be a non-negative integer, but received: ${resolved}`,
  );

  return resolved;
};

const resolveAmount = (amount: number | bigint | string): bigint => {
  if (typeof amount === "bigint") {
    return amount;
  }

  if (typeof amount === "number") {
    assert(
      Number.isSafeInteger(amount),
      `${INVALID_AMOUNT_MESSAGE} Amount is not a safe integer; use bigint or string.`,
    );

    return BigInt(amount);
  }

  const normalized = amount.trim().replace(/n$/, "");

  assert(
    /^-?\d+$/.test(normalized),
    `${INVALID_AMOUNT_MESSAGE} Invalid string amount: ${amount}`,
  );

  return BigInt(normalized);
};

export type SharesOptions = {
  instrument: InstrumentId;
  scale?: number;
  amount?: number | bigint | string;
};

/**
 * Create a new Shares object.
 *
 * @param amount The number of shares expressed as an integer at `scale`
 * decimal places. For example, 12.5 shares at scale 4 equals 125000.
 * Default `0n`.
 * @param instrument Identifier of the instrument (typically an ISIN).
 * @param scale Precision of the amount, i.e. how many decimal places a
 * fractional share is tracked at. Defaults to `0` (whole shares only) since,
 * unlike a currency's exponent, there is no fixed precision associated with
 * an instrument id.
 *
 * @example
 * import { shares } from "jsr:@quarzo-life/portio";
 *
 * const s = shares({ amount: 125000n, instrument: "LU1234567890", scale: 4 }); // 12.5000 shares
 */
export const shares = ({
  amount = 0n,
  instrument,
  scale,
}: SharesOptions): Shares => {
  const resolvedInstrument = resolveInstrument(instrument);

  const resolvedScale = resolveScale(scale);

  const resolvedAmount = resolveAmount(amount);

  return Object.freeze({
    amount: resolvedAmount,
    instrument: resolvedInstrument,
    scale: resolvedScale,
    toJSON() {
      return {
        amount: `${resolvedAmount}n`,
        instrument: resolvedInstrument,
        scale: resolvedScale,
      };
    },
  });
};

/**
 * Create a Shares object with amount `0n` for the specified instrument.
 *
 * @example
 * const zero = zeroShares("LU1234567890");
 */
export const zeroShares = (instrument: InstrumentId): Shares =>
  shares({ amount: 0n, instrument });
