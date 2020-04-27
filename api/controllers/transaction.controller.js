const Transaction = require("../../models/transaction.model.js");
const Book = require("../../models/book.model.js");
const User = require("../../models/user.model.js");

module.exports.getTransactions = async (req, res) => {
  res.json(await Transaction.find());
};

module.exports.create = async (req, res) => {
  if (await Book.findById(req.body.bookId)) {
    if (await User.findById(req.body.userId)) {
      let trans = await Transaction.create(req.body);
      res.json(trans)
    }
  }

  res.json(['failed']);
};
