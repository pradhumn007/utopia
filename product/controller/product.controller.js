const path = require("path");
const dirRoot = require("../../common/utils/dirRoot.util");
const Product = require("../models/product.model");
const ProductModel = require("../schema/product.schema");
const ProductService = require("../services/product.service");

// const products = [];

exports.showNewProductPage = async (req, res, next) => {
  res.render(path.join(dirRoot, "product", "views", "new-product.ejs"));
};

exports.editProductById = async (req, res, next) => {
  const { pid } = req.query;
  const product = await ProductService.getProductById(pid);
  console.log(product);
  res.render(path.join(dirRoot, "product", "views", "edit-product.ejs"), {
    product: product[0],
  });
};

exports.updateProduct = async (req, res, next) => {
  const { name, price, description, category, pid } = req.body;
  const { filename: imageUrl } = req.file ? req.file : {};
  await ProductModel.update(
    { name, price, description, category, imageUrl },
    {
      where: {
        pid: pid,
      },
    }
  );
  res.redirect("/product/list");
};

exports.deleteProduct = async(req, res, next) => {
  const {pid} = req.body;
  await ProductModel.destroy({
    where: {
      pid: pid,
    },
  });
  res.redirect("/product/list");
};

exports.addProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;
  const { filename: imageUrl } = req.file;
  console.log("controller ", req.body, req.file);
  const productObj = new Product(name, imageUrl, price, description, category);
  await ProductModel.create(productObj);
  res.redirect("/product/list");
};

exports.getAllProducts = async (req, res, next) => {
  const { id } = req.query;

  if (id) {
    this.getProductById(req, res, next);
    return;
  }
  let allProducts = await ProductModel.findAll({});
  allProducts = allProducts.map((product) => (product = product.dataValues));
  res.render(path.join(dirRoot, "product", "views", "product-list.ejs"), {
    products: allProducts,
  });
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.query;
  const product = await ProductService.getProductById(id);
  console.log(product);
  res.render(path.join(dirRoot, "product", "views", "product-list.ejs"), {
    products: product,
  });
};
