import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  
  //console.log(req.headers.authorization)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      //put all user data in request so that the logged in user can have access to private routes
      req.user = await User.findById(decoded.id).select('-password')
      
      //console.log(req.user)
      
      next()
      
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token is invalid')
    }
  }
  
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  
})


const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {                // checking for req.user to make sure the user's logged in
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Admin!')
  }
}

export { protect, admin }