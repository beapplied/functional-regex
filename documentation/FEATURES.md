# Functional Regex Library - Features & Specifications

## Core Features (Matching Original)

### 1. Main Function: `fregex(regex, text)`
- Takes a regular expression and text string as input
- Returns an array of all matches
- **Automatically adds global flag** if not present
- Each match is the full match result object from `exec()`
- Supports capture groups (accessible via array indices)

**Example:**
```typescript
fregex(/\d+/g, '1. There is 2 numbers in this string'); 
// Returns: ['1', '2']

fregex(/src="([^"]*)"/g, '<script src="test.js"></script>');
// Returns: [['src="test.js"', 'test.js']]
```

### 2. Standalone Methods

#### `forEach(regex, text, callback)`
- Iterates over all regex matches
- Calls callback function for each match with the full match result
- No return value

**Example:**
```typescript
fregex.forEach(/\d+/g, '1 and 2', (match) => {
  console.log(match[0]); // Full match
});
```

#### `map(regex, text, callback)`
- Iterates over all regex matches
- Returns array of values returned from callback
- Callback receives the full match result

**Example:**
```typescript
fregex.map(/\d+/g, '1 and 2', (match) => parseInt(match[0]));
// Returns: [1, 2]
```

### 3. Optional RegExp Prototype Extension
- `addToRegExp()` function to optionally extend RegExp.prototype
- Adds `forEach(text, callback)` method
- Adds `map(text, callback)` method
- **Design decision:** Not enabled by default (non-invasive approach)

**Example:**
```typescript
fregex.addToRegExp();
/\d+/g.forEach('1 and 2', (match) => console.log(match[0]));
```

## Export Strategy

### Default Export
```typescript
import fregex from 'functional-regex';

fregex(/\d+/g, '1 and 2');
```

### Named Exports
```typescript
import { 
  fregex, 
  forEach, 
  map, 
  addToRegExp 
} from 'functional-regex';

forEach(/\d+/g, '1 and 2', callback);
map(/\d+/g, '1 and 2', callback);
```

### CommonJS Support
```javascript
const fregex = require('functional-regex');
// or
const { fregex, forEach, map } = require('functional-regex');
```

## TypeScript Support

### Full Type Definitions
- Generic types for callbacks
- Proper typing of match results
- Overloads for different callback signatures
- Type-safe capture group access when possible

## Platform Support

- **Node.js:** 20+
- **Module Systems:** ESM (primary) + CommonJS (compatibility)
- **Browser:** Not explicitly targeted, but ESM builds can be used

## Possible Future Features

These features could enhance the library while maintaining functional programming principles:

### 1. Additional Array Methods
- `filter(regex, text, predicate)` - Filter matches based on condition
- `reduce(regex, text, reducer, initialValue)` - Reduce matches to single value
- `some(regex, text, predicate)` - Check if any match satisfies condition
- `every(regex, text, predicate)` - Check if all matches satisfy condition
- `find(regex, text, predicate)` - Find first match satisfying condition
- `findIndex(regex, text, predicate)` - Find index of first match satisfying condition

**Example:**
```typescript
// Find matches with capture group longer than 5 chars
fregex.filter(/src="([^"]*)"/g, html, (match) => match[1].length > 5);

// Count total matches
fregex.reduce(/\d+/g, '1 and 2 and 3', (count) => count + 1, 0);

// Check if any number is greater than 10
fregex.some(/\d+/g, '5 and 15 and 3', 
  (match) => parseInt(match[0]) > 10);
```

### 2. Match Object Enhancement
- Return typed match objects instead of raw array
- Easier access to capture groups with labels
- Metadata (index, input string, etc.)

**Example:**
```typescript
interface Match {
  full: string;        // Full match
  groups: string[];    // All capture groups
  index: number;       // Position in string
  input: string;       // Original input
}
```

### 3. Composition & Chaining
- Chainable API for combining multiple operations
- Pipeline composition for functional workflows

**Example:**
```typescript
fregex(/\d+/g, text)
  .map(m => parseInt(m[0]))
  .filter(n => n > 10)
  .reduce((sum, n) => sum + n, 0);
```

### 4. Advanced Regex Features
- Support for regex flags as options object
- Helper functions for common patterns (email, URLs, etc.)
- Compile/cache regex for reuse
- Lazy matching support

### 5. Error Handling
- Graceful handling of invalid regex
- Custom error messages
- Validation utilities

### 6. Utility Functions
- `replaceAll(regex, text, replacement)` - Replace all matches
- `split(regex, text)` - Split text by regex (enhanced version)
- `match(regex, text, options)` - Enhanced match with metadata
- `test(regex, text)` - Check if regex matches (with details)

### 7. Performance Optimizations
- Regex caching/compilation
- Lazy evaluation for large datasets
- Memory-efficient streaming for huge strings

## Development Tooling

- **Build:** Vite (for bundling)
- **Testing:** Vitest (for unit tests)
- **Language:** TypeScript
- **Code Quality:** ESLint, Prettier
- **Package Manager:** npm/pnpm
- **CI/CD:** GitHub Actions

## Testing Strategy

### Test Coverage Areas
1. Basic regex matching with global flag
2. Non-global regex auto-flagging
3. Capture groups and match arrays
4. Callback invocation and results
5. Edge cases (empty strings, no matches, etc.)
6. TypeScript types and overloads
7. Both ESM and CommonJS imports
8. Prototype extension functionality

## Documentation

### README Sections
- Quick start / installation
- Basic usage examples
- Advanced examples
- API reference
- TypeScript usage
- Migration guide from original functional-regex
- Contributing guidelines
- Possible future features (with examples)
