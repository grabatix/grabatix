import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import MenuButton from "../MenuButton"
import SubMenuButton from '../SubMenuButton'

import "./index.css"

// TO DO: CONVERT ALL FUNCTIONS IN PROPS TO IMPORT FROM CONTEXT

const ProfileBlock = ({isLoggedIn, setLoginStatus, handleModalOpen, setAccountOpen, setReportsOpen = async () => (''), includeReports = false}) => {
    const [isOpen, setOpenMenu] = useState(false)
    const handleMenuOpenState = e => {
        e && e.preventDefault();
        setOpenMenu(!isOpen);
    }
    const handleLoginClick = type => {
        handleModalOpen(type);
        setOpenMenu(false)
    }
    const handleLogout = e => {
        e && e.preventDefault();
        setLoginStatus(false);
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

ProfileBlock.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    setLoginStatus: PropTypes.func.isRequired,
    setAccountOpen: PropTypes.func.isRequired,
    setReportsOpen: PropTypes.func,
    includeReports: PropTypes.bool
}

export default ProfileBlock