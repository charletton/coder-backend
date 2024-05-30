//imports + inicalizar app
import express from 'express';
import cartRouter from './routes/cart.routes.js'
import productsRouter from './routes/products.routes.js'
const app = express()

//permitir leer json + ruta de static
app.use(express.static('./src/public'))
app.use(express.json())

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.use('/', (req,res) => {
  res.send('Welcome to the main page!')
})

//port + deploy
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server deployed! on ${PORT}`))
