import React, { useContext, useEffect, Suspense, lazy } from "react";
import { AppContext } from "../providers/AppProvider"
import { Router } from "@reach/router";
import Loading from "../components/Loading"
import AdminLayout from "../layouts/admin"
import ConsumerLayout from "../layouts/consumer"
import AttendantLayout from "../layouts/attendant"

const AppRouter = props => {
    const {appState, isBrowser, transitionToState, addSubdomain, subdomain} = useContext(AppContext)

    useEffect(()=> {
        if (typeof subdomain === "undefined") {
            addSubdomain();
        } else if (appState.loading && typeof subdomain !== "undefined") {
            transitionToState("LOADED_STATE")
        }
    }, [subdomain]);

    if (appState.loading) {
        return <Loading/>
    };

    switch(subdomain) {
        case "admin":
            return (
                <Router>
                    <AdminLayout path="/" />
                </Router>
            )
        default:
            return (
                <Router>
                    <ConsumerLayout path="/" />
                </Router>
            )
    }
}

export default AppRouter;