
const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  // console.log(req)
  console.log("Method: ", req.method)
  console.log("Path: ", req.originalUrl)
  var timestamp = Number(new Date())
  var date = new Date(timestamp).toDateString();
  console.log("Timestamp: ", date)
  next()
}

async function validateUserId(req, res, next) {
  console.log('checking user id')
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user
      console.log(`User id ${req.params.id} found`)
      next()
    } else {
      console.log(`User with id ${req.params.id} not found`)
      res.status(404).json(`User with id ${req.params.id} not found`)
    }
  } catch (error) {
    res.status(500).json('error')
  }
}

function validateUser(req, res, next) {
  console.log("checking form")
  req.body.name ? next() : res.status(400).json({ error: "please provide name" })
}

async function validatePostId(req, res, next) {
  console.log('checking post id')
  try {
    const post = await Posts.getById(req.params.id)
    if (post) {
      req.post = post
      console.log(`Post id ${req.params.id} found`)
      next()
    } else {
      console.log(`Post with id ${req.params.id} not found`)
      res.status(404).json(`Post with id ${req.params.id} not found`)
    }
  } catch (error) {
    res.status(500).json('error')
  }
}

function validatePost(req, res, next) {
  console.log("checking form")
  req.body.text ? next() : res.status(400).json({ message: "missing required text field"  })
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost }