const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { comparePassword, appError, setUserObjectData } = require("../../helpers");
const { SECRET_KEY } = process.env;

const loginUserService = async (req) => {
  const { email, password } = req.body;
  // search user in DB
  const user = await User.findOne({ email });
  if (!user) throw appError(401, "Email or password is wrong");
  // compare user password with password in DB
  const comparedPassword = await comparePassword(password, user.password);
  if (!comparedPassword) throw appError(401, "Email or password is wrong");
  // create new token
  // const payload = { id: user._id, role: user.role };

  const payload = { 
    userInfo: {
      id: user._id, 
      role: user.role,
      permissions: user.permissions,
    }
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  // update user in db with new token
  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  // set user data to frontend
  const dataToFrontEnd = {
    name: userWithToken?.name,
    role: user.role,
    token: userWithToken?.token,
  };

  return dataToFrontEnd;
};

module.exports = loginUserService;