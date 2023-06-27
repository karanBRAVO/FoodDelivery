const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();

const GUEST_USER = {
  name: "Guest",
  email: "guest@gmail.com",
  phoneNum: "000-0000-000",
  dateOfBirth: "YYYY-MM-DD",
  loggedIn: false
};

ROUTER.get("/home", (req, res) => {
  if (req.session.user_data) {
    const data = req.session.user_data;
    res.render("index", { data: data });
  } else {
    res.render("index", { data: GUEST_USER });
  }
  console.log("[+] rendering home page");
});

module.exports = ROUTER;
