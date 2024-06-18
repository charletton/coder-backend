import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js'
const manager = new ProductManager()

const router = Router();

router.get('/', async (req,res) => {
  try {
    const products = await manager.getProducts();
    res.render('index', { products })
  } catch (err) {
    res.send('Cannot get products')
  }
})

router.get('/realtimeproducts', async (req,res) => {
  try {
    const products = await manager.getProducts();
    res.render('realtimeproducts', { products });
  } catch (error) {
    res.send('Cannot get products')
  }
});

export default router;
