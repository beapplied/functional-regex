import { describe, it, expect, vi } from 'vitest';
import { forEach } from './index';

describe('forEach Method', () => {
  const htmlText = [
    '<script src="foo.js"></script>',
    '<script src="bar.js"></script>',
    '<script src="baz.js"></script>',
    '<script src="qux.js"></script>',
  ].join('\n');

  const expectedFilenames = ['foo.js', 'bar.js', 'baz.js', 'qux.js'];

  // Test 2.1: Basic forEach Execution
  it('should call callback for each match', () => {
    const callback = vi.fn();
    forEach(/src="([^"]*)"/g, htmlText, callback);

    expect(callback).toHaveBeenCalledTimes(4);
  });

  // Test 2.2: forEach Callback Arguments
  it('should pass full match result array to callback', () => {
    const callback = vi.fn();
    forEach(/src="([^"]*)"/g, htmlText, callback);

    // Check first call
    const firstCall = callback.mock.calls[0][0];
    expect(firstCall[0]).toBe('src="foo.js"');
    expect(firstCall[1]).toBe('foo.js');

    // Check second call
    const secondCall = callback.mock.calls[1][0];
    expect(secondCall[0]).toBe('src="bar.js"');
    expect(secondCall[1]).toBe('bar.js');
  });

  // Test 2.3: forEach No Return Value
  it('should return undefined', () => {
    const result = forEach(/\d+/g, '1 2 3', () => {
      // Empty callback
    });

    expect(result).toBeUndefined();
  });

  // Test 2.4: forEach with No Matches
  it('should not call callback if no matches found', () => {
    const callback = vi.fn();
    forEach(/xyz/g, 'no matches here', callback);

    expect(callback).not.toHaveBeenCalled();
  });

  // Additional test: Verify callback receives RegExpExecArray
  it('should provide access to match properties', () => {
    const matches: RegExpExecArray[] = [];

    forEach(/(\w+)=(\w+)/g, 'foo=bar baz=qux', (match) => {
      matches.push(match);
    });

    expect(matches).toHaveLength(2);
    expect(matches[0][0]).toBe('foo=bar');
    expect(matches[0][1]).toBe('foo');
    expect(matches[0][2]).toBe('bar');
  });

  // Test: Callback can transform data
  it('should support side effects and transformations in callback', () => {
    const filenames: string[] = [];

    forEach(/src="([^"]*)"/g, htmlText, (match) => {
      filenames.push(match[1]);
    });

    expect(filenames).toEqual(expectedFilenames);
  });

  // Test: Works without global flag
  it('should work with non-global regex', () => {
    const callback = vi.fn();
    forEach(/\d+/, '1 and 2', callback);

    // Should still match all numbers
    expect(callback).toHaveBeenCalledTimes(2);
  });

  // Test: Empty string
  it('should handle empty string input', () => {
    const callback = vi.fn();
    forEach(/\d+/g, '', callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
