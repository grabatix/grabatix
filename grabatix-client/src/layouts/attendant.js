import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"

const AttendantLayout = ({children, isLoggedIn, setLoginStatus, setAccountOpen, ...props}) => (
    <>
        <Header>
            <ProfileBlock isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus} setAccountOpen={setAccountOpen}/>
        </Header>
        <main>
            {children}
        </main>
    </>
)

AttendantLayout.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginStatus: PropTypes.func.isRequired,
    setAccountOpen: PropTypes.func.isRequired
}

export default AttendantLayout