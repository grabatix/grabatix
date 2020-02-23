import React from "react"

import "./index.css"

const Footer = ({children, ...props}) => (
    <footer {...props}>
        {children}
    </footer>
)

export default Footer;