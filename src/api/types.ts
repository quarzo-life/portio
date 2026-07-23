/**
 * A quantity of fund shares (or any other instrument), expressed as an
 * integer `quantity` at a given decimal `scale`.
 *
 * The actual number of shares is `quantity / 10 ** scale`. Keeping the
 * quantity as an integer avoids floating-point rounding errors when adding,
 * subtracting or comparing positions.
 *
 * A `Shares` value carries no instrument identity — tracking which
 * instrument (e.g. an ISIN) a position belongs to is the caller's
 * responsibility.
 *
 * @typeParam Scale - The number of decimal places. Defaults to `number`;
 * narrow it (e.g. `Shares<4>`) to enforce a precision at the type level.
 *
 * @example Representing 1.2345 shares
 * ```ts
 * import { type Shares } from "@quarzo-life/portio";
 *
 * const position: Shares = { quantity: 12345, scale: 4 }; // 1.2345 shares
 * const whole: Shares = { quantity: 3, scale: 0 }; // 3 shares
 * ```
 */
export type Shares<Scale extends number = number> = {
  readonly quantity: number;
  readonly scale: Scale;
};
