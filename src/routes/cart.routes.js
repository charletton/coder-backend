import {Router} from 'express';
const router = Router();

//d:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
//products: Array que contendrá objetos que representen cada producto


//post
router.post('/', (req, res) => {
  const cartProducts = req.body.products
})

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
})


router.put('/:pid'), (req, res) => {
}


router.get('/:pid', (req, res) => {
})

export default router;
