/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import CloseBtn from '../../images/CloseBtn'

import './index.css'

const ProfileMenu = ({ isOpen, children, handleClick, ...props }) => (
  <div
    className={`profile-menu-container ${isOpen ? `menuopen` : `menuclosed`}`}
  >
    {children}
    <CloseBtn handleClick={handleClick} />
  </div>
)

ProfileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default ProfileMenu
