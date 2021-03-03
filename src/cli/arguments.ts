import Joi from 'joi';
import { LogLevel } from '../logger';

interface Arguments {
  formulae: string;
  logLevel: LogLevel;
}

const schema = Joi.object()
  .keys({
    formulae: Joi.string().required(),
    logLevel: Joi.string()
      .allow('trace', 'debug', 'info', 'warn', 'error', 'fatal')
      .required(),
  })
  .required();

export { Arguments, schema };
