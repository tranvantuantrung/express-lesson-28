const cloudinary = require("cloudinary").v2;

const Book = require("../models/book.model.js");

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async (req, res, next) => {
  try {
    let a;
    a.b();
    res.render("books/index", {
      books: await Book.find()
    });
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res) => {
  await Book.create(req.body);

  res.redirect("back");
};

module.exports.idUpdate = async (req, res) => {
  let id = req.params.id;

  res.render("books/update-cover", {
    id: id
  });
};

module.exports.update = async (req, res) => {
  let file = await cloudinary.uploader.upload(req.file.path);

  await Book.findByIdAndUpdate(req.body.id, { coverUrl: file.url });

  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  await Book.findByIdAndRemove(id);

  res.redirect("back");
};
