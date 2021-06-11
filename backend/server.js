import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products)    //convert products array to json object for client to use
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find( p => p._id === req.params.id )   // return the product whose id matches with the id in url 
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))