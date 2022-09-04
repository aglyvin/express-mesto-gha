const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signin', login);

module.exports = router;
