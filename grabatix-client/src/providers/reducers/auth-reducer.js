/** @format */

import { LOGIN, LOGOUT, EDIT_PROFILE, SIGNUP } from '../actions/auth-actions'

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case EDIT_PROFILE:
      return { ...state }
    case LOGIN:
      return { ...state, isLoggedIn: true, user: payload.user }
    case LOGOUT:
      return { ...state, isLoggedIn: false }
    case SIGNUP:
      return { ...state, isLoggedIn: true, user: payload.user }
    default:
      return { ...state }
  }
}

export default reducer
