import { Router } from 'express';
import { ProductsService } from '../managers/index.js';

const router = Router();

router.get('/', async (req,res) => {
  try {
    const products = await ProductsService.getProducts();
    res.render('index', {
      status: 'success',
      payload: products,
      totalPages: '',
      prevPage: '',
      nextPage: '',
      page: '',
      hasPrevPage: '',
      hasNextPage: '',
      prevLink: '',
      nextLink: ''
    });
  } catch (err) {
    res.send('Cannot get products')
  }
})

router.get('/api/', (req,res) => {
  res.render('api');
})

router.get('/addproduct', (req, res) => {
  res.render('addproduct')
});

router.get('/realtimeproducts', async (req,res) => {
  try {
    const products = await ProductsService.getProducts();
    res.render('realtimeproducts', { products });
  } catch (error) {
    res.send('Cannot get products')
  }
});

export default router;
