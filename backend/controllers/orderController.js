import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  
  const { 
    orderItems,
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice } = req.body
  
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems: orderItems,
      user: req.user._id,                 //since this is a protected route, we need to verify if the user placing the order is same as the one which exists in token
      shippingAddress: shippingAddress, 
      paymentMethod: paymentMethod, 
      itemsPrice: itemsPrice, 
      taxPrice: taxPrice, 
      shippingPrice: shippingPrice, 
      totalPrice: totalPrice
    })
    
    const createdOrder = await order.save()
    
    res.status(201).json(createdOrder)
    
  }
  
})

export {
  addOrderItems
}