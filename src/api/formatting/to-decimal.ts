import { Shares } from "../types.ts";

/**
 * Formats a {@linkcode Shares} position as a decimal string.
 *
 * The fractional part is padded with trailing zeros to exactly `scale`
 * digits, so the precision of the position stays visible. A position at
 * scale `0` is formatted without a decimal point.
 *
 * @param shares - The position to format.
 * @returns The decimal representation, with `scale` fractional digits.
 *
 * @example Formatting positions at various scales
 * ```ts
 * import { toDecimal } from "@quarzo-life/portio";
 *
 * toDecimal({ quantity: 3, scale: 0 }); // "3"
 * toDecimal({ quantity: 55, scale: 1 }); // "5.5"
 * toDecimal({ quantity: 500, scale: 2 }); // "5.00"
 * toDecimal({ quantity: 12345, scale: 4 }); // "1.2345"
 * ```
 */
export const toDecimal = ({ quantity, scale }: Shares): string => {
  if (scale === 0) {
    return String(quantity);
  }

  const result = String(quantity / 10 ** scale);

  const [whole, decimals] = result.split(".");

  return `${whole}.${(decimals || "").padEnd(scale, "0")}`;
};
