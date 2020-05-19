/** @format */

import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../providers/AuthProvider'

const useProtectedRoute = role => {
  const [isFetching, setFetching] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const { checkRoles } = useContext(AuthContext)

  useEffect(() => {
    const fetch = async () => {
      const isAuthorized = await checkRoles(role)
      setAuthorized(isAuthorized)
      setFetching(false)
    }
    fetch()
  }, [])

  return {
    isFetching,
    authorized,
  }
}

export default useProtectedRoute
