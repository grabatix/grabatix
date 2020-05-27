/** @format */

import React, { useContext } from 'react'
import Proptypes from 'prop-types'
import { Redirect } from '@reach/router'
import Dashboard from '../Dashboard'
import { AuthContext } from '../../../providers/AuthProvider'
import { AdminContext } from '../../../providers/AdminProvider'

import './index.css'

const AdminDashboard = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const { isAdminUser } = useContext(AdminContext)

  return (isLoggedIn && isAdminUser) || !isLoggedIn ? (
    <Dashboard>{children}</Dashboard>
  ) : (
    <Redirect noThrow to="/unauthorized" />
  )
}

AdminDashboard.propTypes = {
  children: Proptypes.node.isRequired,
}

export default AdminDashboard
