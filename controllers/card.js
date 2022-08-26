const card = require('../models/card');

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
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${e.message}` });
    });
};

module.exports.getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((foundCard) => {
      if (!foundCard) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(foundCard);
    })
    .catch(next);
};

module.exports.like = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((crd) => res.send(crd));
};

module.exports.dislike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((crd) => res.send(crd));
};
