const { exec } = require("child_process");
const logger = require("winston");

exec("./node_modules/.bin/knex migrate:latest", (err, stdout, stderr) => {
  if (err) throw err;
  logger.info(stdout);
});
