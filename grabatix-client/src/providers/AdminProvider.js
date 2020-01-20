import React, { Component } from "react"
import {} from "./actions/admin-actions";
import reducer from "./reducers/admin-reducer"

const isBrowser = () => typeof window !== "undefined"

export const AdminContext = React.createContext()

class AdminProvider extends Component {
    state = {}

    render() {
        const {
          props: { children },
          state,
        } = this
        return (
          <AdminContext.Provider value={state}>
            {children}
          </AdminContext.Provider>
        )
    }
}

export default AdminProvider