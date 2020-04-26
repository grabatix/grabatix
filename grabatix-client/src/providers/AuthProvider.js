import React, { useReducer, useContext } from "react"
import {} from "./actions/auth-actions";
import reducer from "./reducers/auth-reducer"
import { AppContext } from "./AppProvider"

export const AuthContext = React.createContext()

const AuthProvider = ({children}) => {

  const {isBrowser} = useContext(AppContext)

  const initialState = {
    isLoggedIn: false
  }

  const checkRoles = role => true;
  
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{...state, checkRoles}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider