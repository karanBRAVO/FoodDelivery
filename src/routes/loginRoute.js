const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const BCRYPT = require("bcrypt");
const SESSION = require("express-session");
const SIGNIN_SCHEMA_MODEL = require("../schema_model/signIn_schema_model");

let msg = "Please enter valid credentials";

ROUTER.get("/login", (req, res) => {
  res.render("login", { msg: msg });
  console.log("[+] rendering login page");
});

ROUTER.post("/login/user", (req, res) => {
  console.log(`[*] Got a login post request`);
  let obj = req.body;
  let new_obj = {
    name: obj.username,
    email: obj.email,
    phoneNum: obj.phone,
    dateOfBirth: obj.dob,
  };

  SIGNIN_SCHEMA_MODEL.findOne(new_obj)
    .then((data) => {
      if (data != null) {
        if (BCRYPT.compareSync(obj.password, data.password)) {
          console.log(`[+] User exists`);
          new_obj["loggedIn"] = true;
          req.session.user_data = new_obj;
          req.session.save();
          res.redirect("/home");
        } else {
          console.log(`[-] Wrong password`);
          msg = `Invalid credentials entered`;
          res.redirect("/login");
        }
      } else {
        console.log(`[-] User do not exists`);
        msg = `Invalid credentials entered`;
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log("[-] Error while finding user");
      console.log(err);
      res.send(`Error`);
    });
});

ROUTER.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("[-] Error in logout");
      console.log(err);
      res.send("Cannot logout");
    } else {
      console.log(`[+] User logged out`);
      res.redirect("/home");
    }
  });
});

module.exports = ROUTER;
