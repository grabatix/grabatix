/** @format */

import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import ProfileBlock from '../../components/ProfileBlock'
import Logo from '../../components/Logo'
import FlexContainer from '../../components/FlexContainer'
import AdminDashboard from '../../components/AdminDashboard'
import { AdminContext } from '../../../providers/AdminProvider'
import { AuthContext } from '../../../providers/AuthProvider'

const AdminLayout = ({ children, ...props }) => {
  const { isLoggedIn, user } = useContext(AuthContext)
  return (
    <>
      <main className="secondary">
        <AdminDashboard>
          <div className="container">
            <FlexContainer flexClasses="row justify-center align-center">
              <Logo utilityClasses="mt-2">
                <img
                  src="https://res.cloudinary.com/grabatix/image/upload/v1585218366/Admin/Grabatix_mjmk2j.png"
                  alt="Grabatix"
                />
              </Logo>
            </FlexContainer>
            {children}
          </div>
        </AdminDashboard>
      </main>
    </>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node,
}

export default AdminLayout
