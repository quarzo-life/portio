import { describe, expect, test } from "vitest";
import { halfUp } from "../half-up.ts";

describe("halfUp", () => {
  test("throws when factor is not an integer", () => {
    expect(() => halfUp(10, 2.5)).toThrow();
  });

  test("exact division", () => {
    expect(halfUp(9, 3)).toBe(3);
  });

  test("rounding down", () => {
    expect(halfUp(5, 4)).toBe(1);
  });

  test("rounding up", () => {
    expect(halfUp(5, 3)).toBe(2);
  });

  test("edge case", () => {
    expect(halfUp(6, 4)).toBe(2);
  });
});
