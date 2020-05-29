/** @format */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useMatch } from '@reach/router'
import { AuthContext } from '../../../providers/AuthProvider'
import NavLink from '../NavLink'
import SubNavLink from '../SubNavLink'
import DarkSwitcher from '../DarkSwitcher'
import paths from '../../../config/paths'

import './index.css'

const ProfileLinks = () => {
  const attendantMatch = useMatch(`/attendant/*`)
  const adminMatch = useMatch(`/admin/*`)
  const reportsMatch = useMatch(`/admin/reports/*`)
  const { isLoggedIn, logout } = useContext(AuthContext)

  const handleLogout = e => {
    e && e.preventDefault()
    logout()
  }

  const basePaths = {
    accountPath: `/account`,
    editPath: `/account/edit`,
    homePath: `/`,
    loginPath: `/login`,
    signupPath: `/signup`,
  }

  if (!!attendantMatch || !!adminMatch) {
    const rootPath = !!adminMatch ? `/admin` : `/attendant`
    for (let path in basePaths) {
      basePaths[path] = rootPath + basePaths[path]
    }
  }

  const { accountPath, editPath, homePath, loginPath, signupPath } = basePaths

  const {
    adminPaths: { reportsPath, onlineTransactionsPath, attendantTransactionPath, usersPath },
    attendantPaths: { scanPath, recentScansPath },
    consumerPaths: { cartPath, codesPath, historyPath },
  } = paths
  return (
    <>
      <NavLink label={`Home`} path={homePath} disabled={false} hidden={false} />
      <NavLink label={`My Cart`} path={cartPath} disabled={!isLoggedIn} hidden={!!adminMatch} />
      <NavLink
        label={`My Account`}
        path={accountPath}
        disabled={!isLoggedIn}
        hidden={!isLoggedIn}
      />
      <SubNavLink
        label={`Reports`}
        path={reportsPath}
        disabled={!isLoggedIn}
        hidden={!adminMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`Scan Codes`}
        path={scanPath}
        disabled={!isLoggedIn}
        hidden={!attendantMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`Recent Scans`}
        path={recentScansPath}
        disabled={!isLoggedIn}
        hidden={!attendantMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`Online Transactions`}
        path={onlineTransactionsPath}
        disabled={!isLoggedIn}
        hidden={!reportsMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`Attendant Transactions`}
        path={attendantTransactionPath}
        disabled={!isLoggedIn}
        hidden={!reportsMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`Users`}
        path={usersPath}
        disabled={!isLoggedIn}
        hidden={!adminMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`My Codes`}
        path={codesPath}
        disabled={!isLoggedIn}
        hidden={!!adminMatch || !isLoggedIn}
      />
      <SubNavLink
        label={`My History`}
        path={historyPath}
        disabled={!isLoggedIn}
        hidden={!!adminMatch || !isLoggedIn}
      />
      <SubNavLink label={`Edit`} path={editPath} disabled={!isLoggedIn} hidden={!isLoggedIn} />
      <NavLink
        label={`Log-Out`}
        path={loginPath}
        disabled={false}
        hidden={!isLoggedIn}
        handleClick={handleLogout}
      />
      <NavLink label={`Log-In`} path={loginPath} disabled={false} hidden={isLoggedIn} />
      <NavLink label={`Sign-Up`} path={signupPath} disabled={isLoggedIn} hidden={isLoggedIn} />
      <DarkSwitcher />
    </>
  )
}

ProfileLinks.propTypes = {}

export default ProfileLinks
