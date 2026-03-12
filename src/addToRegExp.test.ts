import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { addToRegExp } from './index';

describe('addToRegExp and Prototype Extension', () => {
  const htmlText = [
    '<script src="foo.js"></script>',
    '<script src="bar.js"></script>',
  ].join('\n');

  const expectedFilenames = ['foo.js', 'bar.js'];

  // Store original prototype for cleanup
  let originalForEach: any;
  let originalMap: any;

  beforeEach(() => {
    // Save originals
    originalForEach = RegExp.prototype.forEach;
    originalMap = RegExp.prototype.map;

    // Enable prototype methods
    addToRegExp();
  });

  afterEach(() => {
    // Clean up prototype modifications
    if (originalForEach) {
      RegExp.prototype.forEach = originalForEach;
    } else {
      delete RegExp.prototype.forEach;
    }

    if (originalMap) {
      RegExp.prototype.map = originalMap;
    } else {
      delete RegExp.prototype.map;
    }
  });

  // Test 4.1: Prototype forEach Extension
  it('should add forEach method to RegExp prototype', () => {
    const regex = /src="([^"]*)"/g;
    expect(typeof regex.forEach).toBe('function');
  });

  it('should allow calling forEach on regex object', () => {
    const callback = vi.fn();
    const regex = /src="([^"]*)"/g;

    regex.forEach?.(htmlText, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[0][0][0]).toBe('src="foo.js"');
  });

  // Test 4.2: Prototype map Extension
  it('should add map method to RegExp prototype', () => {
    const regex = /src="([^"]*)"/g;
    expect(typeof regex.map).toBe('function');
  });

  it('should allow calling map on regex object', () => {
    const regex = /src="([^"]*)"/g;
    const result = regex.map?.(htmlText, (match) => match[1]);

    expect(result).toEqual(expectedFilenames);
  });

  // Test 4.3: Prototype Methods Return Values
  it('should return correct values from prototype methods', () => {
    const regex = /src="([^"]*)"/g;

    // forEach should return undefined
    const forEachResult = regex.forEach?.(htmlText, () => {
      // Empty callback
    });
    expect(forEachResult).toBeUndefined();

    // map should return array
    const mapResult = regex.map?.(htmlText, (m) => m[1]);
    expect(Array.isArray(mapResult)).toBe(true);
    expect(mapResult).toEqual(expectedFilenames);
  });

  // Test: Works with different patterns
  it('should work with various regex patterns via prototype', () => {
    const numbers = /\d+/g.map?.('1 and 2 and 3', (m) => parseInt(m[0]));
    expect(numbers).toEqual([1, 2, 3]);
  });

  // Test: Works correctly with forEach
  it('should call forEach callback for each match via prototype', () => {
    const regex = /(\w+)/g;
    const matches: string[] = [];

    regex.forEach?.(htmlText, (match) => {
      matches.push(match[1]);
    });

    // Verify the forEach method was called for each match
    expect(matches).toContain('script');
    expect(matches.length).toBeGreaterThan(0);
  });

  // Test: Multiple calls to addToRegExp
  it('should be safe to call addToRegExp multiple times', () => {
    // Call again
    addToRegExp();

    const regex = /src="([^"]*)"/g;
    const result = regex.map?.(htmlText, (m) => m[1]);

    expect(result).toEqual(expectedFilenames);
  });

  // Test: Non-global regex works with prototype methods
  it('should work with non-global regex on prototype', () => {
    const regex = /\d+/;
    const result = regex.map?.('1 and 2', (m) => parseInt(m[0]));

    expect(result).toEqual([1, 2]);
  });
});
