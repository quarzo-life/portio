import { assertEquals } from "@std/assert";
import { shares, toSnapshot } from "mod";

Deno.test("toSnapshot", () => {
  const s = shares({ amount: 125000n, scale: 4 });

  assertEquals(toSnapshot(s), {
    amount: 125000n,
    scale: 4,
  });
});
