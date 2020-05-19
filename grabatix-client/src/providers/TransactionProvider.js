/** @format */

import React, { Component } from 'react'
import { UPDATE_CART } from './actions/transaction-actions'
import reducer from './reducers/transaction-reducer'
import { tickets } from '../__mocks__/tickets'
import { callApi } from '../utils/fetch-helpers'

const isBrowser = () => typeof window !== 'undefined'

export const TransactionContext = React.createContext()

const apiUrl = 'http://localhost:8282/api/v1/qb/auth'

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.

class TransactionProvider extends Component {
  state = {
    tickets,
    submitted: false,
    submitting: false,
    updateCart: tickets =>
      this.setState(state => reducer(state, { type: UPDATE_CART, tickets })),
  }

  render() {
    const {
      props: { children },
      state,
    } = this
    return (
      <TransactionContext.Provider value={state}>
        {children}
      </TransactionContext.Provider>
    )
  }
}

export default TransactionProvider
