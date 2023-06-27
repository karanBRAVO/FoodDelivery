const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const EXPLORE_MODEL = require("../schema_model/explore_schema_model");

let new_obj = {
  name: "Guest",
  email: "guest@gmail.com",
  phoneNum: "000-0000-000",
  dateOfBirth: "YYYY-MM-DD",
  loggedIn: false
};

let old_obj = new_obj;

ROUTER.get("/explore", (req, res) => {
  if (req.session.user_data) {
    new_obj = req.session.user_data;
  }
  else {
    new_obj = old_obj;
  }
  EXPLORE_MODEL.find()
    .then((data) => {
      res.render("explore", { foodData: data, user: new_obj });
    })
    .catch((err) => {
      console.log(`[-] Error while fetching data`);
      console.log(err);
    });
  console.log("[+] rendering explore page");
});

module.exports = ROUTER;
