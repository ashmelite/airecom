import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL
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


export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    await axios.delete(`/api/products/${id}`, config)
    
    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    })
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.post('/api/products', {}, config)      // pass in empty object as argument since we are posting but not sending any data
    
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put(`/api/products/${product._id}`, product, config)
    
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}