const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, getPostsByAuthor, createPost, updatePost, deletePost } = require('../services/postsService');

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// GET /posts/author/:authorId - debe ir antes de /:id
router.get('/author/:authorId', async (req, res, next) => {
  try {
    const posts = await getPostsByAuthor(req.params.authorId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// GET /posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// POST /posts
router.post('/', async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    }
    const post = await createPost({ title, content, author_id, published });
    res.status(201).json(post);
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({ error: 'El author_id no existe' });
    }
    next(error);
  }
});

// PUT /posts/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    }
    const post = await updatePost(req.params.id, { title, content, author_id, published });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// DELETE /posts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await deletePost(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
