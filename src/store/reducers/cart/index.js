import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM,
  RESET_CART
} from '../../constants/action-types'

const newCartAfterDel = (state, payload) => {
  const _cart = state.map(({...item}) => item)
  _cart.splice(payload, 1)
  return _cart
}

export default function cart (state = [], {type, payload}) {

  switch (type) {
    case ADD_TO_CART :
      return [...state].concat(payload())
    case INC_ITEM_QTY :

      return state.map(({...item}, i) => {
        if (i === payload) {
          item.qty += 1
          console.log(item)
          return item
        } else return item
      })
    case DEC_ITEM_QTY :
      return state.map(({...item}, i) => {
        if (i === payload) {
          item.qty -= 1
          return item
        } else return item
      })
    case DEL_ITEM :
      return newCartAfterDel(state, payload)
    case RESET_CART :
      return []
    default : return state
  }
}
