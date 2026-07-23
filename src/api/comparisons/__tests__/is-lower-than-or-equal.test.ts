import { describe, expect, test } from "vitest";
import { isLowerThanOrEqual } from "../is-lower-than-or-equal.ts";

describe("isLowerThanOrEqual", () => {
  test("returns true when first is less than second", () => {
    expect(
      isLowerThanOrEqual({ quantity: 20, scale: 1 }, {
        quantity: 30,
        scale: 1,
      }),
    )
      .toBe(true);
  });

  test("returns false when first is greater than second", () => {
    expect(
      isLowerThanOrEqual({ quantity: 30, scale: 1 }, {
        quantity: 20,
        scale: 1,
      }),
    )
      .toBe(false);
  });

  test("returns false when first equals second", () => {
    expect(
      isLowerThanOrEqual({ quantity: 30, scale: 1 }, {
        quantity: 30,
        scale: 1,
      }),
    )
      .toBe(true);
  });

  test("handles mixed scales by aligning before comparing", () => {
    expect(
      isLowerThanOrEqual({ quantity: 30, scale: 2 }, {
        quantity: 25,
        scale: 1,
      }),
    )
      .toBe(true);
  });
});
