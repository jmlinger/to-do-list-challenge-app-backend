const UsersServices = require('../../services/users');

module.exports = async (req, res, _next) => {
  const user = req.body;

  const result = await UsersServices.createAndLogin(user);

  res.status(result.status)
    .json(typeof result.message === 'object'
      ? { user: result.message }
      : { message: result.message });
};
