import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM
} from '../constants/action-types'

const initialState = {
  ingredients: null,
  prices: null,
  orders: []
}

function rootReducer (state = initialState, {type, payload}) {
//   const obj = {
//       [ADD_TO_CART]: () =>
//         Object.assign({}, {...state}, {orders: [...state.orders].concat(payload)}),
//       [INC_ITEM_QTY]: () => {
//
//       },
//       [DEC_ITEM_QTY]: () => {
//         const _orders = state.orders.map(({...order}) => order)
//         _orders[payload].qty -= 1
//         return Object.assign({}, {...state}, {orders: _orders})
//       },
//       [DEL_ITEM]: () => {
//         const _orders = state.orders.map(({...order}) => order)
//         const delOrder = _orders.splice(payload, 1)
//         return Object.assign({}, {...state}, {orders: delOrder})
//       }
//     }
//   return obj[type]()
// }

  if (type === ADD_TO_CART) {
    return Object.assign({}, {...state}, {orders: [...state.orders].concat(payload)})
  }
  if (type === INC_ITEM_QTY) {
    const _orders = state.orders.map(({...order}) => order)
    _orders[payload].qty += 1
    return Object.assign({}, {...state}, {orders: _orders})
  }
  if (type === DEC_ITEM_QTY) {
    const _orders = state.orders.map(({...order}) => order)
    _orders[payload].qty -= 1
    return Object.assign({}, {...state}, {orders: _orders})
  }
  if (type === DEL_ITEM) {
    const _orders = state.orders.map(({...order}) => order)
    _orders.splice(payload, 1)
    return Object.assign({}, {...state}, {orders: _orders})
  }
}
export default rootReducer
