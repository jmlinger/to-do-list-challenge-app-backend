const { StatusCodes } = require('http-status-codes');
const Service = require('../services/auth');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  const user = Service.auth.verifyToken(authorization);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  req.user = user;
  next();
};
