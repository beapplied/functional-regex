import { map } from './map';
import { forEach } from './forEach';
import { addToRegExp } from './addToRegExp';

/**
 * Main functional regex function that returns all matches as an array
 *
 * Automatically adds the global flag if not present, allowing you to
 * work with regex results as a simple array.
 *
 * @param regex - The regular expression to use for matching
 * @param text - The text to search within
 * @returns Array of all match results
 *
 * @example
 * ```typescript
 * // Simple pattern matching
 * fregex(/\d+/g, '1. There is 2 numbers in this string');
 * // Returns: ['1', '2']
 *
 * // With capture groups
 * fregex(/src="([^"]*)"/g, '<script src="test.js"></script>');
 * // Returns: [['src="test.js"', 'test.js']]
 *
 * // Automatic global flag addition
 * fregex(/\d+/, '1 and 2'); // No 'g' flag, but works anyway
 * // Returns: ['1', '2']
 * ```
 */
export function fregex(regex: RegExp, text: string): RegExpExecArray[] {
  return map(regex, text, (match) => match);
}

// Attach methods to the main function for standalone use
fregex.forEach = forEach;
fregex.map = map;
fregex.addToRegExp = addToRegExp;

// Export named functions for those who prefer explicit imports
export { forEach, map, addToRegExp };

// Default export
export default fregex;
