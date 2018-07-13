const url = require("url");
const express = require("express");
const axios = require("axios");
const proxy = require("express-http-proxy");
const cors = require("cors");
const bodyParser = require("body-parser");

const { productsAPIURL, usersAPIURL } = require("./config");
const productPost = require("./productPost");
const auth = require("./auth");

const api = express();

// api.use(cors())

// TODO use route versioning
api.post("/users/register", proxy(usersAPIURL));
api.post(
  "/users/login",
  proxy(usersAPIURL, {
    proxyReqPathResolver: function(req) {
      return "/login";
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      if (proxyRes.statusCode === 200) {
        console.log(proxyResData.toString("UTF-8"));
        const { id: userId, username, email } = JSON.parse(
          proxyResData.toString("UTF-8")
        );

        const isAdmin = true;

        return JSON.stringify({
          message: "Successful login",
          token: auth.sign({ userId, isAdmin }),
          user: {
            username,
            email,
            isAdmin
          }
        });
      }
      return proxyResData;
    }
  })
);

api.get("/products", proxy(productsAPIURL));
api.post("/products", auth.middleware, bodyParser.json(), productPost);
api.get("/products/:id", auth.middleware, proxy(productsAPIURL));
api.delete("/products/:id", auth.middleware, proxy(productsAPIURL));
api.put("/products/:id", auth.middleware, proxy(productsAPIURL));

module.exports = api;
