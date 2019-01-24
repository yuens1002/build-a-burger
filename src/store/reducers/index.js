import { ADD_TO_CART } from '../constants/action-types'

const initialState = {
  ingredients: null,
  prices: null,
  orders: []

}

const rootReducer = (state = initialState, {type, payload}) => {
  if (type === ADD_TO_CART) {
    return Object.assign({}, {...state}, {orders: [...state.orders].concat(payload)})
  }
  return state
}
export default rootReducer
