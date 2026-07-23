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
});
