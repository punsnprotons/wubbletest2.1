const StoreKnex = require("../services").get("knex1");

const checkEmailDuplication = async (email) => {
  try {
    const getCustomer = await StoreKnex.knex("customer")
      .where("email", email)
      .first();

    const getUser = await StoreKnex.knex("user").where("email", email).first();

    if (getUser || getCustomer) {
      throw new Error("Email already registered.");
    }

    return true;
  } catch (e) {
    return false;
  }
};

const isUserEmailExists = async (email) => {
  try {
    const isEmailEsists = await StoreKnex.knex("user")
      .where("email", email)
      .first();
    if (!isEmailEsists) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

const saveResetPasswordToken = async (email, token) => {
  let time = new Date();
  try {
    await StoreKnex.knex("authentication_method")
      .update({
        passwordResetToken: token,
        updatedAt: time,
      })
      .where("identifier", email);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  checkEmailDuplication,
  isUserEmailExists,
  saveResetPasswordToken,
};
