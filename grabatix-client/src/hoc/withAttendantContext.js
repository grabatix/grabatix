/** @format */

import React, { useContext } from 'react'
import { AttendantContext } from '../providers/AttendantProvider'

const withAttendantContext = WrappedComponent => ({ children, ...props }) => {
  const ctx = useContext(AttendantContext)
  return (
    <WrappedComponent ctx={ctx} {...props}>
      {children}
    </WrappedComponent>
  )
}

export default withAttendantContext
