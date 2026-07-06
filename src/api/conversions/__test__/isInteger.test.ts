import { assertEquals } from "@std/assert";
import { isInteger, shares } from "mod";

const ISIN = "LU1234567890";

Deno.test("isInteger", async (t) => {
  await t.step("is true for a whole number of shares", () => {
    assertEquals(
      isInteger(shares({ amount: 1200n, instrument: ISIN, scale: 2 })),
      true,
    );
  });

  await t.step("is false for a fractional number of shares", () => {
    assertEquals(
      isInteger(shares({ amount: 1250n, instrument: ISIN, scale: 2 })),
      false,
    );
  });

  await t.step("is always true at scale 0", () => {
    assertEquals(
      isInteger(shares({ amount: 12n, instrument: ISIN })),
      true,
    );
  });

  await t.step("handles negative amounts", () => {
    assertEquals(
      isInteger(shares({ amount: -1200n, instrument: ISIN, scale: 2 })),
      true,
    );
    assertEquals(
      isInteger(shares({ amount: -1250n, instrument: ISIN, scale: 2 })),
      false,
    );
  });
});
