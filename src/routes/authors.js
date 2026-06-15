const express = require('express');
const router = express.Router();
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../services/authorsService');

// GET /authors
router.get('/', async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

// GET /authors/:id
router.get('/:id', async (req, res, next) => {
  try {
    const author = await getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
  } catch (error) {
    next(error);
  }
});

// POST /authors
router.post('/', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son obligatorios' });
    const author = await createAuthor({ name, email, bio });
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
});

// PUT /authors/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son obligatorios' });
    const author = await updateAuthor(req.params.id, { name, email, bio });
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
  } catch (error) {
    next(error);
  }
});

// DELETE /authors/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const author = await deleteAuthor(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
