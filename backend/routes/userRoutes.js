import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(registerUser)
router.post('/login', authUser)                       //execute this if it's a put request to /profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
                      //execute this if it's a get req

export default router