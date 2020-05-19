/** @format */

import React, { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import Button from '../Button'
import NavLink from '../NavLink'
import FlexContainer from '../FlexContainer'

import './index.css'

const AdminHome = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext)
  return !isLoggedIn ? (
    <FlexContainer flexClasses="column justify-center align-center align-content-center flex-grow-1">
      <h1 className="center-text">Are you an existing customer?</h1>
      <Button>
        <NavLink
          label={`Log In`}
          path={`login`}
          disabled={false}
          hidden={isLoggedIn}
        />
      </Button>
      <h2 className="center-text">Need to create an account?</h2>
      <Button>
        <NavLink
          label={`Sign Up Now!`}
          path={`signup`}
          disabled={isLoggedIn}
          hidden={isLoggedIn}
        />
      </Button>
    </FlexContainer>
  ) : (
    <>{children}</>
  )
}

export default AdminHome
