import type { Rate } from "types/types.ts";
import { isScaledAmount } from "./isScaledAmount.ts";

/**
 * Get the amount and scale from a ScaledAmount, a number or a bigint
 * @param value
 * @returns
 */
export const getAmountAndScale = (value: Rate): {
  amount: bigint;
  scale: number;
} => {
  if (isScaledAmount(value)) {
    return { amount: value.amount, scale: value.scale ?? 0 };
  }

  return { amount: BigInt(value), scale: 0 };
};
