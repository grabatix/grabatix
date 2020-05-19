/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const FlexContainer = ({
  children,
  flexClasses = ``,
  utilityClasses = ``,
  style,
  ...props
}) => (
  <div
    className={`flex-container ${flexClasses} ${utilityClasses}`}
    style={style}
    {...props}
  >
    {children}
  </div>
)

FlexContainer.propTypes = {
  children: PropTypes.node,
  flexClasses: PropTypes.string,
  utilityClasses: PropTypes.string,
  style: PropTypes.object,
}

export default FlexContainer
