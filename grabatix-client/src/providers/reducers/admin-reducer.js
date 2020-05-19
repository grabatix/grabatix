/** @format */

import { ADD_REGISTRATION } from '../actions/admin-actions'
const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_REGISTRATION:
      return {
        ...state,
        ...payload.data,
        isRegistered: true,
      }
    default:
      return { ...state }
  }
}

export default reducer
