const { appError } = require("../helpers");

const checkPermissionsCreateNewUser = async (req, res, next) => {
  const rolesWithAccess  = ["superadmin", "consolidator"];
  const userRole = req?.user?.role;
  
  if (!rolesWithAccess.includes(userRole)) next(appError(401, "Permissions error"));
  if (!req?.body?.role) next(appError(400, "Bad request"));
  
  const newUserRole = req?.body?.role;

  switch (userRole) {
    case 'consolidator':
      if (!["dispatcher, carrier_manager", "agency_manager"].includes(newUserRole)) next(appError(401, "Bad request"));
      break;

    case 'superadmin':
      if (!["consolidator", "chief", "dispatcher", "carrier_manager", "agency_manager"].includes(newUserRole)) next(appError(401, "Bad request"));
      break;
  
    default:
      break;
  }

  next();
};

module.exports = checkPermissionsCreateNewUser;
