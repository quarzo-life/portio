import { assertEquals, assertThrows } from "@std/assert";
import { compareAmounts, shares } from "mod";

const ISIN = "LU1234567890";

Deno.test("compareAmounts", async (t) => {
  await t.step("returns 0 for equal amounts", () => {
    const s1 = shares({ amount: 100n, instrument: ISIN, scale: 2 });
    const s2 = shares({ amount: 100n, instrument: ISIN, scale: 2 });

    assertEquals(compareAmounts(s1, s2), 0);
  });

  await t.step("returns 1 when first is greater", () => {
    const s1 = shares({ amount: 200n, instrument: ISIN, scale: 2 });
    const s2 = shares({ amount: 100n, instrument: ISIN, scale: 2 });

    assertEquals(compareAmounts(s1, s2), 1);
  });

  await t.step("returns -1 when first is smaller", () => {
    const s1 = shares({ amount: 100n, instrument: ISIN, scale: 2 });
    const s2 = shares({ amount: 200n, instrument: ISIN, scale: 2 });

    assertEquals(compareAmounts(s1, s2), -1);
  });

  await t.step("normalizes scale before comparing", () => {
    const s1 = shares({ amount: 10n, instrument: ISIN, scale: 1 });
    const s2 = shares({ amount: 100n, instrument: ISIN, scale: 2 });

    assertEquals(compareAmounts(s1, s2), 0);
  });

  await t.step("throws for different instruments", () => {
    const s1 = shares({ amount: 100n, instrument: ISIN });
    const s2 = shares({ amount: 100n, instrument: "FR0000000000" });

    assertThrows(
      () => compareAmounts(s1, s2),
      Error,
      "[Portio] Objects must have the same instrument.",
    );
  });
});
