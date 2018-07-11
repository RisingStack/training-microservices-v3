"use strict";

const { promisify } = require("util");
const http = require("http");
const logger = require("winston");

if (process.env.NODE_ENV === "development") {
  require("dotenv/config");
}

const db = require("./db");
const app = require("./server");
const config = require("./config/server");

logger.default.transports.console.colorize = true;
logger.level = config.logger.level;

// const server = http.createServer(app.callback());
// Demonstration purposes
const server = http.createServer(function(req, res) {
  // Simulate a quite long-running process with setTimeout :)
  setTimeout(() => {
    db.raw("SELECT 1 AS status")
      .then(() => {
        res.statusCode = 200;
        return "ok";
      })
      .catch(ex => {
        logger.error(ex.message);
        res.statusCode = 500;
        return "not ok";
      })
      .then(status => {
        res.write(JSON.stringify({ status }));
        res.end();
      });
  }, 2500);
});

const serverListen = promisify(server.listen).bind(server);

serverListen(config.port)
  .then(() => {
    logger.info(`Users service is up and running on localhost:${config.port}`);
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });

// https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
["SIGINT", "SIGTERM"].forEach(signal => {
  process.once(signal, function shutdownHandler() {
    logger.info("Signal recieved:", signal);
    setTimeout(() => {
      logger.info("User service is not accepting incoming connections anymore");
      server.close(() => {
        logger.info(
          "No more active connections, destroying database connection"
        );

        db.destroy().then(() => {
          logger.info("Database connection is destroyed");
          process.exit(0);
        });
      });
    }, config.healthcheckPeriodSeconds);
  });
});
