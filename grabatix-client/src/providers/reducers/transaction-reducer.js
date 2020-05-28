/** @format */

import {
  LOAD_ITEMS,
  UPDATE_ITEM_QUANTITY,
  ADD_USER_TO_CART,
  TRANSITION_STATE,
} from '../actions/transaction-actions'
const reducer = (state, action) => {
  const { type, payload } = action
  const cart = JSON.parse(JSON.stringify(state.cart))
  switch (type) {
    case LOAD_ITEMS:
      cart.items = [...payload.items]
      return { ...state, cart }
    case UPDATE_ITEM_QUANTITY:
      const idx = cart.items.findIndex(({ itemId }) => payload.itemId === itemId)
      cart.items[idx].quantity = +payload.quantity
      const pricePoint = cart.items[idx].pricePoints.find(
        ({ minQuantity, maxQuantity }) =>
          +payload.quantity >= minQuantity && +payload.quantity <= maxQuantity
      ).price
      const subTotal = +payload.quantity * pricePoint
      cart.items[idx].subTotal = subTotal
      return { ...state, cart }
    case ADD_USER_TO_CART:
      cart.userId = payload.userId
      return { ...state, cart }
    case TRANSITION_STATE:
      return { ...state, transitionState: payload.transitionState }
    default:
      return { ...state }
  }
}

export default reducer
