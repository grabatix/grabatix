/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

import './index.css'

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'navlink active' } : { className: 'navlink' }
}

const NavLink = ({ path, disabled, label, hidden, handleClick, ...props }) =>
  !hidden ? (
    <Link
      to={path}
      getProps={isActive}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {label}
    </Link>
  ) : null

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
}

export default NavLink
