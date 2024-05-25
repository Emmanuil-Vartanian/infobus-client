// const { appError } = require("../../../helpers");
const { User } = require("../../models");

const logoutUserService = async (req) => {
  if (!req?.user?._id) { throw appError(401, "Not authorized"); }
  
  await User.findByIdAndUpdate(req?.user?._id, { token: '' }, { new: true });
};

module.exports = logoutUserService;
