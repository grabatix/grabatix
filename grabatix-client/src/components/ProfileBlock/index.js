import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import LoginButton from "../LoginButton"
import LoginModal from '../LoginModal'

import "./index.css"

const ProfileBlock = ({isLoggedIn}) => {
    const [isOpen, setOpenMenu] = useState(false)
    const handleMenuOpenState = e => {
        e.preventDefault();
        setOpenMenu(!isOpen);
    }
    return (
        <div className="profile-block-container">
            <ProfileBadge isLoggedIn={isLoggedIn} handleClick={handleMenuOpenState}/>
            <ProfileMenu isLoggedIn={isLoggedIn} isOpen={isOpen} handleClick={handleMenuOpenState}>
                <LoginButton isLoggedIn={isLoggedIn} />
                <LoginModal isLoggedIn={isLoggedIn} type="login"/>
            </ProfileMenu>
        </div>
    )
}

ProfileBlock.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default ProfileBlock