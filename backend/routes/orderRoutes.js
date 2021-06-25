import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(protect, addOrderItems)      //post request to /api/orders ; see server.js
router.route('/:id').get(protect, getOrderById)     //keep this order below all other routes else it will look at api/orders/ as route without id

export default router