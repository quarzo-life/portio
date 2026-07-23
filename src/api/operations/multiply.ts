import { Shares } from "../types.ts";

/**
 * Multiplies a {@linkcode Shares} position by a factor.
 *
 * Curried: `multiply(n)` returns a function that scales a position, which
 * makes it convenient to map over several positions. The scale is preserved;
 * only the quantity is multiplied. Use an integer factor to guarantee the
 * resulting quantity stays an integer.
 *
 * @param n - The multiplication factor.
 * @returns A function taking a `Shares` and returning it multiplied by `n`,
 * at the same scale.
 *
 * @example Tripling a position
 * ```ts
 * import { multiply } from "@quarzo-life/portio";
 *
 * multiply(3)({ quantity: 25, scale: 1 });
 * // { quantity: 75, scale: 1 } → 2.5 × 3 = 7.5 shares
 * ```
 *
 * @example Mapping over several positions
 * ```ts
 * import { multiply, type Shares } from "@quarzo-life/portio";
 *
 * const double = multiply(2);
 * const positions: Shares[] = [
 *   { quantity: 10, scale: 0 },
 *   { quantity: 125, scale: 2 },
 * ];
 * positions.map(double);
 * // [{ quantity: 20, scale: 0 }, { quantity: 250, scale: 2 }]
 * ```
 */
export const multiply =
  (n: number): (shares: Shares) => Shares =>
  ({ quantity, scale }: Shares): Shares => ({
    quantity: n * quantity,
    scale,
  });
