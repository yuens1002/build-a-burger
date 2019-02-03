import {
  ADD_TO_CART,
  INC_ITEM_QTY,
  DEC_ITEM_QTY,
  DEL_ITEM,
  UPDATE_TOTAL,
  UPDATE_LOADED,
  UPDATE_CHECKOUT,
  RESET_CART,
  SET_INGREDIENTS,
  UPDATE_INGREDIENT,
  SET_HAS_PAGE_ERROR,
  SET_PROP,
  UPDATE_PRICE,
  UPDATE_IS_LOADING

} from '../constants/action-types'

import axiosInst from '../../axios-order'

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

export function setIngredients (payload) {
  return {
    type: SET_INGREDIENTS,
    payload
  }
}

export function setHasPageError (payload) {
  return {
    type: SET_HAS_PAGE_ERROR,
    payload
  }
}

export function setProp (payload) {
  return {
    type: SET_PROP,
    payload
  }
}

export function updatePrice () {
  return {
    type: UPDATE_PRICE
  }
}

export function updateIsLoading (payload) {
  return {
    type: UPDATE_IS_LOADING,
    payload
  }
}

export function initIngredients() {
  return dispatch => {
    axiosInst.get('/ingredients.json')
    .then(({data}) => {
      dispatch(setIngredients(data))
      return axiosInst.get('/prices.json')
    }).then(({data}) => {
      dispatch(setProp({prop: 'prices', val: data}))
      return axiosInst.get('/basePrice.json')
    }).then(({data}) => {
      dispatch(setProp({prop: 'basePrice', val: data}))
      dispatch(setProp({prop: 'price', val: data}))
      dispatch(updatePrice())
      dispatch(updateIsLoading(false))
    }).catch((error) => {
      dispatch(setHasPageError(error))
    })
  }
}
