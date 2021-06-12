import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
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


export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    
    const { data } = await axios.get(`/api/products/${id}`)
    
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}