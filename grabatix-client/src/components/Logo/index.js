import React from 'react'
import PropTypes from 'prop-types'

import "./index.css"

const Logo = ({children, utilityClasses, ...props}) => (
    <div className={`logo-container ${utilityClasses}`}>
        {children}
    </div>
)

Logo.propTypes = {
    children: PropTypes.node,
    utilityClasses: PropTypes.string
}

export default Logo