import React from "react";
import { Router } from "@reach/router";
import ConsumerProvider from "../../providers/ConsumerProvider"
import ConsumerLayout from "../../UI/layouts/Consumer"
import Account from "../../UI/components/Account"
import Edit from "../../UI/components/Edit"
import ConsumerAccount from "../../UI/components/ConsumerAccount"
import ConsumerHome from "../../UI/components/ConsumerHome"
import Cart from "../../UI/components/Cart"
import CartHome from "../../UI/components/CartHome"
import Checkout from "../../UI/components/Checkout"
import Login from "../../UI/components/Login"
import History from "../../UI/components/History"
import Codes from "../../UI/components/Codes"
import NotFound from "../NotFound"

const ConsumerRoutes = () => (
    <ConsumerProvider>
        <Router>
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
                <Login path="login" />
                <Login path="signup" />
                <NotFound default />
            </ConsumerLayout>
        </Router>
    </ConsumerProvider>
)

export default ConsumerRoutes