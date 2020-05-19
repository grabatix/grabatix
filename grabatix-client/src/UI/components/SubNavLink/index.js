/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import NavLink from '../NavLink'
import { FaAngleDoubleRight } from 'react-icons/fa'

import './index.css'

const SubNavLink = ({ hidden, ...props }) =>
  !hidden ? (
    <div className={`sub-nav-link`}>
      <FaAngleDoubleRight />
      <NavLink {...props} />
    </div>
  ) : null

SubNavLink.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
}

export default SubNavLink
