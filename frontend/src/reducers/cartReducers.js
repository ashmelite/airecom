import { CART_ADD_ITEM, CART_CLEAR_SHIPPING_ADDRESS, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      
      //check if the product is already in cart; find will return the first item where condition satisfies
      const existItem = state.cartItems.find(x => x.product === item.product)         //here, product will be an id
      
      if(existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)                 //map will return everthing that is already in the array, and based on the condition it will either return the 'item' (which we're trying to add in cart) or other items which are already there in the cart
        }
      } else {                      //if item is not already in card, add it to cart
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
      
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)          //return every item whose id does not match with payload id, and filter out the item whose id matches
      }
      
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload             //action.payload is data which we send through form
      }
      
    case CART_CLEAR_SHIPPING_ADDRESS:               //have added this part
      return {
        ...state,
        shippingAddress: {}
      }
    
    default:
      return state
  }
}