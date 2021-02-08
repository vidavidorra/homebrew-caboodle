/**
 * Key words defined by RFC 2119.
 *
 * The order of these key words is important as they're used to build the
 * regular expression for the `keyWordsToUpperCase` function. The regular
 * expression lazy matches the key words, so if `MUST` is before `MUST NOT`, it
 * stop looking a match after `MUST`.
 */
const keyWords = [
  'MUST NOT',
  'MUST',
  'REQUIRED',
  'SHALL NOT',
  'SHALL',
  'SHOULD NOT',
  'SHOULD',
  'NOT RECOMMENDED', // Errata 499: https://www.rfc-editor.org/errata/eid499.
  'RECOMMENDED',
  'MAY',
  'OPTIONAL',
];

function keyWordsToUpperCase(input: string): string {
  const keyWordRe = new RegExp(
    `\\b(${keyWords
      .map((e) => e.replace(' ', '\\b(\r\n|\r|\n)?[ \t]*\\b'))
      .join('|')})\\b`,
    'gmi',
  );

  return input.replace(keyWordRe, (keyWord) => keyWord.toUpperCase());
}

export { keyWords, keyWordsToUpperCase };
