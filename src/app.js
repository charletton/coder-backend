//imports
import __dirname from './utils.js';
import productsRouter from './routes/products.routes.js';
import productsFront from './routes/products.front.js';
import cartRouter from './routes/cart.routes.js';
import { ProductsService } from './managers/index.js'

import mongoose from 'mongoose';
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

// app
const app = express();
const PORT = process.env.PORT || 8080;
//mongoose
const CONNECTION_STRING = 'mongodb+srv://user:123@supercluster.jjapnms.mongodb.net/supercluster?retryWrites=true&w=majority&appName=supercluster;'
const connection = mongoose.connect(CONNECTION_STRING)
const server = app.listen(PORT, () => console.log(`server deployed! on ${PORT}`));;
const socketServer = new Server(server);

//sending to client products (realtime)
const products = await ProductsService.getProducts();

//handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//permitir leer json + ruta de static
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', productsFront)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

//escuchando a cliente que se conecta
socketServer.on('connection', (socketClient) => {
  console.log('Cliente de id: ' + socketClient.id + 'se conecto.');
  socketServer.emit('log', products)
});
