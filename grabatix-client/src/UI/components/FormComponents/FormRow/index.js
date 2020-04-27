import React from 'react';
import PropTypes from 'prop-types'

import "./index.css"

const FormRow = ({children, wrapped, ...props}) => (
    <div className={`form-row ${wrapped ? "wrapped" : ""}`} {...props}>
        {children}
    </div>
)

FormRow.propTypes = {
    wrapped: PropTypes.bool
}

export default FormRow;