const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === '23505') {
    return res.status(400).json({ error: 'El email ya está en uso' });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'El author_id no existe' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
};

module.exports = errorHandler;
