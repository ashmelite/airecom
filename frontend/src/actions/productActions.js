import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
 } from '../constants/productConstants'
 
 
 export const listProducts = () => async (dispatch) => {          //redux thunk allows us to use function within a function so that we can make async request
   try {
     dispatch({ type: PRODUCT_LIST_REQUEST })         //dispatch the action; PRODUCT_LIST_REQUEST is an action
     
     //after dispatching request action (above), make a request to backend for getting data back
     const { data } = await axios.get('/api/products')          // { data } is just destructure of the actual response we're getting back from the server
     
     dispatch({
       type: PRODUCT_LIST_SUCCESS,
       payload: data
      })
     
   } catch (error) {
     dispatch({
       type: PRODUCT_LIST_FAIL,
       payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
   }
 }