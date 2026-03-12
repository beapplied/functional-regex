import { forEach } from './forEach';
import { map } from './map';
import type { MapCallback, MatchCallback } from './types';

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
export function addToRegExp(): void {
  // eslint-disable-next-line no-extend-native
  RegExp.prototype.forEach = function forEachMethod(
    text: string,
    callback: MatchCallback
  ): void {
    return forEach(this, text, callback);
  };

  // eslint-disable-next-line no-extend-native
  RegExp.prototype.map = function mapMethod<T>(
    text: string,
    callback: MapCallback<T>
  ): T[] {
    return map(this, text, callback);
  };
}
