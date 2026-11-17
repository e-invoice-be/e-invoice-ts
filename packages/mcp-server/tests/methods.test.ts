import { narrowCodeToolOptions } from '../src/methods';

describe('narrowCodeToolOptions', () => {
  it('rejects a method pattern with nested repetition before matching method names', () => {
    expect(() => narrowCodeToolOptions({}, { blockedMethods: ['^((?:.)+)+x$'] })).toThrow(
      /nested repetition/,
    );
  });

  it.each([
    ['a pattern longer than 128 characters', 'a'.repeat(129), /longer than 128/],
    ['too many quantifiers', 'a*b*c*d*e*f*g*h*i*', /too many quantifiers/],
    ['a quantifier bound above 100', 'a{101}', /too large/],
    ['a trailing escape', '\\', /trailing escape/],
    ['an unterminated character class', '[a-z', /unterminated character class/],
    ['an unmatched opening parenthesis', '(documents', /unmatched \(/],
    ['an unmatched closing parenthesis', 'documents)', /unmatched \)/],
  ])('rejects %s', (_name, pattern, message) => {
    expect(() => narrowCodeToolOptions({}, { blockedMethods: [pattern] })).toThrow(message);
  });

  it('accepts a character class, an exact bound, and a non-capturing prefix', () => {
    expect(() =>
      narrowCodeToolOptions({}, { allowedMethods: ['[+]+', 'a{5}', '(?:documents\\.)+'] }),
    ).not.toThrow();
  });

  it('keeps an operator block when the client allows every method', () => {
    const options = { codeBlockedMethods: ['^documents\\.delete$'] };

    expect(narrowCodeToolOptions(options, { allowedMethods: ['.*'] })).toBe(options);
  });

  it('adds an exact block for a method the client excludes', () => {
    const narrowed = narrowCodeToolOptions({}, { blockedMethods: ['^documents\\.delete$'] });

    expect(narrowed.codeBlockedMethods).toEqual(['^documents\\.delete$']);
  });
});
