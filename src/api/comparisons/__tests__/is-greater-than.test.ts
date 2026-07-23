import { describe, expect, test } from "vitest";
import { isGreaterThan } from "../is-greater-than.ts";

describe("isGreaterThan", () => {
  test("returns true when first is greater than second", () => {
    expect(
      isGreaterThan({ quantity: 30, scale: 1 }, { quantity: 20, scale: 1 }),
    )
      .toBe(true);
  });

  test("returns false when first is less than second", () => {
    expect(
      isGreaterThan({ quantity: 20, scale: 1 }, { quantity: 30, scale: 1 }),
    )
      .toBe(false);
  });

  test("returns false when first equals second", () => {
    expect(
      isGreaterThan({ quantity: 30, scale: 1 }, { quantity: 30, scale: 1 }),
    )
      .toBe(false);
  });

  test("handles mixed scales by aligning before comparing", () => {
    expect(
      isGreaterThan({ quantity: 25, scale: 1 }, { quantity: 30, scale: 2 }),
    )
      .toBe(true);
  });
});
