const express = require('express');
const server = express();
const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");
const { logger } = require("./middleware/middleware");
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and routes need to be connected here


server.use("/api/users", logger, usersRouter)
server.use("/api/posts", logger, postsRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
