import { assertEquals } from "@std/assert";
import { equal, shares } from "mod";

const ISIN = "LU1234567890";

Deno.test("equal", async (t) => {
  await t.step("is true for the same instrument and amount", () => {
    const s1 = shares({ amount: 100n, instrument: ISIN, scale: 2 });
    const s2 = shares({ amount: 1000n, instrument: ISIN, scale: 3 });

    assertEquals(equal(s1, s2), true);
  });

  await t.step("is false for different instruments", () => {
    const s1 = shares({ amount: 100n, instrument: ISIN });
    const s2 = shares({ amount: 100n, instrument: "FR0000000000" });

    assertEquals(equal(s1, s2), false);
  });

  await t.step("is false for different amounts", () => {
    const s1 = shares({ amount: 100n, instrument: ISIN });
    const s2 = shares({ amount: 200n, instrument: ISIN });

    assertEquals(equal(s1, s2), false);
  });
});
