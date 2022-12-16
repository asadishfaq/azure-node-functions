const Joi = require("joi");
const { Schema, model, connect } = require("mongoose");

var UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    salt: String,
  },
  { timestamps: true }
);

const UserSignupDTO = model("UserSignup", UserSchema);

const validateUserSignupDTO = (user) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    salt: Joi.string,
  });
  return schema.validate(user);
};

module.exports = UserSignupDTO;
module.exports.validateUserSignupDTO = validateUserSignupDTO;
