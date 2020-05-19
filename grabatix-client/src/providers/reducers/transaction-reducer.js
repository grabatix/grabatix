/** @format */

import { UPDATE_CART } from '../actions/transaction-actions'
const reducer = (state, action) => {
  const { type } = action
  switch (type) {
    case UPDATE_CART:
      return { ...state, tickets }
    default:
      return { ...state }
  }
}

export default reducer
