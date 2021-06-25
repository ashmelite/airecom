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


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  
  const order = await Order.findById(req.params.id).populate('user', 'name email')     //in that order, there is a user field (user id) which we want name and email back from
  
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found!')
  }
  
})


// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  
  const order = await Order.findById(req.params.id)
  
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {         //this will come from paypal api response; article 10.4 @ 2:00
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.prayer.email_address
    }
    
    const updatedOrder = await order.save()     //save to db
    
    res.json(updatedOrder)
    
  } else {
    res.status(404)
    throw new Error('Order not found!')
  }
  
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid
}