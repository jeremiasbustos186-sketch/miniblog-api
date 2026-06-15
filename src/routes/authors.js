const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /authors - Obtener todos los autores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM authors ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autores' });
  }
});

// GET /authors/:id - Obtener un autor por id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el autor' });
  }
});

// POST /authors - Crear un autor
router.post('/', async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name y email son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }
    res.status(500).json({ error: 'Error al crear el autor' });
  }
});

// PUT /authors/:id - Actualizar un autor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name y email son obligatorios' });
    }

    const result = await pool.query(
      'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
      [name, email, bio, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }
    res.status(500).json({ error: 'Error al actualizar el autor' });
  }
});

// DELETE /authors/:id - Eliminar un autor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el autor' });
  }
});

module.exports = router;
