const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const config = require("./config.js");
const app = express();

var options = {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.url, options, function (err) {
  console.log(err);
});
const inforSchema = new mongoose.Schema({
  user_name: String,
  password: String,
  front_certificate: String,
  back_certificate: String,
  phone: String,
  email: String,
});

const inforModel = mongoose.model("information", inforSchema);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../asset"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "/images" + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

app.post("/", upload.array("certificate", 2), function (req, res, next) {
  const {
    user_name,
    password,
    front_certificate,
    back_certificate,
    phone,
    email,
  } = req.body;
  inforModel.create({
    user_name,
    password,
    front_certificate: req.files[0].filename,
    back_certificate: req.files[1].filename,
    phone: phone.toString(),
    email,
  });
  res.json({ message: "KYC successfully !" });
});

app.get("/", async function (req, res, next) {
  const data = await inforModel.find({});
  res.json({ data });
});

app.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const data = await inforModel.findById(id);
  res.json({ data });
});

app.listen(3000, () => console.log("App is on 3000"));
