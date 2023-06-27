const EXPRESS = require("express");
const FS = require("fs");
const PATH = require("path");
const ROUTER = EXPRESS.Router();
const EXPLORE_MODEL = require("../schema_model/explore_schema_model");
const MULTER = require("multer");

var STORAGE = MULTER.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH.join(__dirname, "../../public/img/explore"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + PATH.extname(file.originalname)
    );
  },
});
const UPLOAD = MULTER({ storage: STORAGE });

ROUTER.get("/admin", (req, res) => {
  res.render("admin");
  console.log("[+] rendering admin page");
});

let adminEmail;
let adminPhone;
let fakeEmail = `testEmail@gmail.com`;
let fakePhone = `0000000000`;

ROUTER.post("/admin/add-data", UPLOAD.single("upimg"), async (req, res) => {
  console.log("[*] Got a admin post request");

  if (req.session.adminData) {
    adminEmail = req.session.adminData;
    adminPhone = req.session.adminPhone;
  } else {
    adminEmail = fakeEmail;
    adminPhone = fakePhone;
    console.log(`[-] Added test email and phone to contact details for owner`);
  }

  const uploadData = new EXPLORE_MODEL({
    name: req.body.imgName,
    desc: req.body.imgDesc,
    imgSrc: {
      data: FS.readFileSync(
        PATH.join(__dirname, "../../public/img/explore", req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
    price: req.body.price,
    status: req.body.status,
    email: adminEmail,
    phone: adminPhone,
  });
  await uploadData.save();
  res.send(`
  <h1 style="font-family: sans-serif; color: green; font-weight: 900; font-size: 1.5em">Data uploaded</h1>
  <br>
  <h4 style="color: black; font-size: 1.2em;">Go Back to Admin Dashboard</h4>
  <br>
  <a href="/admin" style="color: blue; font-size: 1em; font-family: serif;">Admin Dashboard</a>`);
});

module.exports = ROUTER;
