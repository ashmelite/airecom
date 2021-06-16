import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})     //find method with empty argument returns everything
  
  res.json(products)    //convert products array to json object for client to use
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if (product) {           //check if product is there
    res.json(product) 
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

export {
  getProducts,
  getProductById
}