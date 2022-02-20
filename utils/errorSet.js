const { StatusCodes } = require('http-status-codes');

const INVALID_ENTRIES = (message) => ({
    status: StatusCodes.BAD_REQUEST,
    message,
});

const ALREADY_REGISTERED = {
  status: StatusCodes.CONFLICT,
  message: 'User already registered',
};

const USER_NOT_EXIST = {
  status: StatusCodes.NOT_FOUND,
  message: 'User does not exist',
};


module.exports = {
  INVALID_ENTRIES,
  ALREADY_REGISTERED,
  USER_NOT_EXIST,
};
