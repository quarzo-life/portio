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
 * `halfUp` by default.
 *
 * @typeParam TargetScale - The target scale, trackable at the type level.
 * @param target - The scale to convert to.
 * @param divide - The rounding strategy used when the scale decreases.
 * Defaults to `halfUp`.
 * @returns A function converting a `Shares` to `Shares<TargetScale>`.
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
): (shares: Shares) => Shares<TargetScale> =>
({ quantity, scale }: Shares): Shares<TargetScale> => {
  if (target > scale) {
    return {
      quantity: quantity * 10 ** (target - scale),
      scale: target,
    };
  }

  return {
    quantity: divide(quantity, 10 ** (scale - target)),
    scale: target,
  };
};
