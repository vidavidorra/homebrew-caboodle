import { Arguments as CliArguments, Command, environment } from '..';
import { logger } from '../../logger';

interface Arguments extends CliArguments {
  existing?: boolean;
  create?: boolean;
  update?: boolean;
}

const nestedCommandName = 'list';
const command: Command<CliArguments, Arguments> = {
  command: 'list',
  describe: 'List formulae',
  builder: (yargs) => {
    return yargs.epilogue(environment.argumentSourceMessage()).options({
      existing: {
        alias: 'e',
        describe: 'List existing formulae',
        type: 'boolean',
      },
      create: {
        alias: 'c',
        describe: 'List formulae to be created',
        type: 'boolean',
      },
      update: {
        alias: 'u',
        describe: 'List formulae to be updated',
        type: 'boolean',
      },
    });
  },
  handler: (args) => {
    logger.info(args, 'CLI list arguments');
    logger.debug('debug');
  },
};

export { command };
