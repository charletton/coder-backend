import ProductsManager from "./mongo/productsManager.js";
import CartManager from './mongo/cartManager.js'
export const ProductsService = new ProductsManager();
export const CartService = new CartManager();