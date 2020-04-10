const cluster = require("cluster");
const http = require("http");
const sticky = require("sticky-session"); // to enable sticky sessions
const expressApp = require("./server");
const { createLogger, transports } = require('winston');
const debug = require('debug')('cluster');

debug('Configuring Cluster Logging');
const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'cluster.log',
      level: 'info',
      options: { flags: 'w' }
    }),
    new transports.File({
      filename: 'cluster-errors.log',
      level: 'error',
      options: { flags: 'w' }
    })
  ]
});
logger.on('error', (err) => console.error({"Winston Logging Error": err}));

const id = cluster.isMaster ? process.pid : cluster.worker.id;
process.title = `Ticketing Server ${id}`;

debug('Loading Express App')
const app = expressApp(id);

debug('Creating Server')
const server = http.createServer(app);
// const io = socketIO(server); // for socket support

if (!sticky.listen(server, app.get("port"))) {
  // MASTER
  server.once("listening", () => {
    logger.log('info', 
      `Attention citizens of Master Realm, tune to channel ${app.get(
        "port"
      )}...Express Pokémon evolved.`
    );
  });
} else {
  // WORKERS
  logger.log('info', 
    `Attention citizens of Worker Realm ${id}, tune to channel ${app.get(
      "port"
    )}...Express Pokémon evolved.`
  );
}

process.on("message", message => {
  logger.log('info', `Process ${id} receives message '${JSON.stringify(message)}'`);
});

const gracefulShutdown = () => {
  logger.log('info', `Process ${id} received kill signal, shutting down gracefully.`);
  server.close(() => {
    logger.log('info',`Process ${id} closed out remaining connections.`);
    process.exit(0);
  });

  // if after
  const timeout = setTimeout(function() {
    logger.log('error', "Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10 * 1000);
};

// listen for TERM signal .e.g. kill
process.on("SIGTERM", gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on("SIGINT", gracefulShutdown);

process.on("unhandledRejection", error => {
  if (error) {
    logger.log('error', JSON.stringify({ UnhandledRejection: error }));
  }
});

process.on("error", error => {
  if (error) {
    logger.log('error', JSON.stringify({ ProcessError: error }));
  }
});
