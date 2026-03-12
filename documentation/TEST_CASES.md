# Functional Regex Library - Test Cases

## Test Data

### Basic Test String (HTML Script Tags)
```
<script src="foo.js"></script>
<script src="bar.js"></script>
<script src="baz.js"></script>
<script src="qux.js"></script>
```

### Pattern
`/src="([^"]*)"/g` - Captures filename from src attributes

### Expected Matches
- Full matches: `src="foo.js"`, `src="bar.js"`, `src="baz.js"`, `src="qux.js"`
- Capture groups: `foo.js`, `bar.js`, `baz.js`, `qux.js`

---

## Test Cases

### 1. Main Function Tests

#### 1.1 Basic Array Return
- **Test:** `fregex(/src="([^"]*)"/g, htmlText)`
- **Expected:** Array with 4 elements
- **Verification:** Each element is a match array with full match and capture group

#### 1.2 Auto-Global Flag Addition (Non-Global Regex)
- **Test:** `fregex(/src="([^"]*)"/, htmlText)` (no 'g' flag)
- **Expected:** Still returns array of all matches
- **Verification:** Global flag is automatically added internally

#### 1.3 Simple Pattern (No Capture Groups)
- **Test:** `fregex(/\d+/g, '1. There is 2 numbers in this string')`
- **Expected:** `['1', '2']`
- **Verification:** Returns array of matched strings

#### 1.4 Multiple Capture Groups
- **Test:** `fregex(/(\w+)=(\w+)/g, 'foo=bar baz=qux')`
- **Expected:** `[['foo=bar', 'foo', 'bar'], ['baz=qux', 'baz', 'qux']]`
- **Verification:** Match array includes full match and all capture groups

#### 1.5 Empty Matches (No Results)
- **Test:** `fregex(/xyz/g, 'no matches here')`
- **Expected:** `[]` (empty array)
- **Verification:** Returns empty array when no matches found

#### 1.6 Empty String Input
- **Test:** `fregex(/\d+/g, '')`
- **Expected:** `[]` (empty array)
- **Verification:** Handles empty input gracefully

#### 1.7 Single Match
- **Test:** `fregex(/\d+/g, '42')`
- **Expected:** `['42']`
- **Verification:** Returns array with single element

#### 1.8 Special Characters in Pattern
- **Test:** `fregex(/\(test\)/g, '(test) and (test)')`
- **Expected:** `['(test)', '(test)']`
- **Verification:** Escaped special characters work correctly

---

### 2. forEach Tests

#### 2.1 Basic forEach Execution
- **Test:** Call `fregex.forEach(/src="([^"]*)"/g, htmlText, callback)`
- **Expected:** Callback called 4 times
- **Verification:** Each callback receives match result array

#### 2.2 forEach Callback Arguments
- **Test:** `fregex.forEach(/src="([^"]*)"/g, htmlText, (match) => { ... })`
- **Expected:** Callback receives full match result array
- **Verification:** 
  - `match[0]` = full match (e.g., `src="foo.js"`)
  - `match[1]` = first capture group (e.g., `foo.js`)

#### 2.3 forEach No Return Value
- **Test:** Store return value of `fregex.forEach(...)`
- **Expected:** Returns `undefined`
- **Verification:** forEach is side-effect focused

#### 2.4 forEach with No Matches
- **Test:** `fregex.forEach(/xyz/g, 'no matches', callback)`
- **Expected:** Callback never called
- **Verification:** No callback invocations logged

---

### 3. map Tests

#### 3.1 Basic map Operation
- **Test:** `fregex.map(/src="([^"]*)"/g, htmlText, (match) => match[1])`
- **Expected:** `['foo.js', 'bar.js', 'baz.js', 'qux.js']`
- **Verification:** Returns array of callback results

#### 3.2 map with Integer Conversion
- **Test:** `fregex.map(/\d+/g, '1 2 3', (match) => parseInt(match[0]))`
- **Expected:** `[1, 2, 3]`
- **Verification:** Callback transformations work correctly

#### 3.3 map with No Matches
- **Test:** `fregex.map(/xyz/g, 'no matches', (match) => match[0])`
- **Expected:** `[]` (empty array)
- **Verification:** Returns empty array when no matches

#### 3.4 map Receives Full Match Result
- **Test:** Map callback receives complete match result
- **Expected:** Can access all properties of match array
- **Verification:** Both full match and capture groups accessible

#### 3.5 map with Complex Transformation
- **Test:** Transform matches into objects
  ```
  fregex.map(/src="([^"]*)"/g, htmlText, (match) => ({
    fullMatch: match[0],
    filename: match[1]
  }))
  ```
- **Expected:** Array of objects with transformed data
- **Verification:** Complex transformations supported

---

### 4. addToRegExp Tests

#### 4.1 Prototype forEach Extension
- **Test:** After `fregex.addToRegExp()`, call `/regex/g.forEach(text, callback)`
- **Expected:** Works like `fregex.forEach()`
- **Verification:** Same callback invocation behavior

#### 4.2 Prototype map Extension
- **Test:** After `fregex.addToRegExp()`, call `/regex/g.map(text, callback)`
- **Expected:** Works like `fregex.map()`
- **Verification:** Same array return behavior

#### 4.3 Prototype Methods Return Values
- **Test:** `addToRegExp()` doesn't return anything useful
- **Expected:** Function returns `undefined` or similar
- **Verification:** Mutates RegExp.prototype side effect

---

### 5. Edge Cases & Special Scenarios

#### 5.1 Unicode Characters
- **Test:** `fregex(/\w+/g, '你好 world мир')`
- **Expected:** Handles unicode appropriately based on regex
- **Verification:** Unicode strings don't break functionality

#### 5.2 Very Large String
- **Test:** Regex on string with 10,000+ characters
- **Expected:** Returns all matches
- **Verification:** Performance acceptable, no memory issues

#### 5.3 Complex Regex with Lookahead/Lookbehind
- **Test:** `fregex(/\d+(?=px)/g, '12px 24em 36px')`
- **Expected:** `['12', '36']`
- **Verification:** Advanced regex features work

#### 5.4 Case-Insensitive Matching
- **Test:** `fregex(/test/i, 'TEST test TeSt')`
- **Expected:** All three variations matched
- **Verification:** Flags other than 'g' are preserved

#### 5.5 Regex with Multiple Flags
- **Test:** `fregex(/test/i, 'TEST test')` (no 'g' flag but case-insensitive)
- **Expected:** Auto-adds 'g' while preserving 'i'
- **Verification:** Flag combination works: `gi`

#### 5.6 Match at String Boundaries
- **Test:** `fregex(/^start|end$/g, 'start middle end')`
- **Expected:** Matches at boundaries work correctly
- **Verification:** Anchors respected

#### 5.7 Overlapping Match Attempts
- **Test:** `fregex(/a+/g, 'aaa')` (overlapping 'a's)
- **Expected:** `['aaa']` (not overlapping matches)
- **Verification:** Regex engine behavior respected

#### 5.8 Null or Undefined Input
- **Test:** `fregex(/test/g, null)` or similar
- **Expected:** Either error or graceful handling
- **Verification:** Defensive programming

---

### 6. TypeScript/Type Tests

#### 6.1 Type Inference for Callback
- **Test:** TypeScript correctly infers callback parameter type
- **Expected:** Type is `RegExpExecArray` or similar
- **Verification:** IDE autocomplete works, types validate

#### 6.2 Generic Return Type for map
- **Test:** `map()` callback return type determines result array type
- **Expected:** `map(..., (m) => m[1])` returns `string[]`
- **Verification:** Type safety maintained

#### 6.3 Type Definitions Present
- **Test:** Library includes `.d.ts` files or inline types
- **Expected:** TypeScript projects can use library without `@types/`
- **Verification:** Types available and correct

---

### 7. Module/Import Tests

#### 7.1 ESM Default Import
- **Test:** `import fregex from 'functional-regex'`
- **Expected:** fregex is callable function
- **Verification:** Works in ESM environments

#### 7.2 ESM Named Imports
- **Test:** `import { fregex, forEach, map, addToRegExp } from 'functional-regex'`
- **Expected:** All named exports available
- **Verification:** Named imports work independently

#### 7.3 CommonJS Require
- **Test:** `const fregex = require('functional-regex')`
- **Expected:** fregex is callable function
- **Verification:** Works in CommonJS environments

#### 7.4 CommonJS Named Destructuring
- **Test:** `const { fregex, forEach, map } = require('functional-regex')`
- **Expected:** Named destructuring works
- **Verification:** Compatible with CommonJS patterns

#### 7.5 Mixed Imports (using both default and named)
- **Test:** Import both default and named in same file
- **Expected:** Both work correctly
- **Verification:** No conflicts

---

### 8. Integration Tests

#### 8.1 Chaining Operations
- **Test:** 
  ```
  const matches = fregex(/\d+/g, '1 2 3 4 5');
  const result = matches
    .map(m => parseInt(m[0]))
    .filter(n => n > 2);
  ```
- **Expected:** `[3, 4, 5]`
- **Verification:** Returned array is true Array with array methods

#### 8.2 Multiple fregex Calls
- **Test:** Call `fregex()` multiple times on different inputs
- **Expected:** Each call independent, no state issues
- **Verification:** No global state pollution

#### 8.3 Reusing Regex Object
- **Test:** Create regex once, use with multiple texts via fregex
- **Expected:** Works correctly each time
- **Verification:** Regex object reset properly between calls

---

## Test Organization Structure

```
src/
├── __tests__/
│   ├── main.test.ts           # Tests 1.x - Main function
│   ├── forEach.test.ts         # Tests 2.x - forEach method
│   ├── map.test.ts             # Tests 3.x - map method
│   ├── prototype.test.ts        # Tests 4.x - addToRegExp
│   ├── edge-cases.test.ts       # Tests 5.x - Edge cases
│   ├── types.test.ts            # Tests 6.x - TypeScript types
│   ├── imports.test.ts          # Tests 7.x - Module imports
│   └── integration.test.ts       # Tests 8.x - Integration
```

---

## Test Execution Goals

- **Coverage Target:** 100% code coverage
- **All platforms:** ESM and CommonJS tested
- **All scenarios:** Success paths and edge cases
- **Type safety:** TypeScript types validated
- **Performance:** No unexpected regressions noted
