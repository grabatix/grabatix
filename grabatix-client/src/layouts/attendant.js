import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"

const Attendant = ({children, isLoggedIn, setLoginStatus, ...props}) => (
    <>
        <Header>
            <ProfileBlock isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus}/>
        </Header>
        <main>
            {children}
        </main>
    </>
)

Attendant.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginStatus: PropTypes.func.isRequired
}

export default Attendant