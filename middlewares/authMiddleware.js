const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    if (!token) {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || token !== user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'Not authorized';
    next(error);
  }
};

module.exports = authMiddleware;
