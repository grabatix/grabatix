/** @format */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ProfileImage from '../ProfileImage'
import { AuthContext } from '../../../providers/AuthProvider'

import './index.css'

const ProfileBadge = ({ handleClick, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <button
      className={`profile-container ${isLoggedIn ? `loggedin` : `loggedout`}`}
      onClick={handleClick}
      tabIndex={0}
      aria-label="Profile Image Container, Click to Open Menu"
    >
      <ProfileImage />
    </button>
  )
}

ProfileBadge.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default ProfileBadge
