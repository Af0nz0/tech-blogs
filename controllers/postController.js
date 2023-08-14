const express = require('express');
const { Post, Comment } = require('../models');

const router = express.Router();

// Display the form to create a new blog post
router.get('/new-post', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('new-post');
});

// Handle creation of a new blog post
router.post('/new-post', async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
});

// Display a specific blog post with comments
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: {
        model: Comment,
        order: [['createdAt', 'DESC']] // Display comments in descending order
      }
    });
    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving post');
  }
});

// Handle adding a comment
router.post('/add-comment/:postId', async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    if (!content || !postId) {
      return res.status(400).send('Invalid input');
    }

    await Comment.create({
      content,
      PostId: postId
    });

    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding comment');
  }
});

// Display the form to edit a blog post
router.get('/edit-post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.render('edit-post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving post');
  }
});

// Handle updating a blog post
router.post('/edit-post/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (post) {
      await post.update({ title, content });
      res.redirect(`/posts/${post.id}`);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating post');
  }
});

// Handle deleting a blog post
router.post('/delete-post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (post) {
      await post.destroy();
      res.redirect('/dashboard');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
});

module.exports = router;
