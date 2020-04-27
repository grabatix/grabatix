import React, { useContext, Suspense, lazy } from "react";
import { AppContext } from "../providers/AppProvider"
import { Router } from "@reach/router";
import Header from '../UI/components/Header'
import ProfileBlock from "../UI/components/ProfileBlock"
import AdminLayout from "../UI/layouts/admin"
import ConsumerLayout from "../UI/layouts/consumer"
import AttendantLayout from "../UI/layouts/attendant"
import UnAuthorized from "../UI/components/UnAuthorized";

const AppRouter = () => {
    const { subdomain } = useContext(AppContext)
    switch(subdomain) {
        case "admin":
            return (
                <Router>
                    <Header path="/">
                        <ProfileBlock />
                    </Header>
                    <AdminLayout path="/">
                        <Register path="register" />
                        <Account path="account">
                            <AdminAccount path="/" />
                            <Edit path="edit" />
                            <Reports path="reports">
                                <ReportsHome path="/" />
                                <Transactions path="transactions" />
                            </Reports>
                            <Users path="users" />
                        </Account>
                    </AdminLayout>
                </Router>
            )
        case "localhost":
        default:
            return (
                <Router>
                    <Header path="/">
                        <ProfileBlock />
                    </Header>
                    <ConsumerLayout path="/">
                        <Account path="account">
                            <ConsumerAccount path="/" />
                            <Codes path="codes" />
                            <Edit path="edit" />
                            <History path="history" />
                        </Account>
                        <Purchase path="purchase">
                            <PurchaseHome path="/" />
                            <Cart path="cart" />
                            <Checkout path="checkout" />
                        </Purchase>
                    </ConsumerLayout>
                    <AttendantLayout path="attendant">
                        <Account path="account" >
                            <AttendantAccount path="/" />
                            <Edit path="edit" />
                        </Account>
                        <Scan path="scan" />
                    </AttendantLayout>
                    <UnAuthorized path="unauthorized" />
                </Router>
            )
    }
}

export default AppRouter;