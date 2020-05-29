/** @format */

import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from '@reach/router'
import ProfileBadge from '../ProfileBadge'
import ProfileMenu from '../ProfileMenu'
import ProfileLinks from '../ProfileLinks'
import { AuthContext } from '../../../providers/AuthProvider'

import './index.css'

const ProfileBlock = () => {
  const [isOpen, setOpenMenu] = useState(false)
  const { user, isLoggedIn } = useContext(AuthContext)
  const location = useLocation()

  const handleMenuOpenState = e => {
    e && e.preventDefault()
    setOpenMenu(!isOpen)
  }

  useEffect(() => {
    setOpenMenu(false)
  }, [location])

  return (
    <div className="profile-block-container">
      <ProfileBadge handleClick={handleMenuOpenState} />
      <ProfileMenu isOpen={isOpen} handleClick={handleMenuOpenState}>
        {isLoggedIn && <div>Welcome, {user.displayName}</div>}
        <ProfileLinks />
      </ProfileMenu>
    </div>
  )
}

ProfileBlock.propTypes = {}

export default ProfileBlock
