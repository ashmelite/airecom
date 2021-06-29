import axios from 'axios'
import { CART_CLEAR_SHIPPING_ADDRESS } from '../constants/cartConstants'
import { ORDER_CREATE_RESET, ORDER_DETAILS_RESET, ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { 
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_CLEAR,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, 
  USER_REGISTER_CLEAR, 
  USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_UPDATE_PROFILE_FAIL, 
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.post('/api/users/login', { email, password }, config)
    
    //if we get OK status back from axios post request, only then the action (below) will get dispatched else catch block will execute
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    
    //save userdata into local storage once login is successful
    localStorage.setItem('userInfo', JSON.stringify(data))
    
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('shippingAddress')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_REGISTER_CLEAR })
  dispatch({ type: USER_DETAILS_CLEAR })
  dispatch({ type: CART_CLEAR_SHIPPING_ADDRESS })
  dispatch({ type: ORDER_CREATE_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: ORDER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
}


export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.post('/api/users', { name, email, password }, config)
    
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    
    //dispatch login success action as well if registration is successful
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    
    localStorage.setItem('userLogin', JSON.stringify(data))
    
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


//we can use this same method to check if a user is logged in or not before allowing access to a route. In ProfileScreen we pass 'profile' as a parameter (to id) while calling this method which will make the axios get request (below) point to api/users/profile instead of api/users/:userid
export const getUserDetails = (id) => async (dispatch, getState) => {             // getState -> since we need to send token from frontend (by using headers, see below) to backend, we can get token from userInfo (state) by using getState; see * comment below
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })
    
    // *getState
    // we're destructuring below to get userInfo from userLogin; this will give us logged in user's object which is userInfo
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get(`/api/users/${id}`, config)
    
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


                  //pass in the entire user object
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put('/api/users/profile', user, config)
    
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get('/api/users', config)
    
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    await axios.delete(`/api/users/${id}`, config)
    
    dispatch({
      type: USER_DELETE_SUCCESS
    })
    
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}