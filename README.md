# Functional Regex

> Simplifies the way you work with global regular expressions in JavaScript/TypeScript.

[![npm version](https://img.shields.io/npm/v/functional-regex.svg)](https://www.npmjs.com/package/functional-regex)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## Overview

Functional Regex simplifies iterating over global regex matches. Instead of the verbose `while` loop pattern with `exec()`, you can use familiar functional array methods like `map`, `forEach`, and more.

### The Problem

Working with global regular expressions in JavaScript is cumbersome:

```javascript
// Old way - verbose and error-prone
const regex = /src="([^"]*)"/g;
let match;
const filenames = [];
while ((match = regex.exec(text)) !== null) {
  filenames.push(match[1]);
}
```

### The Solution

Functional Regex provides a cleaner, more expressive API:

```javascript
import { fregex } from 'functional-regex';

const filenames = fregex(/src="([^"]*)"/g, text).map(m => m[1]);
```

## Installation

```bash
npm install functional-regex
```

Or with other package managers:

```bash
pnpm add functional-regex
yarn add functional-regex
```

## Quick Start

### ESM (Recommended)

```typescript
import fregex, { forEach, map } from 'functional-regex';

// Default export - returns array of matches
const matches = fregex(/\d+/g, 'There are 42 numbers: 1, 2, 3');
// Returns: [['42'], ['1'], ['2'], ['3']]

// Extract just the matched text
const numbers = matches.map(m => m[0]);
// Returns: ['42', '1', '2', '3']

// Or use named exports directly
const results = map(/\d+/g, '1 2 3', (match) => parseInt(match[0]));
// Returns: [1, 2, 3]
```

### CommonJS

```javascript
const { fregex, forEach, map } = require('functional-regex');

const results = fregex(/\d+/g, '1 2 3');
```

## API Reference

### `fregex(regex, text)`

Returns an array of all regex matches with support for functional array methods.

**Automatically adds the global flag (`g`) if not present.**

```typescript
// With capture groups
fregex(/src="([^"]*)"/g, html);
// => [['src="foo.js"', 'foo.js'], ['src="bar.js"', 'bar.js']]

// Without capture groups
fregex(/\d+/g, '1 and 2');
// => [['1'], ['2']]

// Without global flag (added automatically)
fregex(/\w+/, 'hello world');
// => [['hello'], ['world']]
```

### `forEach(regex, text, callback)`

Iterate over all regex matches with a callback function.

```typescript
forEach(/\d+/g, '1 2 3', (match) => {
  console.log(match[0]); // Full match
  console.log(match[1]); // First capture group (if exists)
});
```

### `map(regex, text, callback)`

Transform all regex matches using a callback function.

```typescript
const numbers = map(/\d+/g, '1 2 3', (match) => parseInt(match[0]));
// Returns: [1, 2, 3]

const objects = map(
  /(\w+)=(\w+)/g,
  'foo=bar baz=qux',
  (match) => ({ key: match[1], value: match[2] })
);
// Returns: [{key: 'foo', value: 'bar'}, {key: 'baz', value: 'qux'}]
```

### `addToRegExp()`

Optionally extend the RegExp prototype to use `forEach` and `map` directly on regex objects.

**Warning:** This modifies the native RegExp prototype. Use carefully in libraries.

```typescript
import { addToRegExp } from 'functional-regex';

// Enable prototype methods
addToRegExp();

// Now you can use methods directly
/\d+/g.forEach('1 2 3', (match) => {
  console.log(match[0]);
});

const results = /\d+/g.map('1 2 3', (m) => parseInt(m[0]));
```

## Examples

### Extract URLs from HTML

```typescript
import { fregex } from 'functional-regex';

const html = '<a href="https://example.com">Link</a>';
const urls = fregex(/href="([^"]*)"/g, html).map(m => m[1]);
// Returns: ['https://example.com']
```

### Parse Query String Parameters

```typescript
const url = 'https://example.com?name=john&age=30&city=NYC';
const params = Object.fromEntries(
  fregex(/(\w+)=([^&]*)/g, url).map(m => [m[1], m[2]])
);
// Returns: { name: 'john', age: '30', city: 'NYC' }
```

### Extract and Transform Numbers

```typescript
const numbers = fregex(/\d+/g, 'File sizes: 1.5MB, 2.3MB, 890KB')
  .map(m => parseInt(m[0]))
  .filter(n => n > 1000);
// Returns: [1500, 2300] (after assuming decimal to integer conversion)
```

### Count Specific Words

```typescript
const text = 'apple banana apple cherry apple';
const appleCount = fregex(/apple/g, text).length;
// Returns: 3
```

### Extract Capture Groups

```typescript
const csv = 'name,age\njohn,30\njane,25';
const records = fregex(/(\w+),(\d+)/g, csv).map(m => ({
  name: m[1],
  age: parseInt(m[2])
}));
// Returns: [
//   { name: 'john', age: 30 },
//   { name: 'jane', age: 25 }
// ]
```

## TypeScript Support

Full TypeScript support with complete type definitions:

```typescript
import fregex, { forEach, map } from 'functional-regex';

// Type inference works correctly
const matches: RegExpExecArray[] = fregex(/\d+/g, '1 2 3');

// Generic callback types
const numbers: number[] = map(
  /\d+/g,
  '1 2 3',
  (match): number => parseInt(match[0])
);

// Proper typing for callbacks
forEach(/\d+/g, '1 2 3', (match: RegExpExecArray): void => {
  console.log(match[0]); // ✓ Type-safe
  console.log(match.index); // ✓ Has RegExpExecArray properties
});
```

## Comparison with Original

This is a modern drop-in replacement for the unmaintained [functional-regex](https://github.com/leahciMic/functional-regex) library with:

- ✅ Full TypeScript support with inline types
- ✅ ESM and CommonJS module formats
- ✅ Modern build tooling (Vite)
- ✅ Comprehensive test coverage (57+ tests)
- ✅ Zero dependencies
- ✅ Active maintenance

### Migration from Original

If you're using the original `functional-regex`:

```javascript
// Before
const fregex = require('functional-regex');

// After - just update the import
import fregex from 'functional-regex';
// or
const fregex = require('functional-regex');

// Everything else works the same!
```

## Possible Future Features

See [FEATURES.md](./FEATURES.md) for a comprehensive list of potential enhancements, including:

- Additional array methods (`filter`, `reduce`, `some`, `every`, `find`)
- Enhanced match object with easier capture group access
- Chainable/composable API
- Advanced regex caching
- Error handling utilities
- Performance optimizations

## Error Handling

### Zero-Width Match Detection

The library automatically detects regex patterns that match empty strings (zero-width matches), which would cause infinite loops:

```javascript
import { fregex } from 'functional-regex';

try {
  // This pattern matches empty strings (both groups optional)
  fregex(/(a)?(b)?/g, 'test');
} catch (error) {
  console.error(error.message);
  // Regex pattern matches empty string, causing infinite loop...
}
```

**To fix this, ensure your regex matches at least one character:**

```javascript
// ❌ Problematic patterns (can match empty)
/(a)?(b)?/g      // Both optional
/a*/g            // Zero or more (can be zero)
/^/g             // Zero-width anchor

// ✅ Safe patterns
/(a)(b)/g        // Both required
/a+/g            // One or more
/(a)|(b)/g       // One of two required
/\w+/g           // One or more word chars
```

For detailed information, see [ZERO_WIDTH_MATCH_ISSUE.md](./ZERO_WIDTH_MATCH_ISSUE.md).

## Performance

For short to medium-length strings (the primary use case), performance is excellent. The library uses simple iteration with no overhead beyond the regex engine itself.

For very large strings, consider:
1. Using more specific regex patterns
2. Breaking up the input into smaller chunks
3. Using non-capturing groups when you don't need captures

## Browser Compatibility

Works in modern browsers and Node.js 20+:

- Chrome/Edge 88+
- Firefox 78+
- Safari 15+
- Node.js 20+

## License

ISC (Original author: Michael Leaney)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Related

- [Original functional-regex](https://github.com/leahciMic/functional-regex) - The original unmaintained library
- [MDN: RegExp.prototype.exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
- [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
