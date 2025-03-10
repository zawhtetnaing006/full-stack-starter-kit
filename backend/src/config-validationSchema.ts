import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),

  APP_NAME: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.string().required(),
  MAIL_FROM_ADDRESS: Joi.string().required(),
  ADMIN_MAIL: Joi.string().required(),
});
