import { describe, expect, test } from "vitest";
import {
  add,
  ceil,
  equal,
  floor,
  halfUp,
  isGreaterThan,
  isInteger,
  isLowerThan,
  multiply,
  subtract,
  toDecimal,
  toScale,
} from "../index.ts";

const MAX = Number.MAX_SAFE_INTEGER; // 9007199254740991

// Regression suite for the 2026-11-12 audit (QL-1575): every function is
// exact, or throws an `Error` when it cannot be.
describe("exactness (QL-1575 audit table)", () => {
  test("#1 toDecimal never uses exponent notation", () => {
    expect(toDecimal({ quantity: 1, scale: 7 })).toBe("0.0000001");
  });

  test("#2 toDecimal keeps the value at a very large scale", () => {
    expect(toDecimal({ quantity: 1, scale: 400 })).toBe(
      `0.${"0".repeat(399)}1`,
    );
  });

  test("#3 toScale rounds -1.4 to -1 (nearest integer)", () => {
    expect(toScale(0)({ quantity: -14, scale: 1 })).toEqual({
      quantity: -1,
      scale: 0,
    });
  });

  test("#4 add throws when the sum is not a safe integer", () => {
    expect(() => add({ quantity: MAX, scale: 0 }, { quantity: 2, scale: 0 }))
      .toThrow(Error);
  });

  test("#5 toScale throws when the upscaled quantity is not a safe integer", () => {
    expect(() => toScale(8)({ quantity: MAX, scale: 5 })).toThrow(Error);
  });

  test("#6 equal throws on quantities that are not safe integers", () => {
    // 9007199254740993 and 9007199254740992: neither is a safe integer.
    expect(() =>
      equal({ quantity: MAX + 2, scale: 0 }, { quantity: MAX + 1, scale: 0 })
    ).toThrow(Error);
  });

  test("#7 multiply throws when the multiplier is not an integer", () => {
    expect(() => multiply(1.1)({ quantity: 3, scale: 2 })).toThrow(Error);
  });

  test("#8 halfUp throws an Error (not a string) on a non-integer factor", () => {
    expect(() => halfUp(10, 2.5)).toThrow(Error);
  });

  test("#9 toScale rounds the tie -1.5 toward positive infinity", () => {
    expect(toScale(0)({ quantity: -15, scale: 1 })).toEqual({
      quantity: -1,
      scale: 0,
    });
  });
});

describe("safe-integer guard on inputs", () => {
  const unsafe = { quantity: MAX + 1, scale: 0 };
  const fractional = { quantity: 1.5, scale: 1 };
  const ok = { quantity: 1, scale: 0 };

  test.each([
    ["add", () => add(unsafe, ok)],
    ["subtract", () => subtract(ok, unsafe)],
    ["multiply", () => multiply(1)(unsafe)],
    ["floor", () => floor(unsafe)],
    ["ceil", () => ceil(unsafe)],
    ["toScale", () => toScale(0)(unsafe)],
    ["toDecimal", () => toDecimal(unsafe)],
    ["isInteger", () => isInteger(unsafe)],
    ["isGreaterThan", () => isGreaterThan(unsafe, ok)],
    ["isLowerThan", () => isLowerThan(ok, unsafe)],
    ["add (fractional quantity)", () => add(fractional, ok)],
    ["toDecimal (fractional quantity)", () => toDecimal(fractional)],
    ["toDecimal (NaN)", () => toDecimal({ quantity: NaN, scale: 0 })],
    ["toDecimal (negative scale)", () => toDecimal({ quantity: 1, scale: -1 })],
    [
      "toDecimal (fractional scale)",
      () => toDecimal({ quantity: 1, scale: 1.5 }),
    ],
    ["toScale (negative target)", () => toScale(-1)],
  ])("%s throws a RangeError", (_name, call) => {
    expect(call).toThrow(RangeError);
  });
});

describe("safe-integer guard on results", () => {
  test("subtract throws when the difference is not a safe integer", () => {
    expect(() =>
      subtract({ quantity: -MAX, scale: 0 }, { quantity: 2, scale: 0 })
    ).toThrow(RangeError);
  });

  test("add throws when aligning the scales overflows", () => {
    expect(() => add({ quantity: MAX, scale: 0 }, { quantity: 1, scale: 1 }))
      .toThrow(RangeError);
  });

  test("multiply throws when the product is not a safe integer", () => {
    expect(() => multiply(2)({ quantity: MAX, scale: 0 })).toThrow(RangeError);
  });

  test("ceil throws when the rounded quantity is not a safe integer", () => {
    expect(() => ceil({ quantity: MAX, scale: 1 })).toThrow(RangeError);
  });

  test("floor throws when the rounded quantity is not a safe integer", () => {
    expect(() => floor({ quantity: -MAX, scale: 1 })).toThrow(RangeError);
  });

  test("toScale throws when a custom division returns a non-integer", () => {
    const naive = (amount: number, factor: number) => amount / factor;
    expect(() => toScale(0, naive)({ quantity: 15, scale: 1 })).toThrow(
      RangeError,
    );
  });

  test("toScale throws when the downscale factor is not a safe integer", () => {
    expect(() => toScale(0)({ quantity: 1, scale: 400 })).toThrow(RangeError);
  });

  test("results at the limit of the safe range are exact", () => {
    expect(add({ quantity: MAX - 1, scale: 0 }, { quantity: 1, scale: 0 }))
      .toEqual({ quantity: MAX, scale: 0 });
    expect(toScale(0)({ quantity: MAX, scale: 15 })).toEqual({
      quantity: 9,
      scale: 0,
    });
    expect(floor({ quantity: MAX, scale: 3 })).toEqual({
      quantity: 9007199254740000,
      scale: 3,
    });
    expect(ceil({ quantity: -MAX, scale: 3 })).toEqual({
      quantity: -9007199254740000,
      scale: 3,
    });
  });
});

describe("zero", () => {
  test("never returns a negative zero", () => {
    expect(Object.is(multiply(-1)({ quantity: 0, scale: 2 }).quantity, 0))
      .toBe(true);
    expect(Object.is(ceil({ quantity: -5, scale: 1 }).quantity, 0)).toBe(true);
    expect(Object.is(toScale(0)({ quantity: -4, scale: 1 }).quantity, 0))
      .toBe(true);
  });

  test("a zero position converts to any scale", () => {
    expect(toScale(0)({ quantity: 0, scale: 400 })).toEqual({
      quantity: 0,
      scale: 0,
    });
    expect(toScale(400)({ quantity: 0, scale: 0 })).toEqual({
      quantity: 0,
      scale: 400,
    });
  });
});
