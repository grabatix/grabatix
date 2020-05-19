/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { useMatch } from '@reach/router'

import './index.css'

const Footer = ({ children, utilityClasses, ...props }) => {
  const adminMatch = useMatch('/admin/*')
  return (
    !adminMatch && (
      <footer {...props} className={utilityClasses}>
        {children}
      </footer>
    )
  )
}

Footer.propTypes = {
  children: PropTypes.node,
  utilityClasses: PropTypes.string,
}

export default Footer
