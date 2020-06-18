const REGX = {
    username:/\b\w+\@\w+\.\w+(?:\.\w+)?\b/,
    password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_])[A-z0-9#?!@$%^&*-_]{8,}$/,
}

module.exports = { REGX }