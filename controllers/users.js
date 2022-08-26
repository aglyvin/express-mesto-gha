const user = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  user.findById(req.params.userId)
    .then((founduser) => {
      res.send(founduser);
    })
    .catch(next);
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
      res.status(500).send('Произошла ошибка');
    });
};

module.exports.updateProfile = (req, res) => {
  const {
    name, about,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about })
    .then((usr) => res.send({ data: usr }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

module.exports.updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar })
    .then((usr) => res.send({ data: usr }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

module.exports.updateProfile = (req, res) => {
  const {
    name, about,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about })
    .then((usr) => res.send({ data: usr }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

module.exports.updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar })
    .then((usr) => res.send({ data: usr }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};
