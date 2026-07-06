# Graph Report - .  (2026-07-06)

## Corpus Check
- Corpus is ~7,142 words - fits in a single context window. You may not need a graph.

## Summary
- 114 nodes · 170 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 63,519 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Arithmetic & Serialization|Arithmetic & Serialization]]
- [[_COMMUNITY_Public API Test Imports|Public API Test Imports]]
- [[_COMMUNITY_Rounding & Decimal Formatting|Rounding & Decimal Formatting]]
- [[_COMMUNITY_Comparison Operators|Comparison Operators]]
- [[_COMMUNITY_Shares Validation & Construction|Shares Validation & Construction]]
- [[_COMMUNITY_Rate & Scaled Amount Types|Rate & Scaled Amount Types]]
- [[_COMMUNITY_Equality Comparison|Equality Comparison]]
- [[_COMMUNITY_Project Overview & CI|Project Overview & CI]]
- [[_COMMUNITY_JSON & Assertion Helpers|JSON & Assertion Helpers]]
- [[_COMMUNITY_Instrument Tracking Pattern|Instrument Tracking Pattern]]
- [[_COMMUNITY_Public API Entry Point|Public API Entry Point]]

## God Nodes (most connected - your core abstractions)
1. `Shares` - 22 edges
2. `compareAmounts()` - 12 edges
3. `normalizeScale()` - 9 edges
4. `toSnapshot()` - 9 edges
5. `example3()` - 6 edges
6. `ceil()` - 6 edges
7. `floor()` - 6 edges
8. `toDecimal()` - 6 edges
9. `add()` - 6 edges
10. `example4()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Rationale: floor/ceil round amount to nearest whole share while preserving scale, correcting bigint truncation-toward-zero for negatives` --rationale_for--> `ceil()`  [EXTRACTED]
  CLAUDE.md → src/api/conversions/ceil.ts
- `Rationale: floor/ceil round amount to nearest whole share while preserving scale, correcting bigint truncation-toward-zero for negatives` --rationale_for--> `floor()`  [EXTRACTED]
  CLAUDE.md → src/api/conversions/floor.ts
- `Rationale: binary ops normalize scale first via normalizeScale before operating on amounts` --rationale_for--> `normalizeScale()`  [EXTRACTED]
  CLAUDE.md → src/api/conversions/normalizeScale.ts
- `Rationale: binary ops normalize scale first via normalizeScale before operating on amounts` --rationale_for--> `add()`  [EXTRACTED]
  CLAUDE.md → src/api/mutations/add.ts
- `Rationale: multiply never loses precision, scale only grows (scale + multiplierScale)` --rationale_for--> `multiply()`  [EXTRACTED]
  CLAUDE.md → src/api/mutations/multiply.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **API functions operating on the shared Shares data structure** — comparisons_compareamounts_compareamounts, comparisons_equal_equal, comparisons_greaterthan_greaterthan, comparisons_greaterthanorequal_greaterthanorequal, comparisons_havesameamount_havesameamount, comparisons_lessthan_lessthan, comparisons_lessthanorequal_lessthanorequal, conversions_ceil_ceil, conversions_floor_floor, conversions_isinteger_isinteger, conversions_normalizescale_normalizescale, formatting_todecimal_todecimal [INFERRED 0.95]
- **example.ts functions form a full walkthrough of the public API** — example_example1, example_example2, example_example3, example_example4, example_example5 [EXTRACTED 1.00]
- **Ordering predicates implemented on top of compareAmounts** — comparisons_compareamounts_compareamounts, comparisons_greaterthan_greaterthan, comparisons_greaterthanorequal_greaterthanorequal, comparisons_lessthan_lessthan, comparisons_lessthanorequal_lessthanorequal [EXTRACTED 1.00]
- **Shares binary mutation operations (add/subtract/multiply) share the normalize-then-construct pattern** — mutations_add_add, mutations_subtract_subtract, mutations_multiply_multiply, shares_index_shares [INFERRED 0.85]
- **'n'-suffix bigint JSON serialization convention implemented independently in Shares.toJSON and JSONbigint helpers** — shares_index_shares, helpers_jsonbigint_bigintreplacer, helpers_jsonbigint_bigintreviver [INFERRED 0.85]
- **Test suites covering the Shares mutation API (add/subtract/multiply)** — __test___add_test_add, __test___multiply_test_multiply, __test___subtract_test_subtract [INFERRED 0.85]

## Communities (14 total, 2 thin omitted)

### Community 0 - "Arithmetic & Serialization"
Cohesion: 0.13
Nodes (19): add() test suite, multiply() test suite, normalizeScale.test.ts suite, subtract() test suite, toSnapshot.test.ts suite, Rationale: binary ops normalize scale first via normalizeScale before operating on amounts, Rationale: multiply never loses precision, scale only grows (scale + multiplierScale), normalizeScale losslessness rationale (scale only grows) (+11 more)

### Community 1 - "Public API Test Imports"
Cohesion: 0.12
Nodes (3): big, sameAsSmall, small

### Community 2 - "Rounding & Decimal Formatting"
Cohesion: 0.14
Nodes (12): ceil.test.ts suite, floor.test.ts suite, isInteger.test.ts suite, toDecimal.test.ts suite, Rationale: floor/ceil round amount to nearest whole share while preserving scale, correcting bigint truncation-toward-zero for negatives, ceil(), floor(), isInteger() (+4 more)

### Community 3 - "Comparison Operators"
Cohesion: 0.31
Nodes (8): compareAmounts.test.ts suite, ordering.test.ts suite, compareAmounts(), greaterThan(), greaterThanOrEqual(), lessThan(), lessThanOrEqual(), example4()

### Community 4 - "Shares Validation & Construction"
Cohesion: 0.24
Nodes (10): Rationale: assertions go through helpers/assert.ts using message constants from src/messages.ts, assert(), resolveAmount(), resolveScale(), SerializedShares, SharesOptions, 'zeroShares' test, zeroShares() (+2 more)

### Community 5 - "Rate & Scaled Amount Types"
Cohesion: 0.43
Nodes (4): Rate, ScaledAmount, getAmountAndScale(), isScaledAmount()

### Community 6 - "Equality Comparison"
Cohesion: 0.47
Nodes (4): equal.test.ts suite, haveSameAmount.test.ts suite, equal(), haveSameAmount()

### Community 7 - "Project Overview & CI"
Cohesion: 0.40
Nodes (6): Scope: NAV/valuation, allocate, dangerDivide/dangerRound deliberately not implemented yet, @quarzo-life/portio project overview, @quarzo-life/moneta sibling project, Portio library (README overview), CI GitHub Actions workflow, Publish GitHub Actions workflow (JSR)

### Community 9 - "Instrument Tracking Pattern"
Cohesion: 0.67
Nodes (3): Rationale: Shares has no instrument identity field; caller tracks instrument (e.g. Record<ISIN, Shares>), InstrumentId branded type + Record<ISIN, Shares> tracking pattern, Shares type

## Knowledge Gaps
- **19 isolated node(s):** `small`, `big`, `sameAsSmall`, `SerializedShares`, `SharesOptions` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Shares` connect `Arithmetic & Serialization` to `JSON & Assertion Helpers`, `Rounding & Decimal Formatting`, `Comparison Operators`, `Shares Validation & Construction`?**
  _High betweenness centrality (0.428) - this node is a cross-community bridge._
- **Why does `multiply()` connect `Arithmetic & Serialization` to `Rate & Scaled Amount Types`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `normalizeScale()` connect `Arithmetic & Serialization` to `Comparison Operators`, `Equality Comparison`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Shares` (e.g. with `bigIntReplacer()` and `bigIntReviver()`) actually correct?**
  _`Shares` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `small`, `big`, `sameAsSmall` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Arithmetic & Serialization` be split into smaller, more focused modules?**
  _Cohesion score 0.12666666666666668 - nodes in this community are weakly interconnected._
- **Should `Public API Test Imports` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._