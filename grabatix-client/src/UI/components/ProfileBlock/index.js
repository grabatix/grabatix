import React, {useState, useContext} from 'react'
import { Redirect, Link } from "@reach/router"
import PropTypes from 'prop-types'
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import MenuButton from "../MenuButton"
import SubMenuButton from '../SubMenuButton'
import { AuthContext } from '../../../providers/AuthProvider'

import "./index.css"


// TO DO: CONVERT ALL FUNCTIONS IN PROPS TO IMPORT FROM CONTEXT

const ProfileBlock = ({handleModalOpen, setAccountOpen, setReportsOpen = async () => (''), includeReports = false}) => {
    const [isOpen, setOpenMenu] = useState(false)
    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const handleMenuOpenState = e => {
        e && e.preventDefault();
        setOpenMenu(!isOpen);
    }
    const handleLoginClick = type => {
        // 
        setOpenMenu(false)
    }
    const handleLogout = e => {
        e && e.preventDefault();
        logout();
    }
    return (
        <div className="profile-block-container">
            <ProfileBadge user={user} handleClick={handleMenuOpenState}/>
            <ProfileMenu user={user} isOpen={isOpen} handleClick={handleMenuOpenState}>
                <MenuButton value={"Account"} disabled={!isLoggedIn} hidden={false} />
                <SubMenuButton value={includeReports ? "Reports" : ""} disabled={!isLoggedIn} hidden={!includeReports} />
                {
                    isLoggedIn ? (
                        <MenuButton value={"Log-Out"} handleClick={handleLogout} disabled={false} hidden={false}/>
                    ) : (
                        <MenuButton value={"Log-In"} handleClick={(e)=>handleLoginClick("login")} disabled={false} hidden={false}/>
                    )
                }
                <MenuButton value={isLoggedIn ? "" : "Sign-Up"} handleClick={(e)=>handleLoginClick("signup")} disabled={isLoggedIn} hidden={isLoggedIn}/>
            </ProfileMenu>
        </div>
    )
}

export default ProfileBlock