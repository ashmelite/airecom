import express from 'express'
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(protect, addOrderItems)      //post request to /api/orders ; see server.js

export default router