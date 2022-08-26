const user = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((founduser) => {
      if (!founduser) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(founduser);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;
  user.create({
    name,
    about,
    avatar,
  })
    .then((usr) => res.send({ ...req.body, id: usr.id }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.updateProfile = (req, res) => {
  const {
    name, about,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about })
    .then((usr) => {
      if (!usr) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(usr);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar })
    .then((usr) => {
      if (!usr) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(usr);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${e.message}` });
    });
};
