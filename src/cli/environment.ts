const prefix = 'HOMEBREW_CABOODLE';

function information(): string {
  return [
    [
      'Program arguments can be passed to the program using four sources.',
      'These four sources are listed below and are merged together in this',
      'order of precedence.',
    ].join(' '),
    '  1. Command line arguments.',
    `  2. Environment variables (prefixed with "${prefix}").`,
    '  3. .env file.',
    '  4. Command line defaults.',
  ].join('\n');
}

export { prefix, information };
