import { describe, expect, test } from "vitest";
import { ceil } from "../ceil.ts";

describe("ceil", () => {
  describe("default ceilScale (0) — ceil to integer precision", () => {
    test("rounds quantity up to the nearest integer", () => {
      expect(ceil({ quantity: 25, scale: 1 })).toEqual({
        quantity: 30,
        scale: 1,
      });
    });

    test("leaves quantity unchanged when it is already an integer", () => {
      expect(ceil({ quantity: 30, scale: 1 })).toEqual({
        quantity: 30,
        scale: 1,
      });
    });

    test("returns zero unchanged", () => {
      expect(ceil({ quantity: 0, scale: 1 })).toEqual({
        quantity: 0,
        scale: 1,
      });
    });

    test("works with scale 0", () => {
      expect(ceil({ quantity: 5, scale: 0 })).toEqual({
        quantity: 5,
        scale: 0,
      });
    });

    test("works with scale 2", () => {
      expect(ceil({ quantity: 101, scale: 2 })).toEqual({
        quantity: 200,
        scale: 2,
      });
    });

    test("preserves the scale in the result", () => {
      expect(ceil({ quantity: 25, scale: 1 }).scale).toBe(1);
    });

    test("rounds a negative quantity up (toward positive infinity)", () => {
      expect(ceil({ quantity: -25, scale: 1 })).toEqual({
        quantity: -20,
        scale: 1,
      });
    });

    test("leaves a negative quantity unchanged when it is already an integer", () => {
      expect(ceil({ quantity: -30, scale: 1 })).toEqual({
        quantity: -30,
        scale: 1,
      });
    });
  });

  describe("explicit ceilScale — ceil to a specific decimal precision", () => {
    test("ceils to 1 decimal place when ceilScale is 1", () => {
      // 1.21 ceiled to 1 decimal → 1.3 (quantities: 121 → 130, scale 2)
      expect(ceil({ quantity: 121, scale: 2 }, 1)).toEqual({
        quantity: 130,
        scale: 2,
      });
    });

    test("ceils to 2 decimal places when ceilScale is 2", () => {
      // 1.2301 ceiled to 2 decimals → 1.24 (quantities: 12301 → 12400, scale 4)
      expect(ceil({ quantity: 12301, scale: 4 }, 2)).toEqual({
        quantity: 12400,
        scale: 4,
      });
    });

    test("leaves quantity unchanged when ceilScale equals scale (full precision)", () => {
      // 1.23 ceiled to 2 decimals → 1.23 (no rounding)
      expect(ceil({ quantity: 123, scale: 2 }, 2)).toEqual({
        quantity: 123,
        scale: 2,
      });
    });

    test("rounds a negative quantity up when ceilScale is 1", () => {
      // -1.29 ceiled to 1 decimal → -1.2 (quantities: -129 → -120, scale 2)
      expect(ceil({ quantity: -129, scale: 2 }, 1)).toEqual({
        quantity: -120,
        scale: 2,
      });
    });
  });
});
