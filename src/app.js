const EXPRESS = require("express");
const PATH = require("path");
const SESSION = require("express-session");
const COOKIE_PARSER = require("cookie-parser");
require("./conn");
const homeRoute = require("./routes/homeRoute");
const signinRoute = require("./routes/signinRoute");
const exploreRoute = require("./routes/exploreRoute");
const loginRoute = require("./routes/loginRoute");
const adminRoute = require("./routes/adminRoute");
const updateExploreRoute = require("./routes/updateExploreRoute");
const paymentRoute = require("./routes/paymentRoute");

const APP = EXPRESS();
const PORT = process.env.PORT || 8080;

const PUBLIC_PATH = PATH.join(__dirname, "../public");
const VIEWS_PATH = PATH.join(__dirname, "../views");

APP.set("views", VIEWS_PATH);
APP.set("view engine", "ejs");

APP.use(EXPRESS.static(PUBLIC_PATH));
APP.use(
  EXPRESS.urlencoded({
    extended: false,
  })
);
APP.use(
  SESSION({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
APP.use(COOKIE_PARSER());
APP.use("/", homeRoute);
APP.use("/", signinRoute);
APP.use("/", exploreRoute);
APP.use("/", loginRoute);
APP.use("/", adminRoute);
APP.use("/", updateExploreRoute);
APP.use("/", paymentRoute);

APP.listen(PORT, (err) => {
  if (err) {
    console.log("[-] Error while starting port");
    return err;
  } else {
    console.log(`[+] Server is listening`);
    console.log(`Visit the site: http://localhost:${PORT}/home`);
  }
});
