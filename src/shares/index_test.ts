import { assertEquals, assertThrows } from "@std/assert";
import { shares, zeroShares } from "shares/index.ts";

Deno.test("shares - creation", async (t) => {
  await t.step("defaults amount to 0n and scale to 0", () => {
    const s = shares({});
    assertEquals(s.amount, 0n);
    assertEquals(s.scale, 0);
  });

  await t.step("accepts a bigint amount", () => {
    const s = shares({ amount: 125000n, scale: 4 });
    assertEquals(s.amount, 125000n);
    assertEquals(s.scale, 4);
  });

  await t.step("accepts a safe-integer number amount", () => {
    const s = shares({ amount: 12 });
    assertEquals(s.amount, 12n);
  });

  await t.step("accepts a string amount", () => {
    const s = shares({ amount: "125000", scale: 4 });
    assertEquals(s.amount, 125000n);
  });

  await t.step("rejects a non-safe-integer number amount", () => {
    assertThrows(
      () => shares({ amount: 1.5 }),
      Error,
      "[Portio] Amount is invalid.",
    );
  });

  await t.step("rejects an invalid string amount", () => {
    assertThrows(
      () => shares({ amount: "1.5" }),
      Error,
      "[Portio] Amount is invalid.",
    );
  });

  await t.step("rejects a negative scale", () => {
    assertThrows(
      () => shares({ amount: 1n, scale: -1 }),
      Error,
      "[Portio] Scale is invalid.",
    );
  });

  await t.step("rejects a non-integer scale", () => {
    assertThrows(
      () => shares({ amount: 1n, scale: 1.5 }),
      Error,
      "[Portio] Scale is invalid.",
    );
  });

  await t.step("is frozen", () => {
    const s = shares({ amount: 1n });
    assertThrows(() => {
      // deno-lint-ignore no-explicit-any
      (s as any).amount = 2n;
    });
  });
});

Deno.test("shares - toJSON", () => {
  const s = shares({ amount: 125000n, scale: 4 });
  assertEquals(JSON.parse(JSON.stringify(s)), {
    amount: "125000n",
    scale: 4,
  });
});

Deno.test("zeroShares", () => {
  const s = zeroShares();
  assertEquals(s.amount, 0n);
  assertEquals(s.scale, 0);
});
