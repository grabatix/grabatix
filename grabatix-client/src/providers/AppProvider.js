import React, { useReducer } from "react"
import { ADD_SUBDOMAIN, TRANSITION_STATE } from "./actions/app-actions";
import reducer from "./reducers/app-reducer"
import * as appStates from "./states/app-states"

export const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const isBrowser = () => typeof window !== "undefined"
    
    const initialState = {
        appState: appStates.LOADING_STATE,
        subdomain: undefined,
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const transitionToState = state => {
      if (Object.keys(appStates).includes(state)) {
        dispatch({type: TRANSITION_STATE, payload: { appState: appStates[state]} });
      }
    }

    const addSubdomain = () => {
      const [subdomain] = isBrowser() ? window.location.hostname.split('.') : [""];
      dispatch({ type: ADD_SUBDOMAIN, payload: { subdomain } })
    }

    return (
      <AppContext.Provider value={{...state, isBrowser, transitionToState, addSubdomain}}>
        {children}
      </AppContext.Provider>
    )
}

export default AppProvider