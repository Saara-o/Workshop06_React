const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    return res.status(201).json(saved);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  // Implement UPDATE operation for one post.
  // Steps:
  // 1) Keep ObjectId validation for req.params.id.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  // 2) Update the post with req.body using Post.findByIdAndUpdate().
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    // 3) Use { new: true, runValidators: true } so validation runs and the updated doc is returned.
      new: true,
      runValidators: true,
    });
    // 4) Return 404 if no post exists with this id.
    if (!post) {
      return res.status(404).json({ error: 'Post not found'})

    }
    res.json(post);
  
  // 5) Return 400 for validation errors and 500 for other server errors.
  } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message});
      }
      res.status(500).json({ error: error.messsage});
  }
});

router.delete('/:id', async (req, res) => {
  // Implement DELETE operation for one post.

  // 1) Keep ObjectId validation for req.params.id.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  // 2) Delete the post using Post.findByIdAndDelete().
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    // 3) Return 404 if no post exists with this id.
      if (!post) {
        return res.status(404)({ error: 'Post not found'});
  }
  // 4) Return a success JSON message when deletion succeeds.
  res.json({ message: 'Post deleted succesfully'});

  // 5) Return 500 for unexpected server errors.
  } catch (error) {
    res.status(500).json({ error: error.message});
  }

});

module.exports = router;