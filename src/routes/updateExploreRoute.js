const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const EXPLORE_MODEL = require("../schema_model/explore_schema_model");
// Todo: Send email verfication mail

ROUTER.get("/updateExplore", (req, res) => {
  EXPLORE_MODEL.find()
    .then((data) => {
      res.render("updateExplore", { exploreData: data });
    })
    .catch((err) => {
      console.log(`[-] Error while fetching data`);
      console.log(err);
    });
  console.log(`[+] rendering update explore page`);
});

ROUTER.post("/admin/update-data/:slug", (req, res) => {
  console.log(`[*] Got a update request`);
  
  EXPLORE_MODEL.updateOne(
    { _id: req.params.slug },
    {
      $set: {
        name: req.body.updatedName,
        desc: req.body.updatedDesc,
        price: req.body.updatedPrice,
        status: req.body.status,
        email: req.params.updatedOwnerEmail,
        phone: req.params.updatedOwnerPhone,
      },
    }
  )
    .then((data) => {
      console.log(`[+] Updated data `, data);
      res.send(`
      <h1 style="color: green; font-family: sans-serif; text-transform: capitalize; font-weight: 900; font-size: 1.5em;">Updated</h1>
      <br>
      <h4>Go back to update explore page</h4>
      <a href="/updateExplore" style="color: blue; font-family: serif; text-transform: capitalize;">Update Explore</a>`);
    })
    .catch((err) => {
      console.log(`[-] Error while updating data`);
      console.log(err);
    });
});

ROUTER.get("/delete-data-from-database/:slug1", (req, res) => {
  console.log(`[*] Got a delete request`);
  EXPLORE_MODEL.deleteOne({ _id: req.params.slug1 })
    .then((data) => {
      console.log(`[+] Deleted`, data);
      res.send(`
      <h1 style="color: green; font-family: sans-serif; text-transform: capitalize; font-weight: 900; font-size: 1.5em;">Deleted</h1>
      <br>
      <h4>Go back to update explore page</h4>
      <a href="/updateExplore" style="color: blue; font-family: serif; text-transform: capitalize;">Update Explore</a>`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ROUTER;
