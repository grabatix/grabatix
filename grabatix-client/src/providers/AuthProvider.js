import React, { useReducer, useContext } from "react"
import { LOGIN, LOGOUT, SIGNUP, EDIT_PROFILE } from "./actions/auth-actions";
import reducer from "./reducers/auth-reducer"
import { AppContext } from "./AppProvider"

export const AuthContext = React.createContext()

const AuthProvider = ({children}) => {

  const initialState = {
    isLoggedIn: false,
    user: {
      displayName: "",
      roles: [],
      imgUrl: "",
      authToken: ""
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const checkRoles = role => state.user.roles.includes(role);

  const login = async (username, password) => {
    // call login service
    //const user = await authenticationService(username, password)

    //validate results
    // temporary user
    let user = {
      displayName: "",
      roles: [],
      imgUrl: "",
      authToken: ""
    }
    dispatch({type: LOGIN, payload: { user } })
  }

  const signup = async (username, password, companyName) => {
    // call signup service
    //const user = await newAccountService(username, password, companyName)

    //validate results
    // temporary user
    let user = {
      displayName: "",
      roles: [],
      imgUrl: "",
      authToken: ""
    }
    dispatch({type: SIGNUP, payload: { user } })
  }

  const loginWithQuickbooks = async () => {
    // call login service
    //const user = await QBAuthenticationService()

    //validate results
    // temporary user
    let user = {
      displayName: "",
      roles: [],
      imgUrl: "",
      authToken: ""
    }
    dispatch({type: LOGIN, payload: { user } })
  }

  const logout = () => dispatch({type: LOGOUT});
  

  return (
    <AuthContext.Provider value={{...state, checkRoles, login, signup, loginWithQuickbooks, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider