import { assertEquals } from "@std/assert";
import { haveSameAmount, shares } from "mod";

Deno.test("haveSameAmount", async (t) => {
  await t.step("is true for equal amounts at the same scale", () => {
    const s1 = shares({ amount: 100n, scale: 2 });
    const s2 = shares({ amount: 100n, scale: 2 });

    assertEquals(haveSameAmount([s1, s2]), true);
  });

  await t.step("is true for equal amounts at a different scale", () => {
    const s1 = shares({ amount: 100n, scale: 2 });
    const s2 = shares({ amount: 1000n, scale: 3 });

    assertEquals(haveSameAmount([s1, s2]), true);
  });

  await t.step("is false for different amounts", () => {
    const s1 = shares({ amount: 100n, scale: 2 });
    const s2 = shares({ amount: 200n, scale: 2 });

    assertEquals(haveSameAmount([s1, s2]), false);
  });
});
