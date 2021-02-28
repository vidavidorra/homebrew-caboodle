import { Logger, PrettyStream } from '@vidavidorra/bunyan-pretty-stream';
import bunyan from 'bunyan';

const prettyStream = new PrettyStream({
  enable: {
    // time: false,
    // name: true,
    // pid: true,
    // hostname: true,
    // source: true,
    // extras: false,
  },
  // extrasKey: 'extras',
  // basePath: __dirname,
  time: { type: 'short', local: false },
});

prettyStream.pipe(process.stdout);

const _logger = bunyan.createLogger({
  name: 'Homebrew Caboodle',
  level: 'debug',
  src: true,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      name: 'Homebrew caboodle',
      level: 'trace',
      stream: prettyStream,
      type: 'raw',
    },
  ],
});

const logger: Logger = _logger;

export { logger };
