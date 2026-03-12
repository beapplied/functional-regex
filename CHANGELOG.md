# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-12

### Added

- Initial release as a modern replacement for the original functional-regex library
- Core `fregex()` function that returns all regex matches as an array
- `forEach()` method for iterating over matches with a callback
- `map()` method for transforming matches with a callback
- `addToRegExp()` to optionally extend RegExp.prototype
- Full TypeScript support with complete type definitions
- ESM and CommonJS module formats for maximum compatibility
- Comprehensive test suite with 57+ tests covering:
  - Core functionality
  - Edge cases (Unicode, large strings, special regex features)
  - All module import patterns
  - Type safety
  - Integration scenarios
- Automatic global flag addition for convenience
- Extensive documentation with examples
- Zero dependencies

### Features

#### Main API

- **fregex(regex, text)** - Returns array of all matches
  - Automatically adds global flag if missing
  - Supports all regex flags
  - Works with capture groups

- **forEach(regex, text, callback)** - Iterate over matches
  - Calls callback for each match
  - Receives full RegExpExecArray
  - Non-breaking (returns undefined)

- **map(regex, text, callback)** - Transform matches
  - Returns array of transformed values
  - Generic typing for callback return type
  - Enables functional programming style

- **addToRegExp()** - Opt-in prototype extension
  - Adds forEach and map to RegExp.prototype
  - Non-invasive (opt-in only)
  - Allows fluent regex API

#### Quality

- TypeScript first codebase
- Strict type checking enabled
- Complete JSDoc documentation
- Modern ES2020 target
- Source maps for debugging
- Minified production builds

### Test Coverage

- 100% code coverage
- 57+ test cases covering:
  - Basic functionality
  - Capture groups
  - No matches scenarios
  - Empty inputs
  - Special characters
  - Unicode support
  - Case-insensitive matching
  - Multiple flags
  - Anchors and boundaries
  - Character classes
  - Backreferences
  - Multiline patterns
  - Lookahead assertions
  - All import patterns
  - Prototype methods
  - Integration scenarios

### Documentation

- Comprehensive README.md with examples
- API reference documentation
- TypeScript usage guide
- Migration guide from original library
- Contributing guidelines
- Feature roadmap in FEATURES.md

### Browser & Runtime Support

- Node.js 20+
- ES2020+ support
- Works in modern browsers via ESM

## Future Versions

### Planned Features (See FEATURES.md for details)

- Additional array methods (filter, reduce, some, every, find, findIndex)
- Enhanced match object with labeled capture groups
- Chainable/composable API
- Advanced regex caching and compilation
- Error handling utilities
- Utility functions (replaceAll, split, test with details)
- Performance optimizations for large datasets

## Migration from Original

If you're currently using the original `functional-regex@1.x`:

1. Update your import/require statements (same module name)
2. All APIs remain the same for backwards compatibility
3. Enjoy improved TypeScript support and active maintenance

No breaking changes from the original API - it's a drop-in replacement!

## Notes

This is a complete rewrite of the original functional-regex library with:

- Modern tooling (Vite, Vitest, TypeScript)
- Full TypeScript support
- Comprehensive testing
- Active maintenance
- Zero dependencies
- ESM and CommonJS support

The original library (https://github.com/leahciMic/functional-regex) is no longer maintained, and this project serves as a modern continuation with full API compatibility.
