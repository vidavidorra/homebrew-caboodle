import { Arguments as CliArguments, Command, environment } from '..';

interface Arguments extends CliArguments {
  update?: boolean;
}

const nestedCommandName = 'create';
const command: Command<CliArguments, Arguments> = {
  command: 'create',
  describe: 'Create formulae from their configurations',
  builder: (yargs) => {
    return yargs.epilogue(environment.information()).options({
      update: {
        alias: 'u',
        describe: 'Update existing formulae from their configurations as well',
        type: 'boolean',
      },
    });
  },
  handler: (args) => {
    console.log(nestedCommandName, args);
  },
};

export { command };
