import { describe, expect, test } from "vitest";
import { add } from "../add.ts";

describe("add", () => {
  test("sums quantities of two shares with the same scale", () => {
    expect(add({ quantity: 10, scale: 1 }, { quantity: 20, scale: 1 })).toEqual(
      {
        quantity: 30,
        scale: 1,
      },
    );
  });

  test("preserves the scale in the result", () => {
    expect(add({ quantity: 10, scale: 2 }, { quantity: 5, scale: 2 }).scale)
      .toBe(
        2,
      );
  });

  test("aligns operands to the higher scale before adding when scales differ", () => {
    expect(add({ quantity: 10, scale: 1 }, { quantity: 20, scale: 2 })).toEqual(
      {
        quantity: 120,
        scale: 2,
      },
    );
  });
});
