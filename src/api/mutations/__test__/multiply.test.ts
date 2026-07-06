import { assertEquals } from "@std/assert";
import { multiply, shares, toSnapshot } from "mod";

Deno.test("multiply", async (t) => {
  await t.step("multiplies by an integer (e.g. a stock split)", () => {
    const s = shares({ amount: 400n });

    assertEquals(toSnapshot(multiply(s, 4)), {
      amount: 1600n,
      scale: 0,
    });
  });

  await t.step("multiplies by a bigint", () => {
    const s = shares({ amount: 400n });

    assertEquals(toSnapshot(multiply(s, 4n)), {
      amount: 1600n,
      scale: 0,
    });
  });

  await t.step(
    "multiplies by a scaled multiplier without losing precision",
    () => {
      const s = shares({ amount: 401n });

      assertEquals(toSnapshot(multiply(s, { amount: 2001n, scale: 3 })), {
        amount: 802401n,
        scale: 3,
      });
    },
  );
});
