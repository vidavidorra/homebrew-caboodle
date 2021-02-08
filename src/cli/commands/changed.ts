import { Arguments as CliArguments, Command, environment } from '..';

interface Arguments extends CliArguments {
  startCommit: string;
  endCommit: string;
}

const nestedCommandName = 'changed';
const command: Command<CliArguments, Arguments> = {
  command: 'changed [options] <startCommit> <endCommit>',
  describe: 'Get formulae changed between Git commits',
  builder: (yargs) => {
    return yargs
      .epilogue(environment.information())
      .positional('startCommit', {
        describe: 'Start commit SHA',
        type: 'string',
        demandOption: true,
      })
      .positional('endCommit', {
        describe: 'End commit SHA',
        type: 'string',
        demandOption: true,
      });
  },
  handler: (args) => {
    console.log(nestedCommandName, args);
  },
};

export { command };
