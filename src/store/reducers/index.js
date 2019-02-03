import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM,
  UPDATE_TOTAL,
  // UPDATE_LOADED,
  UPDATE_CHECKOUT,
  RESET_CART,
  SET_INGREDIENTS,
  SET_HAS_PAGE_ERROR,
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
  hasPageError: {
    state: false,
    spinner: 'error',
    msg: ''
  },
  isLoading: {
    state: true,
    spinner: 'loading'
  },
  isAddedToCart: {
    state: false,
    spinner: 'added'
  },
  cart: []
}

function rootReducer (state = initialState, {type, payload}) {

  const _cart = state.cart.map(({...item}) => item)

  switch (type) {
    case ADD_TO_CART :
      return {
        ...state,
        cart: [...state.cart].concat(payload())
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
    case SET_INGREDIENTS :
      return {
        ...state,
        ingredients: payload,
        hasPageError: {
          ...state.hasPageError,
          state: false
        }
      }
    case SET_HAS_PAGE_ERROR :
      return {
        ...state,
        hasPageError: {...state.hasPageError, state: payload.state, msg: payload.error}
      }
    case UPDATE_STATUS :
      return {
        ...state,
        [payload.prop]: {...state[payload.prop], state: payload.val}
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
export default rootReducer
