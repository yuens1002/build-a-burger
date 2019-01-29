import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM,
  UPDATE_TOTAL,
  UPDATE_LOADED,
  UPDATE_CHECKOUT
} from '../constants/action-types'

const initialState = {
  ingredients: null,
  prices: null,
  total: null,
  isCheckingOut: false,
  loaded: {
    builder: false
  },
  orders: []
}

function rootReducer (state = initialState, {type, payload}) {

  const _orders = state.orders.map(({...order}) => order)

  switch (type) {
    case ADD_TO_CART :
      return {
        ...state,
        orders: [...state.orders].concat(payload)
      }
    case INC_ITEM_QTY :
      _orders[payload].qty += 1
      return {
        ...state,
        orders: _orders
      }
    case DEC_ITEM_QTY :
      _orders[payload].qty -= 1
      return {
        ...state,
        orders: _orders
      }
    case DEL_ITEM :
      _orders.splice(payload, 1)
      return {
        ...state,
        orders: _orders
      }
    case UPDATE_TOTAL :
      let _total = 0
      _total = _orders.reduce((all, item) => {
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

    default : return state
  }
}
export default rootReducer
