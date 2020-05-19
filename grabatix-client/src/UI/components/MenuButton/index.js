/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const MenuButton = ({ value, handleClick, role, disabled, hidden }) =>
  value && (
    <button
      className="menu-link"
      onClick={handleClick}
      role={role ? role : `button`}
      disabled={disabled}
      hidden={hidden}
    >
      {value}
    </button>
  )

MenuButton.propTypes = {
  role: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
}

export default MenuButton
