const jwt = require("jsonwebtoken");

const { appError } = require("../helpers");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const authUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(appError(401, "Not authorized"));

  try {
    const { userInfo } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(userInfo?.id);

    if (!user || !user.token || user.token !== token) {
      next(appError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(appError(401, "Not authorized"));
  }
};

module.exports = authUser;
