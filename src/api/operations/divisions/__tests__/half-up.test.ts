import { describe, expect, test } from "vitest";
import { halfUp } from "../half-up.ts";

describe("halfUp", () => {
  test("throws an Error when factor is not an integer", () => {
    expect(() => halfUp(10, 2.5)).toThrow(RangeError);
  });

  test("throws when factor is zero", () => {
    expect(() => halfUp(10, 0)).toThrow(RangeError);
  });

  test("throws when quantity is not a safe integer", () => {
    expect(() => halfUp(1.5, 2)).toThrow(RangeError);
    expect(() => halfUp(Number.MAX_SAFE_INTEGER + 1, 2)).toThrow(RangeError);
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

  test("zero", () => {
    expect(halfUp(0, 10)).toBe(0);
  });

  describe("negative quantities — nearest integer, ties toward +infinity", () => {
    test("exact division", () => {
      expect(halfUp(-20, 10)).toBe(-2);
    });

    test("-1.4 rounds to -1", () => {
      expect(halfUp(-14, 10)).toBe(-1);
    });

    test("-1.6 rounds to -2", () => {
      expect(halfUp(-16, 10)).toBe(-2);
    });

    test("the tie -1.5 rounds to -1", () => {
      expect(halfUp(-15, 10)).toBe(-1);
    });

    test("the tie -0.5 rounds to 0", () => {
      expect(halfUp(-5, 10)).toBe(0);
    });

    test("-0.6 rounds to -1", () => {
      expect(halfUp(-6, 10)).toBe(-1);
    });
  });

  describe("negative factor", () => {
    test("divides by the sign-flipped operands", () => {
      expect(halfUp(15, -10)).toBe(-1); // -1.5 → -1
      expect(halfUp(-15, -10)).toBe(2); // 1.5 → 2
    });
  });

  describe("large operands stay exact", () => {
    test("rounds the largest safe integer", () => {
      // 9007199254740991 / 10 = 900719925474099.1
      expect(halfUp(Number.MAX_SAFE_INTEGER, 10)).toBe(900719925474099);
      // 9007199254740991 / 2 = 4503599627370495.5 → tie rounds up
      expect(halfUp(Number.MAX_SAFE_INTEGER, 2)).toBe(4503599627370496);
      // -4503599627370495.5 → tie rounds toward +infinity
      expect(halfUp(-Number.MAX_SAFE_INTEGER, 2)).toBe(-4503599627370495);
    });
  });
});
