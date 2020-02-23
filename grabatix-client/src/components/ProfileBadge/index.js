import React from 'react'
import PropTypes from 'prop-types'
import { MdAccountCircle } from "react-icons/md"

import "./index.css"

const ProfileBadge = ({isLoggedIn, handleClick, ...props}) => (
    <button className={`profile-container ${isLoggedIn ? "loggedin" : "loggedout"}`} onClick={handleClick}>
        {
            isLoggedIn && <MdAccountCircle/>
        }
    </button>
)

ProfileBadge.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default ProfileBadge