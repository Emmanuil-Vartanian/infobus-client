const jwt = require("jsonwebtoken");

const { appError, setHashPassword } = require("../../helpers");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const updateUsersService = async (req) => {
  const dataList = req.body;

  const updatedDataList = await Promise.all(
    dataList?.map(async (dataItem) => {
      const { user_id, email, password, active } = dataItem ?? {}
      const hashPassword = await setHashPassword(password);

      const user_payload = {
        pokemonInfo: {
          login: email,
          password: password,
        },
      };
      const user_c = jwt.sign(user_payload, SECRET_KEY, { expiresIn: "48h" });

      let objectToUpd = {
        password: hashPassword, 
        user_c,
        active, 
      }

      const updatedDataItem = User.findByIdAndUpdate(user_id, objectToUpd, { new: true } );
      return updatedDataItem;
    })
  )

  return updatedDataList
};

module.exports = updateUsersService;
