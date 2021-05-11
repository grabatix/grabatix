const Invitation = require(`../models/Invitation/index`)

const inviteInvitation = async ({ id }) => {
  const query = { _id: id }
  const options = { new: true, upsert: true }
  return Invitation.findOneAndUpdate(
    query,
    { invitationStatus: `invited`, invitedDate: Date.now() },
    options
  )
}

const redeemInvitation = async ({ invitationCode, companyId }) => {
  const query = { invitationCode }
  const options = { new: true, upsert: true }
  return Invitation.findOneAndUpdate(
    query,
    {
      invitationStatus: `redeemed`,
      company: companyId,
      redeemedDate: Date.now(),
    },
    options
  )
}

const releaseInvitationByCode = async ({ invitationCode }) => {
  const query = { invitationCode }
  const options = { new: true, upsert: true }
  return Invitation.findOneAndUpdate(
    query,
    { invitationStatus: `released`, releasedDate: Date.now() },
    options
  )
}

const releaseInvitationById = async ({ id }) => {
  const query = { _id: id }
  const options = { new: true, upsert: true }
  return Invitation.findOneAndUpdate(
    query,
    { invitationStatus: `released`, releasedDate: Date.now() },
    options
  )
}

module.exports = {
  inviteInvitation,
  redeemInvitation,
  releaseInvitationByCode,
  releaseInvitationById,
}
