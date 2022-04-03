const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
    password: Joi.string()
    .min(6)
    .required(),
  });

  return schema.validate(data);
};

module.exports = { userValidation };
