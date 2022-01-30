const express = require("express");
const {
  addProduct,
  getAllProducts,
  showNewProductPage,
  editProductById,
  updateProduct,
  deleteProduct,
} = require("./controller/product.controller");
const {
  validateImageFieldOnAdd,
  validateImageFieldOnEdit,
  validateTextFields,
} = require("./middleware/product.middleware");
const router = express.Router();

router.get("/new", showNewProductPage);

router.get("/edit", editProductById);

router.post('/delete', deleteProduct);

router.get("/list", getAllProducts);

router.post("/add", validateTextFields, validateImageFieldOnAdd, addProduct);

router.post(
  "/update",
  validateTextFields,
  validateImageFieldOnEdit,
  updateProduct
);

module.exports = router;
