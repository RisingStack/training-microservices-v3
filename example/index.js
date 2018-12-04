const http = require("http");
const bcrypt = require("bcrypt");

http
  .createServer((_, res) => {
    bcrypt.hash("hello", 10, (err, hash) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.end(`hello hash ${hash}`);
    });
  })
  .listen(3000);
