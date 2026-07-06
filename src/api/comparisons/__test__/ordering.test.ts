import { assertEquals } from "@std/assert";
import {
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  shares,
} from "mod";

const small = shares({ amount: 100n, scale: 2 });
const big = shares({ amount: 200n, scale: 2 });
const sameAsSmall = shares({ amount: 100n, scale: 2 });

Deno.test("greaterThan", () => {
  assertEquals(greaterThan(big, small), true);
  assertEquals(greaterThan(small, big), false);
  assertEquals(greaterThan(small, sameAsSmall), false);
});

Deno.test("greaterThanOrEqual", () => {
  assertEquals(greaterThanOrEqual(big, small), true);
  assertEquals(greaterThanOrEqual(small, sameAsSmall), true);
  assertEquals(greaterThanOrEqual(small, big), false);
});

Deno.test("lessThan", () => {
  assertEquals(lessThan(small, big), true);
  assertEquals(lessThan(big, small), false);
  assertEquals(lessThan(small, sameAsSmall), false);
});

Deno.test("lessThanOrEqual", () => {
  assertEquals(lessThanOrEqual(small, big), true);
  assertEquals(lessThanOrEqual(small, sameAsSmall), true);
  assertEquals(lessThanOrEqual(big, small), false);
});
