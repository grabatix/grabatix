/** @format */

import React, { useContext } from 'react'
import { AdminContext } from '../providers/AdminProvider'

const withAdminContext = WrappedComponent => ({ children, ...props }) => {
  const ctx = useContext(AdminContext)
  return (
    <WrappedComponent ctx={ctx} {...props}>
      {children}
    </WrappedComponent>
  )
}

export default withAdminContext
