const express = require('express');
const router = express.Router();
const Posts = require("./posts-model");

const { validatePostId, validatePost } = require("../middleware/middleware");

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving posts"} )
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Post with id ${req.params.id} has been deleted`})
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error deleting the post"} )
    })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  // this needs a middleware to check that the request body is valid
  Posts.update(req.params.id, req.body)
    .then(updatedPost => {
      res.status(200).json(req.body)
    })
    .catch(() => {
      res.status(500).json({ error: "Error editing post"} )
    })
});

// do not forget to export the router

module.exports = router