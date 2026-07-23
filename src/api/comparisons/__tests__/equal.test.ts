import { describe, expect, test } from "vitest";
import { equal } from "../equal.ts";

describe("equal", () => {
  test("returns true when both shares represent the same value", () => {
    expect(equal({ quantity: 30, scale: 1 }, { quantity: 30, scale: 1 })).toBe(
      true,
    );
  });

  test("returns false when first is greater than second", () => {
    expect(equal({ quantity: 30, scale: 1 }, { quantity: 20, scale: 1 })).toBe(
      false,
    );
  });

  test("returns true when both represent the same value at different scales", () => {
    expect(equal({ quantity: 10, scale: 1 }, { quantity: 100, scale: 2 })).toBe(
      true,
    );
  });

  test("returns false when values differ despite matching scales", () => {
    expect(equal({ quantity: 10, scale: 2 }, { quantity: 100, scale: 2 })).toBe(
      false,
    );
  });

  test("[Control]]", () => {
    expect(equal({ quantity: 100, scale: 1 }, { quantity: 100, scale: 2 }))
      .toBe(
        false,
      );
  });
});
