# Functional Regex Library - Project Structure

## Directory Layout

```
functional-regex-lib/
├── src/
│   ├── types.ts                    # TypeScript type definitions
│   ├── forEach.ts                  # forEach implementation
│   ├── forEach.test.ts             # forEach tests (colocated)
│   ├── map.ts                      # map implementation
│   ├── map.test.ts                 # map tests (colocated)
│   ├── addToRegExp.ts              # RegExp prototype extension
│   ├── addToRegExp.test.ts         # addToRegExp tests (colocated)
│   ├── index.ts                    # Main entry point
│   ├── index.test.ts               # Main function + imports tests (colocated)
│   ├── edge-cases.test.ts          # Edge case tests (colocated)
│   └── integration.test.ts         # Integration tests (colocated)
│
├── dist/                           # Compiled output (generated)
│   ├── index.es.js                 # ESM bundle
│   ├── index.es.js.map             # ESM source map
│   ├── index.cjs                   # CommonJS bundle
│   ├── index.cjs.map               # CommonJS source map
│   ├── index.d.ts                  # Main type definitions
│   ├── index.d.ts.map              # Type definition source map
│   ├── forEach.d.ts                # forEach type definitions
│   ├── forEach.d.ts.map
│   ├── map.d.ts                    # map type definitions
│   ├── map.d.ts.map
│   ├── addToRegExp.d.ts            # addToRegExp type definitions
│   ├── addToRegExp.d.ts.map
│   ├── types.d.ts                  # Shared type definitions
│   └── types.d.ts.map
│
├── Configuration Files
│   ├── package.json                # Package metadata & scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── vite.config.ts              # Vite build configuration
│   ├── .eslintrc.json              # ESLint rules
│   ├── .prettierrc                 # Prettier formatting
│   └── .gitignore                  # Git ignore patterns
│
└── Documentation
    ├── README.md                   # User guide & API reference
    ├── CONTRIBUTING.md             # Contributor guidelines
    ├── FEATURES.md                 # Feature specifications
    ├── TEST_CASES.md               # Test case documentation
    ├── CHANGELOG.md                # Release notes
    ├── PROJECT_STRUCTURE.md        # This file
    └── IMPLEMENTATION_SUMMARY.md   # Implementation details
```

## Colocated Test Structure

Tests are placed directly next to their corresponding source files:

### Pattern
```
src/
├── feature.ts          # Implementation
└── feature.test.ts     # Tests
```

### Specific Examples

| Source File | Test File | Tests |
|-------------|-----------|-------|
| `forEach.ts` | `forEach.test.ts` | 8 tests for forEach method |
| `map.ts` | `map.test.ts` | 10 tests for map method |
| `addToRegExp.ts` | `addToRegExp.test.ts` | 9 tests for prototype extension |
| `index.ts` | `index.test.ts` | 18 tests (main function + imports) |
| - | `edge-cases.test.ts` | 15 tests for edge cases |
| - | `integration.test.ts` | 12 tests for integration scenarios |

**Total: 57 passing tests**

## Test Configuration

### Vitest Setup
- Environment: Node.js
- Globals enabled (no need for imports)
- Coverage provider: v8
- 100% coverage target

### Test File Exclusion
- TypeScript compiler excludes `**/*.test.ts` files
- Build doesn't include test code
- Tests only run in development/test environments

### Running Tests
```bash
npm test              # Watch mode
npm run test:run      # Single run
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

## Build Output

### Module Formats
- **ESM**: `dist/index.es.js` (1.13 KB)
- **CommonJS**: `dist/index.cjs` (0.71 KB)
- Both include source maps for debugging

### Type Definitions
- Generated from TypeScript source
- One `.d.ts` file per module
- Includes source maps for type checking

### Exclusions in Builds
- Test files (`.test.ts`) are excluded
- Development dependencies not bundled
- Zero production dependencies

## Key Design Advantages

### Colocated Tests
✅ **Easier Navigation** - Tests live next to implementation  
✅ **Faster Development** - Change code and tests together  
✅ **Better IDE Support** - Jump between source and tests  
✅ **Cleaner Imports** - Relative paths are simple  
✅ **Logical Grouping** - Tests with their features  

### Separation of Concerns
✅ **Clear Boundaries** - `*.test.ts` files clearly marked  
✅ **No Test Pollution** - Tests excluded from builds  
✅ **Clean Packages** - Users get only production code  
✅ **Easy to Scale** - Add tests alongside new features  

## Adding New Features

### When Adding a New Feature

1. Create implementation file: `src/newFeature.ts`
2. Add type definitions in `src/types.ts` if needed
3. Create test file: `src/newFeature.test.ts`
4. Export from `src/index.ts` if user-facing
5. Update documentation as needed

### File Template

```typescript
// src/newFeature.ts
/**
 * Feature description and usage
 */
export function newFeature(arg: string): string {
  return arg;
}
```

```typescript
// src/newFeature.test.ts
import { describe, it, expect } from 'vitest';
import { newFeature } from './index';

describe('New Feature', () => {
  it('should do something', () => {
    const result = newFeature('test');
    expect(result).toBe('test');
  });
});
```

## Development Workflow

### Edit Source
```bash
vim src/forEach.ts
```

### Edit Tests
```bash
vim src/forEach.test.ts
```

### Run Tests
```bash
npm test
```

### Build & Verify
```bash
npm run build
npm run typecheck
npm run lint
```

## Performance Notes

- **Bundle Size**: ~1.1 KB (ESM, minified)
- **Zero Dependencies**: No npm packages needed
- **Fast Build**: ~82ms rebuild time
- **Type Safe**: 100% TypeScript strict mode
- **Fast Tests**: 57 tests run in ~17ms

## Notes for Contributors

When working with this project:

1. **Keep tests colocated** - New feature tests go next to implementation
2. **Exclude from build** - Tests are automatically excluded
3. **Run full suite** - Always run `npm run test:run` before committing
4. **Type everything** - Maintain 100% TypeScript coverage
5. **Update docs** - Documentation updates are as important as code

---

For more information, see:
- [README.md](./README.md) - User guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guide
- [FEATURES.md](./FEATURES.md) - Feature specification
