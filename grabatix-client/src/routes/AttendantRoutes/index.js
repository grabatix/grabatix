import React, { useContext, Suspense, lazy } from "react";
import { Router } from "@reach/router";
import AttendantProvider from "../../providers/AttendantProvider"
import AttendantLayout from "../../UI/layouts/Attendant"
import AttendantAccount from "../../UI/components/AttendantAccount"
import AttendantHome from "../../UI/components/AttendantHome"
import Account from "../../UI/components/Account"
import Edit from "../../UI/components/Edit"
import Scan from "../../UI/components/Scan"
import ScanHistory from "../../UI/components/ScanHistory"
import NotFound from "../NotFound"

const AttendantRoutes = () => (
    <AttendantProvider>
        <Router>
            <AttendantLayout path="/">
                <AttendantHome path="/" />
                <Account path="account" >
                    <AttendantAccount path="/" />
                    <ScanHistory path="recent-scans" />
                    <Edit path="edit" />
                </Account>
                <Scan path="scan" />
                <NotFound default />
            </AttendantLayout>
        </Router>
    </AttendantProvider>
)

export default AttendantRoutes