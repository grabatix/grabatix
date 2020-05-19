/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const RadioButtonGroup = ({
  id,
  name,
  checked = false,
  handleInputChange,
  label,
  disabled = false,
}) => {
  return (
    <div id={`${id}-group`} className="radio-group">
      <input
        name={name}
        id={id}
        type="radio"
        checked={checked}
        onChange={handleInputChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

RadioButtonGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default RadioButtonGroup
