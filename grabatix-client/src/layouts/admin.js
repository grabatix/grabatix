import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"

const AdminLayout = ({children, isLoggedIn, setLoginStatus, setAccountOpen, setReportsOpen, ...props}) => (
    <>
        <Header>
            <ProfileBlock isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus} setAccountOpen={setAccountOpen} setReportsOpen={setReportsOpen} includeReports={true}/>
        </Header>
        <main>
            {children}
        </main>
    </>
)

AdminLayout.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginStatus: PropTypes.func.isRequired,
    setAccountOpen: PropTypes.func.isRequired,
    setReportsOpen: PropTypes.func.isRequired
}

export default AdminLayout