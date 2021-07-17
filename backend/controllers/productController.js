import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// this block here without the search keyword implementation
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({})     //find method with empty argument returns everything
  
//   res.json(products)    //convert products array to json object for client to use
// })


// @desc    Fetch all products; with search keyword & pagination implementation
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1
  
  const keyword = req.query.keyword ?                //query => everything after ? in a url i.e. /search?keyword=iphone
  {
    name: {                         //we want to match the keyword with the name of the product
      $regex: req.query.keyword,
      $options: 'i'                 // i = case-insensitive
    }
  } : {}
  
  const count = await Product.countDocuments({ ...keyword })                 //get total count of products
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))     //find method with empty argument returns everything
  
  res.json({products, page, pages: Math.ceil(count / pageSize)})    //convert products array to json object for client to use
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


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed!' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})


// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })
  
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)                 //send new product back
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body
  
  const product = await Product.findById(req.params.id)
  
  if (product) {
    
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    
    const updatedProduct = await product.save()
    res.json(updatedProduct)
    
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
  
})


// @desc    Create new Review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body                        //rating the user provides for the product and comment
  
  const product = await Product.findById(req.params.id)
  
  if (product) {
    //check if user has already submitted the review (see article 13.1 @05:00)
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    //                                            r = for each review               
    
    if (alreadyReviewed) {    //if it's true
      res.status(400)
      throw new Error('Product has already been reviewed!')
    }
    
    //if there is no review by user, create the review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }
    
    //add new review to reviews array
    product.reviews.push(review)
    
    //update numReviews
    product.numReviews = product.reviews.length
    
    //update total (avg) rating (overall rating of the product)
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    //acc = accumulator;  item = current/for each item in the array;    acc starts at 0 (we can have it to start at any value we like)
  
    //save to db
    await product.save()
    res.status(201).json({message: 'Review Added!'})
  
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
  
})


// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)               //sort by ascending order
  
  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
}