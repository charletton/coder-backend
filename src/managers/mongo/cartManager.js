import cartModel from "./models/cart.model.js";

export default class cartManager {
     createCart(product) {
        return cartModel.create(product)
     }

     getCart(opts = {}) {
        return cartModel.findOne(opts)
     }
    
     getCarts(opts = {}) {
        return cartModel.find(opts)
     }
};
