const { to } = require("await-to-js")
const { verifyPassword, hashPassword, getRedirectUrl } = require('../../auth/utils')
const { login } = require('../../auth/strategies/jwt')
const { createUser, getUserByEmail } = require("../../database/User")

exports.user_login_post = async (req, res) => {
    const { email, password } = req.body
    const [err, user] = await to(getUserByEmail(email))
    
    const authenticationError = () => {
    return res
        .status(500)
        .json({ success: false, data: "Authentication error!" })
    }
    
    if (!(await verifyPassword(password, user.password))) {
        console.error('Passwords do not match')
        return authenticationError()
    }
    
    const [loginErr, token] = await to(login(req, user))
    
    if (loginErr) {
        console.error('Log in error', loginErr)
        return authenticationError()
    }
    
    return res
        .status(200)
        .cookie('jwt', token, {
            secure:
               process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https"),
            maxAge: Date.now() + 60 * 60 * 1000 * 8,
            domain:
                process.env.NODE_ENV == `production`
                ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
                : "localhost",
            httpOnly: true
        })
        .json({
            success: true,
            data: getRedirectUrl(user.role)
        })
    
};

exports.user_signup_post = async (req, res) => {
    const { firstName, lastName, email, password, role = "Customer" } = req.body

    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
        return res.status(500).json({ success: false, data: 'Enter a valid email address.' })
    } else if (password.length < 5 || password.length > 20) {
        return res.status(500).json({
            success: false,
            data: 'Password must be between 5 and 20 characters.'
        })
    }
        
    let [createdError, user] = await to(
        createUser({
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
            role: role
        })
    )
        
    if (createdError) {
        return res.status(500).json({ success: false, data: 'Email is already taken' })
    }
        
    const [loginErr, token] = await to(login(req, user))
        
    if (loginErr) {
        console.error(loginErr)
        return res.status(500).json({ success: false, data: 'Authentication error!' })
    }
        
    return res
        .status(200)
        .cookie('jwt', token, {
            secure:
                process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https"),
                maxAge: Date.now() + 60 * 60 * 1000 * 8,
            domain:
                process.env.NODE_ENV == `production`
                    ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
                    : "localhost",
            httpOnly: true
        })
        .json({
            success: true,
            data: getRedirectUrl(user.role)
        })
};