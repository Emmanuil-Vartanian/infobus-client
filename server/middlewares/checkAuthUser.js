const jwt = require("jsonwebtoken");

const { appError } = require("../helpers");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const checkAuthUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  let user = null;

  if (bearer === "Bearer" && token !== undefined) {
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
  }

  req.user = user;
  next();
};

module.exports = checkAuthUser;
