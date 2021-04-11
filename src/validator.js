const Joi = require('joi');

const schema = Joi.object({
  fname: Joi.string().min(5).required(),
  lname: Joi.string().min(5).required(),
  // uname: Joi.string().min(5).required(),
  // email: Joi.string().min(5).required(),
  // active: Joi.bool().required(),
});

module.exports = {
  schema,
};
