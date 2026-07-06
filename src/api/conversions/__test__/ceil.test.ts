import { assertEquals } from "@std/assert";
import { ceil, shares, toSnapshot } from "mod";

const ISIN = "LU1234567890";

Deno.test("ceil", async (t) => {
  await t.step("rounds a positive fractional amount up", () => {
    const s = shares({ amount: 1250n, instrument: ISIN, scale: 2 });
    assertEquals(toSnapshot(ceil(s)), {
      amount: 1300n,
      instrument: ISIN,
      scale: 2,
    });
  });

  await t.step("rounds a negative fractional amount up (toward zero)", () => {
    const s = shares({ amount: -1250n, instrument: ISIN, scale: 2 });
    assertEquals(toSnapshot(ceil(s)), {
      amount: -1200n,
      instrument: ISIN,
      scale: 2,
    });
  });

  await t.step("leaves a whole amount untouched", () => {
    const s = shares({ amount: 1200n, instrument: ISIN, scale: 2 });
    assertEquals(toSnapshot(ceil(s)), toSnapshot(s));
  });
});
