import {Router} from 'express';

//inicializar router
const router = Router();

//listado de productos
const products = [
  {
    id: 1,
    title: "Boox Air 2",
    description: "1872 x 1404 e-ink device",
    code: "12094",
    price: 349.99,
    status: true,
    stock: 4,
    category: "eReader",
  },
  {
    id: 2,
    title: "Boox Air 3",
    description: "1872 x 1404 e-ink device",
    code: "64 GB",
    price: 449.99,
    status: true,
    stock: 4,
    category: "eReader",
  },
  {
    id: 3,
    title: "Boox Palma",
    description: "small e-ink device",
    code: "23910",
    price: 249.99,
    status: true,
    stock: 3,
    category: "eReader",
  },
  {
    id: 4,
    title: "Boox Poke 5",
    description: "1448 x 1072 e-ink device",
    code: "4381",
    price: 159.99,
    status: true,
    stock: 3,
    category: "eReader",
  }
];


//obteniendo ruta base + producto especifico
router.get('/', (req, res) => {
  console.log('me conecte a prductos')
  res.send(products)
})

router.get('/:pid', (req,res) => {
  const pid = req.params.pid;
  const productId = parseInt(pid);
  const product = products.find(p => p.id === productId);
  if (product) {
    console.log(product)
    return res.send(product)
  } else {
    console.log(product)
    return res.send('No se encontro producto')
  }
})

//add product
router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category } = req.body;
  if (!title || !description || !code || !price || !status || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const existingProduct = products.find(product => product.code === code);
  if (existingProduct) {
    return res.status(400).json({ error: `El producto con código ${code} ya existe.` });
  }

  const newId = Date.now();
  const newProduct = {
    id: newId,
    title,
    description,
    code,
    price,
    status,
    stock,
    category
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
});


//modificar el producto
router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const { title, description, code, price, status, stock, category } = req.body;

  //verify pid
  if (!productId) {
    return res.status(400).json({ error: 'Se requiere un ID de producto válido en la ruta.' });
  }

  const existingProductIndex = products.findIndex(p => p.id === productId);
  const codeInUse = products.some(product => product.code === code && product.id !== productId);

  //error management
  if (existingProductIndex === -1) {
    //if the product is not found
    return res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}.` });

  } else if (!title || !description || !code || !price || !status || !stock || !category) {
    //if any field is not filled
    return res.status(400).json({ error: 'All fields are required' });

  } else if (codeInUse) {
    //if the code is already in use
    return res.status(400).json({ error: `Code ${code} is already in use!.` });
  }

  // updating existing product
  products[existingProductIndex] = {
    id: productId,
    title,
    description,
    code,
    price,
    status,
    stock,
    category
  };

  res.status(200).json({ message: `Producto con ID ${productId} actualizado correctamente`, product: products[existingProductIndex] });
});

//router delete
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  // Verifying ID
  if (!productId) {
    return res.status(400).json({ error: 'Se requiere un ID de producto válido en la ruta.' });
  }

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: `ID ${productId} not found.` });
  }

  // delete product
  products.splice(productIndex, 1);
  res.status(200).json({ message: `Product with id ${productId} successfully deleted` });
});

export default router;
