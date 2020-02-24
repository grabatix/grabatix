import React from "react"
import PropTypes from 'prop-types'

import "./index.css"

const Footer = ({children, ...props}) => (
    <footer {...props}>
        {children}
    </footer>
)

Footer.propTypes = {}

export default Footer;