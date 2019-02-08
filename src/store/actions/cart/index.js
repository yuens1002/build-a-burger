import axiosInst from '../../../axios-order'
import * as common from '../common'
import {
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM,
  UPDATE_CHECKOUT,
  RESET_CART
} from '../../constants/action-types'

export function incItemQty (payload) {
  return {type: INC_ITEM_QTY, payload}
}

export function decItemQty (payload) {
  return {type: DEC_ITEM_QTY, payload}
}

export function delItem (payload) {
  return {type: DEL_ITEM, payload}
}

export function updateCheckout (payload) {
  return {type: UPDATE_CHECKOUT, payload}
}

export function resetCart (payload) {
  return {type: RESET_CART}
}

export function onPlaceOrder ({cart, customer, history}) {
  return (dispatch, getState) => {
    return Promise.all([
      axiosInst.get('/prices.json'),
      axiosInst.get('./basePrice.json')
    ])
    .then(([prices, basePrice]) => {
      // console.log(payload)
      const _total = cart.reduce((total, item) => {
        return ((Object.keys(prices.data).reduce((subTotal, ingKey) => {
          return subTotal += (item.ingredients[ingKey] * prices.data[ingKey])
        }, 0) + basePrice.data) * item.qty) + total
      }, 0)
      const _order = {
        customer,
        price: _total,
        order: cart
      }
      /*****firebase *****************
      xxx.json for firebase only
      xxx.json, path/to/record
      ********************************/
      return axiosInst.post('/orders.json', _order)
    })
    .then(() => {
      dispatch(updateCheckout(false))
      dispatch(resetCart())
      dispatch(common.updateTotal(getState().cart))
      setTimeout(() => {
        dispatch(common.updateStatus({state: false}))
        history.push('/')
      }, 5000)
    })
    .catch(error => {
      dispatch(common.updateStatus({
        state: true,
        spinner: 'error',
        msg: error.message
      }))
    })
  }
}
