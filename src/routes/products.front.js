import { Router } from 'express';
import { ProductsService } from '../managers/index.js';

const router = Router();

router.get('/', async (req, res) => {
  res.render('index')
});


router.get('/api/', (req, res) => {
  res.render('api');
})

router.get('/addproduct', (req, res) => {
  res.render('addproduct')
});

router.get('/products', async (req, res) => {
  try {
    const products = await ProductsService.getProducts();
    res.render('realtimeproducts', { products });
  } catch (error) {
    res.send('Cannot get products')
  }
});

export default router;
