//imports
import __dirname from './utils.js';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';

import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

// app
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`server deployed! on ${PORT}`));;
const socketServer = new Server(server);

//handlebars config
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

//permitir leer json + ruta de static
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', (req,res) => {
    res.render('index');
});


