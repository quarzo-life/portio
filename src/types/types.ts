/**
 * Provide all the types used in the library.
 * @module
 */

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
