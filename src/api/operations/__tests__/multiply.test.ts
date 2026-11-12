import { describe, expect, test } from "vitest";
import { multiply } from "../multiply.ts";

describe("multiply", () => {
  test("multiplies the quantity by n while preserving the scale", () => {
    expect(multiply(2)({ quantity: 30, scale: 1 })).toEqual({
      quantity: 60,
      scale: 1,
    });
  });

  test("returns quantity zero when multiplied by 0", () => {
    expect(multiply(0)({ quantity: 30, scale: 1 })).toEqual({
      quantity: 0,
      scale: 1,
    });
  });

  test("negates a position when multiplied by -1", () => {
    expect(multiply(-1)({ quantity: 30, scale: 1 })).toEqual({
      quantity: -30,
      scale: 1,
    });
  });

  test("multiplies a negative quantity", () => {
    expect(multiply(3)({ quantity: -25, scale: 1 })).toEqual({
      quantity: -75,
      scale: 1,
    });
  });

  test("throws when n is not an integer, even if the product would be", () => {
    expect(() => multiply(0.5)).toThrow(RangeError);
    expect(() => multiply(0.5)({ quantity: 4, scale: 1 })).toThrow(RangeError);
  });

  test("throws when n is not finite", () => {
    expect(() => multiply(NaN)).toThrow(RangeError);
    expect(() => multiply(Infinity)).toThrow(RangeError);
  });
});
