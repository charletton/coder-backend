import productModel from "./models/products.model.js";

export default class ProductsManager {
   createProduct(product) {
      return productModel.create(product)
   }

   deleteProductById(productId) {
      return productModel.findByIdAndDelete(productId);
   }

   getProduct(opts = {}) {
      return productModel.findOne(opts)
   }

   getProducts(opts = {}) {
      return productModel.find(opts)
   }

   updateProduct(productId, updatedProduct) {
      return productModel.findByIdAndUpdate(productId, updatedProduct, { new: true });
   }

};
