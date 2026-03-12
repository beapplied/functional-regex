import type { MatchCallback } from './types';

/**
 * Helper function to ensure a regex has the global flag
 * Preserves other flags while adding 'g'
 */
function ensureGlobalFlag(regex: RegExp): RegExp {
  if (regex.global) {
    return regex;
  }

  // Get all flags from the regex
  const flags = regex.flags || regex.toString().match(/\/([^/]*)$/)?.[1] || '';

  // Add 'g' if not already present
  const newFlags = flags.includes('g') ? flags : flags + 'g';

  return new RegExp(regex.source, newFlags);
}

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
export function forEach(regex: RegExp, text: string, callback: MatchCallback): void {
  const globalRegex = ensureGlobalFlag(regex);
  let match: RegExpExecArray | null;
  let lastIndex = -1;
  let matchCount = 0;
  const MAX_ITERATIONS = 10000; // Safety limit to detect infinite loops early

  // eslint-disable-next-line no-cond-assign
  while ((match = globalRegex.exec(text)) !== null) {
    // Detect zero-width match that would cause infinite loop
    // This happens when: match is empty string AND lastIndex doesn't advance
    if (match[0].length === 0 && match.index === lastIndex) {
      throw new Error(
        `Regex pattern matches empty string, causing infinite loop. ` +
          `This typically happens with patterns that have all optional groups, such as /(a)?(b)?/g. ` +
          `To fix this, ensure your regex matches at least one character. ` +
          `Examples of safe patterns: /a+/g, /(a)(b)/g, /\\w+/g. ` +
          `See: https://github.com/yourusername/functional-regex#zero-width-matches`
      );
    }

    lastIndex = match.index;
    matchCount++;

    // Safety check to prevent runaway loops in case of unexpected behavior
    if (matchCount > MAX_ITERATIONS) {
      throw new Error(
        `Regex match limit exceeded (${MAX_ITERATIONS} iterations). ` +
          `This likely indicates a problematic regex pattern. ` +
          `Please ensure your pattern doesn't create infinite loops.`
      );
    }

    callback(match);
  }
}
