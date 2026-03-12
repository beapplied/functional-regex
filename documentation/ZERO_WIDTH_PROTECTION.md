# Zero-Width Match Protection

## Overview

The functional-regex library includes **automatic detection and prevention** of infinite loops caused by zero-width regex matches.

## What Is Zero-Width Match

A zero-width match is when a regex pattern matches an empty string. Examples:

```javascript
/(a)?(b)?/g   // Both groups optional - can match empty
/a*/g         // Zero or more 'a' - matches zero on 'bbb'
/^/g          // Anchor position - matches empty at every position
```

## The Problem

When a regex matches a zero-width string, the JavaScript regex engine doesn't advance the `lastIndex` position, causing infinite loops:

```javascript
const regex = /(a)?(b)?/g;
const text = 'ab a b';

let match;
while ((match = regex.exec(text)) !== null) {
  // Match 1: 'ab' at index 0, advances to index 2 ✓
  // Match 2: '' at index 2, lastIndex stays at 2 ✗
  // Match 3: '' at index 2, lastIndex stays at 2 ✗
  // ... infinite loop forever ...
}
```

## How It's Protected

The functional-regex library detects zero-width matches and throws a helpful error:

```javascript
import { fregex } from 'functional-regex';

try {
  fregex(/(a)?(b)?/g, 'test');
} catch (error) {
  console.error(error.message);
}

// Output:
// Regex pattern matches empty string, causing infinite loop. 
// This typically happens with patterns that have all optional groups, 
// such as /(a)?(b)?/g. To fix this, ensure your regex matches at least 
// one character. Examples of safe patterns: /a+/g, /(a)(b)/g, /\w+/g.
```

## Detection Mechanism

The library checks for two conditions:

1. **Empty match**: `match[0].length === 0`
2. **No position advance**: `match.index === lastIndex`

When both are true on consecutive iterations, an error is thrown.

### Additional Safety

The library also includes a maximum iteration limit (10,000 iterations) as a safety net to catch unexpected infinite loops early.

## Safe Patterns

### ❌ Problematic Patterns

These patterns can match empty strings:

```javascript
/(a)?(b)?/g      // Both groups optional
/a*/g            // Zero or more (can be zero)
/a{0,5}/g        // Range including zero
/^/g             // Zero-width anchor
/(?:)/g          // Empty non-capturing group
/\b/g            // Word boundary (zero-width)
```

### ✅ Safe Patterns

These patterns require at least one character match:

```javascript
/(a)(b)/g        // Both groups required
/a+/g            // One or more
/a{1,5}/g        // Range requiring at least one
/(a)|(b)/g       // One of two required
/\w+/g           // One or more word chars
/\d+/g           // One or more digits
/\b\w+\b/g       // Word with boundaries
/[a-z]+/g        // One or more letters
```

## Usage

### When You Hit This Error

1. **Examine your regex** - Look for optional groups or `*` quantifiers
2. **Make it required** - Change `?` to nothing, change `*` to `+`
3. **Test with known strings** - Ensure it matches what you expect

### Example Fix

```javascript
// ❌ Before - causes error
fregex(/(name)?\s*(value)?/g, text);

// ✅ After - safe
fregex(/(\w+)\s*=\s*(\w+)/g, text);
```

## Technical Details

### Where Detection Happens

The check occurs in the `forEach` function, which is called by both `map` and the main `fregex` function.

### Performance

The detection has minimal performance impact:
- Only checks two conditions per match
- Comparison operations are O(1)
- Negligible overhead for normal use cases

### Error Messages

The error message includes:
1. Description of the problem
2. Common cause (optional groups)
3. Example of problematic pattern
4. Examples of safe patterns
5. Link to documentation

## Testing

The library includes comprehensive tests for zero-width match detection:

```typescript
it('should throw error when regex matches empty strings', () => {
  expect(() => {
    fregex(/(a)?(b)?/g, 'ab a b');
  }).toThrow(/Regex pattern matches empty string/);
});

it('should have helpful error message for zero-width matches', () => {
  expect(() => {
    fregex(/(a)?(b)?/g, 'test');
  }).toThrow(/all optional groups/);
});
```

## FAQ

**Q: Why doesn't the library auto-fix this?**
A: The correct behavior is ambiguous. Skipping one character? One position? The user should write correct patterns instead.

**Q: Do other languages have this issue?**
A: Yes. Python, Java, Ruby - all regex engines have the same behavior.

**Q: Can I use these patterns if I'm careful?**
A: No. The infinite loop happens automatically with certain input. The only safe approach is using patterns that require at least one match.

**Q: What if my regex MUST use optional groups?**
A: Restructure your regex. Examples:
```javascript
// Instead of: /(a)?(b)?/g
// Use one of:
/(?:ab|a|b)?/g         // Group the alternatives
/a*b*?/g               // Adjust quantifiers
/(a+)|(b+)/g           // Make each option required
```

## Migration Guide

If you have code that would trigger this error:

1. **Identify the problematic pattern** - Look at the error message
2. **Restructure the regex** - Use examples in "Safe Patterns" section
3. **Test thoroughly** - Verify it matches expected inputs
4. **Update your code** - Use the new pattern

## See Also

- [ZERO_WIDTH_MATCH_ISSUE.md](./ZERO_WIDTH_MATCH_ISSUE.md) - Quick reference
- [EDGE_CASE_EXPLANATION.md](./EDGE_CASE_EXPLANATION.md) - Detailed technical explanation
- [README.md](./README.md) - Main documentation with more examples
