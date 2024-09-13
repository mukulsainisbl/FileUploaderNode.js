const express = require("express");
const app = express();
const PORT = 8080;
const multer = require("multer");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config();
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/profile", upload.single("avatar"), async function (req, res, next) {
  // Configuration
  cloudinary.config({
    cloud_name: "dmlaxskfh",
    api_key: "241737163939918",
    api_secret: process.env.SECRET_KEY, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path)
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult.url);
  fs.unlinkSync(req.file.path);

  res.send("File Upload");
});

app.listen(PORT, () => {
  console.log(`Server is listen on ${PORT}`);
});
