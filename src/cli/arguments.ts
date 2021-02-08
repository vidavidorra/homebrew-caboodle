import Joi from 'joi';

interface Arguments {
  formulae: string;
}

const schema = Joi.object()
  .keys({ formulae: Joi.string().required() })
  .required();

export { Arguments, schema };
