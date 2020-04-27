const Book = require("../../models/book.model.js");

module.exports.getBooks = async (req, res) => {
  let books = await Book.find();
  res.json(books);
};

module.exports.create = async (req, res) => {
  let newBook = await Book.create(req.body);

  res.json(newBook);
};

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  let book = await Book.findByIdAndRemove(id);

  res.json(book);
};
