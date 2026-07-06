import { assertEquals, assertThrows } from "@std/assert";
import { shares, subtract, toSnapshot } from "mod";

const ISIN = "LU1234567890";
const OTHER_ISIN = "FR0000000000";

Deno.test("subtract", async (t) => {
  await t.step("subtracts two Shares objects", () => {
    const s1 = shares({ amount: 300n, instrument: ISIN });
    const s2 = shares({ amount: 200n, instrument: ISIN });

    assertEquals(toSnapshot(subtract(s1, s2)), {
      amount: 100n,
      instrument: ISIN,
      scale: 0,
    });
  });

  await t.step("can go negative", () => {
    const s1 = shares({ amount: 200n, instrument: ISIN });
    const s2 = shares({ amount: 300n, instrument: ISIN });

    assertEquals(toSnapshot(subtract(s1, s2)), {
      amount: -100n,
      instrument: ISIN,
      scale: 0,
    });
  });

  await t.step("normalizes scale before subtracting", () => {
    const s1 = shares({ amount: 500n, instrument: ISIN, scale: 2 });
    const s2 = shares({ amount: 1000n, instrument: ISIN, scale: 3 });

    assertEquals(toSnapshot(subtract(s1, s2)), {
      amount: 4000n,
      instrument: ISIN,
      scale: 3,
    });
  });

  await t.step("throws for different instruments", () => {
    const s1 = shares({ amount: 500n, instrument: ISIN });
    const s2 = shares({ amount: 100n, instrument: OTHER_ISIN });

    assertThrows(
      () => subtract(s1, s2),
      Error,
      "[Portio] Objects must have the same instrument.",
    );
  });
});
