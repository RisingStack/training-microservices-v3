"use strict";

const { login } = require("./login");
const { register } = require("./register");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const healthcheck = require("./healthcheck");

const router = new Router();

router.use(bodyParser());

router.get("/healthcheck", healthcheck);

// USER MANAGEMENT
router.post("/users/register", register);
router.post("/login", login);

module.exports = router;
