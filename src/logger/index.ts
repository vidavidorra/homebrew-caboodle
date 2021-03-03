import { Logger, PrettyStream } from '@vidavidorra/bunyan-pretty-stream';
import bunyan from 'bunyan';

const prettyStream = new PrettyStream();
prettyStream.pipe(process.stdout);
const prettyStreamName = 'Pretty stdout';

const _logger = bunyan.createLogger({
  name: 'Platform scripts',
  level: 'info',
  src: false,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      name: prettyStreamName,
      level: 'trace',
      stream: prettyStream,
      type: 'raw',
    },
  ],
});

type LogLevel = bunyan.LogLevelString;

function setLevel(level: LogLevel): void {
  _logger.levels(prettyStreamName, level);
}

const logger: Logger = _logger;

export { logger, setLevel, LogLevel };
