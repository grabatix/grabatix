import React from 'react';
import PropTypes from 'prop-types'

import "./index.css"

const Button = ({children, classNames = "", handleClick, innerText = ""}) => (
    <button className={"btn " + classNames} onClick={handleClick} value={innerText}>{children}</button>
)

Button.propTypes = {
    children:PropTypes.node,
    classNames: PropTypes.string,
    handleClick: PropTypes.func,
    innerText: PropTypes.string
}

export default Button;