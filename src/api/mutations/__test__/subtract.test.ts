import { assertEquals } from "@std/assert";
import { shares, subtract, toSnapshot } from "mod";

Deno.test("subtract", async (t) => {
  await t.step("subtracts two Shares objects", () => {
    const s1 = shares({ amount: 300n });
    const s2 = shares({ amount: 200n });

    assertEquals(toSnapshot(subtract(s1, s2)), {
      amount: 100n,
      scale: 0,
    });
  });

  await t.step("can go negative", () => {
    const s1 = shares({ amount: 200n });
    const s2 = shares({ amount: 300n });

    assertEquals(toSnapshot(subtract(s1, s2)), {
      amount: -100n,
      scale: 0,
    });
  });

  await t.step("normalizes scale before subtracting", () => {
    const s1 = shares({ amount: 500n, scale: 2 });
    const s2 = shares({ amount: 1000n, scale: 3 });

    assertEquals(toSnapshot(subtract(s1, s2)), {
      amount: 4000n,
      scale: 3,
    });
  });
});
