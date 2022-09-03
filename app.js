const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(bodyParser.json());
app.use('/auth', require('./routes/auth'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(() => {
  throw new NotFoundError('Адрес не существует');
});

app.use((err, req, res, next) => {
  res.status(err.status).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
