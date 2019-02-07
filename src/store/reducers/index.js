import cart from './cart'
import { combineReducersWithRoot } from './utilities'

import {
  UPDATE_TOTAL,
  UPDATE_CHECKOUT,
  SET_INGREDIENTS,
  SET_PROP,
  UPDATE_PRICE,
  UPDATE_STATUS,
} from '../constants/action-types'

const initialState = {
  ingredients: null,
  prices: {},
  price: 0,
  total: 0,
  isCheckingOut: false,
  customBurgerName: '',
  basePrice: 0,
  status: {
    state: true,
    spinner: 'loading',
    msg: ''
  }
}

function rootReducer (state = initialState, {type, payload}) {
  switch (type) {
    case UPDATE_TOTAL :
      let _total = 0
      _total = payload.reduce((all, item) => {
        return all + (item.price * item.qty)
      }, _total)
      return {
        ...state,
        total: _total
      }
    case UPDATE_CHECKOUT :
      return {
        ...state,
        isCheckingOut: payload
      }
    case SET_INGREDIENTS :
      return {
        ...state,
        ingredients: payload
      }
    case UPDATE_STATUS:
      return {
        ...state,
        status: {...state.status, ...payload}
      }
    case SET_PROP:
      return {
        ...state,
        [payload.prop]: payload.val
      }
    case UPDATE_PRICE:
      return {
        ...state,
        price: Object.keys(state.prices).reduce((price, key) => {
          return price += (state.prices[key] * state.ingredients[key])
        }, state.basePrice)
      }
    default : return state
  }
}

export default combineReducersWithRoot(rootReducer, {cart: cart})
