import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import MenuButton from "../MenuButton"

import "./index.css"

const ProfileBlock = ({isLoggedIn, setLoginStatus}) => {
    const [isOpen, setOpenMenu] = useState(false)
    const handleMenuOpenState = e => {
        e.preventDefault();
        setOpenMenu(!isOpen);
    }
    const handleLoginStatus = e => {
        e.preventDefault();
        setLoginStatus(!isLoggedIn);
    }
    return (
        <div className="profile-block-container">
            <ProfileBadge isLoggedIn={isLoggedIn} handleClick={handleMenuOpenState}/>
            <ProfileMenu isLoggedIn={isLoggedIn} isOpen={isOpen} handleClick={handleMenuOpenState}>
                <MenuButton value={isLoggedIn ? "Log-Out" : "Log-In"} handleClick={handleLoginStatus} disabled={false} hidden={false}/>
                <MenuButton value={isLoggedIn ? "" : "Sign-Up"} handleClick={handleLoginStatus} disabled={isLoggedIn} hidden={isLoggedIn}/>
            </ProfileMenu>
        </div>
    )
}

ProfileBlock.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginStatus: PropTypes.func.isRequired
}

export default ProfileBlock