import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  
  const products = await Product.find({})     //find method with empty argument returns everything
  
  res.json(products)    //convert products array to json object for client to use
}))


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if(product) {           //check if product is there
    res.json(product) 
  } else {
    res.status(404).json({ message: 'Product not found!' })
  }
  
}))


/*
router.get('/:id', (req, res) => {
  const product = products.find( p => p._id === req.params.id )   // return the product whose id matches with the id in url 
  res.json(product)
})
*/


export default router