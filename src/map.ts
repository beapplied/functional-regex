import type { MapCallback } from './types';
import { forEach } from './forEach';

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
export function map<T>(regex: RegExp, text: string, callback: MapCallback<T>): T[] {
  const results: T[] = [];

  forEach(regex, text, (match) => {
    results.push(callback(match));
  });

  return results;
}
