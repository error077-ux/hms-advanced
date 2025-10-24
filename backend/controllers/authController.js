const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await authService.registerUser(userData);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};