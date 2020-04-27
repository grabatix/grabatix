import React from "react"
import PropTypes from 'prop-types'
import MenuButton from "../MenuButton"
import { FaAngleDoubleRight } from 'react-icons/fa'

import "./index.css"

const SubMenuButton = props => props.value && (
    <div className="sub-menu-link">
        <FaAngleDoubleRight />
        <MenuButton {...props}/>
    </div>
)

SubMenuButton.propTypes = {
    role: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool
}

export default SubMenuButton;