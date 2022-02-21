const { StatusCodes } = require('http-status-codes');
const UsersModel = require('../../models/users');
const auth = require('../auth');
const { INCORRECT_LOGIN, INVALID_ENTRIES } = require('../../utils/errorSet');
const { userValidation } = require('./validations');

module.exports = async (user) => {
  const validationError = userValidation(user).error;
  
  if (validationError) {
    return INVALID_ENTRIES(validationError.message);
  }
  
  const { email, password } = user;

  const findUserByEmail = await UsersModel.findOne({ email });
  
  if (!findUserByEmail) {
    const newUser = await UsersModel.create(user);

    const { _id, createdAt } = newUser;

    const newUserWithoutPassword = { _id, email, createdAt };
    const token = auth.genToken(newUserWithoutPassword);
  
    return { status: StatusCodes.OK, message: token };
  }
  
  if (findUserByEmail.password !== password) {
    return INCORRECT_LOGIN;
  }

  const { _id, createdAt } = findUserByEmail;

  const userWithoutPassword = { _id, email, createdAt };
  const token = auth.genToken(userWithoutPassword);

  return { status: StatusCodes.OK, message: token };
};
