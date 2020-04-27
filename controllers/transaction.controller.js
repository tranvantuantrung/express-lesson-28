const Transaction = require("../models/transaction.model.js");
const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
const Session = require("../models/session.model.js");

module.exports.index = async (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : 1;

  let perPage = 3;

  let begin = (page - 1) * perPage;
  let end = begin + perPage;

  let books = await Book.find();
  let users = await User.find();
  let transactions = await Transaction.find();

  if (res.locals.user.isAdmin === "true") {
    let changeTrans = transactions.map(trans => {
      let book = books.find(book => book.id === trans.bookId.toString());
      let user = users.find(user => user.id === trans.userId.toString());

      return {
        bookTitle: book.title,
        userName: user.name,
        id: trans.id,
        isComplete: trans.isComplete
      };
    });

    res.render("transactions/index", {
      transactions: changeTrans.slice(begin, end),
      page,
      lengthPage: Math.ceil(changeTrans.length / perPage),
      books,
      users
    });

    return;
  }

  let memberTrans = transactions.filter(trans => {
    return trans.userId.toString() === res.locals.user.id;
  });

  let changeTrans = memberTrans.map(trans => {
    let book = books.find(book => book.id === trans.bookId.toString());

    return {
      bookTitle: book.title,
      userName: res.locals.user.name,
      id: trans.id,
      isComplete: trans.isComplete
    };
  });

  res.render("transactions/index", {
    transactions: changeTrans.slice(begin, end),
    page,
    lengthPage: Math.ceil(changeTrans.length / perPage),
    books,
    users: [res.locals.user]
  });
};

module.exports.createCart = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  if (session) {
    for (let book of session.cart) {
      for (let i = 0; i < book.quantity; i++) {
        await Transaction.create({
          bookId: book.bookId,
          userId: req.signedCookies.userId
        });
      }
    }
    session.cart = [];
    session.save();

    res.redirect("/transactions");
    return;
  }
};

module.exports.create = async (req, res) => {
  let id = req.params.id;

  await Transaction.create(req.body);

  res.redirect("back");
};

module.exports.complete = async (req, res) => {
  let id = req.params.id;

  await Transaction.findByIdAndUpdate(id, { isComplete: true });

  res.redirect("back");
};
