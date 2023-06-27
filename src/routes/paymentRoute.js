const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
// Todo: send order placed details to owner

let user_obj = {
  name: "Guest",
  email: "guest@gmail.com",
  phoneNum: "000-0000-000",
  dateOfBirth: "YYYY-MM-DD",
  loggedIn: false,
};

let user_obj_copy = user_obj;

ROUTER.get("/payment/:slug1/:slug2/:slug3/:slug4/:slug5", (req, res) => {
  const obj = {
    name: req.params.slug1,
    desc: req.params.slug2,
    price: req.params.slug3,
    phone: req.params.slug4,
    email: req.params.slug5,
  };
  if (req.session.user_data) {
    user_obj = req.session.user_data;
  } else {
    user_obj = user_obj_copy;
  }
  res.render("payment", {
    paymentObj: obj,
    user_obj: user_obj,
  });
  console.log(`[+] rendering payment page`);
});

ROUTER.post("/makePayment", (req, res) => {
  console.log(`[*] Got a payment post request`);
  console.log(req.body);
  if (
    req.body.addr.length > 0 &&
    req.body.postal_code.length > 0 &&
    req.body.city.length > 0 &&
    req.body.state.length > 0 &&
    req.body.country.length > 0
  ) {
    res.send(`
    <h1 style="font-family: sans-serif; color: green;">Order Placed</h1>
    <img src="/img/payment/smile.jpeg" style="width: 50px; height: auto;" alt="photo">
    <br>
    <p style="color: gray;">Email sent to the owner.</p>
    <span style="color: black; font-family: monospace;">Contact details: phone-${req.body.ownerPhone} email- ${req.body.ownerEmail}</span>`);
  } else {
    res.send(
      `[Invalid Location values] Location Error | Go back to <a href="/explore">Explore</a>`
    );
  }
});

module.exports = ROUTER;
