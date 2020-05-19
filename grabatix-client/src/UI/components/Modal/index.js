/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import CloseBtn from '../../images/CloseBtn'

import './index.css'

const Modal = ({ children, isOpen, setOpen }) =>
  isOpen && (
    <div className="modal-bg">
      <div className="modal-container">
        <CloseBtn handleClick={setOpen} />
        {children}
      </div>
    </div>
  )

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default Modal
