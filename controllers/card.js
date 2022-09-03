const card = require('../models/card');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
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
        throw new BadRequestError('Переданы некорректные данные при создании карточки.');
      }
      next(e);
    });
};

module.exports.getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((foundCard) => {
      if (!foundCard) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (!foundCard.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалить карточку, созданную другим пользователем');
      }
      return foundCard.remove()
        .then(() => {
          res.send('The card was deleted');
        });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки.');
      }
      next(e);
    });
};

module.exports.like = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((crd) => {
      if (!crd) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(crd);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные.');
      }
      next(e);
    });
};

module.exports.dislike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((crd) => {
      if (!crd) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(crd);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные.');
      }
      next(e);
    });
};
