import React, { useContext, useReducer } from "react"
import { Admin } from "../config/roles"
import {} from "./actions/admin-actions";
import reducer from "./reducers/admin-reducer"
import { AppContext } from "./AppProvider"
import { AuthContext } from "./AuthProvider"

export const AdminContext = React.createContext()

const AdminProvider = ({children}) => {
  const {isBrowser} = useContext(AppContext)
  const {isLoggedIn, checkRoles } = useContext(AuthContext)

  const initialState = {
    isAdminUser: isLoggedIn && checkRoles(Admin)
  }
  
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AdminContext.Provider value={{...state}}>
      {children}
    </AdminContext.Provider>
  )

}

export default AdminProvider