const UserRepo = require("../lib/UserRepository");
const { matchPassword } = require("../utils/match-password");
const { getSignedJwtToken } = require("../utils/getJwtToken");
const {
  UserSignupDTO,
  validateUserSignupDTO,
} = require("../Models/User/UserSignupDTO");
const {
  SUCCESS,
  INVALID_CREDENTIALS,
  BAD_REQUEST,
  NOT_FOUND,
  INTENAL_SERVER_ERROR,
} = require("../utils/constants");
const { validateUser } = require("../Models/User/User");
const bcrypt = require("bcryptjs");

module.exports.addUser = async function (data) {
  const validated = validateUser(data);

  if (validated.error?.details.length > 0) {
    return {
      statusCode: 400,
      data: null,
      message: validated?.error?.message,
    };
  }
  const password = data.password;
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(password, salt);
  data.salt = salt;
  const insertOneResponse = await UserRepo.addItem(data);
  return {
    statusCode: 200,
    data: insertOneResponse,
    message: SUCCESS,
  };
};

module.exports.signUp = async function (user) {
  if (!user) {
    return {
      statusCode: 400,
      data: null,
      message: BAD_REQUEST,
    };

    const validation = validateUserSignupDTO(user);

    const password = user.password;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.salt = salt;

    const insertOneResponse = await signInAndSignUpRepo.addItem(user);
  }
};

module.exports.signIn = async function (data) {
  const { email, password } = data;

  if (!email || !password) {
    return {
      statusCode: 400,
      data: null,
      message: BAD_REQUEST,
    };
  }

  const user = await UserRepo.findUserByEmail(email);

  if (user.length === 0) {
    return {
      statusCode: 404,
      data: null,
      message: NOT_FOUND,
    };
  }

  const validPassword = await matchPassword(password, user[0].password);

  if (!validPassword) {
    return {
      statusCode: 200,
      data: null,
      message: INVALID_CREDENTIALS,
    };
  }

  return {
    statusCode: 200,
    data: getSignedJwtToken(user[0]),
    message: SUCCESS,
  };
};

module.exports.findUserById = async function (id) {
  try {
    if (!id) {
      return {
        statusCode: 400,
        data: null,
        message: BAD_REQUEST,
      };
    }
    const user = await UserRepo.findItemById(id);

    if (user === null) {
      return {
        statusCode: 404,
        data: null,
        message: NOT_FOUND,
      };
    }
    return {
      statusCode: 200,
      data: user,
      message: SUCCESS,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: null,
      message: INTENAL_SERVER_ERROR,
    };
  }
};

module.exports.updateEmployee = async function (newData) {
  if (!newData) {
    return {
      statusCode: 400,
      data: null,
      message: BAD_REQUEST,
    };
  }
  const user = await UserRepo.findItemById(newData?.id);
  if (!user) {
    return {
      statusCode: 404,
      data: null,
      message: NOT_FOUND,
    };
  }
  const updatedUser = await UserRepo.updateItemById(newData?.id, newData);
  return {
    statusCode: 200,
    data: updatedUser,
    message: SUCCESS,
  };
};
