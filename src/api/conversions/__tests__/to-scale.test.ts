import { describe, expect, test } from "vitest";
import { toScale } from "../to-scale.ts";

describe("toScale", () => {
  test("leaves shares unchanged when already at the target scale", () => {
    expect(toScale(1)({ quantity: 10, scale: 1 })).toEqual({
      quantity: 10,
      scale: 1,
    });
  });

  test("scales up quantity to the target scale", () => {
    expect(toScale(2)({ quantity: 10, scale: 1 })).toEqual({
      quantity: 100,
      scale: 2,
    });
  });

  test("scales down without loss when the division is exact", () => {
    expect(toScale(1)({ quantity: 100, scale: 2 })).toEqual({
      quantity: 10,
      scale: 1,
    });
  });

  test("scales down without loss when the division is exact", () => {
    expect(toScale(0)({ quantity: 10_000_000, scale: 5 })).toEqual({
      quantity: 100,
      scale: 0,
    });
  });

  test("scales down with loss when the division is not exact", () => {
    expect(toScale(1)({ quantity: 15, scale: 2 })).toEqual({
      quantity: 2,
      scale: 1,
    });
  });

  describe("negative quantities", () => {
    test("scales up", () => {
      expect(toScale(2)({ quantity: -10, scale: 1 })).toEqual({
        quantity: -100,
        scale: 2,
      });
    });

    test("rounds to the nearest integer when scaling down", () => {
      expect(toScale(0)({ quantity: -14, scale: 1 })).toEqual({
        quantity: -1,
        scale: 0,
      });
      expect(toScale(0)({ quantity: -16, scale: 1 })).toEqual({
        quantity: -2,
        scale: 0,
      });
    });

    test("rounds a tie toward positive infinity when scaling down", () => {
      expect(toScale(0)({ quantity: -15, scale: 1 })).toEqual({
        quantity: -1,
        scale: 0,
      });
      expect(toScale(2)({ quantity: -12345, scale: 4 })).toEqual({
        quantity: -123,
        scale: 2,
      });
    });
  });

  describe("custom division", () => {
    test("uses the provided rounding strategy when scaling down", () => {
      const down = (amount: number, factor: number) =>
        Math.floor(amount / factor);
      expect(toScale(0, down)({ quantity: 55, scale: 1 })).toEqual({
        quantity: 5,
        scale: 0,
      });
    });
  });
});
