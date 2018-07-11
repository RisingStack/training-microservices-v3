"use strict";

const db = require("../db");

let isShuttingDown = false;
const signals = ["SIGINT", "SIGTERM"];

signals.forEach(signal => {
  process.once(signal, () => {
    isShuttingDown = true;
  });
});

module.exports = async ctx => {
  if (isShuttingDown) {
    ctx.status = 500;
    return;
  }

  try {
    await db.raw("SELECT 1 as status");
  } catch (ex) {
    ctx.status = 500;
    return;
  }
  ctx.body = "Users Service is up!";
};
