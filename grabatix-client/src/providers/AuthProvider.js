import React, { Component } from "react"
import {} from "./actions/auth-actions";
import reducer from "./reducers/auth-reducer"

const isBrowser = () => typeof window !== "undefined"

export const AuthContext = React.createContext()

class AuthProvider extends Component {
    state = {}

    render() {
        const {
          props: { children },
          state,
        } = this
        return (
          <AuthContext.Provider value={state}>
            {children}
          </AuthContext.Provider>
        )
    }
}

export default AuthProvider