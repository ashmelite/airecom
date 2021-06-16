import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })
  
  //save entire cart in local storage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))          //JSON stringify to convert JavaScript obj to string. When reading back from storage use JSON.parse
}


export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}