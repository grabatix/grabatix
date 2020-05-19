/** @format */

import React from 'react'
import { Redirect } from '@reach/router'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import useProtectedRoute from '../../../hooks/useProtectedRoute'
import { Attendant } from '../../../config/roles'

const AttendantLayout = ({ children, ...props }) => {
  const { authorized, isFetching } = useProtectedRoute(Attendant)
  if (isFetching) {
    return <Loading />
  }
  if (authorized) {
    return (
      <main className="secondary">
        <div className="container">{children}</div>
      </main>
    )
  }
  if (!isFetching && !authorized) {
    return <Redirect from="" to="/unauthorized" noThrow />
  }

  return null
}

AttendantLayout.propTypes = {
  children: PropTypes.node,
}

export default AttendantLayout
