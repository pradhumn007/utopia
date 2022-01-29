const ProductModel = require("../schema/product.schema");

exports.getProductById = async (productId) => {
  let allProducts = await ProductModel.findAll({ where: { pid: productId } });
  allProducts = allProducts.map((product) => (product = product.dataValues));
  return allProducts;
};
