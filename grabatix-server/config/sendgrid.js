const SENDGRID = {
    API_KEY = process.env.SENDGRID_API_KEY,
    RECEIPT: {
        SENDER_EMAIL = process.env.SENDGRID_RECEIPT_SENDER_EMAIL,
        SENDER_NAME = process.env.SENDGRID_RECEIPT_SENDER_NAME,
        TEMPLATE_ID = process.env.SENDGRID_RECEIPT_TEMPLATE_ID,
    },
    CONFIRM: {
        SENDER_EMAIL = process.env.SENDGRID_CONFIRM_SENDER_EMAIL,
        SENDER_NAME = process.env.SENDGRID_CONFIRM_SENDER_NAME,
        TEMPLATE_ID = process.env.SENDGRID_CONFIRM_TEMPLATE_ID,
    },
}

module.exports = { SENDGRID }