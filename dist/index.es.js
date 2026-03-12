function ensureGlobalFlag(regex) {
  if (regex.global) {
    return regex;
  }
  const flags = regex.flags || regex.toString().match(/\/([^/]*)$/)?.[1] || "";
  const newFlags = flags.includes("g") ? flags : flags + "g";
  return new RegExp(regex.source, newFlags);
}
function forEach(regex, text, callback) {
  const globalRegex = ensureGlobalFlag(regex);
  let match;
  let lastIndex = -1;
  let matchCount = 0;
  const MAX_ITERATIONS = 1e4;
  while ((match = globalRegex.exec(text)) !== null) {
    if (match[0].length === 0 && match.index === lastIndex) {
      throw new Error(
        `Regex pattern matches empty string, causing infinite loop. This typically happens with patterns that have all optional groups, such as /(a)?(b)?/g. To fix this, ensure your regex matches at least one character. Examples of safe patterns: /a+/g, /(a)(b)/g, /\\w+/g. See: https://github.com/yourusername/functional-regex#zero-width-matches`
      );
    }
    lastIndex = match.index;
    matchCount++;
    if (matchCount > MAX_ITERATIONS) {
      throw new Error(
        `Regex match limit exceeded (${MAX_ITERATIONS} iterations). This likely indicates a problematic regex pattern. Please ensure your pattern doesn't create infinite loops.`
      );
    }
    callback(match);
  }
}
function map(regex, text, callback) {
  const results = [];
  forEach(regex, text, (match) => {
    results.push(callback(match));
  });
  return results;
}
function addToRegExp() {
  RegExp.prototype.forEach = function forEachMethod(text, callback) {
    return forEach(this, text, callback);
  };
  RegExp.prototype.map = function mapMethod(text, callback) {
    return map(this, text, callback);
  };
}
function fregex(regex, text) {
  return map(regex, text, (match) => match);
}
fregex.forEach = forEach;
fregex.map = map;
fregex.addToRegExp = addToRegExp;
export {
  addToRegExp,
  fregex as default,
  forEach,
  fregex,
  map
};
//# sourceMappingURL=index.es.js.map
