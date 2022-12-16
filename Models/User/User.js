const { Schema, model, connect } = require("mongoose");
const Joi = require("joi");

var UserSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: String,
    salt: String,
  },
  { timestamps: true }
);

const UserModel = model("users", UserSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = UserModel;
module.exports.validateUser = validateUser;
