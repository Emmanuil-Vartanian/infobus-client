const authUser = require("./authUser");
const authUserWithNewUser = require("./authUserWithNewUser");
const checkAuthUser = require("./checkAuthUser");
const checkPermissions = require("./checkPermissionsCreateNewUser");

module.exports = {
  authUser,
  checkAuthUser,
  authUserWithNewUser,
  checkPermissions,
}