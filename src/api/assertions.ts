import { MAX_SCALE } from "./constants.ts";
import { Shares } from "./types.ts";

// Internal guards, not part of the public API. Every public function
// validates its inputs and its result through these, so that no `Shares`
// with a `quantity` outside the safe-integer range is ever accepted or
// returned: beyond that range, `number` arithmetic silently stops being
// exact.

/**
 * Checks that `value` is a safe integer and returns it, normalizing `-0`
 * to `0`.
 *
 * When the operands of `+`, `-` or `*` are safe integers, the float result
 * is a safe integer only if it is the exact mathematical result — so this
 * check on a result is enough to guarantee exactness.
 */
export const safeInteger = (value: number, label: string): number => {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`${label} must be a safe integer, but found ${value}`);
  }

  return value === 0 ? 0 : value;
};

/**
 * Checks that `scale` is an integer between `0` and `MAX_SCALE`, so that
 * `10 ** scale` is always an exact safe integer.
 */
export const assertScale = (scale: number, label: string = "scale"): void => {
  if (!Number.isInteger(scale) || scale < 0 || scale > MAX_SCALE) {
    throw new RangeError(
      `${label} must be an integer between 0 and ${MAX_SCALE}, but found ${scale}`,
    );
  }
};

/** Checks that `shares` has a safe-integer quantity and a valid scale. */
export const assertShares = ({ quantity, scale }: Shares): void => {
  safeInteger(quantity, "quantity");
  assertScale(scale);
};
