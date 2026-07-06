import { type Shares, shares } from "shares/index.ts";

/**
 * Normalize a set of Shares objects to the highest scale of the set.
 *
 * Normalizing to a higher scale means that the internal amount value
 * increases by orders of magnitude. This is always lossless: scale only
 * ever grows, so it never needs a rounding strategy.
 *
 * @param objects Shares objects in an array to normalize
 * @returns
 * @example // Normalize objects to the same scale
 *
 * import { shares, normalizeScale } from "jsr:@quarzo-life/portio"
 *
 * const s1 = shares({ amount: 100n, scale: 2 });
 * const s2 = shares({ amount: 2000n, scale: 3 });
 *
 * const [one, two] = normalizeScale([s1, s2]);
 *
 * one; // a Shares object with amount 1000 and scale 3
 * two; // a Shares object with amount 2000 and scale 3
 */
export const normalizeScale = (
  objects: ReadonlyArray<Shares>,
): Shares[] => {
  const highestScale = objects.reduce(
    (highest, current) => Math.max(highest, current.scale),
    0,
  );

  return objects.map((s) => {
    if (s.scale === highestScale) {
      return s;
    }

    const factor = 10n ** BigInt(highestScale - s.scale);

    return shares({
      amount: s.amount * factor,
      scale: highestScale,
    });
  });
};
