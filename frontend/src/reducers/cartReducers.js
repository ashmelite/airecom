import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state
  }
}