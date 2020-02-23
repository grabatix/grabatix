import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"

const Attendant = ({children, isLoggedIn, ...props}) => (
    <>
        <Header>
            <ProfileBlock isLoggedIn={isLoggedIn}/>
        </Header>
        <main>
            {children}
        </main>
    </>
)

Attendant.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Attendant