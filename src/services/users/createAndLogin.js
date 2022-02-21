const { StatusCodes } = require('http-status-codes');
const UsersModel = require('../../models/users');
const { auth } = require('../auth');
const { INCORRECT_LOGIN, INVALID_ENTRIES } = require('../../utils/errorSet');
const { userValidation } = require('./validations');

module.exports = async (user) => {
  const validationError = userValidation(user).error;
  if (validationError) {
    return INVALID_ENTRIES(validationError.message);
  }
  
  const findUserByEmail = await UsersModel.findOne({ email });
  
  if (!findUserByEmail) {
    await UsersModel.create(user);
  }
  
  const { email, password } = user;
  if (findUserByEmail.password !== password) {
    return INCORRECT_LOGIN;
  }

  const { _id } = findUserByEmail;

  const userWithoutPassword = { _id, email };

  const token = auth.genToken(userWithoutPassword);

  return { status: StatusCodes.OK, message: token };
};