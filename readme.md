# Usage
```
npm install
npm run dev
```

## Endpoints frontend
- '/' menu principal
- '/realtimeproducts Lista de productos en tiempo real
- '/api/' Lista de urls de api
- '/addproduct/' Formulario para agregar un producto

## Products api 
### GET
- get /api/products -> se obtiene una lista de todos los productos en la base de datos
- get /api/products/:pid -> Muestra un producto con ID especifica

### POST
En la ruta post /api/products se agrega un producto con el siguiente formato:
```json
{
    "title":"example",
    "description":"example",
    "code":"brr123",
    "price":40,
    "stock":5,
    "category":"example",
}
```

### PUT
- En la ruta put /api/products/:pid (con pid siendo la id del producto) se modificara el producto, enviando en el body un json con el formato mencionado en 


### DELETE
delete /api/products/:pid -> ELimina un producto con id especifica

## Carts api
### GET
- get /api/carts/ -> Por comodidad muestra todos los carritos (para obtener su id)
- get /api/carts/:cid -> Muestra carrito con id especifica
  
### POST
- Post /api/carts crea un carrito 

- Post /api/carts/:cid/products/:pid -> Agrega un producto al carrito (cid tiene que ser la respectiva id del carrito y pid tiene que ser la respectiva id del producto)


### PUT

- En la ruta put /api/carts/:cid/product/:pid se modifica la cantidad de un producto en un carrito default. Tiene el siguiente formato

```json
{
    "quantity": 1,
}
```

### DELETE
- delete /api/carts/:cid/product/:pid, elimina el producto del carrito si la cantidad es igual a uno, si es mayor se decrementa en 1 la product quantity 
- delete /api/carts/:cid elimina el carrito referenciado en :cid
