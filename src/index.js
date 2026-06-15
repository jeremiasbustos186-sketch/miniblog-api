const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '¡MiniBlog API funcionando!' });
});

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});