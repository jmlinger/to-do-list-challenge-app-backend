const { StatusCodes } = require('http-status-codes');

const INVALID_ENTRIES = (message) => ({
    status: StatusCodes.BAD_REQUEST,
    message,
});

const INCORRECT_LOGIN = {
  status: StatusCodes.UNAUTHORIZED,
  message: 'Incorrect username or password',
};

module.exports = {
  INVALID_ENTRIES,
  INCORRECT_LOGIN,
};
