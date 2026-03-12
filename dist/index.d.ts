/**
 * Augment the RegExp prototype with forEach and map methods
 *
 * WARNING: This modifies the native RegExp prototype. Use with caution in
 * libraries and large applications as it affects all regex objects globally.
 * Only enable this if you need the convenience of prototype methods.
 *
 * @example
 * ```typescript
 * import { addToRegExp } from 'functional-regex';
 *
 * // Enable prototype methods
 * addToRegExp();
 *
 * // Now you can use forEach and map directly on regex objects
 * /\d+/g.forEach('1 and 2', (match) => {
 *   console.log(match[0]);
 * });
 *
 * const numbers = /\d+/g.map('1 and 2', (match) => parseInt(match[0]));
 * ```
 */
export declare function addToRegExp(): void;

/**
 * Iterate over all regex matches and execute a callback for each one
 *
 * @param regex - The regular expression to use for matching
 * @param text - The text to search within
 * @param callback - Function called for each match with the full match result
 * @throws {Error} If the regex matches empty strings (zero-width match), which causes infinite loops
 *
 * @example
 * ```typescript
 * forEach(/\d+/g, '1 and 2', (match) => {
 *   console.log(match[0]); // Full match
 * });
 * ```
 */
export declare function forEach(regex: RegExp, text: string, callback: MatchCallback): void;

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
declare function fregex(regex: RegExp, text: string): RegExpExecArray[];

declare namespace fregex {
    var forEach: forEach;
    var map: map;
    var addToRegExp: addToRegExp;
}
export default fregex;
export { fregex }

/**
 * Transform all regex matches using a callback function
 *
 * @param regex - The regular expression to use for matching
 * @param text - The text to search within
 * @param callback - Function called for each match that returns a transformed value
 * @returns Array of transformed values from the callback
 *
 * @example
 * ```typescript
 * // Extract filenames from src attributes
 * map(/src="([^"]*)"/g, htmlText, (match) => match[1]);
 *
 * // Convert numbers to integers
 * map(/\d+/g, '1 2 3', (match) => parseInt(match[0]));
 * ```
 */
export declare function map<T>(regex: RegExp, text: string, callback: MapCallback<T>): T[];

/**
 * Generic type definition for map callback
 * Called for each regex match and should return a transformed value
 */
declare type MapCallback<T> = (match: RegExpExecArray) => T;

/**
 * Type definition for forEach callback
 * Called for each regex match with the full match result
 */
declare type MatchCallback = (match: RegExpExecArray) => void;

export { }
