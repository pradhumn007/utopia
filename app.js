const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const dirRoot = require("./common/utils/dirRoot.util");

dotenv.config();
const app = express();
const fileStrorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('destination 1',req.file, file);
    cb(null, "product_images");
    // console.log('destination 2',req.file, file);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
    // console.log('filename ',req.file, file);
  },
});
const filefilters = (req, file, cb) => {
  // console.log('file filters', file);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    // console.log('fiel success')
    cb(null, true);
  } else {
    // console.log('file error')
    cb(null, false);
  }
};

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("product_images"));
app.use(express.static("common_images"));
app.use(express.static(path.join(dirRoot, "common", "styles")));
app.use(
  multer({ storage: fileStrorage, fileFilter: filefilters }).single("imageUrl")
  // multer({dest: 'product_images'}).single('imageUrl')
);

const db = require("./common/utils/db");
const productRouter = require("./product/product.route");

app.use("/product", productRouter);

app.use("/", (req, res) => {
  res.send("server is running at 3000...");
});

db.sync().then(() => {
  console.log("Db connected");
  app.listen(3000, () => {
    console.log("server started");
  });
});
