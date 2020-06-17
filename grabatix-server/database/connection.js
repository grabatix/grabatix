const { connect, connection } = require(`mongoose`);

const connectToDatabase = async () =>
  await connect(
    process.env.NODE_ENV !== `production`
      ? `mongodb://localhost/grabatix`
      : process.env.DB_CONNECTION_STRING,
    {
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

module.exports = { connectToDatabase, connection };
