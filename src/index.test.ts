import { describe, it, expect } from 'vitest';
import fregex, { forEach, map, addToRegExp } from './index';

describe('Main fregex Function', () => {
  const htmlText = [
    '<script src="foo.js"></script>',
    '<script src="bar.js"></script>',
    '<script src="baz.js"></script>',
    '<script src="qux.js"></script>',
  ].join('\n');

  // Test 1.1: Basic Array Return
  it('should return an array of matches with capture groups', () => {
    const result = fregex(/src="([^"]*)"/g, htmlText);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(4);

    // Verify first match
    expect(result[0][0]).toBe('src="foo.js"');
    expect(result[0][1]).toBe('foo.js');
  });

  // Test 1.2: Auto-Global Flag Addition
  it('should add global flag automatically if not present', () => {
    const result = fregex(/src="([^"]*)"/, htmlText);

    expect(result).toHaveLength(4);
    expect(result[0][1]).toBe('foo.js');
    expect(result[3][1]).toBe('qux.js');
  });

  // Test 1.3: Simple Pattern (No Capture Groups)
  it('should handle simple patterns without capture groups', () => {
    const result = fregex(/\d+/g, '1. There is 2 numbers in this string');

    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe('1');
    expect(result[1][0]).toBe('2');
  });

  // Test 1.4: Multiple Capture Groups
  it('should handle patterns with multiple capture groups', () => {
    const result = fregex(/(\w+)=(\w+)/g, 'foo=bar baz=qux');

    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe('foo=bar');
    expect(result[0][1]).toBe('foo');
    expect(result[0][2]).toBe('bar');
    expect(result[1][0]).toBe('baz=qux');
    expect(result[1][1]).toBe('baz');
    expect(result[1][2]).toBe('qux');
  });

  // Test 1.5: Empty Matches (No Results)
  it('should return empty array when pattern matches nothing', () => {
    const result = fregex(/xyz/g, 'no matches here');

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  // Test 1.6: Empty String Input
  it('should handle empty string input gracefully', () => {
    const result = fregex(/\d+/g, '');

    expect(result).toEqual([]);
  });

  // Test 1.7: Single Match
  it('should handle single match correctly', () => {
    const result = fregex(/\d+/g, '42');

    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe('42');
  });

  // Test 1.8: Special Characters in Pattern
  it('should handle escaped special characters', () => {
    const result = fregex(/\(test\)/g, '(test) and (test)');

    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe('(test)');
    expect(result[1][0]).toBe('(test)');
  });

  // Additional test: Verify returned array is a true array with array methods
  it('should return a true Array that supports array methods', () => {
    const result = fregex(/\d+/g, '1 2 3');

    // Should have array methods
    expect(typeof result.map).toBe('function');
    expect(typeof result.filter).toBe('function');
    expect(typeof result.reduce).toBe('function');

    // Test chaining with array methods
    const numbers = result.map((m) => parseInt(m[0]));
    expect(numbers).toEqual([1, 2, 3]);
  });

  // Test with flags other than 'g'
  it('should preserve other flags while adding global flag', () => {
    const result = fregex(/test/i, 'TEST test TeSt');

    expect(result).toHaveLength(3);
    expect(result[0][0]).toBe('TEST');
    expect(result[1][0]).toBe('test');
    expect(result[2][0]).toBe('TeSt');
  });

  // Test with anchors
  it('should handle regex anchors correctly', () => {
    const result = fregex(/^start|^end/gm, 'start middle\nend next\nstart again');

    const matchStrings = result.map((m) => m[0]);
    expect(matchStrings).toContain('start');
    expect(matchStrings).toContain('end');
  });
});

describe('Module Import Tests', () => {
  // Test 7.1: ESM Default Import
  it('should support default import', () => {
    expect(typeof fregex).toBe('function');
  });

  // Test 7.2: ESM Named Imports
  it('should support named imports', () => {
    expect(typeof fregex).toBe('function');
    expect(typeof forEach).toBe('function');
    expect(typeof map).toBe('function');
    expect(typeof addToRegExp).toBe('function');
  });

  it('should have forEach, map, addToRegExp attached to default export', () => {
    expect(typeof fregex.forEach).toBe('function');
    expect(typeof fregex.map).toBe('function');
    expect(typeof fregex.addToRegExp).toBe('function');
  });

  // Functional test with default import
  it('should work with default import function', () => {
    const result = fregex(/\d+/g, '1 2 3');

    expect(result).toHaveLength(3);
    expect(result.map((m) => m[0])).toEqual(['1', '2', '3']);
  });

  // Functional test with named forEach import
  it('should work with named forEach import', () => {
    const results: string[] = [];

    forEach(/\d+/g, '1 2 3', (match) => {
      results.push(match[0]);
    });

    expect(results).toEqual(['1', '2', '3']);
  });

  // Functional test with named map import
  it('should work with named map import', () => {
    const result = map(/\d+/g, '1 2 3', (match) => parseInt(match[0]));

    expect(result).toEqual([1, 2, 3]);
  });

  // Test with all imports used together
  it('should work with all imported functions together', () => {
    // Default export
    const defaultResult = fregex(/\d+/g, '1 2 3');
    expect(defaultResult.map((m) => m[0])).toEqual(['1', '2', '3']);

    // Named forEach
    const forEachResults: string[] = [];
    forEach(/\d+/g, '1 2 3', (match) => {
      forEachResults.push(match[0]);
    });
    expect(forEachResults).toEqual(['1', '2', '3']);

    // Named map
    const mapResult = map(/\d+/g, '1 2 3', (m) => parseInt(m[0]));
    expect(mapResult).toEqual([1, 2, 3]);
  });
});
