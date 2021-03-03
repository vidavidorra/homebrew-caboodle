import * as cli from '..';
import Joi from 'joi';
import { logger } from '../../logger';
import { rfc2119KeyWordsToUpperCase } from '../../helpers';

interface Arguments extends cli.Arguments {
  existing?: boolean;
  create?: boolean;
  update?: boolean;
}

const schema = cli.schema
  .keys({
    existing: Joi.boolean(),
    create: Joi.boolean(),
    update: Joi.boolean(),
  })
  .or('existing', 'create', 'update');

const command: cli.Command<cli.Arguments, Arguments> = {
  command: 'list',
  describe: 'List formulae',
  builder: (yargs) => {
    return yargs
      .epilogue(cli.environment.argumentSourceMessage())
      .options({
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
      })
      .check((argv) => {
        logger.debug({ argv }, 'Checking');
        const validation = schema.validate(argv, {
          abortEarly: false,
          allowUnknown: true,
        });

        if (validation.error !== undefined) {
          logger.debug('some error');
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
      });
  },
  handler: (args) => {
    logger.info(args, 'CLI list arguments');
  },
};

export { command };
