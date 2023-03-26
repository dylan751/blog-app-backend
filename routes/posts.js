const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// CREATE POST
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Only the author of the post can update it
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true },
        );

        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('Only owner of this post can update it!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // nly the author of the post can update it
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json('Post has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('Only owner of this post can delete it!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
