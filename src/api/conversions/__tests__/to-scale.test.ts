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
});
