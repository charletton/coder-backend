import cartModel from "./models/cart.model.js";

export default class cartManager {
   createCart() {
      return cartModel.create({products: []})
   }

   getCart(opts) {
      return cartModel.findOne(opts).populate('products.product');
   }

   getCarts(opts = {}) {
      return cartModel.find(opts);
   }

   deleteCartById(cartId){
      return cartModel.findByIdAndDelete(cartId);
   }

   update(id, set) {
      return cartModel.updateOne(id, set);
   }
};
