import productModel from "./models/products.model.js";

export default class ProductsManager {
     createProduct(product) {
        return productModel.create(product)
     }

     getProduct(opts = {}) {
        return productModel.findOne(opts)
     }
    
     getProducts(opts = {}) {
        return productModel.find(opts)
     }

};
