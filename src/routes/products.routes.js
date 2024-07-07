//imports
import fs from 'fs';
import {Router} from 'express';
const router = Router();

//Manager
import { ProductsService } from '../managers/index.js'

router.get('/', async (req, res) => {
  console.log('User conectado a productos');
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
    const productId = parseInt(req.params.pid);
    const products = await ProductsService.getProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
      console.log(`Showing product id: ${productId}!`);
      res.send(product); // Solo envía una vez la respuesta
    } else {
      res.status(404).json({ error: 'Product not found' }); // En caso de que el producto no se encuentre
    }
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'An error occurred while obtaining product' });
  }
});

//add product
router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category } = req.body;
  if (!title || !description || !code || !price || !status || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {
    await ProductsService.createProduct({ title, description, code, price, status, stock, category });
    res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category } = req.body;

    // Verify pid is valid
    if (!productId) {
      return res.status(400).json({ error: 'Se requiere un ID de producto válido en la ruta.' });
    }

    const isValidProductId = await ProductsService.validateProductId(productId);
    if (!isValidProductId) {
      return res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}.` });
    }

    // code check
    const isCodeInUse = await ProductsService.isCodeInUse(productId, code);
    if (isCodeInUse) {
      return res.status(400).json({ error: `El código ${code} ya está en uso.` });
    }

    // getting current products
    let products = await ProductsService.getProducts();

    // finding product index
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}.` });
    }

    // updating
    products[productIndex] = {
      id: productId,
      title,
      description,
      code,
      price,
      status,
      stock,
      category
    };


    // updating products
    await ProductsService.updateProducts(products);

    res.status(200).json({ message: `Producto con ID ${productId} actualizado correctamente` });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router delete
router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  // Verifying ID
  if (!productId) {
    return res.status(400).json({ error: 'Se requiere un ID de producto válido en la ruta.' });
  }

  try {
    // Delete product using ProductsService method
    await ProductsService.deleteProduct(productId);
    res.status(200).json({ message: `Product with id ${productId} succefully deleted` });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

export default router;
