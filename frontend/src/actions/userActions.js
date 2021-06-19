import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"

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