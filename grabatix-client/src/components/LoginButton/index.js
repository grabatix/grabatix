import React from "react"
import PropTypes from 'prop-types'

import "./index.css"

const LoginButton = ({isLoggedIn}) => (
    <button className="login-link">
        {
            isLoggedIn ? "Logout" : "Login"
        }
    </button>
)

LoginButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default LoginButton;