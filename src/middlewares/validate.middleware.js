const Joi = require("joi");

const validate = (fieldName) => {
  return (req, res, next) => {
    const schema = Joi.object({
      [fieldName]: Joi.string().trim().required().messages({
        "any.required": `${fieldName} required`,
        "string.empty": `${fieldName} required`,
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

module.exports = validate;
