const Invitation = require(`../models/Invitation/index`)

/**
 *
 * @param {string} invitationCode - unique invitationCode
 */
const getInvitationByCode = async (invitationCode) => {
  return await Invitation.findOne({ invitationCode })
    .where(`invitationStatus`)
    .equals(`invited`)
}

const getAllInvitations = async () => {
  return await Invitation.find({})
}

module.exports = {
  getAllInvitations,
  getInvitationByCode,
}
