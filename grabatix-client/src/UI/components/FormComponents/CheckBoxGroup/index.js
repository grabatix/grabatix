/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const CheckBoxGroup = ({ id, checked = false, handleInputChange, label, disabled = false }) => {
  return (
    <div className="checkbox-group">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={handleInputChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

CheckBoxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default CheckBoxGroup
