import { type Shares, shares } from "shares/index.ts";
import type { Rate } from "types/types.ts";
import { getAmountAndScale } from "utils/index.ts";

/**
 * Multiply a Shares object by a rate (e.g. a stock-split or consolidation
 * ratio).
 *
 * If you need to multiply by a fractional multiplier, don't use a float —
 * pass a scaled amount instead. For example instead of 1.5, pass
 * `{ amount: 15n, scale: 1 }`.
 *
 * Unlike `dangerDivide` in moneta, this never loses precision: the scale
 * only ever grows (`scale + multiplierScale`), so there is no rounding
 * strategy to choose.
 *
 * @param multiplicand Shares object
 * @param multiplier multiplier: ScaledAmount | number | bigint
 * @returns a Shares object
 * @example // Multiply by an integer (e.g. a 4-for-1 stock split)
 * import { shares, multiply } from "jsr:@quarzo-life/portio"
 *
 * const s = shares({ amount: 400n, instrument: "LU1234567890" });
 *
 * multiply(s, 4); // a Shares object with amount 1600
 *
 * @example // Multiply by a scaled multiplier
 * import { shares, multiply } from "jsr:@quarzo-life/portio"
 *
 * const s = shares({ amount: 401n, instrument: "LU1234567890" });
 *
 * multiply(s, { amount: 2001n, scale: 3 }); // a Shares object with amount 802401 and scale 3
 */
export const multiply = (multiplicand: Shares, multiplier: Rate): Shares => {
  const { amount, instrument, scale } = multiplicand;

  const { amount: multiplierAmount, scale: multiplierScale } =
    getAmountAndScale(multiplier);

  return shares({
    amount: amount * multiplierAmount,
    instrument,
    scale: scale + multiplierScale,
  });
};
