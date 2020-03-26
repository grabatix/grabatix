import React from "react"
import PropTypes from 'prop-types'

import "./index.css"

const IntakeForm = ({utilityClasses, ...props}) => (
    <form {...props} className={utilityClasses}>
        {/* connect to Quickbooks */}
    </form>
)

IntakeForm.propTypes = {
    utilityClasses: PropTypes.string
}

export default IntakeForm;