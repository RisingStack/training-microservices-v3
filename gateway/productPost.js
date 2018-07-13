"use strict";

const promiseRetry = require("promise-retry");
const uuidv1 = require("uuid/v1");

const config = require("./config");
const productsAPI = require("axios").create({
  baseURL: config.productsAPIURL
});

function idempotentPostWithRetry(body, idempotencyKey = uuidv1()) {
  return promiseRetry(
    (retry, number) => {
      return productsAPI
        .post({
          data: body,
          headers: {
            "x-idempotency": idempotencyKey
          }
        })
        .catch(err => {
          // Only retry for server and network issues
          if (err.statusCode > 499 || err.code === "ETIMEDOUT") {
            console.log(
              `Client ${
                logContext.counter
              }. Request failed: retry, Will run for ${number + 1}. time`
            );
            retry(err);
          }
          throw err;
        });
    },
    {
      retries: 10,
      factor: 1.5,
      minTimeout: 1000,
      maxTimeout: 10000
    }
  );
}

async function handler(req, res) {
  const result = await idempotentPostWithRetry(req.body);
  res.json(result);
}

module.export = handler;
