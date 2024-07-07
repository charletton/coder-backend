//imports
import fs from 'fs';
import {Router} from 'express';

//router = /api/cart
const router = Router();

//manager
import {CartService, ProductsService } from '../managers/index.js'

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const carts = await CartService.getCarts();
    const cart = carts.find(c => c.id === cartId);



    if (cart) {
      console.log(`Showing cart id: ${cartId}!`);
      res.send(cart); // send cart
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'An error occurred while obtaining cart' });
  }
});

///add cart
router.post('/', async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    let newId
    if (carts.length === 0) {
      newId = 1;
    } else {
      newId = carts[carts.length -1].id+1;
    }
    const newCart = {
      id : newId,
      products : []
    }
    carts.push(newCart);
    await CartService.updateCarts(carts);
    res.status(201).json(newCart);
  } catch (error) {
    throw new Error('Error al cargar carrito ' + error.message);
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const carts = await CartService.getCarts();
    const cart = carts.find(c => c.id === cartId);

    const productId = parseInt(req.params.pid);
    const products = await ProductsService.getProducts();
    const product = products.find(p => p.id === productId);

    console.log(product)
    console.log(cart)

    if (product && cart) {
      await CartService.addProduct(cartId, productId);
      return res.status(200).json({ message: 'Product added to cart successfully' });
    } else {
      res.status(500).json({ error: "Product or cart dont exis'ts" });
    }

  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'An error occurred while obtaining products/cart' });
  }

});

export default router;
