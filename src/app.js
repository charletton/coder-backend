//imports
import __dirname from './utils.js';
import productsRouter from './routes/products.routes.js';
import productsFront from './routes/products.front.js';
import cartRouter from './routes/cart.routes.js';
import ProductManager from './managers/ProductManager.js'

import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

// app
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`server deployed! on ${PORT}`));;
const socketServer = new Server(server);

//sending to client products (realtime)
const manager = new ProductManager();
const products = await manager.getProducts();

//handlebars config
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

//permitir leer json + ruta de static
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//routes
app.use('/', productsFront)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

//escuchando a cliente que se conecta
socketServer.on('connection', (socketClient) => {
  console.log('Cliente de id: ' + socketClient.id + 'se conecto.');
  socketServer.emit('log', products)
});
