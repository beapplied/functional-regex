# Zero-Width Match Issue: Quick Reference

## TL;DR

The regex pattern `/(a)?(b)?/g` causes an **infinite loop** when both capture groups are optional, because:

1. It can match an empty string `''` 
2. Empty matches don't advance the regex `lastIndex` position
3. The loop keeps matching the same empty string forever
4. Memory eventually runs out

## The Problematic Pattern

```javascript
/(a)?(b)?/g
```

Both capture groups are optional (`?`), so the regex matches:
- "ab" at position 0 ✓ (advances to position 2)
- "" at position 2 ✗ (stays at position 2)
- "" at position 2 ✗ (stays at position 2)
- ... infinite loop ...

## Why This Matters

When iterating with:
```javascript
while ((match = regex.exec(text)) !== null) {
  // If match[0] === '' and lastIndex doesn't advance, infinite loop!
}
```

## Visual Proof

```
Match 1: 'ab'  at index 0, lastIndex advances to 2 ✓
Match 2: ''    at index 2, lastIndex stays at 2 ✗
Match 3: ''    at index 2, lastIndex stays at 2 ✗
Match 4: ''    at index 2, lastIndex stays at 2 ✗
... forever ...
```

## How This Library Handles It

The functional-regex library **detects and blocks** zero-width matches by throwing a helpful error:

```javascript
import { fregex } from 'functional-regex';

try {
  fregex(/(a)?(b)?/g, 'test');
} catch (error) {
  console.log(error.message);
  // Regex pattern matches empty string, causing infinite loop. 
  // This typically happens with patterns that have all optional groups, 
  // such as /(a)?(b)?/g. To fix this, ensure your regex matches at least 
  // one character. Examples of safe patterns: /a+/g, /(a)(b)/g, /\w+/g.
}
```

**Benefits:**
- ✅ Prevents memory exhaustion from infinite loops
- ✅ Provides clear error message explaining the issue
- ✅ Suggests safe patterns as examples
- ✅ Fails fast with helpful guidance

## Standard Behavior

This behavior is a characteristic of:
- ✅ Standard JavaScript behavior
- ✅ How all JavaScript engines work
- ✅ True for Python, Java, Ruby, etc.
- ✅ Now detected and blocked by functional-regex

## Safe Patterns

```javascript
// ❌ Avoid (can match empty string)
/(a)?(b)?/g      // Both optional
/a*/g            // Zero or more
/a*/g on 'bbb'   // Zero matches of 'a'
/^/g             // Zero-width anchor

// ✅ Use instead (must match something)
/(a)(b)/g        // Both required
/a+/g            // One or more
/(a)|(b)/g       // One of two required
/\b\w+\b/g       // Word boundaries
```

## For Users

If you encounter this error:

1. **Review your regex pattern** - Check if all groups are optional
2. **Make at least one part required** - Change `?` to `+` or remove the optional groups
3. **Use safe patterns** - See the "Safe Patterns" section above
4. **Read the error message** - It includes specific examples for your case

## See Also

- `EDGE_CASE_EXPLANATION.md` - Detailed technical explanation
- `src/edge-cases.test.ts` - The skipped test with comments
