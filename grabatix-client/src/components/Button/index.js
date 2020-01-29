import React from 'react';
import PropTypes from 'prop-types'

import "./index.css"

const Button = ({classNames = "", handleClick = ()=>{}, innerText = ""}) => (
    <button className={classNames} onClick={handleClick}>{innerText}</button>
)

Button.propTypes = {
    classNames: PropTypes.string,
    handleClick: PropTypes.func,
    innerText: PropTypes.string
}

export default Button;