# Contributing to Functional Regex

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the Functional Regex library.

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on the code, not the person
- Help each other succeed

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, pnpm, or yarn

### Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/functional-regex-lib.git
   cd functional-regex-lib
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify everything works**
   ```bash
   npm run test:run
   npm run build
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Check coverage
npm run test:coverage
```

### Building

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

### Code Quality

```bash
# Lint TypeScript
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck
```

## Making Changes

### Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test improvements
- `chore/` - Build, dependencies, etc.

### Writing Code

1. **Follow the existing code style**
   - Use TypeScript
   - Follow the style in existing files
   - Use strict TypeScript mode

2. **Write clear commit messages**
   ```
   Fix: Handle empty strings in forEach
   
   - Add check for empty text parameter
   - Add test case for empty string
   - Fixes issue #123
   ```

3. **Keep changes focused**
   - One feature or fix per commit when possible
   - Make atomic commits that build successfully

### Writing Tests

Tests are essential! When adding features or fixing bugs:

1. **Write tests that fail first** (TDD)
2. **Write minimal code to pass tests**
3. **Refactor if needed**

Test file locations:
- `src/__tests__/main.test.ts` - Core fregex function
- `src/__tests__/forEach.test.ts` - forEach method
- `src/__tests__/map.test.ts` - map method
- `src/__tests__/prototype.test.ts` - Prototype extension
- `src/__tests__/edge-cases.test.ts` - Edge cases
- `src/__tests__/imports.test.ts` - Module imports
- `src/__tests__/integration.test.ts` - Integration tests

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import { fregex } from '../index';

describe('Feature Name', () => {
  it('should do something specific', () => {
    const result = fregex(/pattern/g, 'text');
    
    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe('expected');
  });
});
```

### Documentation

Update documentation when:
- Adding new features
- Changing API behavior
- Fixing bugs that required understanding of undocumented behavior

Files to update:
- `README.md` - Usage examples and API reference
- `FEATURES.md` - Feature list and future ideas
- Code comments - Keep inline comments clear and concise

## Commit Guidelines

### Commit Messages

Follow a clear format:

```
Type: Brief description

More detailed explanation if needed. Wrap at 72 characters.

Fixes #123
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `test` - Test improvements
- `refactor` - Code refactoring
- `chore` - Build, dependencies
- `perf` - Performance improvements

### Examples

```
feat: Add reduce method for functional composition

Implements reduce to allow users to aggregate matches
into a single value. Supports initial value parameter.

refactor: Simplify ensureGlobalFlag implementation

Extract regex flag handling into separate utility
for better code clarity.

test: Add edge case tests for unicode handling

Add tests for Unicode patterns and multi-byte
characters in regex matching.
```

## Pull Requests

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   npm run test:run
   ```

2. **Check code quality**
   ```bash
   npm run lint
   npm run typecheck
   ```

3. **Update documentation**
   - Add/update README.md examples
   - Update FEATURES.md if applicable
   - Add JSDoc comments to new functions

4. **Run the build**
   ```bash
   npm run build
   ```

### PR Checklist

- [ ] Tests pass locally (`npm run test:run`)
- [ ] Code passes linting (`npm run lint`)
- [ ] TypeScript checks pass (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] No unnecessary dependencies added
- [ ] No breaking changes (or clearly documented)

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (fixes issue #___)
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe the testing done:
- Test case 1
- Test case 2

## Checklist
- [ ] Tests pass
- [ ] Code style followed
- [ ] Documentation updated
```

## Code Review

When reviewing PRs:
- Be constructive and helpful
- Ask questions rather than making demands
- Suggest improvements, don't require them
- Approve when satisfied with quality

When your PR is reviewed:
- Respond to comments thoughtfully
- Ask for clarification if needed
- Update code based on feedback
- Re-request review when ready

## Issues

### Reporting Bugs

Include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Node.js and npm versions
- Code example if possible

### Requesting Features

Include:
- Clear description of the feature
- Use cases and examples
- Why this feature is needed
- Possible implementation approach

## Project Structure

```
functional-regex-lib/
├── src/
│   ├── __tests__/          # Test files
│   ├── types.ts            # TypeScript type definitions
│   ├── forEach.ts          # forEach implementation
│   ├── map.ts              # map implementation
│   ├── addToRegExp.ts      # Prototype extension
│   └── index.ts            # Main entry point
├── dist/                   # Built library (generated)
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Package metadata
├── README.md               # User documentation
├── FEATURES.md             # Feature list
└── CONTRIBUTING.md         # This file
```

## Release Process

(For maintainers)

1. Update version in package.json
2. Update CHANGELOG.md
3. Run `npm run build`
4. Run `npm run test:run`
5. Create git tag: `git tag v2.0.0`
6. Push to main: `git push origin main --tags`
7. Publish to npm: `npm publish`
8. Create GitHub release with notes

## Questions?

- Open an issue for questions
- Check existing issues first
- Ask in pull requests
- Check README and FEATURES for documentation

## Thank You!

Your contributions help make Functional Regex better for everyone!
