import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'


export const productListReducer = (state = { products: [] }, action) => {       //reducer takes in initial state (we can set it to an empty obj) and an action
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }                      //when we make a request, we want component to know that it's currently being fetched/loading 
    case PRODUCT_LIST_SUCCESS:                //case for when we get a successful response back
      return { loading: false, products: action.payload }         //see article 5.3 @ 04:00 for action.payload
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state                                      //return initial state (as passed in the argument)
  }
}


export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {       //reducer takes in initial state (we can set it to an empty obj) and an action
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }                      //when we make a request, we want component to know that it's currently being fetched/loading 
    case PRODUCT_DETAILS_SUCCESS:                //case for when we get a successful response back
      return { loading: false, product: action.payload }         //see article 5.3 @ 04:00 for action.payload
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state                                      //return initial state (as passed in the argument)
  }
}