import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import ProfileBlock from "../../components/ProfileBlock"
import Logo from "../../components/Logo"
import FlexContainer from "../../components/FlexContainer"
import { AdminContext } from '../../../providers/AdminProvider'
import { AuthContext } from '../../../providers/AuthProvider'

const AdminLayout = ({children, ...props}) => {
    const [modalType, setModalType] = useState("login");
    const [isOpen, setOpenStatus] = useState(false);

    const { isLoggedIn, user } = useContext(AuthContext)

    const handleModalOpen = type => {
        setModalType(type)
        setOpenStatus(true)
    }
    const handleModalOpenStatus = e => {
        e.preventDefault();
        setOpenStatus(!isOpen)
    }

    const setAccountOpen = async () => true
    const setReportsOpen = async () => true
    return (
        <>
            <Header>
                <ProfileBlock isLoggedIn={isLoggedIn} handleModalOpen={handleModalOpen} setAccountOpen={setAccountOpen} setReportsOpen={setReportsOpen} includeReports={true}/>
            </Header>
            <main>
                <FlexContainer flexClasses="row justify-center align-center">
                    <Logo utilityClasses="mt-2">
                        <img src="https://res.cloudinary.com/grabatix/image/upload/v1585218366/Admin/Grabatix_mjmk2j.png" alt="Grabatix"/>
                    </Logo>
                </FlexContainer>
                {children}
            </main>
        </>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node,
}

export default AdminLayout