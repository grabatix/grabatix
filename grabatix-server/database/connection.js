const { connect, connection } = require(`mongoose`)
const { MONGO } = require(`../config`)

const connectToDatabase = async () =>
  await connect(MONGO.CONNECTION.URL, {
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

module.exports = { connectToDatabase, connection }
