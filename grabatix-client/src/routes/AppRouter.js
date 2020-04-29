import React, { useContext, Suspense, lazy } from "react";
import { AppContext } from "../providers/AppProvider"
import { Router } from "@reach/router";
import Header from '../UI/components/Header'
import ProfileBlock from "../UI/components/ProfileBlock"
import AdminLayout from "../UI/layouts/admin"
import ConsumerLayout from "../UI/layouts/consumer"
import AttendantLayout from "../UI/layouts/attendant"
import Account from "../UI/components/Account"
import AdminAccount from "../UI/components/AdminAccount"
import AdminHome from "../UI/components/AdminHome"
import Register from "../UI/components/Register"
import Edit from "../UI/components/Edit"
import Reports from "../UI/components/Reports"
import ReportsHome from "../UI/components/ReportsHome"
import ConsumerAccount from "../UI/components/ConsumerAccount"
import ConsumerHome from "../UI/components/ConsumerHome"
import OnlineTransactions from "../UI/components/OnlineTransactions"
import Cart from "../UI/components/Cart"
import CartHome from "../UI/components/CartHome"
import Checkout from "../UI/components/Checkout"
import AttendantHome from "../UI/components/AttendantHome"
import AttendantAccount from "../UI/components/AttendantAccount"
import AttendantTransactions from "../UI/components/AttendantTransactions"
import History from "../UI/components/History"
import Codes from "../UI/components/Codes"
import Scan from "../UI/components/Scan"
import Users from '../UI/components/Users'
import NotFound from "./NotFound"
import UnAuthorized from "./UnAuthorized";

const HeaderWrapper = ({children}) => (
    <>
        <Header>
            <ProfileBlock />
        </Header>
        { children }
    </>
)

const AdminRoutes = () => (
    <AdminLayout path="admin">
        <AdminHome path="/" />
        <Register path="register" />
        <Account path="account">
            <AdminAccount path="/" />
            <Edit path="edit" />
            <Reports path="reports">
                <ReportsHome path="/" />
                <OnlineTransactions path="online-transactions" />
                <AttendantTransactions path="attendant-activity" />
            </Reports>
            <Users path="users" />
        </Account>
    </AdminLayout>
)

const AppRouter = () => {
    const { subdomain } = useContext(AppContext)
    switch(subdomain) {
        case "admin":
            return (
                <Router>
                    <HeaderWrapper path="/">
                        <AdminRoutes />
                        <UnAuthorized path="unauthorized" />
                        <NotFound default />
                    </HeaderWrapper>
                </Router>
            )
        case "localhost":
        default:
            return (
                <Router>
                    <HeaderWrapper path="/">
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
                        <AttendantLayout path="attendant">
                            <AttendantHome path="/" />
                            <Account path="account" >
                                <AttendantAccount path="/" />
                                <Edit path="edit" />
                            </Account>
                            <Scan path="scan" />
                            <NotFound default />
                        </AttendantLayout>
                        <UnAuthorized path="unauthorized" />
                    </HeaderWrapper>
                </Router>
            )
    }
}

export default AppRouter;