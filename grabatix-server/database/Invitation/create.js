const Invitation = require(`../models/Invitation/index`)

const createInvitation = async ({
  invitationCode = null,
  invitationStatus = `requested`,
  emailAddress,
}) => {
  return new Promise(async (resolve, reject) => {
    const invitation = await Invitation.findOne({ emailAddress })

    if (invitation) {
      return reject(
        new Error(`Invitation has already been given for this email address.`)
      )
    }

    return resolve(
      await Invitation.create({
        invitationCode,
        invitationStatus,
        emailAddress,
      })
    )
  })
}

module.exports = {
  createInvitation,
}
