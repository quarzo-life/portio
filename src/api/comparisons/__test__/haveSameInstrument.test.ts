import { assertEquals } from "@std/assert";
import { haveSameInstrument, shares } from "mod";

Deno.test("haveSameInstrument", async (t) => {
  await t.step("is true when all objects share the same instrument", () => {
    const s1 = shares({ amount: 1n, instrument: "LU1234567890" });
    const s2 = shares({ amount: 2n, instrument: "LU1234567890" });

    assertEquals(haveSameInstrument([s1, s2]), true);
  });

  await t.step("is false when instruments differ", () => {
    const s1 = shares({ amount: 1n, instrument: "LU1234567890" });
    const s2 = shares({ amount: 1n, instrument: "FR0000000000" });

    assertEquals(haveSameInstrument([s1, s2]), false);
  });
});
