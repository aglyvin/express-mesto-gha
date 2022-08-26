const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '630855419f7e2653469273d6',
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Адрес не существует' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
