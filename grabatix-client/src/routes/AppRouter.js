import React, { useContext, Suspense, lazy } from "react";
import { AppContext } from "../providers/AppProvider"
import { Router } from "@reach/router";
import AdminLayout from "../layouts/admin"
import ConsumerLayout from "../layouts/consumer"
import AttendantLayout from "../layouts/attendant"

const AppRouter = () => {
    const { subdomain } = useContext(AppContext)
    switch(subdomain) {
        case "admin":
            return (
                <Router>
                    <AdminLayout path="/" />
                </Router>
            )
        case "localhost":
            return (
                <Router>
                    <AdminLayout path="/admin"/>
                    <ConsumerLayout path="/consumer"/>
                    <AttendantLayout path="/attendant"/>
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