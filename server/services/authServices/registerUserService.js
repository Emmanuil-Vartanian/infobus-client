const jwt = require("jsonwebtoken");

const { appError, setHashPassword } = require("../../helpers");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const registerUserService = async (req) => {
  const { email, password, role, name } = req.body;
  // search user in DB
  const user = await User.findOne({ email });
  if (user) throw appError(409, "Email in use");
  // get prev user_number_id
  const prevUser = await User.aggregate([
    { $match: { user_number_id: { $exists: true } } },
    { $sort: { user_number_id: -1 } },
    { $limit: 1 },
  ]);
  const prevUserNumberId = prevUser[0]?.user_number_id;
  const user_number_id = prevUserNumberId ? prevUserNumberId + 1 : 1;
  // set hash Password
  const hashPassword = await setHashPassword(password);
  // create new user
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
    permissions: [`${role}`],
    user_number_id,
  });
  // create new token
  const payload = {
    pokemonInfo: {
      id: newUser._id,
      role: newUser.role,
      permissions: newUser.permissions,
    },
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  // create new token for secure userInfo
  const user_payload = {
    pokemonInfo: {
      login: email,
      password: password,
    },
  };
  const user_c = jwt.sign(user_payload, SECRET_KEY, { expiresIn: "48h" });
  // update user in db with new token
  const newUserWithToken = await User.findByIdAndUpdate(
    newUser._id,
    { token, user_c },
    { new: true }
  );
  // set user data to frontend
  const dataToFrontEnd = {
    name: newUserWithToken?.name,
    token: newUserWithToken?.token,
  }

  return dataToFrontEnd;
};

module.exports = registerUserService;
