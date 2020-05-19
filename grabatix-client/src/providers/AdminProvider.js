/** @format */

import React, { useContext, useReducer } from 'react'
import { Admin } from '../config/roles'
import { ADD_REGISTRATION } from './actions/admin-actions'
import reducer from './reducers/admin-reducer'
import { AppContext } from './AppProvider'
import { AuthContext } from './AuthProvider'

export const AdminContext = React.createContext()

const AdminProvider = ({ children }) => {
  const { isBrowser } = useContext(AppContext)
  const { isLoggedIn, checkRoles } = useContext(AuthContext)

  const initialState = {
    isAdminUser: isLoggedIn && checkRoles(Admin),
    isRegistered: false,
    companyName: '',
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const validateCompanyName = async companyName => {
    // const isAvailable = await adminCompanyNameService(companyName);

    const isAvailable = true
    return isAvailable
  }

  const validateEmailAddress = async emailAddress => {
    // const isAvailable = await adminEmailService(companyName);

    const isAvailable = true
    return isAvailable
  }

  const registerCompany = async data => {
    // const isRegistered = await adminRegistrationService(data)

    dispatch({ type: ADD_REGISTRATION, payload: { data } })
  }

  return (
    <AdminContext.Provider
      value={{
        ...state,
        validateCompanyName,
        validateEmailAddress,
        registerCompany,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider
