import React, { useContext, Suspense, lazy } from "react";
import { AppContext } from "../providers/AppProvider"
import { Router } from "@reach/router";
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"
import AdminLayout from "../layouts/admin"
import ConsumerLayout from "../layouts/consumer"
import AttendantLayout from "../layouts/attendant"
import UnAuthorized from "../components/UnAuthorized";

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
                    <Header>
                        <ProfileBlock />
                    </Header>
                    <AdminLayout path="/admin"></AdminLayout>
                    <ConsumerLayout path="/consumer"></ConsumerLayout>
                    <AttendantLayout path="/attendant">
                    
                    </AttendantLayout>
                    <UnAuthorized path="/unauthorized"/>
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