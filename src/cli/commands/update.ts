import { Arguments as CliArguments, Command, environment } from '..';

interface Arguments extends CliArguments {
  check?: boolean;
}

const nestedCommandName = 'update';
const command: Command<CliArguments, Arguments> = {
  command: 'update',
  describe: 'Update formulae from their configurations',
  builder: (yargs) => {
    return yargs.epilogue(environment.information()).options({
      check: {
        alias: 'c',
        describe: 'Only check whether formulae can be updated',
        type: 'boolean',
      },
    });
  },
  handler: (args) => {
    console.log(nestedCommandName, args);
  },
};

export { command };
