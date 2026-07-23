import { describe, expect, test } from "vitest";
import { isLowerThan } from "../is-lower-than.ts";

describe("isLowerThan", () => {
  test("returns true when first is less than second", () => {
    expect(isLowerThan({ quantity: 20, scale: 1 }, { quantity: 30, scale: 1 }))
      .toBe(true);
  });

  test("returns false when first is greater than second", () => {
    expect(isLowerThan({ quantity: 30, scale: 1 }, { quantity: 20, scale: 1 }))
      .toBe(false);
  });

  test("returns false when first equals second", () => {
    expect(isLowerThan({ quantity: 30, scale: 1 }, { quantity: 30, scale: 1 }))
      .toBe(false);
  });

  test("handles mixed scales by aligning before comparing", () => {
    expect(isLowerThan({ quantity: 30, scale: 2 }, { quantity: 25, scale: 1 }))
      .toBe(true);
  });
});
