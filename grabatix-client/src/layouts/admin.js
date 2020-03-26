import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import ProfileBlock from "../components/ProfileBlock"
import Logo from "../components/Logo"
import Button from "../components/Button"
import LoginModal from "../components/LoginModal";
import FlexContainer from "../components/FlexContainer"

const AdminLayout = ({children, isLoggedIn, setLoginStatus, setAccountOpen, setReportsOpen, ...props}) => {
    const [modalType, setModalType] = useState("login");
    const [isOpen, setOpenStatus] = useState(false);
    const handleModalOpen = type => {
        setModalType(type)
        setOpenStatus(true)
    }
    const handleModalOpenStatus = e => {
        e.preventDefault();
        setOpenStatus(!isOpen)
    }
    return (
        <>
            <Header>
                <ProfileBlock isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus} handleModalOpen={handleModalOpen} setAccountOpen={setAccountOpen} setReportsOpen={setReportsOpen} includeReports={true}/>
            </Header>
            <main>
                <FlexContainer flexClasses="row justify-center align-center">
                    <Logo utilityClasses="mt-2">
                        <img src="https://res.cloudinary.com/grabatix/image/upload/v1585218366/Admin/Grabatix_mjmk2j.png" alt="Grabatix"/>
                    </Logo>
                </FlexContainer>
                {
                !isLoggedIn ? (
                    <>
                    <LoginModal type={modalType} isLoggedIn={isLoggedIn} isOpen={isOpen} setOpen={handleModalOpenStatus}/>
                    <FlexContainer flexClasses="column justify-center align-center align-content-center">
                        <h1>Are you an existing customer?</h1>
                        <p><Button classNames="primary xs" role="button" handleClick={(e) => handleModalOpen("login")} innerText="Log-In Here"/></p>
                        <h2>Need to create an account?</h2>
                        <p><Button classNames="primary xs" role="button" handleClick={(e) => handleModalOpen("signup")} innerText="Sign-Up Now!"/></p>
                    </FlexContainer>
                    </>
                ) : (
                    null
                )
                }
                {children}
            </main>
        </>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginStatus: PropTypes.func.isRequired,
    setAccountOpen: PropTypes.func.isRequired,
    setReportsOpen: PropTypes.func.isRequired
}

export default AdminLayout