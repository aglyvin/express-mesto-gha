const user = require('../models/user');
const errors = require('../errors/codes');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((e) => {
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.name}` });
    });
};

module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((founduser) => {
      if (!founduser) {
        res.status(errors.NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(founduser);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.name}` });
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
    .then((usr) => res.send({ ...req.body, _id: usr.id }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.updateProfile = (req, res) => {
  const {
    name, about,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((usr) => {
      if (!usr) {
        res.status(errors.NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(usr);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((usr) => {
      if (!usr) {
        res.status(errors.NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(usr);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};
