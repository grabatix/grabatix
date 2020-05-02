import React from 'react'
import { Router } from "@reach/router";
import AdminProvider from "../../providers/AdminProvider"
import withAdminContext from "../../hoc/withAdminContext"
import AdminLayout from "../../UI/layouts/Admin"
import AdminAccount from "../../UI/components/AdminAccount"
import AdminHome from "../../UI/components/AdminHome"
import Account from "../../UI/components/Account"
import Register from "../../UI/components/Register"
import Reports from "../../UI/components/Reports"
import ReportsHome from "../../UI/components/ReportsHome"
import OnlineTransactions from "../../UI/components/OnlineTransactions"
import AttendantTransactions from "../../UI/components/AttendantTransactions"
import Edit from "../../UI/components/Edit"
import Users from '../../UI/components/Users'
import Login from "../../UI/components/Login"
import NotFound from "../NotFound"

const AdminLogin = withAdminContext(Login)

const AdminRoutes = () => (
    <AdminProvider>
        <Router>
            <AdminLayout path="/">
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
                <AdminLogin path="login" />
                <AdminLogin path="signup" />
                <NotFound default />
            </AdminLayout>
        </Router>
    </AdminProvider>
)

export default AdminRoutes