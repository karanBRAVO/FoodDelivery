console.log("[*] Connecting to database");

const MONGOOSE = require("mongoose");

const URL = "mongodb://0.0.0.0:27017/FoodDelivery";

MONGOOSE.connect(URL)
  .then((value) => {
    console.log("[+] Connected to database");
  })
  .catch((error) => {
    console.log("[-] Error while connecting to database");
    console.log(error);
  });
