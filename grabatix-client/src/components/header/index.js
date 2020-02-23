import React from 'react'

import "./index.css"

const Header = ({children, ...props}) => (
    <header {...props}>
        {children}
    </header>
)

export default Header;