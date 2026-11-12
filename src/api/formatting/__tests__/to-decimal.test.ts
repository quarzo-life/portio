import { describe, expect, test } from "vitest";
import { toDecimal } from "../to-decimal.ts";

describe("toDecimal", () => {
  test("returns quantity as a string when scale is 0", () => {
    expect(toDecimal({ quantity: 5, scale: 0 })).toBe("5");
  });

  test("pads a whole number with trailing zeros to match scale", () => {
    expect(toDecimal({ quantity: 30, scale: 1 })).toBe("3.0");
  });

  test("returns exact decimal digits when no padding needed", () => {
    expect(toDecimal({ quantity: 25, scale: 1 })).toBe("2.5");
  });

  test("pads whole number with two trailing zeros at scale 2", () => {
    expect(toDecimal({ quantity: 100, scale: 2 })).toBe("1.00");
  });

  test("pads partial decimals with trailing zeros at scale 2", () => {
    expect(toDecimal({ quantity: 150, scale: 2 })).toBe("1.50");
  });

  test("formats zero with `scale` fractional digits", () => {
    expect(toDecimal({ quantity: 0, scale: 0 })).toBe("0");
    expect(toDecimal({ quantity: 0, scale: 3 })).toBe("0.000");
  });

  test("pads with leading zeros when the quantity has fewer digits than scale", () => {
    expect(toDecimal({ quantity: 5, scale: 2 })).toBe("0.05");
    expect(toDecimal({ quantity: 1, scale: 7 })).toBe("0.0000001");
  });

  test("formats negative quantities", () => {
    expect(toDecimal({ quantity: -5, scale: 0 })).toBe("-5");
    expect(toDecimal({ quantity: -25, scale: 1 })).toBe("-2.5");
    expect(toDecimal({ quantity: -5, scale: 2 })).toBe("-0.05");
  });

  test("formats the largest safe integer exactly", () => {
    expect(toDecimal({ quantity: Number.MAX_SAFE_INTEGER, scale: 0 })).toBe(
      "9007199254740991",
    );
    expect(toDecimal({ quantity: Number.MAX_SAFE_INTEGER, scale: 5 })).toBe(
      "90071992547.40991",
    );
    expect(toDecimal({ quantity: -Number.MAX_SAFE_INTEGER, scale: 15 })).toBe(
      "-9.007199254740991",
    );
  });
});
