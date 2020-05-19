/** @format */

import React, { Component } from 'react'
import {} from './actions/consumer-actions'
import reducer from './reducers/consumer-reducer'

const isBrowser = () => typeof window !== `undefined`

export const ConsumerContext = React.createContext()

class ConsumerProvider extends Component {
  state = {}

  render() {
    const {
      props: { children },
      state,
    } = this
    return (
      <ConsumerContext.Provider value={state}>
        {children}
      </ConsumerContext.Provider>
    )
  }
}

export default ConsumerProvider
