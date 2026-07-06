import { assertEquals } from "@std/assert";
import { floor, shares, toSnapshot } from "mod";

Deno.test("floor", async (t) => {
  await t.step("rounds a positive fractional amount down", () => {
    const s = shares({ amount: 1250n, scale: 2 });
    assertEquals(toSnapshot(floor(s)), {
      amount: 1200n,
      scale: 2,
    });
  });

  await t.step(
    "rounds a negative fractional amount down (away from zero)",
    () => {
      const s = shares({ amount: -1250n, scale: 2 });
      assertEquals(toSnapshot(floor(s)), {
        amount: -1300n,
        scale: 2,
      });
    },
  );

  await t.step("leaves a whole amount untouched", () => {
    const s = shares({ amount: 1200n, scale: 2 });
    assertEquals(toSnapshot(floor(s)), toSnapshot(s));
  });
});
