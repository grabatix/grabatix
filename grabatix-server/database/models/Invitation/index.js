const { model } = require(`mongoose`)
const InvitationSchema = require(`../../schema/InvitationSchema`)

const Invitation = model(`Invitation`, InvitationSchema)

module.exports = Invitation
