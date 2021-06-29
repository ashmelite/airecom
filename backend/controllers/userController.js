import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  //res.send({ email, password })
  
  const user = await User.findOne({ email: email })
  
  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password!')
  }
  
})


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  
  const userExists = await User.findOne({ email: email })
  
  if (userExists) {
    res.status(400)
    throw new Error('User already exists!')
  }
  
  const user = await User.create({
    name,
    email,
    password                          //password will get encrypted by mongodb since we added middleware (method) in the userModel
  })
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
  
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id)      //user will exist in req since authMiddleware will run before this and if token is valid we can access user from req
  
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
  
})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id)
  
  if(user) {
    user.name = req.body.name || user.name      // if request body has a name, set it to that name, else keep it the same
    user.email = req.body.email || user.email
    
    if (req.body.password) {                    //check if password was sent through request
      user.password = req.body.password
    }
    
    const updatedUser = await user.save()
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
    
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
  
})


// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  
  const users = await User.find({})
  res.json(users)
  
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers
}