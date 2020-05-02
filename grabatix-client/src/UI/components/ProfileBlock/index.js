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

    const handleLogout = e => {
        e && e.preventDefault();
        logout();
    }

    const basePaths = {
        accountPath: "/account", 
        editPath: "/account/edit", 
        homePath: "/", 
        loginPath: "/login", 
        signupPath: "/signup"
    }

    if ( !!attendantMatch || !!adminMatch ) {
        for (let path in basePaths) {
            if (path === 'loginPath' && path === 'signupPath' && !!attendantMatch) {
                continue;
            }
            const rootPath = !!adminMatch ? "/admin" : "/attendant";
            basePaths[path] = rootPath + basePaths[path];
        }
    }

    const {
        accountPath, editPath, homePath, loginPath, signupPath
    } = basePaths; 
    
    return (
        <div className="profile-block-container">
            <ProfileBadge handleClick={handleMenuOpenState}/>
            <ProfileMenu isOpen={isOpen} handleClick={handleMenuOpenState}>
                { isLoggedIn && <div>Welcome, {user.displayName}</div> }
                <NavLink label={"Home"} path={homePath} disabled={false} hidden={false} />
                <NavLink label={"My Cart"} path={`/cart`} disabled={!isLoggedIn} hidden={!!adminMatch} />
                <NavLink label={"My Account"} path={accountPath} disabled={!isLoggedIn} hidden={!isLoggedIn} />
                <SubNavLink label={"Reports"} path={`/admin/account/reports`} disabled={!isLoggedIn} hidden={!adminMatch || !isLoggedIn} />
                <SubNavLink label={"Scan Codes"} path={`/attendant/scan`} disabled={!isLoggedIn} hidden={!attendantMatch || !isLoggedIn} />
                <SubNavLink label={"Recent Scans"} path={`/attendant/account/recent-scans`} disabled={!isLoggedIn} hidden={!attendantMatch ||!isLoggedIn} />
                <SubNavLink label={"Online Transactions"} path={`/admin/account/reports/online-transactions`} disabled={!isLoggedIn} hidden={!reportsMatch || !isLoggedIn} />
                <SubNavLink label={"Attendant Transactions"} path={`/admin/account/reports/attendant-activity`} disabled={!isLoggedIn} hidden={!reportsMatch || !isLoggedIn} />
                <SubNavLink label={"Users"} path={`/admin/users`} disabled={!isLoggedIn} hidden={!adminMatch || !isLoggedIn} />
                <SubNavLink label={"My Codes"} path={`/account/codes`} disabled={!isLoggedIn} hidden={!!adminMatch || !isLoggedIn} />
                <SubNavLink label={"My History"} path={`/account/history`} disabled={!isLoggedIn} hidden={!!adminMatch || !isLoggedIn} />
                <SubNavLink label={"Edit"} path={editPath} disabled={!isLoggedIn} hidden={!isLoggedIn} />
                <NavLink label={"Log-Out"} path={loginPath} disabled={false} hidden={!isLoggedIn} handleClick={handleLogout}/>
                <NavLink label={"Log-In"} path={loginPath} disabled={false} hidden={isLoggedIn}/>
                <NavLink label={"Sign-Up"} path={signupPath} disabled={isLoggedIn} hidden={isLoggedIn}/>
                <DarkSwitcher />
            </ProfileMenu>
        </div>
    )
}

export default ProfileBlock