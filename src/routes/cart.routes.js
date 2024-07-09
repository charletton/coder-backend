//imports
import { Router } from 'express';
import { CartService, ProductsService } from '../managers/index.js'
const router = Router();

//routes
router.get('/', async (req, res) => {
  const carts = await CartService.getCarts();
  res.send({ status: "succes", payload: carts })
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartService.getCart({ _id: req.params.cid });
    if (!cart) {
      res.status(404).json({ status: "error", error: 'Cart not found' });
    } else {
      res.send({ status: "succes", payload: cart });
    };
  } catch (error) {
    res.status(500).json({ status: "error", error: 'An error occurred while obtaining cart' });
  }
});

///add cart
router.post('/', async (req, res) => {
  try {
    await CartService.createCart();
    const carts = await CartService.getCarts();
    res.send({ status: "succes", payload: carts })
  } catch (error) {
    throw new Error('Error al cargar carrito: ' + error.message);
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    //pid nad cid
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await CartService.getCart({ _id: cartId });
    if (!cart) { return res.status(400).send({ status: "error", error: "cart doesn't exists" }); }

    const product = await ProductsService.getProduct({ _id: productId });
    if (!product) return res.status(400).send({ status: "error", error: "product doesn't exists" });

    const productIndex = cart.products.findIndex(item => item.product._id.toString() === product._id.toString());
    if (productIndex !== -1) {
      // Increase quantity of existing product
      cart.products[productIndex].quantity += 1;
    } else {
      // Add new product to cart with quantity 1
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    await CartService.update({ _id: cartId }, { $set: { products: cart.products } })
    return res.status(200).json({ message: 'Product added to cart successfully' });

  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'An error occurred while obtaining products/cart' });
  };
});

router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid

    //validate cart
    const cart = await CartService.getCart({ _id: cartId });
    if (!cart) { res.status(404).json({ status: "error", error: 'Cart not found' }); }

    //validate product
    const product = await ProductsService.getProduct({ _id: productId });
    if (!product) { res.status(404).json({ status: "error", error: 'Product not found' }); }
    console.log(product)

    //validate productIndex
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === product._id.toString());
    if (productIndex === -1) { return res.status(404).json({ status: "error", error: "Product not found in cart" }); }

    if (cart.products[productIndex].quantity > 1) { cart.products[productIndex].quantity -= 1; }
    else { cart.products.splice(productIndex, 1); }

    // update database
    await CartService.update({ _id: cartId }, { $set: { products: cart.products } });
    return res.status(200).json({ message: 'Product removed from cart successfully' });

  } catch (error) {
    res.status(500).json({ status: "error", error: 'An error occurred while obtaining cart' });
  }
});

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await CartService.getCart({ _id: req.params.cid });
    if (!cart) {
      res.status(404).json({ status: "error", error: 'Cart not found' });
    } else {
      await CartService.deleteCartById(cartId);
      res.send({ status: "succes" });
    };
  } catch (error) {
    res.status(500).json({ status: "error", error: 'An error occurred while obtaining cart' });
  }
});

router.put('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid

    const quantity = parseInt(req.body.quantity);
    console.log(quantity)
    if (quantity > 20 || quantity < 1) { res.status(400).json({ status: "error", error: "incorrect amount" }); }

    //validate cart
    const cart = await CartService.getCart({ _id: cartId });
    if (!cart) { res.status(404).json({ status: "error", error: 'Cart not found' }); }

    //validate product
    const product = await ProductsService.getProduct({ _id: productId });
    if (!product) { res.status(404).json({ status: "error", error: 'Product not found' }); }
    console.log(product)

    //validate productIndex
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === product._id.toString());
    if (productIndex === -1) { return res.status(404).json({ status: "error", error: "Product not found in cart" }); }

    // update database
    cart.products[productIndex].quantity = quantity;
    await CartService.update({ _id: cartId }, { $set: { products: cart.products } });
    return res.status(200).json({ message: "amount changed succefully" });

  } catch (error) {
    res.status(500).json({ status: "error", error: 'An error occurred while obtaining cart' });
  }
});


export default router;
