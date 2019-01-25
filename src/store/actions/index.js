import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM
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
