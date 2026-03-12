import { describe, it, expect } from 'vitest';
import { fregex, forEach, map } from './index';

describe('Integration Tests', () => {
  // Test 8.1: Chaining Operations with Array Methods
  it('should support chaining native array methods on fregex results', () => {
    const matches = fregex(/\d+/g, '1 2 3 4 5');
    const result = matches
      .map((m) => parseInt(m[0]))
      .filter((n) => n > 2);

    expect(result).toEqual([3, 4, 5]);
  });

  it('should return true Array with full array method support', () => {
    const result = fregex(/\d+/g, '1 2 3');

    // Verify it's an actual Array
    expect(Array.isArray(result)).toBe(true);

    // Verify array methods work
    const doubled = result.map((m) => m[0] + m[0]);
    expect(doubled[0]).toBe('11');

    const filtered = result.filter((m) => parseInt(m[0]) > 1);
    expect(filtered).toHaveLength(2);

    const reduced = result.reduce((sum, m) => sum + parseInt(m[0]), 0);
    expect(reduced).toBe(6);
  });

  // Test 8.2: Multiple fregex Calls
  it('should handle multiple fregex calls independently', () => {
    const result1 = fregex(/\d+/g, '1 2 3');
    const result2 = fregex(/[a-z]+/g, 'foo bar baz');
    const result3 = fregex(/\w+/g, 'hello 123 world');

    expect(result1.map((m) => m[0])).toEqual(['1', '2', '3']);
    expect(result2.map((m) => m[0])).toEqual(['foo', 'bar', 'baz']);
    expect(result3.map((m) => m[0])).toEqual(['hello', '123', 'world']);
  });

  it('should not have global state pollution between calls', () => {
    const regex = /\d+/g;

    // First call
    const result1 = fregex(regex, '1 2 3');
    expect(result1).toHaveLength(3);

    // Second call with same regex
    const result2 = fregex(regex, '4 5 6');
    expect(result2).toHaveLength(3);

    // Third call
    const result3 = fregex(regex, '7 8');
    expect(result3).toHaveLength(2);
  });

  // Test 8.3: Reusing Regex Object
  it('should properly reset regex state between calls', () => {
    const regex = /\d+/g;

    // Call with different texts
    const result1 = fregex(regex, '1 2');
    const result2 = fregex(regex, '3 4 5');
    const result3 = fregex(regex, '6');

    expect(result1.map((m) => m[0])).toEqual(['1', '2']);
    expect(result2.map((m) => m[0])).toEqual(['3', '4', '5']);
    expect(result3.map((m) => m[0])).toEqual(['6']);
  });

  // Complex integration: Extract and transform data
  it('should support complex real-world extraction and transformation', () => {
    const html = `
      <link rel="stylesheet" href="style.css">
      <link rel="stylesheet" href="theme.css">
      <link rel="icon" href="favicon.ico">
    `;

    const stylesheets = fregex(/rel="stylesheet"[^>]*href="([^"]*)"/g, html).map(
      (match) => match[1]
    );

    expect(stylesheets).toEqual(['style.css', 'theme.css']);
  });

  // Real-world example: Parsing data
  it('should handle CSV-like parsing', () => {
    const csv = 'name,age,city\njohn,30,NYC\njane,25,LA\nbob,35,Chicago';

    const lines = csv.split('\n');
    const headers = fregex(/[^,]+/g, lines[0]).map((m) => m[0]);
    const rows = lines.slice(1).map((line) =>
      fregex(/[^,]+/g, line).reduce(
        (obj, match, index) => {
          obj[headers[index]] = match[0];
          return obj;
        },
        {} as Record<string, string>
      )
    );

    expect(rows).toHaveLength(3);
    expect(rows[0]).toEqual({ name: 'john', age: '30', city: 'NYC' });
  });

  // Real-world example: URL parsing
  it('should handle URL parameter extraction', () => {
    const url = 'https://example.com?user=john&age=30&city=NYC';
    const params = Object.fromEntries(
      fregex(/(\w+)=([^&]*)/g, url).map((match) => [match[1], match[2]])
    );

    expect(params).toEqual({
      user: 'john',
      age: '30',
      city: 'NYC',
    });
  });

  // Real-world example: Text analysis
  it('should support text analysis operations', () => {
    const text = 'The quick brown fox jumps over the lazy dog';

    // Extract words and analyze
    const words = fregex(/\b\w+\b/g, text).map((m) => ({
      word: m[0],
      length: m[0].length,
    }));

    const averageLength =
      words.reduce((sum, w) => sum + w.length, 0) / words.length;

    expect(words).toHaveLength(9);
    expect(averageLength).toBeGreaterThan(3);
  });

  // Chaining with forEach and map together
  it('should support combining forEach and map functions', () => {
    const matchesViaForEach: string[] = [];
    forEach(/\d+/g, '1 2 3', (match: RegExpExecArray) => {
      matchesViaForEach.push(match[0]);
    });

    const matchesViaMap = map(/\d+/g, '1 2 3', (match: RegExpExecArray) => match[0]);

    expect(matchesViaForEach).toEqual(matchesViaMap);
  });

  // Error handling in callbacks
  it('should allow error handling in callbacks', () => {
    const processMatches = (): number | null => {
      try {
        const result = fregex.map(/\d+/g, '1 2 3', (match) => {
          const num = parseInt(match[0]);
          if (num === 2) throw new Error('Invalid number');
          return num;
        });
        return result.reduce((a, b) => a + b, 0);
      } catch (e) {
        return null;
      }
    };

    expect(processMatches()).toBeNull();
  });

  // Performance test: many matches
  it('should efficiently handle many matches', () => {
    const text = Array.from({ length: 1000 }, (_, i) => i.toString()).join(' ');
    const start = performance.now();
    const result = fregex(/\d+/g, text);
    const end = performance.now();

    expect(result).toHaveLength(1000);
    expect(end - start).toBeLessThan(100); // Should be fast
  });
});
