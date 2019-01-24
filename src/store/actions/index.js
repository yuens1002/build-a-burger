import { ADD_TO_CART } from '../constants/action-types'

export function addToCart(payload) {
  return {type: ADD_TO_CART, payload}
}
