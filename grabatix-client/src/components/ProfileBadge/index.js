import React from 'react'
import PropTypes from 'prop-types'
import { MdAccountCircle } from "react-icons/md"

import "./index.css"

const ProfileBadge = ({isLoggedIn, ...props}) => (
    <button className={`profile-container ${isLoggedIn ? "loggedin" : "loggedout"}`} onClick={()=>{}}>
        {
            isLoggedIn && <MdAccountCircle/>
        }
    </button>
)

ProfileBadge.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default ProfileBadge