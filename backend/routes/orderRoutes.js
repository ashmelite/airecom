import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)               //post request to /api/orders ; see server.js
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)     //keep this order below all other routes else it will look at api/orders/ as route without id
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router