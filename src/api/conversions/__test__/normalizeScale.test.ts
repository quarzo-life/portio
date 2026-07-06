import { assertEquals } from "@std/assert";
import { normalizeScale, shares, toSnapshot } from "mod";

Deno.test("normalizeScale", async (t) => {
  await t.step("normalizes to the highest scale of the set", () => {
    const s1 = shares({ amount: 100n, scale: 2 });
    const s2 = shares({ amount: 2000n, scale: 3 });

    const [one, two] = normalizeScale([s1, s2]);

    assertEquals(toSnapshot(one), {
      amount: 1000n,
      scale: 3,
    });
    assertEquals(toSnapshot(two), {
      amount: 2000n,
      scale: 3,
    });
  });

  await t.step("leaves objects already at the highest scale untouched", () => {
    const s1 = shares({ amount: 100n, scale: 2 });
    const [one] = normalizeScale([s1]);

    assertEquals(one, s1);
  });
});
