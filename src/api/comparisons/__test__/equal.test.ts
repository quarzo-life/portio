import { assertEquals } from "@std/assert";
import { equal, shares } from "mod";

Deno.test("equal", async (t) => {
  await t.step("is true for the same amount", () => {
    const s1 = shares({ amount: 100n, scale: 2 });
    const s2 = shares({ amount: 1000n, scale: 3 });

    assertEquals(equal(s1, s2), true);
  });

  await t.step("is false for different amounts", () => {
    const s1 = shares({ amount: 100n });
    const s2 = shares({ amount: 200n });

    assertEquals(equal(s1, s2), false);
  });
});
