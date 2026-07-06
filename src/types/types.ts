/**
 * Provide all the types used in the library.
 * @module
 */

/**
 * Uniquely identifies the financial instrument a {@link Shares} count belongs
 * to (typically an ISIN for a UCITS fund share class, but any stable code
 * works for other instruments).
 *
 * Unlike moneta's `Currency`, there is no fixed registry to resolve this
 * against: instruments are not a closed, standardized list like ISO 4217
 * currencies, so the id is treated as an opaque string.
 */
export type InstrumentId = string;

/**
 * Scaled Amount
 */
export type ScaledAmount = {
  /** Amount */
  readonly amount: bigint;
  /** Scale */
  readonly scale?: number;
};

/**
 * Rate is a ScaledAmount, a number or a bigint
 */
export type Rate = ScaledAmount | number | bigint;
