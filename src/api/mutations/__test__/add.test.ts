import { assertEquals } from "@std/assert";
import { add, shares, toSnapshot } from "mod";

Deno.test("add", async (t) => {
  await t.step("adds two Shares objects", () => {
    const s1 = shares({ amount: 300n });
    const s2 = shares({ amount: 200n });

    assertEquals(toSnapshot(add(s1, s2)), {
      amount: 500n,
      scale: 0,
    });
  });

  await t.step("adds negative amounts", () => {
    const s1 = shares({ amount: -300n });
    const s2 = shares({ amount: -200n });

    assertEquals(toSnapshot(add(s1, s2)), {
      amount: -500n,
      scale: 0,
    });
  });

  await t.step("normalizes scale before adding", () => {
    const s1 = shares({ amount: 500n, scale: 2 });
    const s2 = shares({ amount: 1000n, scale: 3 });

    assertEquals(toSnapshot(add(s1, s2)), {
      amount: 6000n,
      scale: 3,
    });
  });
});
