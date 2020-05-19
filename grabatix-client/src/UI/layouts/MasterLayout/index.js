/** @format */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../../../providers/AppProvider'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProfileBlock from '../../components/ProfileBlock'
import FlexContainer from '../../components/FlexContainer'
import Logo from '../../components/Logo'

const MasterLayout = ({ children }) => {
  const {
    companyInfo: { name: companyName },
  } = useContext(AppContext)
  return (
    <>
      <Header>
        <ProfileBlock />
      </Header>
      {children}
      <Footer utilityClasses="py-2 px-1">
        <FlexContainer flexClasses="row justify-center align-center">
          &copy; {new Date().getFullYear()}&nbsp;{companyName}
        </FlexContainer>
        <FlexContainer flexClasses="row justify-center align-center">
          <span className="mt-2">Powered By</span>
          <Logo utilityClasses="mt-2">
            <img
              src="https://res.cloudinary.com/grabatix/image/upload/v1585218366/Admin/Grabatix_mjmk2j.png"
              alt="Grabatix"
            />
          </Logo>
        </FlexContainer>
      </Footer>
    </>
  )
}

MasterLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MasterLayout
