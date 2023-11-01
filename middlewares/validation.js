const { object } = require("@hapi/joi");
const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const MapsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    latitude: Joi.number().min(-90).max(90),
    longitude: Joi.number().min(-180).max(180),
    color: Joi.string(),

  });
  return MapsSchema.validate(data);
};

module.exports.registerValidation = registerValidation;