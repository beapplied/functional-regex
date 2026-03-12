/**
 * Type definition for forEach callback
 * Called for each regex match with the full match result
 */
export type MatchCallback = (match: RegExpExecArray) => void;

/**
 * Generic type definition for map callback
 * Called for each regex match and should return a transformed value
 */
export type MapCallback<T> = (match: RegExpExecArray) => T;

/**
 * Declare the augmented RegExp prototype when addToRegExp is used
 * This allows TypeScript to understand the additional methods
 */
declare global {
  interface RegExp {
    forEach?: (text: string, callback: MatchCallback) => void;
    map?: <T>(text: string, callback: MapCallback<T>) => T[];
  }
}
