const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  getCard,
  like,
  dislike,
} = require('../controllers/card');

router.get('/', getCards);
router.get('/:cardId', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', like);
router.delete('/:cardId/likes', dislike);

module.exports = router;
