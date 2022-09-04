const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('./validateUrl');

const {
  getCards,
  createCard,
  deleteCard,
  like,
  dislike,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), like);
router.delete('/:cardId/likes', dislike);

module.exports = router;
