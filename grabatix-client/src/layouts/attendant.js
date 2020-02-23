import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBadge from "../components/ProfileBadge"
import ProfileMenu from "../components/ProfileMenu"

const Attendant = ({children, isLoggedIn, ...props}) => (
    <>
        <Header>
            <ProfileBadge isLoggedIn={isLoggedIn}/>
            <ProfileMenu isLoggedIn={isLoggedIn} />
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