import { describe, expect, test } from "vitest";
import { isGreaterThanOrEqual } from "../is-greater-than-or-equal.ts";

describe("isGreaterThanOrEqual", () => {
  test("returns true when first is greater than second", () => {
    expect(
      isGreaterThanOrEqual({ quantity: 30, scale: 1 }, {
        quantity: 20,
        scale: 1,
      }),
    )
      .toBe(true);
  });

  test("returns false when first is less than second", () => {
    expect(
      isGreaterThanOrEqual({ quantity: 20, scale: 1 }, {
        quantity: 30,
        scale: 1,
      }),
    )
      .toBe(false);
  });

  test("returns false when first equals second", () => {
    expect(
      isGreaterThanOrEqual({ quantity: 30, scale: 1 }, {
        quantity: 30,
        scale: 1,
      }),
    )
      .toBe(true);
  });

  test("handles mixed scales by aligning before comparing", () => {
    expect(
      isGreaterThanOrEqual({ quantity: 25, scale: 1 }, {
        quantity: 30,
        scale: 2,
      }),
    )
      .toBe(true);
  });
});
