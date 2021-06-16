import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()


//router.get('/', getProducts)
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)


/*
router.get('/:id', (req, res) => {
  const product = products.find( p => p._id === req.params.id )   // return the product whose id matches with the id in url 
  res.json(product)
})
*/


export default router