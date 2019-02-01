import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM,
  UPDATE_TOTAL,
  UPDATE_LOADED,
  UPDATE_CHECKOUT,
  RESET_CART
} from '../constants/action-types'

const initialState = {
  ingredients: null,
  prices: null,
  total: null,
  isCheckingOut: false,
  loaded: {
    builder: false
  },
  cart: []
}

function rootReducer (state = initialState, {type, payload}) {

  const _cart = state.cart.map(({...item}) => item)

  switch (type) {
    case ADD_TO_CART :
      return {
        ...state,
        cart: [...state.cart].concat(payload)
      }
    case INC_ITEM_QTY :
      _cart[payload].qty += 1
      return {
        ...state,
        cart: _cart
      }
    case DEC_ITEM_QTY :
      _cart[payload].qty -= 1
      return {
        ...state,
        cart: _cart
      }
    case DEL_ITEM :
      _cart.splice(payload, 1)
      return {
        ...state,
        cart: _cart
      }
    case UPDATE_TOTAL :
      let _total = 0
      _total = _cart.reduce((all, item) => {
        return all + (item.price * item.qty)
      }, _total)
      return {
        ...state,
        total: _total
      }
    case UPDATE_LOADED :
      console.log('loaded called')
      return {
        ...state,
        loaded: (() => {
          const _loaded = {...state.loaded}
          _loaded[payload] = true
          return _loaded
        })()
      }
    case UPDATE_CHECKOUT :
      return {
        ...state,
        isCheckingOut: payload
      }
    case RESET_CART :
      console.log('reset')
      return {
        ...state,
        cart: []
      }
    default : return state
  }
}
export default rootReducer
