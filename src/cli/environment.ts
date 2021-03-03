import dotenv from 'dotenv';

class Environment {
  readonly prefix = 'HOMEBREW_CABOODLE';

  constructor() {
    dotenv.config(); // Load `.env` file contents into `process.env`.
  }

  argumentSourceMessage(): string {
    return [
      [
        'Program arguments can be passed to the program using four sources.',
        'These four sources are listed below and are merged together in this',
        'order of precedence.',
      ].join(' '),
      '  1. Command line arguments.',
      `  2. Environment variables (prefixed with "${this.prefix}").`,
      '  3. .env file.',
      '  4. Command line defaults.',
    ].join('\n');
  }
}

const environment = new Environment();

export { Environment, environment };
