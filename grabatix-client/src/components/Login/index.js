import React from "react"
import PropTypes from 'prop-types'

import "./index.css"

const Login = ({isLoggedIn}) => (
    <button className="login-link">
        {
            isLoggedIn ? "Logout" : "Login"
        }
    </button>
)

Login.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Login;