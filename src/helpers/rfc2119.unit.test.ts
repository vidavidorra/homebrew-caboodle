import { describe, expect, it } from '@jest/globals';
import { keyWords, keyWordsToUpperCase } from './rfc2119';

describe('RFC2119', () => {
  describe('keyWords', () => {
    it.each([
      'MUST',
      'MUST NOT',
      'REQUIRED',
      'SHALL',
      'SHALL NOT',
      'SHOULD',
      'SHOULD NOT',
      'RECOMMENDED',
      'MAY',
      'OPTIONAL',
    ])("contains key word '%s' from RFC 2119", (keyWord: string) => {
      expect(keyWords).toContain(keyWord);
    });

    /**
     * [RFC 2119 errata 499](https://www.rfc-editor.org/errata/eid499).
     */
    it.each(['NOT RECOMMENDED'])(
      "contains key word '%s' from RFC 2119 errata 499",
      (keyWord: string) => {
        expect(keyWords).toContain(keyWord);
      },
    );
  });

  describe('keyWordsToUpperCase', () => {
    it('ignores the case of the key word', () => {
      const inputs = [
        {
          format: 'You {{}} pass.',
          keyWords: ['must', 'Must', 'MuSt'],
          result: 'You MUST pass.',
        },
        {
          format: 'You {{}} pass.',
          keyWords: ['must not', 'Must Not', 'MuSt NoT'],
          result: 'You MUST NOT pass.',
        },
        {
          format: 'You are {{}} to pass.',
          keyWords: ['required', 'Required', 'ReQuIrEd'],
          result: 'You are REQUIRED to pass.',
        },
        {
          format: 'You {{}} pass.',
          keyWords: ['shall', 'Shall', 'ShAlL'],
          result: 'You SHALL pass.',
        },
        {
          format: 'You {{}} pass.',
          keyWords: ['shall not', 'Shall Not', 'ShAlL nOt'],
          result: 'You SHALL NOT pass.',
        },
        {
          format: 'You {{}} pass.',
          keyWords: ['should', 'Should', 'ShOuLd'],
          result: 'You SHOULD pass.',
        },
        {
          format: 'You {{}} pass.',
          keyWords: ['should not', 'Should Not', 'ShOuLd NoT'],
          result: 'You SHOULD NOT pass.',
        },
        {
          format: 'The pass is {{}}.',
          keyWords: ['recommended', 'Recommended', 'ReCoMmEnDeD'],
          result: 'The pass is RECOMMENDED.',
        },
        {
          format: 'The pass is {{}}.',
          keyWords: ['not recommended', 'Not Recommended', 'NoT rEcOmMeNdEd'],
          result: 'The pass is NOT RECOMMENDED.',
        },
        {
          format: 'You {{}} pass.',
          keyWords: ['may', 'May', 'MaY'],
          result: 'You MAY pass.',
        },
        {
          format: 'The pass is {{}}.',
          keyWords: ['optional', 'Optional', 'OpTiOnAl'],
          result: 'The pass is OPTIONAL.',
        },
      ];

      inputs.forEach((e) => {
        e.keyWords.forEach((keyWord) => {
          const input = e.format.replace('{{}}', keyWord);

          expect(keyWordsToUpperCase(input)).toEqual(e.result);
        });
      });
    });

    it('uppercases a key word in one sentence', () => {
      expect(keyWordsToUpperCase('You shall not pass.')).toEqual(
        'You SHALL NOT pass.',
      );
    });

    it('uppercases multiple key words in one sentence', () => {
      expect(
        keyWordsToUpperCase('You shall not pass and are required to stop.'),
      ).toEqual('You SHALL NOT pass and are REQUIRED to stop.');
    });

    it('uppercases a key word in a multiline sentence', () => {
      expect(
        keyWordsToUpperCase(
          'A quote by Gandalf the Grey,\n you shall not pass.',
        ),
      ).toEqual('A quote by Gandalf the Grey,\n you SHALL NOT pass.');
    });

    it('uppercases a key word spread across a line boundary', () => {
      expect(
        keyWordsToUpperCase(
          'A quote by Gandalf the Grey, you shall\nnot pass.',
        ),
      ).toEqual('A quote by Gandalf the Grey, you SHALL\nNOT pass.');
    });

    it('uppercases a key word spread across a line boundary with whitespace', () => {
      expect(
        keyWordsToUpperCase(
          'A quote by Gandalf the Grey, you shall\n  not pass.',
        ),
      ).toEqual('A quote by Gandalf the Grey, you SHALL\n  NOT pass.');
    });
  });
});
