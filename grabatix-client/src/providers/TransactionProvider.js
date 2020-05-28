/** @format */

import React, { useReducer, useEffect } from 'react'
import {
  TRANSITION_STATE,
  LOAD_ITEMS,
  UPDATE_ITEM_QUANTITY,
  ADD_USER_TO_CART,
} from './actions/transaction-actions'
import reducer from './reducers/transaction-reducer'
import { callApi } from '../utils/fetch-helpers'
import { tickets } from '../config/tickets'
import * as transactionStates from './states/transaction-states'

const isBrowser = () => typeof window !== `undefined`

export const TransactionContext = React.createContext()

const apiUrl = `http://localhost:8282/api/v1/qb/auth`

const TransactionProvider = ({ children }) => {
  const initialState = {
    transactionState: transactionStates.LOADING_STATE,
    cart: {
      userId: ``,
      items: [],
    },
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const addUserToCart = userId => dispatch({ type: ADD_USER_TO_CART, payload: { userId } })
  const updateItemQuantity = (itemId, quantity) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { itemId, quantity } })
  const checkout = () => {}

  const transitionToState = state => {
    if (Object.keys(transactionStates).includes(state)) {
      dispatch({
        type: TRANSITION_STATE,
        payload: { transactionState: transactionStates[state] },
      })
    }
  }

  useEffect(() => {
    if (!state.transactionState.loaded) {
      async function fetchItems() {
        try {
          // const items = await getItemsFromDB()
          const items = tickets
          dispatch({ type: LOAD_ITEMS, payload: { items } })

          transitionToState(transactionStates.LOADED_STATE)
        } catch (err) {
          // do some error handling
        }
      }
      fetchItems()
    }
  }, [state.transactionState.loaded])

  return (
    <TransactionContext.Provider
      value={{ ...state, addUserToCart, updateItemQuantity, transitionToState, checkout }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionProvider
