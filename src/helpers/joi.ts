import Joi from 'joi';

function validate<T>(
  schema: Joi.Schema,
  value: unknown,
  options?: Joi.ValidationOptions,
): value is T {
  return schema.validate(value, options).error === undefined;
}

function isValid<T>(
  validation: Joi.ValidationResult,
  value: unknown,
): value is T {
  return validation.error === undefined;
}

export { validate, isValid };
