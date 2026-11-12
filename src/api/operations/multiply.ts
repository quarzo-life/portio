import { assertShares, safeInteger } from "../assertions.ts";
import { Shares } from "../types.ts";

/**
 * Multiplies a {@linkcode Shares} position by an integer factor.
 *
 * Curried: `multiply(n)` returns a function that scales a position, which
 * makes it convenient to map over several positions. The scale is preserved;
 * only the quantity is multiplied.
 *
 * The factor must be an integer, so the resulting quantity is always an
 * integer: `multiply(1.1)` throws instead of producing a fractional
 * quantity. Use `multiply(-1)` to negate a position.
 *
 * @param n - The multiplication factor. Must be a safe integer.
 * @returns A function taking a `Shares` and returning it multiplied by `n`,
 * at the same scale.
 * @throws {RangeError} If `n` is not a safe integer (thrown by
 * `multiply(n)` itself), if the position is not valid, or if the product
 * leaves the safe-integer range.
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
export const multiply = (n: number): (shares: Shares) => Shares => {
  safeInteger(n, "multiplier");

  return (shares: Shares): Shares => {
    assertShares(shares);

    return {
      quantity: safeInteger(n * shares.quantity, "product"),
      scale: shares.scale,
    };
  };
};
