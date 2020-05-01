import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import { useMatch } from "@reach/router"
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import NavLink from "../NavLink"
import SubNavLink from '../SubNavLink'
import DarkSwitcher from "../DarkSwitcher"
import { AuthContext } from '../../../providers/AuthProvider'

import "./index.css"


// TO DO: CONVERT ALL FUNCTIONS IN PROPS TO IMPORT FROM CONTEXT

const ProfileBlock = () => {
    const [isOpen, setOpenMenu] = useState(false)
    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const attendantMatch = useMatch("/attendant/*")
    const adminMatch = useMatch("/admin/*")
    const reportsMatch = useMatch("/admin/reports/*")

    const handleMenuOpenState = e => {
        e && e.preventDefault();
        setOpenMenu(!isOpen);
    }

    let accountPath = "/account", editPath="/account/edit", homePath = "/";
    if ( attendantMatch ) {
        accountPath = "/attendant" + accountPath
        editPath = "/attendant" + editPath
        homePath = "/attendant" + homePath
    }
    if ( adminMatch ) {
        accountPath = "/admin" + accountPath
        editPath = "/admin" + editPath
        homePath = "/admin" + homePath
    }
    return (
        <div className="profile-block-container">
            <ProfileBadge handleClick={handleMenuOpenState}/>
            <ProfileMenu isOpen={isOpen} handleClick={handleMenuOpenState}>
                { isLoggedIn && <div>Welcome, {user.displayName}</div> }
                <NavLink label={"Home"} path={homePath} disabled={false} hidden={false} />
                <NavLink label={"My Cart"} path={`/cart`} disabled={false} hidden={adminMatch} />
                <NavLink label={"My Account"} path={accountPath} disabled={!isLoggedIn} hidden={false} />
                <SubNavLink label={"Reports"} path={`/admin/account/reports`} disabled={!isLoggedIn} hidden={!adminMatch} />
                <SubNavLink label={"Scan Codes"} path={`/attendant/scan`} disabled={!isLoggedIn} hidden={!attendantMatch} />
                <SubNavLink label={"Recent Scans"} path={`/attendant/account/recent-scans`} disabled={!isLoggedIn} hidden={!attendantMatch} />
                <SubNavLink label={"Online Transactions"} path={``} disabled={!isLoggedIn} hidden={!reportsMatch} />
                <SubNavLink label={"Attendant Transactions"} path={``} disabled={!isLoggedIn} hidden={!reportsMatch} />
                <SubNavLink label={"Users"} path={`/admin/users`} disabled={!isLoggedIn} hidden={!adminMatch} />
                <SubNavLink label={"My Codes"} path={`/account/codes`} disabled={!isLoggedIn} hidden={adminMatch} />
                <SubNavLink label={"My History"} path={`/account/history`} disabled={!isLoggedIn} hidden={adminMatch} />
                <SubNavLink label={"Edit"} path={editPath} disabled={!isLoggedIn} hidden={false} />
                {
                    isLoggedIn ? (
                        <NavLink label={"Log-Out"} path={``} disabled={false} hidden={false}/>
                    ) : (
                        <NavLink label={"Log-In"} path={``} disabled={false} hidden={false}/>
                    )
                }
                <NavLink label={isLoggedIn ? "" : "Sign-Up"} path={``} disabled={isLoggedIn} hidden={isLoggedIn}/>
                <DarkSwitcher />
            </ProfileMenu>
        </div>
    )
}

export default ProfileBlock