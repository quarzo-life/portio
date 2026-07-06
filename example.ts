/**
 * Example of how to use the Portio library.
 * @module example
 */
import {
  add,
  ceil,
  compareAmounts,
  equal,
  floor,
  greaterThan,
  haveSameInstrument,
  isInteger,
  type Shares,
  shares,
  subtract,
  toDecimal,
  toSnapshot,
} from "mod"; // "jsr:@quarzo-life/portio";

const FUND_ISIN = "LU1234567890";

const example1 = () => {
  console.log("Add many Shares objects");

  const s1 = shares({ amount: 300n, instrument: FUND_ISIN, scale: 2 });
  const s2 = shares({ amount: 200n, instrument: FUND_ISIN, scale: 2 });
  const s3 = shares({ amount: 100n, instrument: FUND_ISIN, scale: 2 });

  const addMany = (addends: Shares[]) => addends.reduce(add);

  console.log(toDecimal(addMany([s1, s2, s3]))); // "6.00"
};

const example2 = () => {
  console.log("Subtract a redemption from a position");

  const position = shares({ amount: 12500n, instrument: FUND_ISIN, scale: 4 }); // 1.2500 shares
  const redemption = shares({ amount: 5000n, instrument: FUND_ISIN, scale: 4 }); // 0.5000 shares

  console.log(toDecimal(subtract(position, redemption))); // "0.7500"
};

const example3 = () => {
  console.log("Floor / ceil a fractional position to whole shares");

  const position = shares({ amount: 1250n, instrument: FUND_ISIN, scale: 2 }); // 12.50 shares

  console.log(isInteger(position)); // false
  console.log(toDecimal(floor(position))); // "12.00"
  console.log(toDecimal(ceil(position))); // "13.00"
};

const example4 = () => {
  console.log("Compare positions and guard against mixing instruments");

  const a = shares({ amount: 100n, instrument: FUND_ISIN, scale: 2 });
  const b = shares({ amount: 200n, instrument: FUND_ISIN, scale: 2 });
  const other = shares({ amount: 100n, instrument: "FR0000000000", scale: 2 });

  console.log(greaterThan(b, a)); // true
  console.log(equal(a, a)); // true
  console.log(haveSameInstrument([a, other])); // false
  console.log(compareAmounts(a, b)); // -1
};

const example5 = () => {
  console.log("Snapshot and serialize a position");

  const position = shares({ amount: 12500n, instrument: FUND_ISIN, scale: 4 });

  console.log(toSnapshot(position)); // { amount: 12500n, instrument: "LU1234567890", scale: 4 }
  console.log(JSON.stringify(position)); // {"amount":"12500n","instrument":"LU1234567890","scale":4}
};

example1();
example2();
example3();
example4();
example5();
