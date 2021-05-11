const CONNECTION = {
  URL:
    process.env.NETLIFY_DEV == `true`
      ? `mongodb://localhost/grabatix`
      : process.env.MONGODB_CONNECTION_STRING,
}

const MONGO = { CONNECTION }

module.exports = { MONGO }
