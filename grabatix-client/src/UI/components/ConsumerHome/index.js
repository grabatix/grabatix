/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import NavLink from '../NavLink'
import ImageUpload from '../FormComponents/ImageUpload'

import './index.css'

const ConsumerHome = props => (
  <>
    <h2>Consumer Home</h2>
    <ImageUpload endpoint="/api/v1/company/upload/5eec2b822e1e4c3126a09229" />
  </>
)

ConsumerHome.propTypes = {}

export default ConsumerHome
