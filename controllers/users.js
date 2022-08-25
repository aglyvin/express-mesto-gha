const user = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  console.log(req.body);
  const {
    name, about, avatar,
  } = req.body;
  user.create({
    name,
    about,
    avatar,
  })
  .catch((e) => console.log(e));
  res.send(req.body);
};
