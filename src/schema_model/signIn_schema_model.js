console.log(`[*] creating Sign in Schema_Model`);

const MONGOOSE = require("mongoose");

const SIGNIN_SCHEMA = new MONGOOSE.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNum: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  password: { type: String, required: true },
});

const SIGNIN_MODEL = new MONGOOSE.model("user", SIGNIN_SCHEMA);

module.exports = SIGNIN_MODEL;
