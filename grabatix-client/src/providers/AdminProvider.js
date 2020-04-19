import React, { useContext, useReducer } from "react"
import {} from "./actions/admin-actions";
import reducer from "./reducers/admin-reducer"
import { AppContext } from "./AppProvider"
import { AuthContext } from "./AuthProvider"

export const AdminContext = React.createContext()

const AdminProvider = ({children}) => {
  const {isBrowser} = useContext(AppContext)
  const {isLoggedIn, hasAdminPrivileges} = useContext(AuthContext)

  const initialState = {}
  
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AdminContext.Provider value={{...state}}>
      {children}
    </AdminContext.Provider>
  )

}

export default AdminProvider