const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

const User = require("../models/user.model.js");

const saltRounds = 10;

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async (req, res) => {
  let users = await User.find();

  let page = req.query.page ? parseInt(req.query.page) : 1;

  let perPage = 3;

  let begin = (page - 1) * perPage;
  let end = begin + perPage;

  let lengthPage = Math.ceil(users.length / perPage);

  res.render("users/index", {
    users: users.slice(begin, end),
    page,
    lengthPage
  });
};

module.exports.create = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;

  await User.create(req.body);

  res.redirect("back");
};

module.exports.idUpdate = async (req, res) => {
  let id = req.params.id;

  res.render("users/update-name", {
    id: id
  });
};

module.exports.update = async (req, res) => {
  await User.findByIdAndUpdate(req.body.id, { name: req.body.name });

  res.redirect("/users");
};

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  await User.findByIdAndRemove(id);

  res.redirect("back");
};

module.exports.profile = async (req, res) => {
  res.render("users/profile");
};

module.exports.postAvatar = async (req, res) => {
  let file = await cloudinary.uploader.upload(req.file.path);

  await await User.findByIdAndUpdate(req.body.id, { avatar: file.url });

  res.redirect("/users/profile");
};
