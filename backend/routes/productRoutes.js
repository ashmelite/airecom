import express from 'express'
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()


//router.get('/', getProducts)
router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)

router.get('/top', getTopProducts)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


/*
router.get('/:id', (req, res) => {
  const product = products.find( p => p._id === req.params.id )   // return the product whose id matches with the id in url 
  res.json(product)
})
*/


export default router