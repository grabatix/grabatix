/** @format */

import React, { useContext } from 'react'
import Proptypes from 'prop-types'
import Dashboard from '../Dashboard'
import FlexContainer from '../FlexContainer'
import { AuthContext } from '../../../providers/AuthProvider'

import './index.css'

const ConsumerDashboard = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? (
    <Dashboard>{children}</Dashboard>
  ) : (
    <FlexContainer utilityClasses={`dashboard-full`}>{children}</FlexContainer>
  )
}

ConsumerDashboard.propTypes = {
  children: Proptypes.node.isRequired,
}

export default ConsumerDashboard
