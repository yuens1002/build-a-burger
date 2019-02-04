import {
  UPDATE_TOTAL,
  SET_PROP,
  UPDATE_STATUS
} from '../../constants/action-types'

export function updateTotal(payload) {
  return {
    type: UPDATE_TOTAL,
    payload
  }
}

export function setProp (payload) {
  return {
    type: SET_PROP,
    payload
  }
}

export function updateStatus (payload) {
  return {
    type: UPDATE_STATUS,
    payload
  }
}
