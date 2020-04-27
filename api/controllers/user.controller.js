const bcrypt = require("bcrypt");

const User = require("../../models/user.model.js");

const saltRounds = 10;

module.exports.getUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
};

module.exports.create = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;

  let user = await User.create(req.body);

  res.json(user);
};

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  let user = await User.findByIdAndRemove(id);

  res.json(user);
};

module.exports.update = async (req, res) => {
  let id = req.params.id;
  console.log(req.body)

  let users = await User.find();

  if (users.find(user => user.email === req.body.email)) {
    res.json(["user already exists"]);
    return;
  }

  let user = await User.findByIdAndUpdate(id, req.body);

  res.json(user);
};
