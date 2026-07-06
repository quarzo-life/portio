import type { Rate, ScaledAmount } from "types/types.ts";

/**
 * is Scaled Amount ie object has an amount & scale property
 * @param rate
 * @returns
 */
export function isScaledAmount(rate: Rate): rate is ScaledAmount {
  return (rate as ScaledAmount)?.hasOwnProperty("amount");
}
