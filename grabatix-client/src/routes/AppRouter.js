import React, { useContext, Suspense, lazy } from "react";
import { Router } from "@reach/router";
import { AppContext } from "../providers/AppProvider"
import AdminRoutes from "./AdminRoutes"
import AttendantRoutes from "./AttendantRoutes"
import ConsumerRoutes from "./ConsumerRoutes"

import AppWrapper from "../UI/components/AppWrapper"
import NotFound from "./NotFound"
import UnAuthorized from "./UnAuthorized";



const AppRouter = () => {
    const { subdomain } = useContext(AppContext)
    switch(subdomain) {
        case "admin":
            return (
                <Router>
                    <AppWrapper path="/">
                        <AdminRoutes path="admin/*" />
                        <UnAuthorized path="unauthorized" />
                        <NotFound default />
                    </AppWrapper>
                </Router>
            )
        case "localhost":
            return (
                <Router>
                    <AppWrapper path="/">
                        <ConsumerRoutes path="/*" />
                        <AdminRoutes path="admin/*" />
                        <AttendantRoutes path="attendant/*" />
                        <UnAuthorized path="unauthorized" />
                        <NotFound default />
                    </AppWrapper>
                </Router>
            )
        default:
            return (
                <Router>
                    <AppWrapper path="/">
                        <ConsumerRoutes path="/*" />
                        <AttendantRoutes path="attendant/*" />
                        <UnAuthorized path="unauthorized" />
                        <NotFound default />
                    </AppWrapper>
                </Router>
            )
    }
}

export default AppRouter;