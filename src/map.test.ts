import { describe, it, expect } from 'vitest';
import { map } from './index';

describe('map Method', () => {
  const htmlText = [
    '<script src="foo.js"></script>',
    '<script src="bar.js"></script>',
    '<script src="baz.js"></script>',
    '<script src="qux.js"></script>',
  ].join('\n');

  const expectedFilenames = ['foo.js', 'bar.js', 'baz.js', 'qux.js'];

  // Test 3.1: Basic map Operation
  it('should return array of callback results', () => {
    const result = map(/src="([^"]*)"/g, htmlText, (match) => match[1]);

    expect(result).toEqual(expectedFilenames);
    expect(result).toHaveLength(4);
  });

  // Test 3.2: map with Integer Conversion
  it('should support type transformation in callback', () => {
    const result = map(/\d+/g, '1 2 3', (match) => parseInt(match[0]));

    expect(result).toEqual([1, 2, 3]);
    expect(result[0]).toBe(1);
  });

  // Test 3.3: map with No Matches
  it('should return empty array when no matches found', () => {
    const result = map(/xyz/g, 'no matches here', (match) => match[0]);

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  // Test 3.4: map Receives Full Match Result
  it('should provide full match result to callback', () => {
    const result = map(/(\w+)=(\w+)/g, 'foo=bar baz=qux', (match) => ({
      full: match[0],
      key: match[1],
      value: match[2],
    }));

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      full: 'foo=bar',
      key: 'foo',
      value: 'bar',
    });
    expect(result[1]).toEqual({
      full: 'baz=qux',
      key: 'baz',
      value: 'qux',
    });
  });

  // Test 3.5: map with Complex Transformation
  it('should support complex object transformations', () => {
    const result = map(/src="([^"]*)"/g, htmlText, (match) => ({
      fullMatch: match[0],
      filename: match[1],
    }));

    expect(result).toHaveLength(4);
    expect(result[0].filename).toBe('foo.js');
    expect(result[3].filename).toBe('qux.js');
  });

  // Test: Generic type inference
  it('should work with different return types', () => {
    // String array
    const strings = map(/\d+/g, '1 2 3', (m) => m[0]);
    expect(typeof strings[0]).toBe('string');

    // Number array
    const numbers = map(/\d+/g, '1 2 3', (m) => parseInt(m[0]));
    expect(typeof numbers[0]).toBe('number');

    // Object array
    const objects = map(/\d+/g, '1 2 3', (m) => ({
      value: parseInt(m[0]),
    }));
    expect(typeof objects[0]).toBe('object');
    expect(objects[0].value).toBe(1);
  });

  // Test: Works without global flag
  it('should work with non-global regex', () => {
    const result = map(/\d+/, '1 and 2', (match) => parseInt(match[0]));

    expect(result).toEqual([1, 2]);
  });

  // Test: Empty string
  it('should handle empty string input', () => {
    const result = map(/\d+/g, '', (match) => match[0]);

    expect(result).toEqual([]);
  });

  // Test: Callback access to array indices
  it('should allow access to any match array index', () => {
    const result = map(/(\d)(\d)(\d)/g, '123 456', (match) => [
      match[1],
      match[2],
      match[3],
    ]);

    expect(result).toEqual([
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  });

  // Test: Map with boolean return
  it('should support boolean return types for filtering logic', () => {
    const result = map(/\d+/g, '1 10 2 20 3', (match) => parseInt(match[0]) > 5);

    expect(result).toEqual([false, true, false, true, false]);
  });
});
