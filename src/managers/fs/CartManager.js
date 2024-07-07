import fs from 'fs';
const PATH = './src/files/carts.json'

class CartManager {

  constructor() {
    this.path = PATH;
    this.init();
  }

  //init method
  async init() {

    //if the file doesn't exist: create (or try) file.
    if (!fs.existsSync(this.path)) {
      console.log("Cart's dont exist.. Creating carts.json")
      try {
        await fs.promises.writeFile(this.path, JSON.stringify([]))
      } catch (error) {
        process.exit(1);
      }
    } else {
      console.log("Carts found!");
    }
  }

  //showcarts method
  getCarts = async () => {
    const data = fs.readFileSync(this.path, 'utf-8')
    const parsedData = JSON.parse(data);
    return parsedData;
  }

  async updateCarts(carts) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    } catch (error) {
      throw new Error('Error al actualizar la lista de productos: ' + error.message);
    }
  }

  async addProduct(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(cart => cart.id === cartId);

      if (cartIndex !== -1) {
        const productIndex = carts[cartIndex].products.findIndex(product => product.product === productId);
        if (productIndex !== -1) {
          carts[cartIndex].products[productIndex].quantity++;
        } else {
          carts[cartIndex].products.push({ product: productId, quantity: 1 });
        }
        await this.updateCarts(carts);
        console.log(`Product ${productId} added to cart ${cartId}`);
      } else {
        console.log('Cart not found');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  }
}

export default CartManager;
