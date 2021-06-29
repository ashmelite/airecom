import { 
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_CLEAR, 
  USER_DETAILS_REQUEST, 
  USER_DETAILS_SUCCESS, 
  USER_DETAILS_FAIL, 
  USER_DETAILS_CLEAR,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET} from "../constants/userConstants"

export const userLoginReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return { }
    default:
      return state
  }
}

export const userRegisterReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_CLEAR:                             // have added this to clear userRegister State, since userInfo kept saving in local storage even after logging out; call this on logout
      return { }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: { } }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }              // ...state -> return whatever there is already in the state
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_CLEAR:                             // have added this to clear userDetails State (just clearing user object inside not the whole userDetails state), call this on logout
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return { }
    default:
      return state
  }
}

//for admin route
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}