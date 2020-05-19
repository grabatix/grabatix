/** @format */

import React, { useContext } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { AuthContext } from '../../../providers/AuthProvider'

import './index.css'

const ProfileImage = () => {
  const {
    isLoggedIn,
    user: { imgUrl, displayName },
  } = useContext(AuthContext)
  if (!isLoggedIn) {
    return null
  }
  return imgUrl ? (
    <img className="profile-image" src={imgUrl} alt={displayName} />
  ) : (
    <MdAccountCircle className="profile-image__default" />
  )
}

export default ProfileImage
