const card = require('../models/card');
const errors = require('../errors/codes');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card.create({
    name,
    link,
    owner,
  })
    .then((data) => res.send(data))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        console.log(errors.DATA_ERROR);
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch((e) => res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` }));
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndDelete(req.params.cardId)
    .then((foundCard) => {
      if (!foundCard) {
        res.status(errors.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(foundCard);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.like = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((crd) => {
      if (!crd) {
        res.status(errors.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(crd);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.dislike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((crd) => {
      if (!crd) {
        res.status(errors.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(crd);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(errors.DATA_ERROR).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(errors.ERROR).send({ message: `Произошла ошибка: ${e.message}` });
    });
};
