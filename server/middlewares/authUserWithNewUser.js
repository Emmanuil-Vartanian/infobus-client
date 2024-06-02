const { User } = require("../models");
const { createUserService } = require("../services");

const authUserWithNewUser = async (req, res, next) => {
  const { user_data } = req.body;
  const newReq = {
    ...req,
    body: {
      email: user_data?.contact_email,
      password: user_data?.contact_email,
      role: "user",
      name: user_data?.user_first_name,
      user_data,
    },
  };
  try {
    let user = await User.findOne({ email: user_data?.contact_email });
    if (!user) user = await createUserService(newReq);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authUserWithNewUser;
