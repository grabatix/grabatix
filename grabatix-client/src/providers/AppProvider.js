import React, { Component } from "react"
import {} from "./actions/app-actions";
import reducer from "./reducers/app-reducer"

const isBrowser = () => typeof window !== "undefined"

export const AppContext = React.createContext()

class AppProvider extends Component {
    state = {
        loading: false,
        loaded: false,
        submitting: false,
        submitted: false,
    }

    render() {
        const {
          props: { children },
          state,
        } = this
        return (
          <AppContext.Provider value={state}>
            {children}
          </AppContext.Provider>
        )
    }
}

export default AppProvider