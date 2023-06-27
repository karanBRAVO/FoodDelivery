const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const VALIDATOR = require("email-validator");
const BCRYPT = require("bcrypt");
const SIGNIN_SCHEMA_MODEL = require("../schema_model/signIn_schema_model");
// Todo: send mail using nodemailer
const NODE_MAILER = require("nodemailer");

ROUTER.get("/signin", (req, res) => {
  res.render("signIn");
  console.log("[+] rendering sign in page");
});

ROUTER.post("/signin/user", (req, res) => {
  console.log(`[*] Got a sign in post request`);

  let user_name = req.body.username;
  let user_email = req.body.email;
  let phone_number = req.body.phone;
  let date_of_birth = req.body.dob;
  let user_password = req.body.password;
  if (
    validateUserCredentials(
      user_name,
      user_email,
      phone_number,
      date_of_birth,
      user_password
    )
  ) {
    SIGNIN_SCHEMA_MODEL.find({
      $or: [
        { name: user_name },
        { email: user_email },
        { phoneNum: phone_number },
      ],
    })
      .then(async (data) => {
        if (data.length == 0) {
          const addDataToDb = new SIGNIN_SCHEMA_MODEL({
            name: user_name,
            email: user_email,
            phoneNum: phone_number,
            dateOfBirth: date_of_birth,
            password: BCRYPT.hashSync(user_password, 10),
          });
          await addDataToDb.save();
          console.log(`[+] User signed in`);
          res.redirect("/login");
        } else {
          console.log("[-] User already exists");
          res.redirect("/signin");
        }
      })
      .catch((err) => {
        if (err) {
          console.log(`[-] Error while fetching data`);
          console.log(err);
        }
      });
  } else {
    console.log(`[-] Invalid values are provided`);
    res.redirect("/signin");
  }
});

function validateUserCredentials(name, email, phone, dob, password) {
  if (
    name.length > 5 &&
    VALIDATOR.validate(email) &&
    phone.length > 5 &&
    dob.length > 0 &&
    password.length > 0
  ) {
    return true;
  }
  return false;
}

module.exports = ROUTER;
