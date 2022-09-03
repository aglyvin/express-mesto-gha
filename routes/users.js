const router = require('express').Router();
const {
  getUsers,
  getUser,
  getLoggedUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getLoggedUser);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateProfile);

module.exports = router;
