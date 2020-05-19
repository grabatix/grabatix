/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const Header = ({ children, utilityClasses = '', ...props }) => (
  <header {...props} className={utilityClasses}>
    {children}
  </header>
)

Header.propTypes = {
  children: PropTypes.node,
  utilityClasses: PropTypes.string,
}

export default Header
