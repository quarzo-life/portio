import { describe, expect, test } from "vitest";
import { isInteger } from "../is-integer.ts";

describe("isInteger", () => {
  test("returns true when the represented value is a whole number", () => {
    expect(isInteger({ quantity: 30, scale: 1 })).toBe(true);
  });

  test("returns false when the represented value has a fractional part", () => {
    expect(isInteger({ quantity: 25, scale: 1 })).toBe(false);
  });

  test("returns true for zero", () => {
    expect(isInteger({ quantity: 0, scale: 1 })).toBe(true);
  });

  test("returns true for any quantity with scale 0", () => {
    expect(isInteger({ quantity: 5, scale: 0 })).toBe(true);
  });

  test("returns true when quantity is an exact multiple of 10^scale at scale 2", () => {
    expect(isInteger({ quantity: 100, scale: 2 })).toBe(true);
  });

  test("returns false when quantity is not a multiple of 10^scale at scale 2", () => {
    expect(isInteger({ quantity: 101, scale: 2 })).toBe(false);
  });
});
