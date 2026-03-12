import { describe, it, expect } from 'vitest';
import { fregex } from './index';

describe('Edge Cases and Special Scenarios', () => {
  // Test 5.1: Unicode Characters
  it('should handle unicode characters correctly', () => {
    const result = fregex(/[\u4e00-\u9fff]+/g, '你好 world 世界');

    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe('你好');
    expect(result[1][0]).toBe('世界');
  });

  // Test 5.2: Very Large String
  it('should handle very large strings efficiently', () => {
    // Create a large string with pattern
    const largeText = '1 '.repeat(5000);
    const result = fregex(/\d+/g, largeText);

    expect(result).toHaveLength(5000);
  });

  // Test 5.3: Complex Regex with Lookahead
  it('should support lookahead assertions', () => {
    const result = fregex(/\d+(?=px)/g, '12px 24em 36px');

    expect(result.map((m) => m[0])).toEqual(['12', '36']);
  });

  // Test 5.4: Case-Insensitive Matching
  it('should handle case-insensitive flag', () => {
    const result = fregex(/test/i, 'TEST test TeSt');

    expect(result).toHaveLength(3);
    expect(result.map((m) => m[0])).toEqual(['TEST', 'test', 'TeSt']);
  });

  // Test 5.5: Regex with Multiple Flags
  it('should preserve multiple flags when adding global flag', () => {
    // Case insensitive + multiline
    const result = fregex(/^foo/im, 'foo\nFOO\nfoo');

    expect(result).toHaveLength(3);
  });

  // Test 5.6: Match at String Boundaries
  it('should handle anchor patterns correctly', () => {
    const result = fregex(/^start|^end/gm, 'start middle\nend next\nstart again');

    const matchStrings = result.map((m) => m[0]);
    expect(matchStrings).toContain('start');
    expect(matchStrings).toContain('end');
  });

  // Test 5.7: Greedy vs Non-Greedy
  it('should respect regex greediness', () => {
    // Greedy
    const greedy = fregex(/<.*>/g, '<a>text</a>');
    expect(greedy).toHaveLength(1); // Matches entire <a>text</a>

    // Non-greedy
    const nonGreedy = fregex(/<.*?>/g, '<a>text</a>');
    expect(nonGreedy).toHaveLength(2); // Matches <a> and </a>
  });

  // Test 5.8: Whitespace and Line Terminators
  it('should handle various whitespace correctly', () => {
    const text = 'foo\tbar\nbaz\r\nqux';
    const result = fregex(/\S+/g, text);

    expect(result.map((m) => m[0])).toEqual(['foo', 'bar', 'baz', 'qux']);
  });

  // Additional: Null or undefined-like values
  it('should handle falsy-like string values', () => {
    const result = fregex(/0/g, '0 1 0 1');

    expect(result.map((m) => m[0])).toEqual(['0', '0']);
  });

  // Additional: Very long capture groups
  it('should handle long capture group values', () => {
    const longString = 'a'.repeat(10000);
    const result = fregex(/a+/g, longString);

    expect(result).toHaveLength(1);
    expect(result[0][0]).toHaveLength(10000);
  });

  // Additional: Special regex characters in text
  it('should handle special regex characters in the text being searched', () => {
    const text = 'Price: $19.99';
    const result = fregex(/\$[\d.]+/g, text);

    expect(result.map((m) => m[0])).toEqual(['$19.99']);
  });

  // Additional: Word boundaries
  it('should support word boundary assertions', () => {
    const result = fregex(/\bword\b/g, 'word words sword');

    expect(result.map((m) => m[0])).toEqual(['word']);
  });

  // Additional: Character classes
  it('should handle character classes correctly', () => {
    const result = fregex(/[a-z]+/g, 'abc 123 XYZ def');

    expect(result.map((m) => m[0])).toEqual(['abc', 'def']);
  });

  // Additional: Backreferences
  it('should support backreferences in patterns', () => {
    const result = fregex(/(\w)\1/g, 'aabbcc dd eee');

    expect(result.length).toBeGreaterThan(0);
  });

  // Additional: Zero-width match detection
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

  it('should suggest safe patterns in error message', () => {
    expect(() => {
      fregex(/(a)?(b)?/g, 'test');
    }).toThrow(/a\+/);
  });

  // Additional: Newline in pattern
  it('should handle multiline patterns', () => {
    const text = 'line1\nline2\nline3';
    const result = fregex(/line\d/gm, text);

    expect(result).toHaveLength(3);
  });
});
