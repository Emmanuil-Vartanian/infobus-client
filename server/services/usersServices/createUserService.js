const jwt = require("jsonwebtoken");

const { appError, setHashPassword, } = require("../../helpers");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const createUserService = async (req) => {
  const { email, password, role, name, user_data } = req.body;

  // search user in DB
  const user = await User.findOne({ email });
  if (user) throw appError(409, `Email in use`);
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
    user_data: user_data,
    creator_id: req.user?.id,
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
  // update user in db with new token
  const user_payload = {
    pokemonInfo: {
      login: email,
      password: password,
    },
  };
  const user_c = jwt.sign(user_payload, SECRET_KEY, { expiresIn: "48h" });
  // update user in db with new token
  let objectToUpd = {
    token,
    user_c,
    history: { created: { ...newUser?.history?.created, by_id: req.user?.id } },
  }
  
  if (req.user?.role === "consolidator") { 
    objectToUpd.consolidator_id = req.user?.id;
    objectToUpd.consolidator_name = req.user?.name;
  }
  if (role === "consolidator") { 
    objectToUpd.consolidator_id = newUser.id;
    objectToUpd.consolidator_name = newUser.name;
  }

  const newUserWithToken = await User.findByIdAndUpdate( newUser._id, objectToUpd, { new: true } );
  // set user data to frontend
  // const userDataToFrontend = setUserObjectData(newUserWithToken);

  return newUserWithToken;
};

module.exports = createUserService;
