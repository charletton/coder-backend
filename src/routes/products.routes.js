//imports
import fs from 'fs';
import { Router } from 'express';
const router = Router();

//Manager
import { ProductsService } from '../managers/index.js'

router.get('/', async (req, res) => {
  try {
    const products = await ProductsService.getProducts();
    res.send(products);
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'An error occurred while obtaining products' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const products = await ProductsService.getProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
      console.log(`Showing product id: ${productId}!`);
      res.send(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'An error occurred while obtaining product' });
  }
});

//add product
router.post('/', async (req, res) => {
  const product = req.body;
  if (!product.title ||
    !product.code ||
    !product.price ||
    !product.stock ||
    !product.category) { return res.status(400).json({ error: 'Todos los campos son requeridos.' }); }

  const newProduct = {
    title: product.title,
    description: product.description,
    code: product.code,
    status: true,
    price: parseInt(product.price),
    stock: parseInt(product.stock),
    category: product.category,
  }

  try {
    await ProductsService.createProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !code || !price || !stock || !category) {return res.status(400).json({ error: 'Todos los campos son requeridos.' });}

    const parsedPrice = parseInt(price);
    const parsedStock = parseInt(stock);
    if (isNaN(parsedPrice) || isNaN(parsedStock)) { return res.status(400).json({ error: 'Price or stock not valids.' }); }

    const products = await ProductsService.getProducts();
    const isCodeInUse = products.some(p => p.code === code && p.id !== productId);
    if (isCodeInUse) { return res.status(400).json({ status: "error", error: `${code}, code in use` }); }

    const updatedProduct = {
      title : title,
      description : description,
      code : code,
      price : price,
      stock : stock,
      category : category,
    }

    await ProductsService.updateProduct(productId, updatedProduct);
    res.status(200).json({ message: `Producto con ID ${productId} actualizado correctamente` });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// router delete
router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;

  // Verifying ID
  if (!productId) {
    return res.status(400).json({ error: 'Se requiere un ID de producto válido en la ruta.' });
  }

  try {
    // Delete product using ProductsService method
    await ProductsService.deleteProductById(productId);
    res.status(200).json({ message: `Product with id ${productId} succefully deleted` });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

export default router;
