import { assertScale, assertShares, safeInteger } from "../assertions.ts";
import { halfUp } from "../operations/divisions/half-up.ts";
import { DivideOperation } from "../operations/divisions/types.ts";
import { Shares } from "../types.ts";

/**
 * Converts a {@linkcode Shares} position to another scale.
 *
 * Curried: `toScale(target)` returns a function converting any position to
 * `target` decimal places. Increasing the scale is lossless (the quantity is
 * multiplied by a power of ten). Decreasing the scale requires rounding: the
 * quantity is divided using the provided {@linkcode DivideOperation},
 * `halfUp` by default (nearest integer, ties toward positive infinity — so
 * -1.4 becomes -1 and -1.5 becomes -1).
 *
 * The result is exact or the call throws: a conversion whose quantity
 * leaves the safe-integer range is rejected instead of returning an
 * approximation.
 *
 * @typeParam TargetScale - The target scale, trackable at the type level.
 * @param target - The scale to convert to.
 * @param divide - The rounding strategy used when the scale decreases.
 * Defaults to `halfUp`.
 * @returns A function converting a `Shares` to `Shares<TargetScale>`.
 * @throws {RangeError} If `target` or the position's scale is not an integer
 * between `0` and `MAX_SCALE`, if the position's quantity is not a safe
 * integer, or if the converted quantity cannot be represented as a safe
 * integer.
 *
 * @example Increasing precision (lossless)
 * ```ts
 * import { toScale } from "@quarzo-life/portio";
 *
 * toScale(2)({ quantity: 5, scale: 0 });
 * // { quantity: 500, scale: 2 } → 5 shares, now at 2 decimals
 * ```
 *
 * @example Decreasing precision (rounds half up by default)
 * ```ts
 * import { toScale } from "@quarzo-life/portio";
 *
 * toScale(0)({ quantity: 55, scale: 1 });
 * // { quantity: 6, scale: 0 } → 5.5 rounds up to 6 shares
 *
 * toScale(0)({ quantity: -14, scale: 1 });
 * // { quantity: -1, scale: 0 } → -1.4 rounds to -1 share
 * ```
 *
 * @example Decreasing precision with a custom rounding strategy
 * ```ts
 * import { toScale } from "@quarzo-life/portio";
 *
 * const down = (amount: number, factor: number) =>
 *   Math.floor(amount / factor);
 *
 * toScale(0, down)({ quantity: 55, scale: 1 });
 * // { quantity: 5, scale: 0 } → 5.5 rounds down to 5 shares
 * ```
 */
export const toScale = <TargetScale extends number = number>(
  target: TargetScale,
  divide: DivideOperation = halfUp,
): (shares: Shares) => Shares<TargetScale> => {
  assertScale(target, "target scale");

  return (shares: Shares): Shares<TargetScale> => {
    assertShares(shares);
    const { quantity, scale } = shares;

    if (target >= scale) {
      return {
        quantity: safeInteger(
          quantity * 10 ** (target - scale),
          `quantity at scale ${target}`,
        ),
        scale: target,
      };
    }

    return {
      quantity: safeInteger(
        divide(quantity, 10 ** (scale - target)),
        `quantity at scale ${target}`,
      ),
      scale: target,
    };
  };
};
