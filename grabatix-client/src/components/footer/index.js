import React from "react"
import PropTypes from 'prop-types'

import "./index.css"

const Footer = ({children, utilityClasses, ...props}) => (
    <footer {...props} className={utilityClasses}>
        {children}
    </footer>
)

Footer.propTypes = {
    children: PropTypes.node,
    utilityClasses: PropTypes.string
}

export default Footer;