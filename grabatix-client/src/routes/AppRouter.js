import React, { useContext, Suspense, lazy } from "react";
import { Router } from "@reach/router";
import { AppContext } from "../providers/AppProvider"

import AdminRoutes from "./AdminRoutes"
import AttendantRoutes from "./AttendantRoutes"

import Login from "../UI/components/Login"

import ConsumerLayout from "../UI/layouts/Consumer"

import Account from "../UI/components/Account"

import Edit from "../UI/components/Edit"

import ConsumerAccount from "../UI/components/ConsumerAccount"
import ConsumerHome from "../UI/components/ConsumerHome"

import Cart from "../UI/components/Cart"
import CartHome from "../UI/components/CartHome"
import Checkout from "../UI/components/Checkout"


import History from "../UI/components/History"
import Codes from "../UI/components/Codes"


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
                        <AdminRoutes path="admin/*" />
                        <ConsumerLayout path="/" >
                            <ConsumerHome path="/" />
                            <Account path="account">
                                <ConsumerAccount path="/" />
                                <Codes path="codes" />
                                <Edit path="edit" />
                                <History path="history" />
                            </Account>
                            <Cart path="cart">
                                <CartHome path="/" />
                                <Checkout path="checkout" />
                            </Cart>
                            <NotFound default />
                        </ConsumerLayout>
                        <AttendantRoutes path="attendant/*" />
                        <Login path="login" />
                        <Login path="signup" />
                        <UnAuthorized path="unauthorized" />
                    </AppWrapper>
                </Router>
            )
        default:
            return (
                <Router>
                    <AppWrapper path="/">
                        <ConsumerLayout path="/" >
                            <ConsumerHome path="/" />
                            <Account path="account">
                                <ConsumerAccount path="/" />
                                <Codes path="codes" />
                                <Edit path="edit" />
                                <History path="history" />
                            </Account>
                            <Cart path="cart">
                                <CartHome path="/" />
                                <Checkout path="checkout" />
                            </Cart>
                            <NotFound default />
                        </ConsumerLayout>
                        <AttendantRoutes path="/*" />
                        <Login path="login" />
                        <Login path="signup" />
                        <UnAuthorized path="unauthorized" />
                    </AppWrapper>
                </Router>
            )
    }
}

export default AppRouter;