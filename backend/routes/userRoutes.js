import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(registerUser).get(protect, admin, getUsers)            //get request is an Admin route
router.post('/login', authUser)                       //execute this if it's a put request to /profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
                      //execute this if it's a get req; means we can chain multiple types of request if route is same
                                          
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

                      
export default router