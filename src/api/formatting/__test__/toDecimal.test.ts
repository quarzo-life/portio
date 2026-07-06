import { assertEquals } from "@std/assert";
import { shares, toDecimal } from "mod";

Deno.test("toDecimal", async (t) => {
  await t.step("formats a scale-0 amount", () => {
    assertEquals(toDecimal(shares({ amount: 12n })), "12");
  });

  await t.step("formats a fractional amount", () => {
    assertEquals(
      toDecimal(shares({ amount: 125000n, scale: 4 })),
      "12.5000",
    );
  });

  await t.step("formats a negative amount", () => {
    assertEquals(
      toDecimal(shares({ amount: -125000n, scale: 4 })),
      "-12.5000",
    );
  });

  await t.step("formats a negative amount between -1 and 0", () => {
    assertEquals(
      toDecimal(shares({ amount: -5000n, scale: 4 })),
      "-0.5000",
    );
  });

  await t.step("formats zero", () => {
    assertEquals(
      toDecimal(shares({ amount: 0n, scale: 4 })),
      "0.0000",
    );
  });
});
