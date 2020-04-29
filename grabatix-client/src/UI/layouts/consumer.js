import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"
import Logo from "../components/Logo"
import Button from "../components/Button"
import LoginModal from "../components/LoginModal";
import FlexContainer from "../components/FlexContainer"

const ConsumerLayout = ({children}) => (
    <main>
        {children}
    </main>
)

ConsumerLayout.propTypes = {
    children: PropTypes.node
}

export default ConsumerLayout;