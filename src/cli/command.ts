import { CommandModule } from 'yargs';

interface Command<T = unknown, U = unknown> extends CommandModule<T, U> {
  command: CommandModule['command'];
  describe: string;
}

export { Command };
