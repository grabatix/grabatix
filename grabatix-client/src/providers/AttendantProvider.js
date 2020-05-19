/** @format */

import React, { Component } from 'react'
import {} from './actions/attendant-actions'
import reducer from './reducers/attendant-reducer'

const isBrowser = () => typeof window !== 'undefined'

export const AttendantContext = React.createContext()

class AttendantProvider extends Component {
  state = {}

  render() {
    const {
      props: { children },
      state,
    } = this
    return (
      <AttendantContext.Provider value={state}>
        {children}
      </AttendantContext.Provider>
    )
  }
}

export default AttendantProvider
