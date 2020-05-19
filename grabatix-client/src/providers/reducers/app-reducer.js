/** @format */

import {
  TRANSITION_STATE,
  ADD_COMPANY_INFO,
  ADD_SUBDOMAIN,
} from '../actions/app-actions'

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_SUBDOMAIN:
      return { ...state, subdomain: payload.subdomain }
    case ADD_COMPANY_INFO:
      return { ...state, companyInfo: payload.companyInfo }
    case TRANSITION_STATE:
      return { ...state, appState: payload.appState }
    default:
      return { ...state }
  }
}

export default reducer
