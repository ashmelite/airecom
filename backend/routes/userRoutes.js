import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').get(protect, admin, getUsers)      //Admin route -> get all users
router.route('/').post(registerUser)
router.post('/login', authUser)                       //execute this if it's a put request to /profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
                      //execute this if it's a get req
                                          
router.route('/:id').delete(protect, admin, deleteUser)
                      
export default router