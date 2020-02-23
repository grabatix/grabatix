import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ProfileBadge from "../ProfileBadge"
import ProfileMenu from "../ProfileMenu"
import Login from "../Login"

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
                <Login isLoggedIn={isLoggedIn} />
            </ProfileMenu>
        </div>
    )
}


ProfileBlock.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default ProfileBlock