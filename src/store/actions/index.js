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

export function addToCart(payload) {
  return {type: ADD_TO_CART, payload}
}

export function incItemQty(payload) {
  return {type: INC_ITEM_QTY, payload}
}

export function decItemQty(payload) {
  return {type: DEC_ITEM_QTY, payload}
}

export function delItem(payload) {
  return {type: DEL_ITEM, payload}
}

export function updateTotal(payload) {
  return {type: UPDATE_TOTAL, payload}
}

export function updateLoaded(payload) {
  return {type: UPDATE_LOADED, payload}
}

export function updateCheckout(payload) {
  return {type: UPDATE_CHECKOUT, payload}
}

export function resetCart(payload) {
  return {type: RESET_CART}
}
