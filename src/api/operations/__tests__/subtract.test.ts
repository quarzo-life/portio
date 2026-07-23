import { describe, expect, test } from "vitest";
import { subtract } from "../subtract.ts";

describe("subtract", () => {
  test("computes the difference of two shares with the same scale", () => {
    expect(subtract({ quantity: 30, scale: 1 }, { quantity: 10, scale: 1 }))
      .toEqual({ quantity: 20, scale: 1 });
  });

  test("preserves the scale in the result", () => {
    expect(
      subtract({ quantity: 30, scale: 2 }, { quantity: 10, scale: 2 }).scale,
    )
      .toBe(2);
  });

  test("aligns operands to the higher scale before subtracting when scales differ", () => {
    expect(subtract({ quantity: 30, scale: 1 }, { quantity: 20, scale: 2 }))
      .toEqual({
        quantity: 280,
        scale: 2,
      });
  });
});
