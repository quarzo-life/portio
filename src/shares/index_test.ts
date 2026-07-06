import { assertEquals, assertThrows } from "@std/assert";
import { shares, zeroShares } from "shares/index.ts";

const ISIN = "LU1234567890";

Deno.test("shares - creation", async (t) => {
  await t.step("defaults amount to 0n and scale to 0", () => {
    const s = shares({ instrument: ISIN });
    assertEquals(s.amount, 0n);
    assertEquals(s.scale, 0);
    assertEquals(s.instrument, ISIN);
  });

  await t.step("accepts a bigint amount", () => {
    const s = shares({ amount: 125000n, instrument: ISIN, scale: 4 });
    assertEquals(s.amount, 125000n);
    assertEquals(s.scale, 4);
  });

  await t.step("accepts a safe-integer number amount", () => {
    const s = shares({ amount: 12, instrument: ISIN });
    assertEquals(s.amount, 12n);
  });

  await t.step("accepts a string amount", () => {
    const s = shares({ amount: "125000", instrument: ISIN, scale: 4 });
    assertEquals(s.amount, 125000n);
  });

  await t.step("rejects a non-safe-integer number amount", () => {
    assertThrows(
      () => shares({ amount: 1.5, instrument: ISIN }),
      Error,
      "[Portio] Amount is invalid.",
    );
  });

  await t.step("rejects an invalid string amount", () => {
    assertThrows(
      () => shares({ amount: "1.5", instrument: ISIN }),
      Error,
      "[Portio] Amount is invalid.",
    );
  });

  await t.step("rejects an empty instrument", () => {
    assertThrows(
      () => shares({ amount: 1n, instrument: "" }),
      Error,
      "[Portio] Instrument is invalid.",
    );
  });

  await t.step("rejects a negative scale", () => {
    assertThrows(
      () => shares({ amount: 1n, instrument: ISIN, scale: -1 }),
      Error,
      "[Portio] Scale is invalid.",
    );
  });

  await t.step("rejects a non-integer scale", () => {
    assertThrows(
      () => shares({ amount: 1n, instrument: ISIN, scale: 1.5 }),
      Error,
      "[Portio] Scale is invalid.",
    );
  });

  await t.step("is frozen", () => {
    const s = shares({ amount: 1n, instrument: ISIN });
    assertThrows(() => {
      // deno-lint-ignore no-explicit-any
      (s as any).amount = 2n;
    });
  });
});

Deno.test("shares - toJSON", () => {
  const s = shares({ amount: 125000n, instrument: ISIN, scale: 4 });
  assertEquals(JSON.parse(JSON.stringify(s)), {
    amount: "125000n",
    instrument: ISIN,
    scale: 4,
  });
});

Deno.test("zeroShares", () => {
  const s = zeroShares(ISIN);
  assertEquals(s.amount, 0n);
  assertEquals(s.scale, 0);
  assertEquals(s.instrument, ISIN);
});
