/** @format */

import React, { useContext } from 'react'
import FlexContainer from '../FlexContainer'
import NavLink from '../NavLink'
import SubNavLink from '../SubNavLink'
import DarkSwitcher from '../DarkSwitcher'
import { AuthContext } from '../../../providers/AuthProvider'
import { consumerPaths } from '../../../config/paths'

import './index.css'

const ConsumerDashboard = ({ children }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext)
  const handleLogout = e => {
    e && e.preventDefault()
    logout()
  }

  const {
    accountPath,
    editPath,
    homePath,
    loginPath,
    signupPath,
    codesPath,
    historyPath,
  } = consumerPaths

  return (
    <FlexContainer flexClasses="row justify-content-center align-start">
      <FlexContainer
        flexClasses="column justify-content-start align-start flex-grow-1 flex-shrink-0"
        utilityClasses="dashboard-left p-1"
      >
        {isLoggedIn && <div>Welcome, {user.displayName}</div>}
        <NavLink
          label={'Home'}
          path={homePath}
          disabled={false}
          hidden={false}
        />
        <NavLink
          label={'My Account'}
          path={accountPath}
          disabled={!isLoggedIn}
          hidden={!isRegistered || !isLoggedIn}
        />
        <SubNavLink
          label={'My Codes'}
          path={codesPath}
          disabled={!isLoggedIn}
          hidden={!!adminMatch || !isLoggedIn}
        />
        <SubNavLink
          label={'My History'}
          path={historyPath}
          disabled={!isLoggedIn}
          hidden={!!adminMatch || !isLoggedIn}
        />
        <SubNavLink
          label={'Edit'}
          path={editPath}
          disabled={!isLoggedIn}
          hidden={!isLoggedIn}
        />
        <NavLink
          label={'Log-Out'}
          path={loginPath}
          disabled={false}
          hidden={!isLoggedIn}
          handleClick={handleLogout}
        />
        <NavLink
          label={'Log-In'}
          path={loginPath}
          disabled={false}
          hidden={isLoggedIn}
        />
        <NavLink
          label={'Sign-Up'}
          path={signupPath}
          disabled={isLoggedIn}
          hidden={isLoggedIn}
        />
        <DarkSwitcher />
      </FlexContainer>
      <FlexContainer
        flexClasses="flex-grow-5 flex-shrink-1"
        utilityClasses="dashboard-right"
      >
        {children}
      </FlexContainer>
    </FlexContainer>
  )
}

export default ConsumerDashboard
