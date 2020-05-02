import React, { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import Button from "../Button"
import NavLink from "../NavLink"
import FlexContainer from "../FlexContainer"

import './index.css'

const AdminHome = () => {
    const { isLoggedIn, logout } = useContext(AuthContext)
    const handleLogout = e => {
        e && e.preventDefault();
        logout();
    }
    return (
        <FlexContainer flexClasses="column justify-center align-center align-content-center">
            { 
                !isLoggedIn ? (
                    <>
                        <h1 className="center-text">Are you an existing customer?</h1>
                        <Button><NavLink label={"Log In"} path={"login"} disabled={false} hidden={isLoggedIn}/></Button>
                        <h2 className="center-text">Need to create an account?</h2>
                        <Button><NavLink label={"Sign Up Now!"} path={"signup"} disabled={isLoggedIn} hidden={isLoggedIn}/></Button>
                    </>
                ) : (
                    <Button><NavLink label={"Log-Out"} path={"login"} disabled={false} hidden={!isLoggedIn} handleClick={handleLogout}/></Button>
                )
            }
        </FlexContainer>
    )
        
}

export default AdminHome;


