const MONGOOSE = require("mongoose");

const EXPLORE_SCHEMA = new MONGOOSE.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imgSrc: {
    data: Buffer,
    contentType: String,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
});

const EXPLORE_MODEL = new MONGOOSE.model("explore", EXPLORE_SCHEMA);

module.exports = EXPLORE_MODEL;
