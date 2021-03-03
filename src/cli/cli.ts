import * as commands from './commands';
import { Arguments, schema } from './arguments';
import { joi, rfc2119KeyWordsToUpperCase } from '../helpers';
import yargs, { CommandModule } from 'yargs';
import { environment } from './environment';
import { setLevel } from '../logger';

function run(args: string[]): void {
  yargs
    .scriptName('homebrew-caboodle')
    .strict()
    .env(environment.prefix)
    .wrap(Math.min(120, yargs.terminalWidth()))
    .epilogue(environment.argumentSourceMessage())
    .demandCommand()
    /**
     * The first command need a type assertion to make the command module
     * assignable to the command method. I'm not exactly sure why this is an
     * issue, but weird enough only the first command needs it. I'm guessing the
     * next command perhaps takes some of its type from the previous one.
     */
    .command(commands.changed as CommandModule<unknown, Arguments>)
    .command(commands.create)
    .command(commands.list)
    .command(commands.update)
    .options({
      formulae: {
        description: 'Formulae to process, may be a Glob pattern',
        default: '*',
        defaultDescription: '"*" (all formulae)',
        type: 'string',
        requiresArg: true,
      },
      logLevel: {
        description: 'Log level (verbosity)',
        default: 'info',
        type: 'string',
        choices: ['trace', 'debug', 'info'],
        requiresArg: true,
      },
      help: {
        alias: 'h',
      },
      version: {
        alias: 'v',
      },
    })
    .check((argv) => {
      const validation = schema.validate(argv, {
        abortEarly: false,
        allowUnknown: true,
      });

      if (joi.isValid<Arguments>(validation, argv)) {
        setLevel(argv.logLevel);
      } else if (validation.error !== undefined) {
        throw new Error(
          [
            'Invalid argument(s):',
            ...validation.error.details.map(
              (e) => `  ${rfc2119KeyWordsToUpperCase(e.message)}`,
            ),
          ].join('\n'),
        );
      }

      return true;
    })
    .parse(args);
}

export { Arguments, run };
