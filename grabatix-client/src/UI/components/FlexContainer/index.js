import React from 'react'
import PropTypes from 'prop-types'

import "./index.css"

const FlexContainer = ({children, flexClasses, ...props}) => (
    <div className={`flex-container ${flexClasses}`}>
        {children}
    </div>
)

FlexContainer.propTypes = {
    children: PropTypes.node,
    flexClasses: PropTypes.string
}

export default FlexContainer