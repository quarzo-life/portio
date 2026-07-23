import { describe, expect, test } from "vitest";
import { floor } from "../floor.ts";

describe("floor", () => {
  describe("default floorScale (0) — floor to integer precision", () => {
    test("rounds quantity down to the nearest integer", () => {
      expect(floor({ quantity: 25, scale: 1 })).toEqual({
        quantity: 20,
        scale: 1,
      });
    });

    test("leaves quantity unchanged when it is already an integer", () => {
      expect(floor({ quantity: 30, scale: 1 })).toEqual({
        quantity: 30,
        scale: 1,
      });
    });

    test("returns zero unchanged", () => {
      expect(floor({ quantity: 0, scale: 1 })).toEqual({
        quantity: 0,
        scale: 1,
      });
    });

    test("works with scale 0", () => {
      expect(floor({ quantity: 5, scale: 0 })).toEqual({
        quantity: 5,
        scale: 0,
      });
    });

    test("works with scale 2", () => {
      expect(floor({ quantity: 199, scale: 2 })).toEqual({
        quantity: 100,
        scale: 2,
      });
    });

    test("preserves the scale in the result", () => {
      expect(floor({ quantity: 25, scale: 1 }).scale).toBe(1);
    });

    test("rounds a negative quantity down (toward negative infinity)", () => {
      expect(floor({ quantity: -25, scale: 1 })).toEqual({
        quantity: -30,
        scale: 1,
      });
    });

    test("leaves a negative quantity unchanged when it is already an integer", () => {
      expect(floor({ quantity: -30, scale: 1 })).toEqual({
        quantity: -30,
        scale: 1,
      });
    });
  });

  describe("explicit floorScale — floor to a specific decimal precision", () => {
    test("floors to 1 decimal place when floorScale is 1", () => {
      // 1.23 floored to 1 decimal → 1.2 (quantities: 123 → 120, scale 2)
      expect(floor({ quantity: 123, scale: 2 }, 1)).toEqual({
        quantity: 120,
        scale: 2,
      });
    });

    test("floors to 2 decimal places when floorScale is 2", () => {
      // 1.2345 floored to 2 decimals → 1.23 (quantities: 12345 → 12300, scale 4)
      expect(floor({ quantity: 12345, scale: 4 }, 2)).toEqual({
        quantity: 12300,
        scale: 4,
      });
    });

    test("leaves quantity unchanged when floorScale equals scale (full precision)", () => {
      // 1.23 floored to 2 decimals → 1.23 (no rounding)
      expect(floor({ quantity: 123, scale: 2 }, 2)).toEqual({
        quantity: 123,
        scale: 2,
      });
    });

    test("rounds a negative quantity down when floorScale is 1", () => {
      // -1.21 floored to 1 decimal → -1.3 (quantities: -121 → -130, scale 2)
      expect(floor({ quantity: -121, scale: 2 }, 1)).toEqual({
        quantity: -130,
        scale: 2,
      });
    });
  });
});
