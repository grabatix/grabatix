import React from 'react'

import "./index.css"

const Logo = ({children, ...props}) => (
    <div className="logo-container">
        {children}
    </div>
)

export default Logo