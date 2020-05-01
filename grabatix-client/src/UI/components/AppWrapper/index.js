import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from "../../../providers/AppProvider"
import Header from '../Header'
import Footer from "../Footer"
import ProfileBlock from "../ProfileBlock"
import FlexContainer from "../FlexContainer"
import Logo from "../Logo"

const AppWrapper = ({children}) => {
    const { companyInfo: { name: companyName }} = useContext(AppContext)
    return (
        <>
            <Header>
                <ProfileBlock />
            </Header>
            { children }
            <Footer utilityClasses="py-2 px-1">
                <FlexContainer flexClasses="row justify-center align-center">&copy; {new Date().getFullYear()}&nbsp;{companyName}</FlexContainer>
                <FlexContainer flexClasses="row justify-center align-center">
                    <span className="mt-2">Powered By</span>
                    <Logo utilityClasses="mt-2">
                        <img src="https://res.cloudinary.com/grabatix/image/upload/v1585218366/Admin/Grabatix_mjmk2j.png" alt="Grabatix"/>
                    </Logo>
                </FlexContainer>
            </Footer>
        </>
    )
}

AppWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppWrapper