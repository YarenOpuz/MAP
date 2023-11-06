const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const MapsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    locations: Joi.object({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
    }),
    color: Joi.string(),

  });
  return MapsSchema.validate(data);
};

module.exports.registerValidation = registerValidation;