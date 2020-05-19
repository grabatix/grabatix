/** @format */

import React, { useContext, Suspense, lazy } from 'react'
import { Router } from '@reach/router'
import { AppContext } from '../providers/AppProvider'
import AdminRoutes from './AdminRoutes'
import AttendantRoutes from './AttendantRoutes'
import ConsumerRoutes from './ConsumerRoutes'

import MasterLayout from '../UI/layouts/MasterLayout'
import NotFound from './NotFound'
import UnAuthorized from './UnAuthorized'

const AppRouter = () => {
  const { subdomain } = useContext(AppContext)
  switch (subdomain) {
    case 'admin':
      return (
        <Router>
          <MasterLayout path="/">
            <AdminRoutes path="admin/*" />
            <UnAuthorized path="unauthorized" />
            <NotFound default />
          </MasterLayout>
        </Router>
      )
    case 'localhost':
      return (
        <Router>
          <MasterLayout path="/">
            <ConsumerRoutes path="/*" />
            <AdminRoutes path="admin/*" />
            <AttendantRoutes path="attendant/*" />
            <UnAuthorized path="unauthorized" />
            <NotFound default />
          </MasterLayout>
        </Router>
      )
    default:
      return (
        <Router>
          <MasterLayout path="/">
            <ConsumerRoutes path="/*" />
            <AttendantRoutes path="attendant/*" />
            <UnAuthorized path="unauthorized" />
            <NotFound default />
          </MasterLayout>
        </Router>
      )
  }
}

export default AppRouter
