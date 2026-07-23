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

  test("produces a non-integer quantity when n is fractional and the result is not exact", () => {
    expect(multiply(0.5)({ quantity: 3, scale: 1 })).toEqual({
      quantity: 1.5,
      scale: 1,
    });
  });
});
