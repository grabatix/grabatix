/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const SubmitButton = ({
  classNames = ``,
  handleClick,
  disabled = false,
  value = `Submit`,
  hasErrors = false,
  error = ``,
}) => (
  <div className="submit-button-group">
    <input
      type="submit"
      className={`submit-btn ` + classNames}
      id="submit"
      onClick={handleClick}
      disabled={disabled}
      value={disabled ? `Please Wait...` : value}
    />
    {hasErrors && (
      <div className="form-error">{error ? error : `Please scroll up to correct errors.`}</div>
    )}
  </div>
)

SubmitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hasErrors: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  classNames: PropTypes.string,
}

export default SubmitButton
