import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import MenuButton from "../MenuButton"
import SubMenuButton from '../SubMenuButton'

import "./index.css"

const ProfileBlock = ({isLoggedIn, setLoginStatus, setAccountOpen, setReportsOpen = async () => (''), includeReports = false}) => {
    const [isOpen, setOpenMenu] = useState(false)
    const handleMenuOpenState = e => {
        e && e.preventDefault();
        setOpenMenu(!isOpen);
    }
    const handleLoginStatus = e => {
        e && e.preventDefault();
        setLoginStatus(!isLoggedIn);
    }
    const openAccount = async (e) => {
        e.preventDefault();
        try {
            const accountOpen = await setAccountOpen();
            setOpenMenu(false);
        } catch (e) {
            console.error({AccountOpenError: e});
        }
    }
    const openReports = async (e) => {
        e.preventDefault();
        try {
            const reportsOpen = await setReportsOpen();
            setOpenMenu(false);
        } catch (e) {
            console.error({ReportsOpenError: e});
        }
    }
    return (
        <div className="profile-block-container">
            <ProfileBadge isLoggedIn={isLoggedIn} handleClick={handleMenuOpenState}/>
            <ProfileMenu isLoggedIn={isLoggedIn} isOpen={isOpen} handleClick={handleMenuOpenState}>
                <MenuButton value={"Account"} handleClick={openAccount} disabled={!isLoggedIn} hidden={false} />
                <SubMenuButton value={includeReports ? "Reports" : ""} handleClick={openReports} disabled={!isLoggedIn} hidden={!includeReports} />
                <MenuButton value={isLoggedIn ? "Log-Out" : "Log-In"} handleClick={handleLoginStatus} disabled={false} hidden={false}/>
                <MenuButton value={isLoggedIn ? "" : "Sign-Up"} handleClick={handleLoginStatus} disabled={isLoggedIn} hidden={isLoggedIn}/>
            </ProfileMenu>
        </div>
    )
}

ProfileBlock.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginStatus: PropTypes.func.isRequired,
    setAccountOpen: PropTypes.func.isRequired,
    setReportsOpen: PropTypes.func,
    includeReports: PropTypes.bool
}

export default ProfileBlock