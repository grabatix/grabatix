import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import { useMatch } from "@reach/router"
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import NavLink from "../NavLink"
import SubNavLink from '../SubNavLink'
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
    return (
        <div className="profile-block-container">
            <ProfileBadge user={user} handleClick={handleMenuOpenState}/>
            <ProfileMenu user={user} isOpen={isOpen} handleClick={handleMenuOpenState}>
                <NavLink label={"My Account"} path={``} disabled={!isLoggedIn} hidden={false} />
                <NavLink label={"My Cart"} path={``} disabled={false} hidden={adminMatch} />
                <SubNavLink label={"Reports"} path={``} disabled={!isLoggedIn} hidden={!adminMatch} />
                <SubNavLink label={"Scan Codes"} path={``} disabled={!isLoggedIn} hidden={!attendantMatch} />
                <SubNavLink label={"Recent Scans"} path={``} disabled={!isLoggedIn} hidden={!attendantMatch} />
                <SubNavLink label={"Online Transactions"} path={``} disabled={!isLoggedIn} hidden={!reportsMatch} />
                <SubNavLink label={"Attendant Transactions"} path={``} disabled={!isLoggedIn} hidden={!reportsMatch} />
                <SubNavLink label={"Users"} path={``} disabled={!isLoggedIn} hidden={!adminMatch} />
                <SubNavLink label={"My Codes"} path={``} disabled={!isLoggedIn} hidden={adminMatch} />
                <SubNavLink label={"My History"} path={``} disabled={!isLoggedIn} hidden={adminMatch} />
                <SubNavLink label={"Edit"} path={`edit`} disabled={!isLoggedIn} hidden={false} />
                {
                    isLoggedIn ? (
                        <NavLink label={"Log-Out"} path={``} disabled={false} hidden={false}/>
                    ) : (
                        <NavLink label={"Log-In"} path={``} disabled={false} hidden={false}/>
                    )
                }
                <NavLink label={isLoggedIn ? "" : "Sign-Up"} path={``} disabled={isLoggedIn} hidden={isLoggedIn}/>
            </ProfileMenu>
        </div>
    )
}

export default ProfileBlock