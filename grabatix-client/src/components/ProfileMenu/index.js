import React from 'react'
import PropTypes from 'prop-types'

import "./index.css"

const ProfileMenu = ({isLoggedIn, children, ...props}) => (
    <div className="profile-menu-container">
        {children}
    </div>
)

ProfileMenu.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default ProfileMenu